package partners

import (
	"bytes"
	"encoding/json"
	"net/http"
	"time"

	"github.com/rs/zerolog/log"
)

var _ http.Handler = &Endpoint{}

const PartnersMediaFolder = "/media/partners"

type Endpoint struct {
	lastUpdated time.Time
	tiers       []Tier
}

func NewEndpoint(tiers []Tier) Endpoint {
	return Endpoint{
		lastUpdated: time.Now(),
		tiers:       tiers,
	}
}

func (endpoint *Endpoint) ServeHTTP(writer http.ResponseWriter, request *http.Request) {
	switch request.Method {
	case http.MethodGet:
		endpoint.get(writer, request)
	case http.MethodPost:
		endpoint.post(writer, request)
	case http.MethodOptions:
		endpoint.options(writer, request)
	default:
		log.Warn().Str("method", request.Method).Msg("method not allowed")
		writer.Header().Add("Allow", "GET, POST, OPTIONS")
		writer.WriteHeader(http.StatusMethodNotAllowed)
	}
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
