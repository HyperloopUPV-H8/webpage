package media

import (
	"fmt"
	"net/http"
	"path"

	"github.com/HyperloopUPV-H8/webpage-backend/internal/auth"
	"github.com/HyperloopUPV-H8/webpage-backend/internal/endpoints"
)

var MembersFolder = path.Join("media", "members")
var PartnersFolder = path.Join("media", "partners")

const MemberNamePathValueTag = "memberName"
const PartnerNamePathValueTag = "partnerName"

type Endpoint struct {
	mux *http.ServeMux
}

func NewEndpoint(membersManifest, partnersManifest endpoints.Manifest, authenticator auth.Endpoint) (Endpoint, error) {
	endpoint := Endpoint{
		mux: http.NewServeMux(),
	}

	membersEndpoint, err := endpoints.NewImage(endpoints.ImageConfig{
		Manifest:        membersManifest,
		BasePath:        MembersFolder,
		WildcardPattern: MemberNamePathValueTag,
	}, authenticator)
	if err != nil {
		return endpoint, err
	}
	endpoint.mux.Handle(fmt.Sprintf("/members/{%s}", MemberNamePathValueTag), membersEndpoint)

	partnersEndpoint, err := endpoints.NewImage(endpoints.ImageConfig{
		Manifest:        partnersManifest,
		BasePath:        PartnersFolder,
		WildcardPattern: PartnerNamePathValueTag,
	}, authenticator)
	if err != nil {
		return endpoint, err
	}
	endpoint.mux.Handle(fmt.Sprintf("/partners/{%s}", PartnerNamePathValueTag), partnersEndpoint)

	return endpoint, nil
}

func (endpoint *Endpoint) ServeHTTP(writter http.ResponseWriter, request *http.Request) {
	endpoint.mux.ServeHTTP(writter, request)
}
