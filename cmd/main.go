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
	authEndpoint := auth.NewEndpoint(auth.UserList{
		Admins: []auth.User{
			{
				Name:     "admin",
				Password: "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4",
			},
		},
		Managers: []auth.User{
			{
				Name:     "manager",
				Password: "5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5",
			},
		},
	}, authUpdated)
	defer internal.SaveJSON(*UsersPathFlag, authEndpoint.GetUsers())
	http.Handle("/auth/", http.StripPrefix("/auth", &authEndpoint))

	membersUpdated := make(chan struct{}, 1)
	membersEndpoint := endpoints.NewJSON("members", []members.Subsystem{
		{
			Name: "direction",
			Members: []members.Member{
				{
					Name: "Hugo Albert",
				},
				{
					Name: "Stefan Costea",
				},
				{
					Name: "Alvaro Perez",
				},
			},
		},
	}, authEndpoint, membersUpdated)
	defer internal.SaveJSON(*MembersPathFlag, membersEndpoint.GetData())
	http.Handle("/members", &membersEndpoint)

	partnersUpdated := make(chan struct{}, 1)
	partnersEndpoint := endpoints.NewJSON("partners", []partners.Tier{
		{
			Name: "premium",
			Partners: []partners.Partner{
				{
					Name: "Universitat Politecnica De Valencia",
				},
				{
					Name: "Coaltec Soldadura",
				},
				{
					Name: "Zeleros",
				},
				{
					Name: "Uniweld",
				},
				{
					Name: "Acerinox",
				},
			},
			Style: partners.TierStyle{
				Width: "70%",
				Color: "#ffffff",
			},
		},
	}, authEndpoint, partnersUpdated)
	defer internal.SaveJSON(*PartnersPathFlag, partnersEndpoint.GetData())
	http.Handle("/partners", &partnersEndpoint)

	memberImagesUpdated := make(chan struct{}, 1)
	partnerImagesUpdated := make(chan struct{}, 1)
	mediaEndpoint, err := media.NewEndpoint(
		endpoints.ImageManifest{},
		endpoints.ImageManifest{},
		authEndpoint,
		memberImagesUpdated,
		partnerImagesUpdated,
	)
	if err != nil {
		log.Error().Stack().Err(err).Msg("media endpoint")
		os.Exit(1)
	}
	defer internal.SaveJSON(*MemberImagePathFlag, mediaEndpoint.GetMembersManifest())
	defer internal.SaveJSON(*PartnerImagePathFlag, mediaEndpoint.GetPartnersManifest())
	http.Handle("/media/", http.StripPrefix("/media", &mediaEndpoint))

	go func() {
		err := http.ListenAndServe(*AddressFlag, nil)
		if err != nil {
			log.Error().Stack().Err(err).Msg("listen and serve")
			os.Exit(1)
		}
	}()

	log.Info().Str("address", *AddressFlag).Msg("listening")

	signals := make(chan os.Signal, 1)
	signal.Notify(signals, syscall.SIGINT, syscall.SIGTERM)

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
			os.Exit(0)
		}
		if err != nil {
			log.Error().Stack().Err(err).Msg("backup loop")
		}
	}

}
