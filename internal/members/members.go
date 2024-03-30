package members

import (
	"encoding/json"
	"path"

	"github.com/HyperloopUPV-H8/webpage-backend/internal"
	"github.com/HyperloopUPV-H8/webpage-backend/internal/media"
)

type Subsystem struct {
	Name    string   `json:"name"`
	Members []Member `json:"members"`
}

func (subsystem *Subsystem) UnmarshalJSON(data []byte) error {
	var update SubsystemUpdate
	err := json.Unmarshal(data, &update)
	if err != nil {
		return err
	}
	*subsystem = update.toSubsystem()
	return nil
}

type Member struct {
	Name       string `json:"name"`
	ImageURL   string `json:"imageURL"`
	Role       string `json:"role"`
	SocialsURL string `json:"socialsURL"`
}

type SubsystemUpdate struct {
	Name    string         `json:"name"`
	Members []MemberUpdate `json:"members"`
}

func (update SubsystemUpdate) toSubsystem() Subsystem {
	newMembers := make([]Member, len(update.Members))
	for i, memberUpdate := range update.Members {
		newMembers[i] = memberUpdate.toMember()
	}
	return Subsystem{
		Name:    update.Name,
		Members: newMembers,
	}
}

type MemberUpdate struct {
	Name       string  `json:"name"`
	ImageURL   *string `json:"imageURL,omitempty"`
	Role       string  `json:"role"`
	SocialsURL string  `json:"socialsURL"`
}

func (update MemberUpdate) toMember() Member {
	var imageURL string
	if update.ImageURL != nil {
		imageURL = *update.ImageURL
	} else {
		imageURL = getMemberImagePath(update.Name)
	}
	return Member{
		Name:       update.Name,
		ImageURL:   imageURL,
		Role:       update.Role,
		SocialsURL: update.SocialsURL,
	}
}

func getMemberImagePath(name string) string {
	return path.Join(media.MembersFolder, internal.FormatName(name))
}
