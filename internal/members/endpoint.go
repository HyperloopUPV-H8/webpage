package members

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/HyperloopUPV-H8/webpage-backend/pkg/http/headers"
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

	subsystemsRaw, err := json.Marshal(endpoint.subsystems)
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

	var updates []SubsystemUpdate
	decoder := json.NewDecoder(request.Body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&updates)
	if err != nil {
		log.Error().Stack().Err(err).Msg("decode body")
		writter.WriteHeader(http.StatusBadRequest)
		return
	}

	newSubsystems := make([]Subsystem, len(updates))
	for i, update := range updates {
		newSubsystems[i] = update.toSubsystem()
	}

	endpoint.lastUpdated = time.Now()
	endpoint.subsystems = newSubsystems
}
