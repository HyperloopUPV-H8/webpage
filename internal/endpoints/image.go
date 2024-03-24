package endpoints

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
	"github.com/HyperloopUPV-H8/webpage-backend/internal/auth"
	"github.com/HyperloopUPV-H8/webpage-backend/internal/methodMux"
	"github.com/rs/zerolog/log"
)

type imageEndpoint struct {
	methodMux.Mux
	manifest        Manifest
	wildcardPattern string
	basePath        string
}

type ImageConfig struct {
	Manifest        Manifest
	WildcardPattern string
	BasePath        string
}

func NewImage(config ImageConfig, authenticator auth.Endpoint) (imageEndpoint, error) {
	endpoint := imageEndpoint{
		manifest:        config.Manifest,
		wildcardPattern: config.WildcardPattern,
		basePath:        config.BasePath,
	}

	endpoint.Mux = methodMux.New(
		methodMux.Get(http.HandlerFunc(endpoint.get)),
		methodMux.Post(authenticator.WithAuth(http.HandlerFunc(endpoint.post))),
		methodMux.Delete(authenticator.WithAuth(http.HandlerFunc(endpoint.delete))),
		methodMux.Options(http.HandlerFunc(endpoint.options)),
	)

	return endpoint, os.MkdirAll(config.BasePath, fs.ModePerm)
}

func (endpoint *imageEndpoint) get(writer http.ResponseWriter, request *http.Request) {
	log.Debug().Msg("get")

	imageName := internal.FormatName(request.PathValue(endpoint.wildcardPattern))

	metadata, ok := endpoint.manifest[imageName]
	if !ok {
		http.Error(writer, fmt.Sprintf("member \"%s\" not found", imageName), http.StatusNotFound)
		return
	}

	file, err := os.Open(path.Join(endpoint.basePath, imageName))
	if err != nil {
		http.Error(writer, fmt.Sprintf("image for \"%s\" not found", imageName), http.StatusNotFound)
		return
	}
	defer file.Close()

	writer.Header().Add("Content-Type", metadata.ContentType)
	http.ServeContent(writer, request, imageName, metadata.LastModified, file)
}

func (endpoint *imageEndpoint) post(writer http.ResponseWriter, request *http.Request) {
	log.Debug().Msg("post")

	imageName := internal.FormatName(request.PathValue(endpoint.wildcardPattern))

	contentType := request.Header.Get("Content-Type")
	if !strings.HasPrefix(contentType, "image/") {
		http.Error(writer, "bad content type", http.StatusBadRequest)
		return
	}

	file, err := os.Create(path.Join(endpoint.basePath, imageName))
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
		Name:         imageName,
		ContentType:  contentType,
		LastModified: time.Now(),
	}

	endpoint.manifest[imageName] = metadata
}

func (endpoint *imageEndpoint) delete(writer http.ResponseWriter, request *http.Request) {
	imageName := internal.FormatName(request.PathValue(endpoint.wildcardPattern))

	_, ok := endpoint.manifest[imageName]
	if !ok {
		http.Error(writer, fmt.Sprintf("member \"%s\" not found", imageName), http.StatusNotFound)
		return
	}

	err := os.Remove(path.Join(endpoint.basePath, imageName))
	if err != nil {
		http.Error(writer, "failed to delete file from system", http.StatusInternalServerError)
		return
	}

	delete(endpoint.manifest, imageName)
}

func (endpoint *imageEndpoint) options(writer http.ResponseWriter, request *http.Request) {
	log.Debug().Msg("options")

	imageName := internal.FormatName(request.PathValue(endpoint.wildcardPattern))

	metadata, ok := endpoint.manifest[imageName]
	if !ok {
		http.Error(writer, fmt.Sprintf("member \"%s\" not found", imageName), http.StatusNotFound)
		return
	}
	writer.Header().Add("Content-Type", metadata.ContentType)
}

type Manifest map[string]ImageMetadata

type ImageMetadata struct {
	Name         string    `json:"name"`
	ContentType  string    `json:"contentType"`
	LastModified time.Time `json:"lastModified"`
}

func (endpoint *imageEndpoint) GetManifest() Manifest {
	return endpoint.manifest
}
