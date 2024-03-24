package auth

import (
	"bytes"
	"encoding/json"
	"net/http"
	"time"

	"github.com/HyperloopUPV-H8/webpage-backend/internal/methodMux"
	"github.com/rs/zerolog/log"
)

type Endpoint struct {
	mux         *http.ServeMux
	lastUpdated time.Time
	users       UserMap
}

func NewEndpoint(users UserList) Endpoint {
	endpoint := Endpoint{
		mux:         http.NewServeMux(),
		lastUpdated: time.Now(),
		users:       mapFromList(users),
	}

	endpoint.mux.Handle("/auth/verify", http.HandlerFunc(endpoint.verifyUser))
	endpoint.mux.Handle("/auth", methodMux.New(
		methodMux.Get(endpoint.WithAdminAuth(http.HandlerFunc(endpoint.get))),
		methodMux.Post(endpoint.WithAdminAuth(http.HandlerFunc(endpoint.post))),
		methodMux.Options(endpoint.WithAdminAuth(http.HandlerFunc(endpoint.options))),
	))

	return endpoint
}

type userType string

const (
	BasicUser   userType = "basic"
	ManagerUser userType = "manager"
	AdminUser   userType = "admin"
)

func (endpoint *Endpoint) verifyUser(writer http.ResponseWriter, request *http.Request) {
	username, password, ok := request.BasicAuth()
	if !ok {
		writer.Header().Add("WWW-Authenticate", "Basic")
		http.Error(writer, "missing auth header", http.StatusUnauthorized)
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

func (endpoint *Endpoint) get(writer http.ResponseWriter, request *http.Request) {
	dataRaw, err := json.Marshal(endpoint.users)
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

	endpoint.lastUpdated = time.Now()
	endpoint.users = newUsers
}

func (endpoint *Endpoint) options(writer http.ResponseWriter, _ *http.Request) {
	writer.Header().Add("Content-Type", "application/json")
}

func (endpoint *Endpoint) WithAdminAuth(base http.Handler) http.Handler {
	return http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
		username, password, ok := request.BasicAuth()
		if !ok {
			writer.Header().Add("WWW-Authenticate", "Basic")
			http.Error(writer, "", http.StatusUnauthorized)
			return
		}

		if !endpoint.verifyAdmin(username, password) {
			http.Error(writer, "", http.StatusUnauthorized)
			return
		}

		base.ServeHTTP(writer, request)
	})
}

func (endpoint *Endpoint) WithAuth(base http.Handler) http.Handler {
	return http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
		username, password, ok := request.BasicAuth()
		if !ok {
			writer.Header().Add("WWW-Authenticate", "Basic")
			http.Error(writer, "", http.StatusUnauthorized)
			return
		}

		if endpoint.verifyAdmin(username, password) {
			base.ServeHTTP(writer, request)
			return
		}

		if !endpoint.verifyManager(username, password) {
			http.Error(writer, "", http.StatusUnauthorized)
			return
		}

		base.ServeHTTP(writer, request)
	})
}

func (endpoint *Endpoint) verifyAdmin(username, password string) bool {
	user, ok := endpoint.users.Admins[username]
	return ok && user.matches(username, password)
}

func (endpoint *Endpoint) verifyManager(username, password string) bool {
	user, ok := endpoint.users.Managers[username]
	return ok && user.matches(username, password)
}
