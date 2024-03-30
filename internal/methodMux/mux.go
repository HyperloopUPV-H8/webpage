package methodMux

import (
	"net/http"
	"strings"
)

type muxOption func(*Mux)

type Mux struct {
	handlers map[string]http.Handler
}

func New(options ...muxOption) Mux {
	methodMux := Mux{
		handlers: make(map[string]http.Handler),
	}

	for _, option := range options {
		option(&methodMux)
	}

	return methodMux
}

func (methodMux Mux) ServeHTTP(writer http.ResponseWriter, request *http.Request) {
	methodHandler, ok := methodMux.handlers[request.Method]
	if !ok {
		methodMux.disallowedMethod(writer, request)
		return
	}

	methodHandler.ServeHTTP(writer, request)
}

func (methodMux Mux) disallowedMethod(writer http.ResponseWriter, _ *http.Request) {
	allowedList := make([]string, 0, len(methodMux.handlers))
	for method := range methodMux.handlers {
		allowedList = append(allowedList, method)
	}

	writer.Header().Add("Allow", strings.ToUpper(strings.Join(allowedList, ", ")))
	http.Error(writer, "", http.StatusMethodNotAllowed)
}
