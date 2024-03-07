package members

import (
	"fmt"
	"strings"
)

type Subsystem struct {
	Name    string   `json:"name"`
	Members []Member `json:"members"`
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
	Name       string `json:"name"`
	Role       string `json:"role"`
	SocialsURL string `json:"socialsURL"`
}

func (update MemberUpdate) toMember() Member {
	return Member{
		Name:       update.Name,
		ImageURL:   getMemberImagePath(update.Name),
		Role:       update.Role,
		SocialsURL: update.SocialsURL,
	}
}

func getMemberImagePath(name string) string {
	return fmt.Sprintf("%s/%s.webp", MemberMediaFolder, formatMemberName(name))
}

func formatMemberName(name string) string {
	return strings.Join(strings.Split(strings.ToLower(name), " "), "_")
}
