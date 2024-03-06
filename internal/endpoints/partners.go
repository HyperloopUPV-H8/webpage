package endpoints

import (
	"net/http"
	"time"

	"github.com/HyperloopUPV-H8/webpage-backend/internal/partners"
	"github.com/rs/zerolog/log"
)

type Partners struct {
	lastUpdated time.Time
	tiers       []partners.Tier
}

func NewPartners(tiers []partners.Tier) Partners {
	return Partners{
		lastUpdated: time.Now(),
		tiers:       tiers,
	}
}

func (endpoint *Partners) ServeHTTP(writter http.ResponseWriter, request *http.Request) {
	switch request.Method {
	default:
		log.Warn().Str("method", request.Method).Msg("method not allowed")
		request.Body.Close()
		writter.WriteHeader(http.StatusMethodNotAllowed)
	}
}
