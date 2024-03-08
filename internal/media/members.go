package media

import (
	"fmt"
	"net/http"
	"path"

	"github.com/HyperloopUPV-H8/webpage-backend/internal"
	"github.com/rs/zerolog/log"
)

var MembersFolder = path.Join("media", "members")

type membersEndpoint struct {
	manifest Manifest
}

func newMembersEndpoint() *membersEndpoint {
	return &membersEndpoint{}
}

func (endpoint *membersEndpoint) ServeHTTP(writter http.ResponseWriter, request *http.Request) {
	switch request.Method {
	case http.MethodOptions:
		endpoint.options(writter, request)
	default:
		log.Warn().Str("method", request.Method).Msg("method not allowed")
		writter.Header().Add("Allow", "")
		http.Error(writter, "", http.StatusMethodNotAllowed)
	}
}

func (endpoint *membersEndpoint) options(writter http.ResponseWriter, request *http.Request) {
	memberName := internal.FormatName(request.PathValue("memberName"))

	metadata, ok := endpoint.manifest[memberName]
	if !ok {
		http.Error(writter, fmt.Sprintf("member \"%s\" not found", memberName), http.StatusNotFound)
		return
	}
	writter.Header().Add("Content-Type", metadata.ContentType)
}
