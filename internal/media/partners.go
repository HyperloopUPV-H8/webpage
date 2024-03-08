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

var PartnersFolder = path.Join("media", "partners")

const PartnerNamePathValueTag = "partnerName"

type partnersEndpoint struct {
	methodMux.Mux
	manifest Manifest
}

func newPartnersEndpoint() (partnersEndpoint, error) {
	endpoint := partnersEndpoint{
		manifest: make(Manifest),
	}
	endpoint.Mux = methodMux.New(
		methodMux.Get(http.HandlerFunc(endpoint.get)),
		methodMux.Post(http.HandlerFunc(endpoint.post)),
		methodMux.Options(http.HandlerFunc(endpoint.options)),
	)
	return endpoint, os.MkdirAll(PartnersFolder, fs.ModePerm)
}

func (endpoint *partnersEndpoint) options(writer http.ResponseWriter, request *http.Request) {
	log.Debug().Msg("options")

	partnerName := internal.FormatName(request.PathValue(PartnerNamePathValueTag))

	metadata, ok := endpoint.manifest[partnerName]
	if !ok {
		http.Error(writer, fmt.Sprintf("partner \"%s\" not found", partnerName), http.StatusNotFound)
		return
	}
	writer.Header().Add("Content-Type", metadata.ContentType)
}

func (endpoint *partnersEndpoint) get(writer http.ResponseWriter, request *http.Request) {
	log.Debug().Msg("get")

	partnerName := internal.FormatName(request.PathValue(PartnerNamePathValueTag))

	metadata, ok := endpoint.manifest[partnerName]
	if !ok {
		http.Error(writer, fmt.Sprintf("partner \"%s\" not found", partnerName), http.StatusNotFound)
		return
	}

	file, err := os.Open(path.Join(PartnersFolder, partnerName))
	if err != nil {
		http.Error(writer, fmt.Sprintf("image for \"%s\" not found", partnerName), http.StatusNotFound)
		return
	}
	defer file.Close()

	writer.Header().Add("Content-Type", metadata.ContentType)
	http.ServeContent(writer, request, partnerName, metadata.LastModified, file)
}

func (endpoint *partnersEndpoint) post(writer http.ResponseWriter, request *http.Request) {
	log.Debug().Msg("post")

	partnerName := internal.FormatName(request.PathValue(PartnerNamePathValueTag))

	contentType := request.Header.Get("Content-Type")
	if !strings.HasPrefix(contentType, "image/") {
		http.Error(writer, "bad content type", http.StatusBadRequest)
		return
	}

	file, err := os.Create(path.Join(PartnersFolder, partnerName))
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
		Name:         partnerName,
		ContentType:  contentType,
		LastModified: time.Now(),
	}

	endpoint.manifest[partnerName] = metadata
}
