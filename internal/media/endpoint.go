package media

import (
	"fmt"
	"net/http"
)

type Endpoint struct {
	mux *http.ServeMux
}

func NewEndpoint() (Endpoint, error) {
	endpoint := Endpoint{
		mux: http.NewServeMux(),
	}

	membersEndpoint, err := newMembersEndpoint()
	if err != nil {
		return endpoint, err
	}
	endpoint.mux.Handle(fmt.Sprintf("/members/{%s}", MemberNamePathValueTag), membersEndpoint)
	endpoint.mux.Handle("/partners/{partnerName}", newPartnersEndpoint())

	return endpoint, nil
}

func (endpoint *Endpoint) ServeHTTP(writter http.ResponseWriter, request *http.Request) {
	endpoint.mux.ServeHTTP(writter, request)
}
