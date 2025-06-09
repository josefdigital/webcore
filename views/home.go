package views

import (
	form_validator "github.com/joegasewicz/form-validator"
	"github.com/joegasewicz/gomek"
	identity_client "github.com/joegasewicz/identity-client"
	"github.com/josefdigital/webcore/utils"
	"github.com/justinas/nosurf"
	"log"
	"net/http"
)

type Product struct {
	Heading        string
	SubHeading     string
	ProductHeading string
	Image          string
	Details        string
}

type Strategy struct {
	Heading string
	Details string
	Image   string
}

type Service struct {
	Heading string
	Details string
}

var (
	products = []Product{
		{
			Heading:        "Single Page Website",
			SubHeading:     "Quick to launch",
			ProductHeading: "Perfect for portfolios & events",
			Details:        "A sleek, scrollable website ideal for portfolios, events, or startups. Perfect for making a strong first impression with clear messaging and responsive design.",
			Image:          "/static/imgs/page.png",
		},
		{
			Heading:        "Multi-Page Website",
			SubHeading:     "Built for growth",
			ProductHeading: "SEO-optimized architecture",
			Details:        "A structured website with dedicated pages for services, about, contact, and more. Great for businesses looking to grow their online presence with SEO-friendly architecture.",
			Image:          "/static/imgs/app-development.png",
		},
		{
			Heading:        "CMS Website",
			SubHeading:     "Edit content easily",
			ProductHeading: "No coding required",
			Details:        "A content-managed website powered by tools like WordPress or headless CMS. Easily update content without writing code — ideal for blogs, publications, or dynamic sites.",
			Image:          "/static/imgs/shopping.png",
		},
		{
			Heading:        "eShop / Online Store",
			SubHeading:     "Sell 24/7",
			ProductHeading: "Secure checkout & inventory tools",
			Details:        "A fully-featured ecommerce site with secure checkout, inventory management, and payment integrations. Scalable, fast, and designed to convert visitors into customers.",
			Image:          "/static/imgs/software.png",
		},
	}
	strategies = []Strategy{
		{
			Heading: "Strategic Partnerships",
			Details: "We become an extension of your team — not just a supplier, but a long-term digital partner.\nFor startups and agencies looking to scale, we integrate seamlessly with your workflows and tech stack to help you ship fast, iterate confidently, and grow sustainably.",
			Image:   "/static/imgs/partnership.png",
		},
		{
			Heading: "Full-Service Delivery",
			Details: "One team, one solution — from concept to launch.\nWhen you need a full-featured website or product, we handle it all: design, development, testing, and deployment. Perfect for founders or brands who want to hand off the heavy lifting and trust us to bring their vision to life.",
			Image:   "/static/imgs/collaborate.png",
		},
		{
			Heading: "Rapid Response Support",
			Details: "When your in-house team is maxed out, we step in — fast.\nDeadlines, product launches, campaigns — we get it. We offer flexible, short-term developer support to help you deliver under pressure without burning out your core team.",
			Image:   "/static/imgs/care.png",
		},
	}

	services = []Service{
		{
			Heading: "Consult",
			Details: "Clarity before code — we help you shape the right idea before you commit to building it.\nFrom scoping out MVPs to advising on technical direction, we guide you through early-stage planning with product strategy, UX thinking, and lean technical insights — helping you avoid wasted time and budget.",
		},
		{
			Heading: "Build",
			Details: "You bring the vision, we bring it to life — clean, fast, and ready for the real world.\nWhether it’s a marketing site, a CMS, or a full-featured web platform, we design and develop products that scale. You get a reliable team that delivers on time, with no drama.",
		},
		{
			Heading: "Support",
			Details: "When your internal team is at capacity, we jump in — fast, focused, and frictionless.\nWe offer flexible dev support for agencies, startups, and teams during product launches, campaigns, or heavy sprints. We plug in, deliver, and disappear — like good freelancers, but better.",
		},
	}
)

func HomeHandler(w http.ResponseWriter, r *http.Request, d *gomek.Data) {
	var formErrors = form_validator.FormErrors{}

	templateData := make(gomek.Data)
	templateData["Title"] = "Welcome to JOSEF Digital - Single Page Site"
	templateData["SiteName"] = "JOSEF Digital"
	templateData["Products"] = products
	templateData["Strategies"] = strategies
	templateData["Services"] = services
	templateData["FormSuccess"] = "Your enquiry was successfully submitted. We will be in contact with you as soon as possible."
	templateData["SubscribeSuccess"] = "Thank you! You have successfully subscribed to JOSEF.digital."
	templateData["csrfToken"] = nosurf.Token(r)
	c := form_validator.Config{
		MaxMemory: 0,
		Fields: []form_validator.Field{
			{
				Name:     "username",
				Validate: false,
				Type:     "string",
			},
			{
				Name:     "fullname",
				Validate: true,
				Type:     "string",
			},
			{
				Name:     "email",
				Validate: true,
				Type:     "string",
			},
			{
				Name:     "message",
				Validate: true,
				Type:     "string",
			},
		},
	}

	if r.Method == "POST" {
		if ok := form_validator.ValidateForm(r, &c); ok {
			username, _ := form_validator.GetString("username", &c)
			if username != "<nil>" {
				log.Printf("[WEB]: Honeypot field not empty: %s\n", username)
				return
			}
			fullname, _ := form_validator.GetString("fullname", &c)
			email, _ := form_validator.GetString("email", &c)
			message, _ := form_validator.GetString("message", &c)
			jsonData := map[string]interface{}{
				"fullname": fullname,
				"email":    email,
				"message":  message,
				"user_id":  utils.Config.GetUserID(),
				"Domain":   utils.Config.Domain,
			}

			apiURL := utils.Config.CreateReqURL("/leads")
			token, err := utils.GetBearerTokenForAdmin(r)
			if err != nil {
				log.Printf("[WEB]: error fetching admin credentials: %s\n", err.Error())
				return
			}

			identity := identity_client.Identity{
				URL:    apiURL,
				Client: nil,
				Token:  identity_client.AddTokenPrefix(token),
			}

			log.Printf("[WEB]: Making request on %s\n", apiURL)
			data, err := identity.Post(r, jsonData)
			if err != nil {
				params := utils.NewParams(w, r)
				params.SetQueryParams(
					"/",
					map[string]string{"submission": "failed"},
					map[string]string{"errorMsg": "Error submitting details, please try again."},
				)
				params.RedirectWithParams()
				return
			}
			log.Printf("[WEB]: successfully created lead:\n%s\n", data)
			// Redirect with params
			params := utils.NewParams(w, r)
			params.SetQueryParams(
				"/",
				map[string]string{"submission": "success"},
			)
			params.RedirectWithParams()
		} else {
			form_validator.GetFormErrors(&c, &formErrors)
			log.Print("form invalid: ", formErrors)
			// Redirect with params
			params := utils.NewParams(w, r)
			params.SetQueryParams(
				"/",
				map[string]string{"submission": "failed"},
				map[string]string{"fullnameError": form_validator.GetFormError("fullname", &c).Message},
				map[string]string{"emailError": form_validator.GetFormError("email", &c).Message},
				map[string]string{"messageError": form_validator.GetFormError("message", &c).Message},
			)
			params.RedirectWithParams()
		}
	}

	*d = templateData
}
