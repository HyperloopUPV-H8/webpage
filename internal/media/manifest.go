package media

type Manifest map[string]ImageMetadata

type ImageMetadata struct {
	Name        string `json:"name"`
	ContentType string `json:"contentType"`
}
