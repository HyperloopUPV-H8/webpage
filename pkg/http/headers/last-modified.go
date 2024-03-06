package headers

import (
	"fmt"
	"time"
)

func GetLastModifiedString(date time.Time) string {
	return fmt.Sprintf("%s, %02d %s %04d %02d:%02d:%02d GMT",
		getWeekdayString(date.Weekday()),
		date.Day(),
		getMonthString(date.Month()),
		date.Year(),
		date.Hour(),
		date.Minute(),
		date.Second(),
	)
}

// getWeekdayString returns the weekday represented as a three letter string.
// The following are all the day representations (all case sensitive) from monday to sunday:
//
// "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"
//
// If the weekday is not a valid weekday, an empty string is returned to prevent crashing.
func getWeekdayString(weekday time.Weekday) string {
	switch weekday {
	case time.Monday:
		return "Mon"
	case time.Tuesday:
		return "Tue"
	case time.Wednesday:
		return "Wed"
	case time.Thursday:
		return "Thu"
	case time.Friday:
		return "Fri"
	case time.Saturday:
		return "Sat"
	case time.Sunday:
		return "Sun"
	default:
		return ""
	}
}

func getMonthString(month time.Month) string {
	switch month {
	case time.January:
		return "Jan"
	case time.February:
		return "Feb"
	case time.March:
		return "Mar"
	case time.April:
		return "Apr"
	case time.May:
		return "May"
	case time.June:
		return "Jun"
	case time.July:
		return "Jul"
	case time.August:
		return "Aug"
	case time.September:
		return "Sep"
	case time.October:
		return "Oct"
	case time.November:
		return "Nov"
	case time.December:
		return "Dec"
	default:
		return ""
	}
}
