package internal

import "strings"

func FormatName(name string) string {
	return strings.Join(strings.Split(strings.ToLower(name), " "), "_")
}
