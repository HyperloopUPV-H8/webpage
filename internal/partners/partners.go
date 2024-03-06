package partners

type Tiers []Tier

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
