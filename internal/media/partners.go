package media

import (
	"net/http"
	"path"

	"github.com/rs/zerolog/log"
)

var PartnersFolder = path.Join("media", "partners")

type partnersEndpoint struct {
}

func newPartnersEndpoint() *partnersEndpoint {
	return &partnersEndpoint{}
}

func (endpoint *partnersEndpoint) ServeHTTP(writter http.ResponseWriter, request *http.Request) {
	switch request.Method {
	default:
		log.Warn().Str("method", request.Method).Msg("method not allowed")
		writter.Header().Add("Allow", "")
		http.Error(writter, "", http.StatusMethodNotAllowed)
	}
}
