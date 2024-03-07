package media

import (
	"net/http"
)

type Endpoint struct {
	mux *http.ServeMux
}

func NewEndpoint() Endpoint {
	endpoint := Endpoint{
		mux: http.NewServeMux(),
	}

	endpoint.mux.Handle("/members/{memberName}", newMembersEndpoint())
	endpoint.mux.Handle("/partners/{partnerName}", newPartnersEndpoint())

	return endpoint
}

func (endpoint *Endpoint) ServeHTTP(writter http.ResponseWriter, request *http.Request) {
	endpoint.mux.ServeHTTP(writter, request)
}
