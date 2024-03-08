package partners

import (
	"bytes"
	"encoding/json"
	"net/http"
	"time"

	"github.com/HyperloopUPV-H8/webpage-backend/internal/methodMux"
	"github.com/rs/zerolog/log"
)

var _ http.Handler = &Endpoint{}

const PartnersMediaFolder = "/media/partners"

type Endpoint struct {
	methodMux.Mux
	lastUpdated time.Time
	tiers       []Tier
}

func NewEndpoint(tiers []Tier) Endpoint {
	endpoint := Endpoint{
		lastUpdated: time.Now(),
		tiers:       tiers,
	}
	endpoint.Mux = methodMux.New(
		methodMux.Get(http.HandlerFunc(endpoint.get)),
		methodMux.Post(http.HandlerFunc(endpoint.post)),
		methodMux.Options(http.HandlerFunc(endpoint.options)),
	)
	return endpoint
}

func (endpoint *Endpoint) options(writer http.ResponseWriter, _ *http.Request) {
	log.Debug().Msg("options")

	writer.Header().Add("Content-Type", "application/json")
}

func (endpoint *Endpoint) get(writer http.ResponseWriter, request *http.Request) {
	log.Debug().Msg("get")

	tiersRaw, err := json.Marshal(endpoint.tiers)
	if err != nil {
		log.Error().Stack().Err(err).Msg("marshal tiers")
		http.Error(writer, "", http.StatusInternalServerError)
		return
	}

	writer.Header().Add("Content-Type", "application/json")
	http.ServeContent(writer, request, "partners.json", endpoint.lastUpdated, bytes.NewReader(tiersRaw))
}

func (endpoint *Endpoint) post(writer http.ResponseWriter, request *http.Request) {
	log.Debug().Msg("post")

	var updates []TierUpdate
	decoder := json.NewDecoder(request.Body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&updates)
	if err != nil {
		log.Error().Stack().Err(err).Msg("decode body")
		http.Error(writer, "", http.StatusBadRequest)
		return
	}

	endpoint.lastUpdated = time.Now()
	endpoint.tiers = TiersFromUpdates(updates)
}
