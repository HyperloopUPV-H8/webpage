package partners

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/HyperloopUPV-H8/webpage-backend/pkg/http/headers"
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
		endpoint.get(writter, request)
	case http.MethodPost:
		endpoint.post(writter, request)
	default:
		log.Warn().Str("method", request.Method).Msg("method not allowed")
		request.Body.Close()
		writter.WriteHeader(http.StatusMethodNotAllowed)
	}
}

func (endpoint *Endpoint) get(writter http.ResponseWriter, request *http.Request) {
	defer request.Body.Close()
	log.Debug().Msg("get")

	subsystemsRaw, err := json.Marshal(endpoint.tiers)
	if err != nil {
		log.Error().Stack().Err(err).Msg("marshal subsystems")
		writter.WriteHeader(http.StatusInternalServerError)
		return
	}

	writter.Header().Add("last-modified", headers.GetLastModifiedString(endpoint.lastUpdated))

	totalWritten := 0
	for totalWritten < len(subsystemsRaw) {
		written, err := writter.Write(subsystemsRaw[totalWritten:])
		totalWritten += written
		if err != nil {
			log.Error().Stack().Err(err).Msg("write")
			writter.WriteHeader(http.StatusInternalServerError)
			return
		}
	}
}

func (endpoint *Endpoint) post(writter http.ResponseWriter, request *http.Request) {
	defer request.Body.Close()
	log.Debug().Msg("post")

	var updates []TierUpdate
	decoder := json.NewDecoder(request.Body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&updates)
	if err != nil {
		log.Error().Stack().Err(err).Msg("decode body")
		writter.WriteHeader(http.StatusBadRequest)
		return
	}

	newTiers := make([]Tier, len(updates))
	for i, update := range updates {
		newTiers[i] = update.toTier()
	}

	endpoint.lastUpdated = time.Now()
	endpoint.tiers = newTiers
}
