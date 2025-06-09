package middleware

import (
	"github.com/josefdigital/webcore/utils"
	"github.com/justinas/nosurf"
	"net/http"
)

func CSRF(next http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		csrfHandler := nosurf.New(next)
		csrfHandler.SetBaseCookie(http.Cookie{
			Path:     "/",
			HttpOnly: true,
			Secure:   utils.GetBoolValue(utils.Config.CSRF_SECURE),
		})

		next.ServeHTTP(w, r)
	}
}
