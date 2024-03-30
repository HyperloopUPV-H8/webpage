package auth

import "net/http"

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
