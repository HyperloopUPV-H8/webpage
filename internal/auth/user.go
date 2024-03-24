package auth

type UserMap struct {
	Admins   map[string]User `json:"admins"`
	Managers map[string]User `json:"managers"`
}

func mapFromList(list UserList) UserMap {
	return UserMap{
		Admins:   getUserMap(list.Admins),
		Managers: getUserMap(list.Managers),
	}
}

type UserList struct {
	Admins   []User `json:"admins"`
	Managers []User `json:"managers"`
}

func getUserMap(users []User) map[string]User {
	userMap := make(map[string]User, len(users))
	for _, user := range users {
		userMap[user.Name] = user
	}
	return userMap
}

type User struct {
	Name     string `json:"name"`
	Password string `json:"password"`
}

func (user User) matches(name, password string) bool {
	return user.Name == name && user.Password == password
}
