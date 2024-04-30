package methodMux

import (
	"net/http"
)

func HandleMethod(method string, handler http.Handler) muxOption {
	return func(methodMux *Mux) {
		methodMux.handlers[method] = handler
	}
}

func Get(handler http.Handler) muxOption {
	return HandleMethod(http.MethodGet, handler)
}

func Head(handler http.Handler) muxOption {
	return HandleMethod(http.MethodHead, handler)
}

func Post(handler http.Handler) muxOption {
	return HandleMethod(http.MethodPost, handler)
}

func Put(handler http.Handler) muxOption {
	return HandleMethod(http.MethodPut, handler)
}

func Delete(handler http.Handler) muxOption {
	return HandleMethod(http.MethodDelete, handler)
}

func Connect(handler http.Handler) muxOption {
	return HandleMethod(http.MethodConnect, handler)
}

func Options(handler http.Handler) muxOption {
	return HandleMethod(http.MethodOptions, handler)
}

func Trace(handler http.Handler) muxOption {
	return HandleMethod(http.MethodTrace, handler)
}

func Patch(handler http.Handler) muxOption {
	return HandleMethod(http.MethodPatch, handler)
}
