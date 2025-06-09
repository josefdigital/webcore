package utils

import (
	"fmt"
	"log"
	"os"
)

type Conf struct {
	API_VERSION    string
	API_DOMAIN     string
	UserID         uint
	Domain         string
	RATE_LIMITING  string
	CSRF_SECURE    string
	ADMIN_EMAIL    string
	ADMIN_PASSWORD string
}

func NewConfig() *Conf {
	conf := &Conf{
		API_VERSION:    "/api/v1",
		API_DOMAIN:     GetEnv("API_DOMAIN", "http://localhost:8080"),
		UserID:         1,
		Domain:         "josef.digital",
		RATE_LIMITING:  GetEnv("RATE_LIMITING", "false"),
		CSRF_SECURE:    GetEnv("CSRF_SECURE", "false"),
		ADMIN_EMAIL:    GetEnv("ADMIN_USER", "myemail@_.com"),
		ADMIN_PASSWORD: GetEnv("ADMIN_PASSWORD", "ADMIN_PASSWORD"),
	}
	log.Printf("[WEB]: RATE_LIMITING = %s", conf.RATE_LIMITING)
	log.Printf("[WEB]: CSRF_SECURE = %s", conf.CSRF_SECURE)
	return conf
}

func (c *Conf) AddVersion(path string) string {
	return fmt.Sprintf("%s%s", c.API_VERSION, path)
}

func (c *Conf) CreateReqURL(path string) string {
	return fmt.Sprintf("%s%s%s", c.API_DOMAIN, c.API_VERSION, path)
}

func (c *Conf) GetUserID() uint {
	// TODO this needs to be requested from the Platform API
	return c.UserID
}

func GetEnv(key, fallback string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return fallback
}

func GetBoolValue(envVar string) bool {
	if envVar == "true" {
		return true
	}
	return false
}

var Config = NewConfig()
