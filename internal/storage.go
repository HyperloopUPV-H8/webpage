package internal

import (
	"bytes"
	"encoding/json"
	"io"
	"io/fs"
	"os"
	"path"

	"github.com/rs/zerolog/log"
)

func SaveJSON(filePath string, data any) error {
	log.Info().Str("path", filePath).Msg("saving data to disk")

	dataRaw, err := json.Marshal(data)
	if err != nil {
		return err
	}

	err = os.MkdirAll(path.Dir(filePath), fs.ModePerm)
	if err != nil {
		return err
	}

	file, err := os.Create(filePath)
	if err != nil {
		return err
	}

	_, err = io.Copy(file, bytes.NewReader(dataRaw))
	return err
}

func LoadJSON[T any](filePath string) (T, error) {
	log.Info().Str("path", filePath).Msg("loading from disk")

	var data T

	file, err := os.ReadFile(filePath)
	if err != nil {
		return data, err
	}

	err = json.Unmarshal(file, &data)
	return data, err
}
