package views

import (
	form_validator "github.com/joegasewicz/form-validator"
	"github.com/joegasewicz/gomek"
	identity_client "github.com/joegasewicz/identity-client"
	"github.com/josefdigital/webcore/utils"
	"log"
	"net/http"
)

type Email struct {
}

func (e *Email) Get(w http.ResponseWriter, r *http.Request, d *gomek.Data) {

}

func (e *Email) Post(w http.ResponseWriter, r *http.Request, d *gomek.Data) {
	var formErrors = form_validator.FormErrors{}
	identity := identity_client.Identity{
		URL:    utils.Config.CreateReqURL("/subscribers"),
		Client: nil,
	}

	c := form_validator.Config{
		MaxMemory: 0,
		Fields: []form_validator.Field{
			{
				Name:     "email",
				Validate: true,
				Type:     "string",
			},
		},
	}

	if ok := form_validator.ValidateForm(r, &c); ok {
		email, _ := form_validator.GetString("email", &c)
		jsonData := map[string]interface{}{
			"email":   email,
			"user_id": utils.Config.GetUserID(),
		}
		data, err := identity.Post(r, jsonData)
		if err != nil {
			params := utils.NewParams(w, r)
			params.SetQueryParams(
				"/",
				map[string]string{"subscription": "failed"},
				map[string]string{"errorMsg": "Error subscribing with your email, please try again."},
			)
			params.RedirectWithParams()
			return
		}
		log.Printf("successfully subscribed:\n%s\n", data)
		// Redirect with params
		params := utils.NewParams(w, r)
		params.SetQueryParams(
			"/",
			map[string]string{"subscription": "success"},
		)
		params.RedirectWithParams()
	} else {
		form_validator.GetFormErrors(&c, &formErrors)
		log.Print("subscriber form invalid: ", formErrors)
		// Redirect with params
		params := utils.NewParams(w, r)
		params.SetQueryParams(
			"/",
			map[string]string{"subscription": "failed"},
			map[string]string{"subscriptionError": form_validator.GetFormError("email", &c).Message},
		)
		params.RedirectWithParams()
	}
}

func (e *Email) Delete(w http.ResponseWriter, r *http.Request, d *gomek.Data) {

}

func (e *Email) Put(w http.ResponseWriter, r *http.Request, d *gomek.Data) {

}
