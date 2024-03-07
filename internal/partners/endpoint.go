package partners

import (
	"bytes"
	"encoding/json"
	"net/http"
	"time"

	"github.com/rs/zerolog/log"
)

var _ http.Handler = &Endpoint{}

const PartnerMediaFolder = "/media/partners"

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

func (endpoint *Endpoint) ServeHTTP(writter http.ResponseWriter, request *http.Request) {
	switch request.Method {
	case http.MethodGet:
		endpoint.options(writter, request)
		endpoint.get(writter, request)
	case http.MethodPost:
		endpoint.post(writter, request)
	case http.MethodOptions:
		endpoint.options(writter, request)
	default:
		log.Warn().Str("method", request.Method).Msg("method not allowed")
		writter.WriteHeader(http.StatusMethodNotAllowed)
	}
}

func (endpoint *Endpoint) options(writter http.ResponseWriter, _ *http.Request) {
	log.Debug().Msg("options")

	writter.Header().Add("Content-Type", "application/json")
}

func (endpoint *Endpoint) get(writter http.ResponseWriter, request *http.Request) {
	log.Debug().Msg("get")

	subsystemsRaw, err := json.Marshal(endpoint.tiers)
	if err != nil {
		log.Error().Stack().Err(err).Msg("marshal subsystems")
		http.Error(writter, "", http.StatusInternalServerError)
		return
	}

	http.ServeContent(writter, request, "partners.json", endpoint.lastUpdated, bytes.NewReader(subsystemsRaw))
}

func (endpoint *Endpoint) post(writter http.ResponseWriter, request *http.Request) {
	log.Debug().Msg("post")

	var updates []TierUpdate
	decoder := json.NewDecoder(request.Body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&updates)
	if err != nil {
		log.Error().Stack().Err(err).Msg("decode body")
		http.Error(writter, "", http.StatusBadRequest)
		return
	}

	endpoint.lastUpdated = time.Now()
	endpoint.tiers = TiersFromUpdates(updates)
}
