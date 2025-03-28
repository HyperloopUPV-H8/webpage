package auth

import (
	"bytes"
	"encoding/json"
	"net/http"
	"sync"
	"time"

	"github.com/HyperloopUPV-H8/webpage-backend/internal/methodMux"
	clone "github.com/huandu/go-clone/generic"
	"github.com/rs/zerolog/log"
)

type Endpoint struct {
	mux              *http.ServeMux
	lastUpdated      time.Time
	users            UserMap
	usersLock        *sync.Mutex
	usersUpdatedChan chan<- UserList
}

func NewEndpoint(users UserList, usersUpdatedNotification chan<- UserList) *Endpoint {
	endpoint := &Endpoint{
		mux:              http.NewServeMux(),
		lastUpdated:      time.Now(),
		users:            mapFromList(users),
		usersUpdatedChan: usersUpdatedNotification,
	}

	endpoint.mux.Handle("/verify", http.HandlerFunc(endpoint.verifyUser))
	endpoint.mux.Handle("/", methodMux.New(
		methodMux.Get(endpoint.WithAdminAuth(http.HandlerFunc(endpoint.get))),
		methodMux.Post(endpoint.WithAdminAuth(http.HandlerFunc(endpoint.post))),
		methodMux.Options(endpoint.WithAdminAuth(http.HandlerFunc(endpoint.options))),
	))

	return endpoint
}

func (endpoint *Endpoint) get(writer http.ResponseWriter, request *http.Request) {
	dataRaw, err := func() ([]byte, error) {
		endpoint.usersLock.Lock()
		defer endpoint.usersLock.Unlock()
		return json.Marshal(endpoint.users)
	}()
	if err != nil {
		http.Error(writer, "", http.StatusInternalServerError)
		return
	}

	writer.Header().Add("Content-Type", "application/json")
	http.ServeContent(writer, request, "users", endpoint.lastUpdated, bytes.NewReader(dataRaw))
}

func (endpoint *Endpoint) post(writer http.ResponseWriter, request *http.Request) {
	var newUsers UserMap
	decoder := json.NewDecoder(request.Body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&newUsers)
	if err != nil {
		log.Error().Stack().Err(err).Msg("decode body")
		http.Error(writer, "", http.StatusBadRequest)
		return
	}

	endpoint.usersLock.Lock()
	defer endpoint.usersLock.Unlock()
	endpoint.lastUpdated = time.Now()
	endpoint.users = newUsers
	endpoint.usersUpdatedChan <- clone.Clone(listFromMap(endpoint.users))
}

func (endpoint *Endpoint) options(writer http.ResponseWriter, _ *http.Request) {
	writer.Header().Add("Content-Type", "application/json")
}

type userType string

const (
	BasicUser   userType = "basic"
	ManagerUser userType = "manager"
	AdminUser   userType = "admin"
)

func (endpoint *Endpoint) verifyUser(writer http.ResponseWriter, request *http.Request) {
	writer.Header().Add("Access-Control-Allow-Origin", "*")
	writer.Header().Add("Access-Control-Allow-Headers", "Authorization")

	username, password, ok := request.BasicAuth()
	if !ok {
		notifyUserType(BasicUser, writer)
		return
	}

	if endpoint.verifyAdmin(username, password) {
		notifyUserType(AdminUser, writer)
		return
	}

	if endpoint.verifyManager(username, password) {
		notifyUserType(ManagerUser, writer)
		return
	}

	notifyUserType(BasicUser, writer)
}

func notifyUserType(userType userType, writer http.ResponseWriter) {
	writer.Header().Add("Content-Type", "text/plain")
	_, err := writer.Write([]byte(userType))
	if err != nil {
		http.Error(writer, "", http.StatusInternalServerError)
	}
}

func (endpoint *Endpoint) ServeHTTP(writer http.ResponseWriter, request *http.Request) {
	endpoint.mux.ServeHTTP(writer, request)
}
