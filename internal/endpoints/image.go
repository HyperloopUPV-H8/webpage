package endpoints

import (
	"fmt"
	"io"
	"io/fs"
	"net/http"
	"os"
	"path"
	"strings"
	"sync"
	"time"

	"github.com/HyperloopUPV-H8/webpage-backend/internal"
	"github.com/HyperloopUPV-H8/webpage-backend/internal/auth"
	"github.com/HyperloopUPV-H8/webpage-backend/internal/methodMux"
	clone "github.com/huandu/go-clone/generic"
	"github.com/rs/zerolog/log"
)

type ImageEndpoint struct {
	methodMux.Mux
	manifest            ImageManifest
	manifestLock        *sync.Mutex
	wildcardPattern     string
	basePath            string
	manifestUpdatedChan chan<- ImageManifest
}

type ImageConfig struct {
	Manifest        ImageManifest
	WildcardPattern string
	BasePath        string
}

func NewImage(config ImageConfig, authenticator *auth.Endpoint, manifestUpdatedNotifications chan<- ImageManifest) (*ImageEndpoint, error) {
	endpoint := &ImageEndpoint{
		manifest:            config.Manifest,
		manifestLock:        new(sync.Mutex),
		wildcardPattern:     config.WildcardPattern,
		basePath:            config.BasePath,
		manifestUpdatedChan: manifestUpdatedNotifications,
	}

	endpoint.Mux = methodMux.New(
		methodMux.Get(http.HandlerFunc(endpoint.get)),
		methodMux.Post(authenticator.WithAuth(http.HandlerFunc(endpoint.post))),
		methodMux.Options(http.HandlerFunc(endpoint.options)),
	)

	return endpoint, os.MkdirAll(config.BasePath, fs.ModePerm)
}

func (endpoint *ImageEndpoint) get(writer http.ResponseWriter, request *http.Request) {
	log.Debug().Msg("get")
	writer.Header().Add("Access-Control-Allow-Origin", "*")

	imageName := internal.FormatName(request.PathValue(endpoint.wildcardPattern))

	contentType, lastModified, ok := func() (string, time.Time, bool) {
		endpoint.manifestLock.Lock()
		defer endpoint.manifestLock.Unlock()
		manifest, ok := endpoint.manifest[imageName]
		if !ok {
			return "", time.Time{}, ok
		}
		return manifest.ContentType, manifest.LastModified, ok
	}()
	if !ok {
		http.Error(writer, fmt.Sprintf("image \"%s\" not found", imageName), http.StatusNotFound)
		return
	}

	file, err := os.Open(path.Join(endpoint.basePath, imageName))
	if err != nil {
		http.Error(writer, fmt.Sprintf("image for \"%s\" not found", imageName), http.StatusNotFound)
		return
	}
	defer file.Close()

	writer.Header().Add("Content-Type", contentType)
	http.ServeContent(writer, request, imageName, lastModified, file)
}

func (endpoint *ImageEndpoint) post(writer http.ResponseWriter, request *http.Request) {
	log.Debug().Msg("post")
	writer.Header().Add("Access-Control-Allow-Origin", "*")

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

	endpoint.manifestLock.Lock()
	defer endpoint.manifestLock.Unlock()
	endpoint.manifest[imageName] = metadata
	endpoint.manifestUpdatedChan <- clone.Clone(endpoint.manifest)
}

// func (endpoint *ImageEndpoint) delete(writer http.ResponseWriter, request *http.Request) {
// 	writer.Header().Add("Access-Control-Allow-Origin", "*")

// 	imageName := internal.FormatName(request.PathValue(endpoint.wildcardPattern))

// 	_, ok := endpoint.manifest[imageName]
// 	if !ok {
// 		http.Error(writer, fmt.Sprintf("member \"%s\" not found", imageName), http.StatusNotFound)
// 		return
// 	}

// 	err := os.Remove(path.Join(endpoint.basePath, imageName))
// 	if err != nil {
// 		http.Error(writer, "failed to delete file from system", http.StatusInternalServerError)
// 		return
// 	}

// 	delete(endpoint.manifest, imageName)
// }

func (endpoint *ImageEndpoint) options(writer http.ResponseWriter, request *http.Request) {
	log.Debug().Msg("options")

	writer.Header().Add("Access-Control-Allow-Origin", "*")
	writer.Header().Add("Access-Control-Allow-Headers", "Authorization,Content-Type")

	imageName := internal.FormatName(request.PathValue(endpoint.wildcardPattern))

	contentType, ok := func() (string, bool) {
		endpoint.manifestLock.Lock()
		defer endpoint.manifestLock.Unlock()
		metadata, ok := endpoint.manifest[imageName]
		if !ok {
			return "", ok
		}
		return metadata.ContentType, ok
	}()
	if !ok {
		return
	}
	writer.Header().Add("Content-Type", contentType)
}

type ImageManifest map[string]ImageMetadata

type ImageMetadata struct {
	Name         string    `json:"name"`
	ContentType  string    `json:"contentType"`
	LastModified time.Time `json:"lastModified"`
}
