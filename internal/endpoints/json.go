package endpoints

import (
	"bytes"
	"encoding/json"
	"net/http"
	"sync"
	"time"

	"github.com/HyperloopUPV-H8/webpage-backend/internal/auth"
	"github.com/HyperloopUPV-H8/webpage-backend/internal/methodMux"
	clone "github.com/huandu/go-clone/generic"
	"github.com/rs/zerolog/log"
)

type JsonEndpoint[T any] struct {
	methodMux.Mux
	lastUpdated     time.Time
	data            T
	dataLock        *sync.Mutex
	name            string
	dataUpdatedChan chan<- T
}

func NewJSON[T any](name string, data T, authenticator *auth.Endpoint, dataUpdatedNotifications chan<- T) *JsonEndpoint[T] {
	endpoint := &JsonEndpoint[T]{
		lastUpdated:     time.Now(),
		data:            data,
		dataLock:        new(sync.Mutex),
		name:            name,
		dataUpdatedChan: dataUpdatedNotifications,
	}
	endpoint.Mux = methodMux.New(
		methodMux.Get(http.HandlerFunc(endpoint.get)),
		methodMux.Post(authenticator.WithAuth(http.HandlerFunc(endpoint.post))),
		methodMux.Options(http.HandlerFunc(endpoint.options)),
	)
	return endpoint
}

func (endpoint *JsonEndpoint[T]) get(writer http.ResponseWriter, request *http.Request) {
	writer.Header().Add("Access-Control-Allow-Origin", "*")

	dataRaw, err := func() ([]byte, error) {
		endpoint.dataLock.Lock()
		defer endpoint.dataLock.Unlock()
		return json.Marshal(endpoint.data)
	}()
	if err != nil {
		http.Error(writer, "", http.StatusInternalServerError)
		return
	}

	writer.Header().Add("Content-Type", "application/json")
	http.ServeContent(writer, request, endpoint.name, endpoint.lastUpdated, bytes.NewReader(dataRaw))
}

func (endpoint *JsonEndpoint[T]) post(writer http.ResponseWriter, request *http.Request) {
	writer.Header().Add("Access-Control-Allow-Origin", "*")

	var newData T
	decoder := json.NewDecoder(request.Body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&newData)
	if err != nil {
		log.Error().Stack().Err(err).Msg("decode body")
		http.Error(writer, "", http.StatusBadRequest)
		return
	}

	endpoint.dataLock.Lock()
	defer endpoint.dataLock.Unlock()
	endpoint.lastUpdated = time.Now()
	endpoint.data = newData
	endpoint.dataUpdatedChan <- clone.Clone(endpoint.data)
}

func (endpoint *JsonEndpoint[T]) options(writer http.ResponseWriter, _ *http.Request) {
	writer.Header().Add("Access-Control-Allow-Origin", "*")
	writer.Header().Add("Access-Control-Allow-Headers", "Authorization")
	writer.Header().Add("Content-Type", "application/json")
}
