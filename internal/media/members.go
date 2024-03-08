package media

import (
	"fmt"
	"io"
	"io/fs"
	"net/http"
	"os"
	"path"
	"strings"
	"time"

	"github.com/HyperloopUPV-H8/webpage-backend/internal"
	"github.com/HyperloopUPV-H8/webpage-backend/internal/methodMux"
	"github.com/rs/zerolog/log"
)

var MembersFolder = path.Join("media", "members")

const MemberNamePathValueTag = "memberName"

type membersEndpoint struct {
	methodMux.Mux
	manifest Manifest
}

func newMembersEndpoint() (membersEndpoint, error) {
	endpoint := membersEndpoint{
		manifest: make(Manifest),
	}
	endpoint.Mux = methodMux.New(
		methodMux.Get(http.HandlerFunc(endpoint.get)),
		methodMux.Post(http.HandlerFunc(endpoint.post)),
		methodMux.Options(http.HandlerFunc(endpoint.options)),
	)
	return endpoint, os.MkdirAll(MembersFolder, fs.ModePerm)
}

func (endpoint *membersEndpoint) options(writer http.ResponseWriter, request *http.Request) {
	log.Debug().Msg("options")

	memberName := internal.FormatName(request.PathValue(MemberNamePathValueTag))

	metadata, ok := endpoint.manifest[memberName]
	if !ok {
		http.Error(writer, fmt.Sprintf("member \"%s\" not found", memberName), http.StatusNotFound)
		return
	}
	writer.Header().Add("Content-Type", metadata.ContentType)
}

func (endpoint *membersEndpoint) get(writer http.ResponseWriter, request *http.Request) {
	log.Debug().Msg("get")

	memberName := internal.FormatName(request.PathValue(MemberNamePathValueTag))

	metadata, ok := endpoint.manifest[memberName]
	if !ok {
		http.Error(writer, fmt.Sprintf("member \"%s\" not found", memberName), http.StatusNotFound)
		return
	}

	file, err := os.Open(path.Join(MembersFolder, memberName))
	if err != nil {
		http.Error(writer, fmt.Sprintf("image for \"%s\" not found", memberName), http.StatusNotFound)
		return
	}
	defer file.Close()

	writer.Header().Add("Content-Type", metadata.ContentType)
	http.ServeContent(writer, request, memberName, metadata.LastModified, file)
}

func (endpoint *membersEndpoint) post(writer http.ResponseWriter, request *http.Request) {
	log.Debug().Msg("post")

	memberName := internal.FormatName(request.PathValue(MemberNamePathValueTag))

	contentType := request.Header.Get("Content-Type")
	if !strings.HasPrefix(contentType, "image/") {
		http.Error(writer, "bad content type", http.StatusBadRequest)
		return
	}

	file, err := os.Create(path.Join(MembersFolder, memberName))
	if err != nil {
		http.Error(writer, "", http.StatusInternalServerError)
		return
	}
	defer file.Close()

	_, err = io.Copy(file, request.Body)
	if err != nil {
		http.Error(writer, "", http.StatusInternalServerError)
		return
	}

	metadata := ImageMetadata{
		Name:         memberName,
		ContentType:  contentType,
		LastModified: time.Now(),
	}

	endpoint.manifest[memberName] = metadata
}
