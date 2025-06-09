package webcore

import (
	"github.com/joegasewicz/gomek"
	"github.com/josefdigital/webcore/middleware"
	"github.com/josefdigital/webcore/views"
	"net/http"
)

type Webcore struct {
}

func NewWebcore() *Webcore {
	return &Webcore{}
}

func (w *Webcore) Run() {
	c := gomek.Config{
		BaseTemplateName: "layout",
		BaseTemplates: []string{
			"../templates/layout.gohtml",
			"../templates/partials/navbar.gohtml",
			"../templates/partials/footer.gohtml",
			"../templates/partials/hero-section.gohtml",
			"../templates/partials/info-section.gohtml",
			"../templates/partials/product-section.gohtml",
			"../templates/partials/what-we-do-section.gohtml",
			"../templates/partials/service-section.gohtml",
			"../templates/partials/connect-section.gohtml",
			"../templates/partials/contact-us-section.gohtml",
			"../templates/partials/product-card.gohtml",
			"../templates/partials/what-we-do-card.gohtml",
			"../templates/partials/service-card.gohtml",
			"../templates/partials/contact-us-flash.gohtml",
			"../templates/partials/subscribe-flash.gohtml",
			"../templates/partials/single-page-flyer.gohtml",
			"../templates/partials/flyer.gohtml",
			"../templates/partials/product-advert-1.gohtml",
			"../templates/partials/product-advert-2.gohtml",
		},
		Debug: true,
	}

	app := gomek.New(c)

	// Static files
	staticFiles := http.FileServer(http.Dir("static"))
	app.Handle("/static/", http.StripPrefix("/static/", staticFiles))

	// Web
	app.Route("/").
		View(views.HomeHandler).
		Methods("GET", "POST").
		Templates("../templates/routes/home.gohtml")

	app.Route("/emails").
		Resource(&views.Email{}).
		Methods("POST")

	// API
	app.Route("/health").
		View(views.Health).
		Methods("GET")

	// Middleware
	app.Use(middleware.RequestTime)
	app.Use(gomek.Logging)
	app.Use(middleware.CSRF)
	app.Use(gomek.CORS)
	app.Use(middleware.RateLimiter)
	//app.Use(middleware.FontHeaders)
	app.Host = "0.0.0.0"
	app.Listen(8081)
	app.Start()
}
