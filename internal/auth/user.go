package auth

type UserMap struct {
	Admins   map[string]User `json:"admins"`
	Managers map[string]User `json:"managers"`
}

func mapFromList(users UserList) UserMap {
	return UserMap{
		Admins:   getUserMap(users.Admins),
		Managers: getUserMap(users.Managers),
	}
}

func getUserMap(users []User) map[string]User {
	userMap := make(map[string]User, len(users))
	for _, user := range users {
		userMap[user.Name] = user
	}
	return userMap
}

type UserList struct {
	Admins   []User `json:"admins"`
	Managers []User `json:"managers"`
}

func listFromMap(users UserMap) UserList {
	return UserList{
		Admins:   getUserList(users.Admins),
		Managers: getUserList(users.Managers),
	}
}

func getUserList(users map[string]User) []User {
	userList := make([]User, 0, len(users))
	for _, user := range users {
		userList = append(userList, user)
	}
	return userList
}

type User struct {
	Name     string `json:"name"`
	Password string `json:"password"`
}

func (user User) matches(name, password string) bool {
	return user.Name == name && user.Password == password
}
