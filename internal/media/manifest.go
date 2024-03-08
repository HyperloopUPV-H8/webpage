package media

import "time"

type Manifest map[string]ImageMetadata

type ImageMetadata struct {
	Name         string    `json:"name"`
	ContentType  string    `json:"contentType"`
	LastModified time.Time `json:"lastModified"`
}
