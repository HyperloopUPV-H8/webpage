package main

import (
	"flag"
	"net"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/HyperloopUPV-H8/webpage-backend/internal"
	"github.com/HyperloopUPV-H8/webpage-backend/internal/auth"
	"github.com/HyperloopUPV-H8/webpage-backend/internal/endpoints"
	"github.com/HyperloopUPV-H8/webpage-backend/internal/media"
	"github.com/HyperloopUPV-H8/webpage-backend/internal/members"
	"github.com/HyperloopUPV-H8/webpage-backend/internal/partners"
	"github.com/rs/zerolog/log"
)

var AddressFlag = flag.String("l", "0.0.0.0:8080", "address where the HTTP server will listen")

var MemberImagePathFlag = flag.String("mip", "persistent/memberImages.json", "path where the member image manifest will be kept")
var PartnerImagePathFlag = flag.String("pip", "persistent/partnerImages.json", "path where the partner image manifest will be kept")
var MembersPathFlag = flag.String("mp", "persistent/members.json", "path where the member list will be kept")
var PartnersPathFlag = flag.String("pp", "persistent/partners.json", "path where the partner list will be kept")
var UsersPathFlag = flag.String("up", "persistent/users.json", "path where the user list will be kept")

const UpdateChanBufferSize = 1

func main() {
	flag.Parse()

	authUpdated := make(chan auth.UserList, UpdateChanBufferSize)
	authData, err := internal.LoadJSON[auth.UserList](*UsersPathFlag)
	if err != nil {
		log.Fatal().Err(err).Stack().Msg("reading auth data")
	}
	authEndpoint := auth.NewEndpoint(authData, authUpdated)
	http.Handle("/auth/", http.StripPrefix("/auth", authEndpoint))

	membersUpdated := make(chan []members.Subsystem, UpdateChanBufferSize)
	memberData, err := internal.LoadJSON[[]members.Subsystem](*MembersPathFlag)
	if err != nil {
		log.Fatal().Err(err).Stack().Msg("reading member data")
	}
	membersEndpoint := endpoints.NewJSON("members", memberData, authEndpoint, membersUpdated)
	http.Handle("/members", membersEndpoint)

	partnersUpdated := make(chan []partners.Tier, UpdateChanBufferSize)
	partnersData, err := internal.LoadJSON[[]partners.Tier](*PartnersPathFlag)
	if err != nil {
		log.Fatal().Err(err).Stack().Msg("reading partners data")
	}
	partnersEndpoint := endpoints.NewJSON("partners", partnersData, authEndpoint, partnersUpdated)
	http.Handle("/partners", partnersEndpoint)

	memberImagesUpdated := make(chan endpoints.ImageManifest, UpdateChanBufferSize)
	memberImagesData, err := internal.LoadJSON[endpoints.ImageManifest](*MemberImagePathFlag)
	if err != nil {
		log.Fatal().Err(err).Stack().Msg("reading member images")
	}
	partnerImagesUpdated := make(chan endpoints.ImageManifest, UpdateChanBufferSize)
	partnerImagesData, err := internal.LoadJSON[endpoints.ImageManifest](*PartnerImagePathFlag)
	if err != nil {
		log.Fatal().Err(err).Stack().Msg("reading partner images")
	}
	mediaEndpoint, err := media.NewEndpoint(
		memberImagesData,
		partnerImagesData,
		authEndpoint,
		memberImagesUpdated,
		partnerImagesUpdated,
	)
	if err != nil {
		log.Fatal().Stack().Err(err).Msg("media endpoint")
	}
	http.Handle("/media/", http.StripPrefix("/media", mediaEndpoint))

	go func() {
		err := http.ListenAndServeTLS(*AddressFlag, "/etc/letsencrypt/live/hyperloopupv.com/fullchain.pem", "/etc/letsencrypt/live/hyperloopupv.com/privkey.pem", nil)
		if err != nil {
			log.Fatal().Stack().Err(err).Msg("listen and serve")
		}
	}()

	killCommandNotification := make(chan string, 1)
	go func() {
		err := senseKill(killCommandNotification)
		if err != nil {
			log.Fatal().Stack().Err(err).Msg("sense kill")
		}
	}()

	log.Info().Str("address", *AddressFlag).Msg("listening")

	signals := make(chan os.Signal, 1)
	signal.Notify(signals, syscall.SIGINT, syscall.SIGTERM)

backupLoop:
	for {
		var err error = nil
		select {
		case data := <-authUpdated:
			err = internal.SaveJSON(*UsersPathFlag, data)
		case data := <-membersUpdated:
			err = internal.SaveJSON(*MembersPathFlag, data)
		case data := <-partnersUpdated:
			err = internal.SaveJSON(*PartnersPathFlag, data)
		case data := <-memberImagesUpdated:
			err = internal.SaveJSON(*MemberImagePathFlag, data)
		case data := <-partnerImagesUpdated:
			err = internal.SaveJSON(*PartnerImagePathFlag, data)
		case signal := <-signals:
			log.Info().Str("signal", signal.String()).Msg("closing")
			break backupLoop
		case from := <-killCommandNotification:
			log.Info().Str("from", from).Msg("kill")
			break backupLoop
		}
		if err != nil {
			log.Error().Stack().Err(err).Msg("backup loop")
		}
	}
}

const expectedKillCode = "Skidadle Skidoodle This Back is no Being Killed >:D"

func senseKill(notification chan<- string) error {
	addr, err := net.ResolveTCPAddr("tcp", "127.0.0.1:4040")
	if err != nil {
		return err
	}

	listener, err := net.ListenTCP("tcp", addr)
	if err != nil {
		return err
	}

	for {
		conn, err := listener.AcceptTCP()
		if err != nil {
			return err
		}
		defer conn.Close()

		killCodeChan := make(chan string)
		go readKillCode(conn, killCodeChan)

		select {
		case code := <-killCodeChan:
			if code == expectedKillCode {
				notification <- conn.RemoteAddr().String()
				return nil
			}
		case <-time.After(time.Second * 5):
		}

		log.Warn().Str("from", conn.RemoteAddr().String()).Msg("Failed attempt to kill")
	}
}

func readKillCode(conn *net.TCPConn, notification chan<- string) error {
	buffer := make([]byte, len(expectedKillCode))

	totalRead := 0
	for totalRead < len(expectedKillCode) {
		n, err := conn.Read(buffer[totalRead:])
		totalRead += n
		if err != nil {
			return err
		}
	}

	notification <- string(buffer)
	return nil
}
