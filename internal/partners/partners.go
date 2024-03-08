package partners

import (
	"fmt"

	"github.com/HyperloopUPV-H8/webpage-backend/internal"
)

func TiersFromUpdates(updates []TierUpdate) []Tier {
	tiers := make([]Tier, len(updates))
	for i, update := range updates {
		tiers[i] = update.toTier()
	}
	return tiers
}

type Tier struct {
	Name     string    `json:"name"`
	Partners []Partner `json:"partners"`
	Style    TierStyle `json:"style"`
}

type Partner struct {
	Name       string `json:"name"`
	Logo       Logo   `json:"logo"`
	WebpageURL string `json:"webpageURL"`
}

type TierStyle struct {
	Color string `json:"color"`
	Width string `json:"width"`
}

type Logo struct {
	URL    string  `json:"url"`
	Width  *string `json:"width,omitempty"`
	Height *string `json:"height,omitempty"`
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
	URL    *string `json:"url,omitempty"`
	Width  *string `json:"width,omitempty"`
	Height *string `json:"height,omitempty"`
}

func (update LogoUpdate) toLogo(name string) Logo {
	var url string
	if update.URL != nil {
		url = *update.URL
	} else {
		url = getLogoImagePath(name)
	}

	return Logo{
		URL:    url,
		Width:  update.Width,
		Height: update.Height,
	}
}

func getLogoImagePath(name string) string {
	return fmt.Sprintf("%s/%s", PartnersMediaFolder, internal.FormatName(name))
}

type TierStyleUpdate struct {
	Color string `json:"color"`
	Width string `json:"width"`
}

func (update TierStyleUpdate) toTierStyle() TierStyle {
	return TierStyle(update)
}
