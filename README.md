# WebCore

**WebCore** is a lightweight starter web framework built on top of [Gomek](https://github.com/josefdigital/gomek), providing a structured base for Go web applications.

It comes with:

* A full set of base templates and partials (HTML via `gohtml`)
* Static file support
* Middleware for CSRF, logging, CORS, rate-limiting, and more
* Ready-to-use routes (`/`, `/emails`, `/health`)
* Easy entrypoint via `NewWebcore().Run()`

---

## 🧪 Example

```go
package main

import "github.com/josefdigital/webcore"

func main() {
	web := webcore.NewWebcore()
	web.Run()
}
```

---

## 📁 Project Structure

```
webcore/
├── middleware/         # Custom middleware for CSRF, request time, rate limiting
├── views/              # Handlers for HTML routes and APIs
├── templates/          # layout.gohtml + partials
├── static/             # Public assets (JS, CSS, images)
└── webcore.go          # Main Webcore logic (entrypoint, routing, setup)
```

---

## 🚀 Features

* 🌐 HTML template rendering with partials
* 🧩 Built-in CSRF, CORS, rate limiting middleware
* 🗂 Static file serving with clean prefix handling
* 📬 Email form route (POST /emails)
* ❤️ Easy-to-use entrypoint via `webcore.Run()`
* 🩺 Built-in `/health` endpoint

---

## 🔧 Requirements

* Go 1.19+

```bash
go install github.com/joefasewicz/gomek
```

Make sure to place your templates and static files relative to where the binary will be run.

---

## 📦 Install

```bash
go get github.com/josefdigital/webcore
```

---

## 🏁 Running

```bash
go run example/main.go
```

Or embed in your own project via:

```go
import "github.com/josefdigital/webcore"
```

---

## 📄 License

MIT
