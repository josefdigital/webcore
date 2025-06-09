package views

import (
	"github.com/joegasewicz/gomek"
	"github.com/stretchr/testify/assert"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestHealth(t *testing.T) {
	c := gomek.Config{}
	mockApp := gomek.NewTestApp(c)
	mockApp.
		Route("/health").
		Methods("GET").
		View(Health)

	mockApp.Start()

	handler := gomek.CreateTestHandler(mockApp, Health)

	req := httptest.NewRequest(http.MethodGet, "/health", nil)
	w := httptest.NewRecorder()
	handler(w, req)
	resp := w.Result()

	defer resp.Body.Close()
	data, err := io.ReadAll(resp.Body)
	if err != nil {
		t.Errorf("Error: %v", err)
	}

	expected := `{"Status":"OK"}`
	assert.JSONEq(t, expected, string(data))
}
