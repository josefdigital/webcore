FROM golang:1.24.1-alpine AS builder

WORKDIR /app

COPY ../go.mod go.sum ./
RUN go mod download

COPY .. .

RUN go build -o web .

FROM alpine:latest

WORKDIR /app

COPY --from=builder /app/web .
COPY ../templates ./templates
COPY static ./static

COPY ../templates ./templates
COPY static ./static

EXPOSE 8081

CMD ["./web"]