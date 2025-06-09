package views

import (
	"github.com/joegasewicz/gomek"
	"net/http"
)

func Health(w http.ResponseWriter, r *http.Request, d *gomek.Data) {
	b := struct {
		Status string
	}{Status: "OK"}

	gomek.JSON(w, b, http.StatusOK)
}
