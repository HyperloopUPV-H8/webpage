package main

import (
	"flag"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/HyperloopUPV-H8/webpage-backend/internal/endpoints"
	"github.com/HyperloopUPV-H8/webpage-backend/internal/members"
	"github.com/HyperloopUPV-H8/webpage-backend/internal/partners"
	"github.com/rs/zerolog/log"
)

var AddressFlag = flag.String("l", "0.0.0.0:8080", "address where the HTTP server will listen")

func main() {
	flag.Parse()

	membersEndpoint := endpoints.NewMembers([]members.Subsystem{
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
	})
	http.Handle("/members", &membersEndpoint)

	partnersEndpoint := endpoints.NewPartners([]partners.Tier{
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
	})
	http.Handle("partners", &partnersEndpoint)

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
