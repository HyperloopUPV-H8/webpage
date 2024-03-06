package main

import (
	"flag"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/HyperloopUPV-H8/webpage-backend/internal/endpoints"
	"github.com/HyperloopUPV-H8/webpage-backend/internal/members"
	"github.com/rs/zerolog/log"
)

var AddressFlag = flag.String("l", "0.0.0.0:8080", "address where the HTTP server will listen")

func main() {
	flag.Parse()

	membersEndpoint := endpoints.NewMembers([]members.Subsystem{
		members.Subsystem{
			Name: "direction",
			Members: []members.Member{
				members.Member{
					Name: "Hugo Albert",
				},
				members.Member{
					Name: "Stefan Costea",
				},
				members.Member{
					Name: "Alvaro Perez",
				},
			},
		},
	})
	http.Handle("/members", &membersEndpoint)

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
