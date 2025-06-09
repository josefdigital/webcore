package utils

import (
	"errors"
	identity_client "github.com/joegasewicz/identity-client"
	"net/http"
)

// GetBearerTokenForAdmin fetches the admin user's token to carry out
// admin redistricted operations
func GetBearerTokenForAdmin(r *http.Request) (string, error) {

	apiURL := Config.CreateReqURL("/users/login")
	i := identity_client.Identity{
		URL: apiURL,
	}

	jsonData := map[string]interface{}{
		"email":    Config.ADMIN_EMAIL,
		"password": Config.ADMIN_PASSWORD,
	}

	data, err := i.Post(r, jsonData)
	if data == nil {
		return "", errors.New("no token in response data")
	}
	d := data.(map[string]interface{})
	if err != nil {
		return "", err
	}
	token, ok := d["token"].(string)
	if !ok || token == "" {
		return "", errors.New("no token in response data")
	}

	return token, nil
}
