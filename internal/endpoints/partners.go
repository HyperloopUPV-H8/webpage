package endpoints

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/HyperloopUPV-H8/webpage-backend/internal/partners"
	"github.com/HyperloopUPV-H8/webpage-backend/pkg/http/headers"
	"github.com/rs/zerolog/log"
)

var _ http.Handler = &Partners{}

const PartnerMediaFolder = "/media/partners"

type Partners struct {
	lastUpdated time.Time
	tiers       []partners.Tier
}

func NewPartners(tiers []partners.Tier) Partners {
	return Partners{
		lastUpdated: time.Now(),
		tiers:       tiers,
	}
}

func (endpoint *Partners) ServeHTTP(writter http.ResponseWriter, request *http.Request) {
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

func (endpoint *Partners) get(writter http.ResponseWriter, request *http.Request) {
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

func (endpoint *Partners) post(writter http.ResponseWriter, request *http.Request) {
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

	newTiers := make([]partners.Tier, len(updates))
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

func (update TierUpdate) toTier() partners.Tier {
	newPartners := make([]partners.Partner, len(update.Partners))
	for i, memberUpdate := range update.Partners {
		newPartners[i] = memberUpdate.toPartner()
	}
	return partners.Tier{
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

func (update PartnerUpdate) toPartner() partners.Partner {
	return partners.Partner{
		Name:       update.Name,
		Logo:       update.Logo.toLogo(update.Name),
		WebpageURL: update.WebpageURL,
	}
}

type LogoUpdate struct {
	Width  *string `json:"width,omitempty"`
	Height *string `json:"height,omitempty"`
}

func (update LogoUpdate) toLogo(name string) partners.Logo {
	return partners.Logo{
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

func (update TierStyleUpdate) toTierStyle() partners.TierStyle {
	return partners.TierStyle{
		Color: update.Color,
		Width: update.Width,
	}
}
