package members

type Subsystems []Subsystem

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
