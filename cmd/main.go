package main

import (
	"flag"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/HyperloopUPV-H8/webpage-backend/internal/auth"
	"github.com/HyperloopUPV-H8/webpage-backend/internal/endpoints"
	"github.com/HyperloopUPV-H8/webpage-backend/internal/media"
	"github.com/HyperloopUPV-H8/webpage-backend/internal/members"
	"github.com/HyperloopUPV-H8/webpage-backend/internal/partners"
	"github.com/rs/zerolog/log"
)

var AddressFlag = flag.String("l", "0.0.0.0:8080", "address where the HTTP server will listen")

func main() {
	flag.Parse()

	authUpdated := make(chan struct{}, 1)
	authEndpoint := auth.NewEndpoint(auth.UserList{
		Admins: []auth.User{
			{
				Name:     "test",
				Password: "1234",
			},
		},
	}, authUpdated)

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
		select {
		case signal := <-signals:
			log.Info().Str("signal", signal.String()).Msg("closing")
		}
	}

}
