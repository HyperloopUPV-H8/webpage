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
	http.Handle("/auth/", http.StripPrefix("/auth", authEndpoint))

	membersUpdated := make(chan struct{}, 1)
	membersEndpoint := endpoints.NewJSON("members", []members.Subsystem{
		{
			Name: "Direction",
			Members: []members.Member{
				{
					Name:       "Hugo Albert",
					ImageURL:   "media/members/hugo_albert.webp",
					Role:       "Director",
					SocialsURL: "https://www.linkedin.com/in/hugoalbert/",
				},
				{
					Name:       "Stefan Costea",
					ImageURL:   "media/members/stefan_costea.webp",
					Role:       "Technical Director",
					SocialsURL: "https://www.linkedin.com/in/stefan-costea-5a3648205/",
				},
				{
					Name:       "Alvaro Perez",
					ImageURL:   "media/members/alvaro_perez.webp",
					Role:       "Technical Director",
					SocialsURL: "https://www.linkedin.com/in/alvaro-perez-pecharroman/",
				},
			},
		},
		{
			Name: "Software",
			Members: []members.Member{
				{
					Name:       "Juan Martinez",
					ImageURL:   "media/members/juan_martinez.webp",
					Role:       "Project Manager",
					SocialsURL: "https://www.linkedin.com/in/juan-martinez-alonso-13507a283/",
				},
				{
					Name:       "Andres de la Torre",
					ImageURL:   "media/members/andres_de_la_torre.webp",
					Role:       "",
					SocialsURL: "https://www.linkedin.com/in/andresdltm/",
				},
				{
					Name:       "Marc Sanchis",
					ImageURL:   "media/members/marc_sanchis.webp",
					Role:       "",
					SocialsURL: "https://www.linkedin.com/in/marc-sanchis-5454a9192/",
				},
				{
					Name:       "Fernando Sanchez",
					ImageURL:   "media/members/fernando_sanchez.webp",
					Role:       "",
					SocialsURL: "https://www.linkedin.com/in/fernando-sanchez-gabaldon-3a4285191/",
				},
			},
		},
	}, authEndpoint, membersUpdated)
	defer internal.SaveJSON(*MembersPathFlag, membersEndpoint.GetData())
	http.Handle("/members", membersEndpoint)

	partnersUpdated := make(chan struct{}, 1)
	w := "28rem"
	h := "7rem"
	partnersEndpoint := endpoints.NewJSON("partners", []partners.Tier{
		{
			Name: "premium",
			Partners: []partners.Partner{
				{
					Name: "Universitat Politecnica De Valencia",
					Logo: partners.Logo{
						URL:   "/media/partners/Universitat Politecnica De Valencia",
						Width: &w,
					},
				},
				{
					Name: "Coaltec Soldadura",
					Logo: partners.Logo{
						URL:    "/partners/premium/universidad_politecnica_de_valencia.svg",
						Height: &h,
					},
				},
				{
					Name: "Zeleros",
					Logo: partners.Logo{
						URL: "/partners/premium/universidad_politecnica_de_valencia.svg",
					},
				},
				{
					Name: "Uniweld",
					Logo: partners.Logo{
						URL:    "/partners/premium/universidad_politecnica_de_valencia.svg",
						Height: &h,
						Width:  &w,
					},
				},
				{
					Name: "Acerinox",
					Logo: partners.Logo{
						URL:    "/partners/premium/universidad_politecnica_de_valencia.svg",
						Height: &h,
					},
				},
			},
			Style: partners.TierStyle{
				Width: "70%",
				Color: "#ffffff",
			},
		},
	}, authEndpoint, partnersUpdated)
	defer internal.SaveJSON(*PartnersPathFlag, partnersEndpoint.GetData())
	http.Handle("/partners", partnersEndpoint)

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
	http.Handle("/media/", http.StripPrefix("/media", mediaEndpoint))

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
