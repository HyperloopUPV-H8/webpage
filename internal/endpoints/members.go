package endpoints

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/HyperloopUPV-H8/webpage-backend/internal/members"
	"github.com/HyperloopUPV-H8/webpage-backend/pkg/http/headers"
	"github.com/rs/zerolog/log"
)

var _ http.Handler = &Members{}

const MemberMediaFolder = "/media/members"

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
	case http.MethodPost:
		endpoint.post(writter, request)
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

func (endpoint *Members) post(writter http.ResponseWriter, request *http.Request) {
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

	newSubsystems := make([]members.Subsystem, len(updates))
	for i, update := range updates {
		newSubsystems[i] = update.toSubsystem()
	}

	endpoint.lastUpdated = time.Now()
	endpoint.subsystems = newSubsystems
}

type SubsystemUpdate struct {
	Name    string         `json:"name"`
	Members []MemberUpdate `json:"members"`
}

func (update SubsystemUpdate) toSubsystem() members.Subsystem {
	newMembers := make([]members.Member, len(update.Members))
	for i, memberUpdate := range update.Members {
		newMembers[i] = memberUpdate.toMember()
	}
	return members.Subsystem{
		Name:    update.Name,
		Members: newMembers,
	}
}

type MemberUpdate struct {
	Name       string `json:"name"`
	Role       string `json:"role"`
	SocialsURL string `json:"socialsURL"`
}

func (update MemberUpdate) toMember() members.Member {
	return members.Member{
		Name:       update.Name,
		ImageURL:   getImagePath(update.Name),
		Role:       update.Role,
		SocialsURL: update.SocialsURL,
	}
}

func getImagePath(name string) string {
	return fmt.Sprintf("%s/%s.webp", MemberMediaFolder, formatName(name))
}

func formatName(name string) string {
	return strings.Join(strings.Split(strings.ToLower(name), " "), "_")
}
