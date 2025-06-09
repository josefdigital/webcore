package middleware

import (
	"net/http"
	"strings"
)

func FontHeaders(next http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		ext := strings.ToLower(r.URL.Path)
		switch ext {
		case ".ttf", ".otf", ".woff", ".woff2":
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Content-Type", "fonts/"+strings.TrimPrefix(ext, "."))
		}
		next.ServeHTTP(w, r)
	}
}
