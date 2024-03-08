package media

import (
	"fmt"
	"net/http"
	"os"
	"path"

	"github.com/HyperloopUPV-H8/webpage-backend/internal"
	"github.com/rs/zerolog/log"
)

var MembersFolder = path.Join("media", "members")

const MemberNamePathValueTag = "memberName"

type membersEndpoint struct {
	manifest Manifest
}

func newMembersEndpoint() *membersEndpoint {
	return &membersEndpoint{}
}

func (endpoint *membersEndpoint) ServeHTTP(writer http.ResponseWriter, request *http.Request) {
	switch request.Method {
	case http.MethodGet:
		endpoint.get(writer, request)
	case http.MethodOptions:
		endpoint.options(writer, request)
	default:
		log.Warn().Str("method", request.Method).Msg("method not allowed")
		writer.Header().Add("Allow", "OPTIONS, GET")
		http.Error(writer, "", http.StatusMethodNotAllowed)
	}
}

func (endpoint *membersEndpoint) options(writer http.ResponseWriter, request *http.Request) {
	memberName := internal.FormatName(request.PathValue(MemberNamePathValueTag))

	metadata, ok := endpoint.manifest[memberName]
	if !ok {
		http.Error(writer, fmt.Sprintf("member \"%s\" not found", memberName), http.StatusNotFound)
		return
	}
	writer.Header().Add("Content-Type", metadata.ContentType)
}

func (endpoint *membersEndpoint) get(writer http.ResponseWriter, request *http.Request) {
	memberName := internal.FormatName(request.PathValue(MemberNamePathValueTag))

	metadata, ok := endpoint.manifest[memberName]
	if !ok {
		http.Error(writer, fmt.Sprintf("member \"%s\" not found", memberName), http.StatusNotFound)
		return
	}

	file, err := os.Open(path.Join(MembersFolder, memberName))
	if err != nil {
		http.Error(writer, fmt.Sprintf("image for \"%s\" not found", memberName), http.StatusNotFound)
	}

	writer.Header().Add("Content-Type", metadata.ContentType)
	http.ServeContent(writer, request, memberName, metadata.LastModified, file)
}
