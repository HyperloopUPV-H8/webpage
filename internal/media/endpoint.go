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
	mux              *http.ServeMux
	membersEndpoint  *endpoints.ImageEndpoint
	partnersEndpoint *endpoints.ImageEndpoint
}

func NewEndpoint(membersManifest, partnersManifest endpoints.ImageManifest, authenticator *auth.Endpoint, memberUpdate, partnerUpdate chan<- struct{}) (*Endpoint, error) {
	endpoint := &Endpoint{
		mux: http.NewServeMux(),
	}

	var err error
	endpoint.membersEndpoint, err = endpoints.NewImage(endpoints.ImageConfig{
		Manifest:        membersManifest,
		BasePath:        MembersFolder,
		WildcardPattern: MemberNamePathValueTag,
	}, authenticator, memberUpdate)
	if err != nil {
		return endpoint, err
	}
	endpoint.mux.Handle(fmt.Sprintf("/members/{%s...}", MemberNamePathValueTag), endpoint.membersEndpoint)

	endpoint.partnersEndpoint, err = endpoints.NewImage(endpoints.ImageConfig{
		Manifest:        partnersManifest,
		BasePath:        PartnersFolder,
		WildcardPattern: PartnerNamePathValueTag,
	}, authenticator, partnerUpdate)
	if err != nil {
		return endpoint, err
	}
	endpoint.mux.Handle(fmt.Sprintf("/partners/{%s...}", PartnerNamePathValueTag), endpoint.partnersEndpoint)

	return endpoint, nil
}

func (endpoint *Endpoint) ServeHTTP(writter http.ResponseWriter, request *http.Request) {
	endpoint.mux.ServeHTTP(writter, request)
}

func (endpoint *Endpoint) GetMembersManifest() endpoints.ImageManifest {
	return endpoint.membersEndpoint.GetManifest()
}

func (endpoint *Endpoint) GetPartnersManifest() endpoints.ImageManifest {
	return endpoint.partnersEndpoint.GetManifest()
}
