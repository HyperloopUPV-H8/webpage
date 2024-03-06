package endpoints

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/HyperloopUPV-H8/webpage-backend/internal/members"
	"github.com/HyperloopUPV-H8/webpage-backend/pkg/http/headers"
	"github.com/rs/zerolog/log"
)

var _ http.Handler = &Members{}

type Members struct {
	lastUpdated time.Time
	subsystems  []members.Subsystem
}

func NewMembers(subsystems []members.Subsystem) Members {
	return Members{
		lastUpdated: time.Now(),
		subsystems:  subsystems,
	}
}

func (endpoint *Members) ServeHTTP(writter http.ResponseWriter, request *http.Request) {
	switch request.Method {
	case http.MethodGet:
		endpoint.get(writter, request)
	default:
		log.Warn().Str("method", request.Method).Msg("method not allowed")
		request.Body.Close()
		writter.WriteHeader(http.StatusMethodNotAllowed)
	}
}

func (endpoint *Members) get(writter http.ResponseWriter, request *http.Request) {
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
