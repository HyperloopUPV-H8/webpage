package main

import (
	"flag"
	"net/http"
	"os"
	"os/signal"
	"syscall"

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

func main() {
	flag.Parse()

	authUpdated := make(chan struct{}, 1)
	authData, err := internal.LoadJSON[auth.UserList](*UsersPathFlag)
	if err != nil {
		log.Fatal().Err(err).Stack().Msg("reading auth data")
	}
	authEndpoint := auth.NewEndpoint(authData, authUpdated)
	defer internal.SaveJSON(*UsersPathFlag, authEndpoint.GetUsers())
	http.Handle("/auth/", http.StripPrefix("/auth", authEndpoint))

	membersUpdated := make(chan struct{}, 1)
	memberData, err := internal.LoadJSON[[]members.Subsystem](*MembersPathFlag)
	if err != nil {
		log.Fatal().Err(err).Stack().Msg("reading member data")
	}
	membersEndpoint := endpoints.NewJSON("members", memberData, authEndpoint, membersUpdated)
	defer internal.SaveJSON(*MembersPathFlag, membersEndpoint.GetData())
	http.Handle("/members", membersEndpoint)

	partnersUpdated := make(chan struct{}, 1)
	partnersData, err := internal.LoadJSON[[]partners.Tier](*PartnersPathFlag)
	if err != nil {
		log.Fatal().Err(err).Stack().Msg("reading partners data")
	}
	partnersEndpoint := endpoints.NewJSON("partners", partnersData, authEndpoint, partnersUpdated)
	defer internal.SaveJSON(*PartnersPathFlag, partnersEndpoint.GetData())
	http.Handle("/partners", partnersEndpoint)

	memberImagesUpdated := make(chan struct{}, 1)
	memberImagesData, err := internal.LoadJSON[endpoints.ImageManifest](*MemberImagePathFlag)
	if err != nil {
		log.Fatal().Err(err).Stack().Msg("reading member images")
	}
	partnerImagesUpdated := make(chan struct{}, 1)
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
	defer internal.SaveJSON(*MemberImagePathFlag, mediaEndpoint.GetMembersManifest())
	defer internal.SaveJSON(*PartnerImagePathFlag, mediaEndpoint.GetPartnersManifest())
	http.Handle("/media/", http.StripPrefix("/media", mediaEndpoint))

	go func() {
		err := http.ListenAndServe(*AddressFlag, nil)
		if err != nil {
			log.Fatal().Stack().Err(err).Msg("listen and serve")
		}
	}()

	log.Info().Str("address", *AddressFlag).Msg("listening")

	signals := make(chan os.Signal, 1)
	signal.Notify(signals, syscall.SIGINT, syscall.SIGTERM)

backupLoop:
	for {
		var err error = nil
		select {
		case <-authUpdated:
			err = internal.SaveJSON(*UsersPathFlag, authEndpoint.GetUsers())
		case <-membersUpdated:
			err = internal.SaveJSON(*MembersPathFlag, membersEndpoint.GetData())
		case <-partnersUpdated:
			err = internal.SaveJSON(*PartnersPathFlag, partnersEndpoint.GetData())
		case <-memberImagesUpdated:
			err = internal.SaveJSON(*MemberImagePathFlag, mediaEndpoint.GetMembersManifest())
		case <-partnerImagesUpdated:
			err = internal.SaveJSON(*PartnerImagePathFlag, mediaEndpoint.GetPartnersManifest())
		case signal := <-signals:
			log.Info().Str("signal", signal.String()).Msg("closing")
			break backupLoop
		}
		if err != nil {
			log.Error().Stack().Err(err).Msg("backup loop")
		}
	}

}
