package members

import (
	"bytes"
	"encoding/json"
	"net/http"
	"time"

	"github.com/rs/zerolog/log"
)

var _ http.Handler = &Endpoint{}

const MemberMediaFolder = "/media/members"

type Endpoint struct {
	lastUpdated time.Time
	subsystems  []Subsystem
}

func NewEndpoint(subsystems []Subsystem) Endpoint {
	return Endpoint{
		lastUpdated: time.Now(),
		subsystems:  subsystems,
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
		writter.Header().Add("Allow", "GET, POST, OPTIONS")
		http.Error(writter, "", http.StatusMethodNotAllowed)
	}
}

func (endpoint *Endpoint) options(writter http.ResponseWriter, _ *http.Request) {
	log.Debug().Msg("options")

	writter.Header().Add("Content-Type", "application/json")
}

func (endpoint *Endpoint) get(writter http.ResponseWriter, request *http.Request) {
	log.Debug().Msg("get")

	subsystemsRaw, err := json.Marshal(endpoint.subsystems)
	if err != nil {
		log.Error().Stack().Err(err).Msg("marshal subsystems")
		http.Error(writter, "", http.StatusInternalServerError)
		return
	}

	http.ServeContent(writter, request, "members.json", endpoint.lastUpdated, bytes.NewReader(subsystemsRaw))
}

func (endpoint *Endpoint) post(writter http.ResponseWriter, request *http.Request) {
	log.Debug().Msg("post")

	var updates []SubsystemUpdate
	decoder := json.NewDecoder(request.Body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&updates)
	if err != nil {
		log.Error().Stack().Err(err).Msg("decode body")
		http.Error(writter, "", http.StatusBadRequest)
		return
	}

	endpoint.lastUpdated = time.Now()
	endpoint.subsystems = SubsystemsFromUpdates(updates)
}
