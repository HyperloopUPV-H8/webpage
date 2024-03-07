package media

import (
	"net/http"
	"path"

	"github.com/rs/zerolog/log"
)

var MembersFolder = path.Join("media", "members")

type membersEndpoint struct {
}

func newMembersEndpoint() *membersEndpoint {
	return &membersEndpoint{}
}

func (endpoint *membersEndpoint) ServeHTTP(writter http.ResponseWriter, request *http.Request) {
	switch request.Method {
	default:
		log.Warn().Str("method", request.Method).Msg("method not allowed")
		writter.Header().Add("Allow", "")
		http.Error(writter, "", http.StatusMethodNotAllowed)
	}
}
