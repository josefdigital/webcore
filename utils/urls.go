package utils

import (
	"log"
	"net/http"
)

type Params struct {
	responseWriter http.ResponseWriter
	request        *http.Request
	newURL         string
}

func NewParams(w http.ResponseWriter, r *http.Request) *Params {
	return &Params{
		responseWriter: w,
		request:        r,
	}
}

func (p *Params) SetQueryParams(path string, params ...map[string]string) {
	q := p.request.URL.Query()
	for _, paramMap := range params {
		for key, value := range paramMap {
			q.Add(key, value)
		}
	}
	p.newURL += path
	if encoded := q.Encode(); encoded != "" {
		p.newURL += "?" + encoded
	}
}

func (p *Params) RedirectWithParams() {
	log.Printf("new query params - %s\n ", p.newURL)
	http.Redirect(p.responseWriter, p.request, p.newURL, http.StatusFound)
}
