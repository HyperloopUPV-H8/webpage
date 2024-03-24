package endpoints

import (
	"bytes"
	"encoding/json"
	"net/http"
	"time"

	"github.com/HyperloopUPV-H8/webpage-backend/internal/auth"
	"github.com/HyperloopUPV-H8/webpage-backend/internal/methodMux"
	"github.com/rs/zerolog/log"
)

type jsonEndpoint[T any] struct {
	methodMux.Mux
	lastUpdated time.Time
	data        T
	name        string
}

func NewJSON[T any](name string, data T, authenticator auth.Endpoint) jsonEndpoint[T] {
	endpoint := jsonEndpoint[T]{
		lastUpdated: time.Now(),
		data:        data,
		name:        name,
	}
	endpoint.Mux = methodMux.New(
		methodMux.Get(http.HandlerFunc(endpoint.get)),
		methodMux.Post(authenticator.WithAuth(http.HandlerFunc(endpoint.post))),
		methodMux.Options(http.HandlerFunc(endpoint.options)),
	)
	return endpoint
}

func (endpoint *jsonEndpoint[T]) get(writer http.ResponseWriter, request *http.Request) {
	dataRaw, err := json.Marshal(endpoint.data)
	if err != nil {
		http.Error(writer, "", http.StatusInternalServerError)
		return
	}

	writer.Header().Add("Content-Type", "application/json")
	http.ServeContent(writer, request, endpoint.name, endpoint.lastUpdated, bytes.NewReader(dataRaw))
}

func (endpoint *jsonEndpoint[T]) post(writer http.ResponseWriter, request *http.Request) {
	var newData T
	decoder := json.NewDecoder(request.Body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&newData)
	if err != nil {
		log.Error().Stack().Err(err).Msg("decode body")
		http.Error(writer, "", http.StatusBadRequest)
		return
	}

	endpoint.lastUpdated = time.Now()
	endpoint.data = newData
}

func (endpoint *jsonEndpoint[T]) options(writer http.ResponseWriter, _ *http.Request) {
	writer.Header().Add("Content-Type", "application/json")
}

func (endpoint *jsonEndpoint[T]) GetData() T {
	return endpoint.data
}
