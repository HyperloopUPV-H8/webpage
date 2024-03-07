package partners

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/HyperloopUPV-H8/webpage-backend/pkg/http/headers"
	"github.com/rs/zerolog/log"
)

var _ http.Handler = &Endpoint{}

const PartnerMediaFolder = "/media/partners"

type Endpoint struct {
	lastUpdated time.Time
	tiers       []Tier
}

func NewEndpoint(tiers []Tier) Endpoint {
	return Endpoint{
		lastUpdated: time.Now(),
		tiers:       tiers,
	}
}

func (endpoint *Endpoint) ServeHTTP(writter http.ResponseWriter, request *http.Request) {
	switch request.Method {
	case http.MethodGet:
		endpoint.get(writter, request)
	case http.MethodPost:
		endpoint.post(writter, request)
	default:
		log.Warn().Str("method", request.Method).Msg("method not allowed")
		request.Body.Close()
		writter.WriteHeader(http.StatusMethodNotAllowed)
	}
}

func (endpoint *Endpoint) get(writter http.ResponseWriter, request *http.Request) {
	defer request.Body.Close()
	log.Debug().Msg("get")

	subsystemsRaw, err := json.Marshal(endpoint.tiers)
	if err != nil {
		log.Error().Stack().Err(err).Msg("marshal subsystems")
		writter.WriteHeader(http.StatusInternalServerError)
		return
	}

	writter.Header().Add("last-modified", headers.GetLastModifiedString(endpoint.lastUpdated))

	totalWritten := 0
	for totalWritten < len(subsystemsRaw) {
		written, err := writter.Write(subsystemsRaw[totalWritten:])
		totalWritten += written
		if err != nil {
			log.Error().Stack().Err(err).Msg("write")
			writter.WriteHeader(http.StatusInternalServerError)
			return
		}
	}
}

func (endpoint *Endpoint) post(writter http.ResponseWriter, request *http.Request) {
	defer request.Body.Close()
	log.Debug().Msg("post")

	var updates []TierUpdate
	decoder := json.NewDecoder(request.Body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&updates)
	if err != nil {
		log.Error().Stack().Err(err).Msg("decode body")
		writter.WriteHeader(http.StatusBadRequest)
		return
	}

	newTiers := make([]Tier, len(updates))
	for i, update := range updates {
		newTiers[i] = update.toTier()
	}

	endpoint.lastUpdated = time.Now()
	endpoint.tiers = newTiers
}

type TierUpdate struct {
	Name     string          `json:"name"`
	Partners []PartnerUpdate `json:"partners"`
	Style    TierStyleUpdate `json:"style"`
}

func (update TierUpdate) toTier() Tier {
	newPartners := make([]Partner, len(update.Partners))
	for i, memberUpdate := range update.Partners {
		newPartners[i] = memberUpdate.toPartner()
	}
	return Tier{
		Name:     update.Name,
		Partners: newPartners,
		Style:    update.Style.toTierStyle(),
	}
}

type PartnerUpdate struct {
	Name       string     `json:"name"`
	Logo       LogoUpdate `json:"logo"`
	WebpageURL string     `json:"webpageURL"`
}

func (update PartnerUpdate) toPartner() Partner {
	return Partner{
		Name:       update.Name,
		Logo:       update.Logo.toLogo(update.Name),
		WebpageURL: update.WebpageURL,
	}
}

type LogoUpdate struct {
	Width  *string `json:"width,omitempty"`
	Height *string `json:"height,omitempty"`
}

func (update LogoUpdate) toLogo(name string) Logo {
	return Logo{
		URL:    getLogoImagePath(name),
		Width:  update.Width,
		Height: update.Height,
	}
}

func getLogoImagePath(name string) string {
	return fmt.Sprintf("%s/%s.svg", PartnerMediaFolder, formatPartnerName(name))
}

func formatPartnerName(name string) string {
	return strings.Join(strings.Split(strings.ToLower(name), " "), "_")
}

type TierStyleUpdate struct {
	Color string `json:"color"`
	Width string `json:"width"`
}

func (update TierStyleUpdate) toTierStyle() TierStyle {
	return TierStyle(update)
}
