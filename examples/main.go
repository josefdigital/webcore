package main

import "github.com/josefdigital/webcore"

func main() {
	c := webcore.WebcoreConfig{
		HomeTemplate: "templates/routes/home.gohtml",
		Port:         8080,
	}
	web := webcore.NewWebcore(c)
	web.Run()
}
