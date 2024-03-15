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

	authEndpoint := auth.NewEndpoint(auth.UserList{
		Admins: []auth.User{
			{
				Name:     "test",
				Password: "1234",
			},
		},
	})

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
	}, authEndpoint)
	http.Handle("/members", &membersEndpoint)

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
	}, authEndpoint)
	http.Handle("/partners", &partnersEndpoint)

	mediaEndpoint, err := media.NewEndpoint()
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
	log.Info().Str("signal", (<-signals).String()).Msg("closing")
}
