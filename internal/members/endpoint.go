package members

import (
	"bytes"
	"encoding/json"
	"net/http"
	"time"

	"github.com/HyperloopUPV-H8/webpage-backend/internal/methodMux"
	"github.com/rs/zerolog/log"
)

var _ http.Handler = &Endpoint{}

const MembersMediaFolder = "/media/members"

type Endpoint struct {
	methodMux.Mux
	lastUpdated time.Time
	subsystems  []Subsystem
}

func NewEndpoint(subsystems []Subsystem) Endpoint {
	endpoint := Endpoint{
		lastUpdated: time.Now(),
		subsystems:  subsystems,
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

	subsystemsRaw, err := json.Marshal(endpoint.subsystems)
	if err != nil {
		log.Error().Stack().Err(err).Msg("marshal subsystems")
		http.Error(writer, "", http.StatusInternalServerError)
		return
	}

	writer.Header().Add("Content-Type", "application/json")
	http.ServeContent(writer, request, "members.json", endpoint.lastUpdated, bytes.NewReader(subsystemsRaw))
}

func (endpoint *Endpoint) post(writer http.ResponseWriter, request *http.Request) {
	log.Debug().Msg("post")

	var updates []SubsystemUpdate
	decoder := json.NewDecoder(request.Body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&updates)
	if err != nil {
		log.Error().Stack().Err(err).Msg("decode body")
		http.Error(writer, "", http.StatusBadRequest)
		return
	}

	endpoint.lastUpdated = time.Now()
	endpoint.subsystems = SubsystemsFromUpdates(updates)
}
