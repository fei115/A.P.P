#!/bin/bash

curl -H "Content-Type: application/json" -X PUT -d '{
	"title": "Sell CS446 Textbook",
	"description": "With assignments + exams",
	"book": "58d2e8ba4ec3a00f1cfa65bf",
	"price": 20,
	"condition": 95,
	"type": "Selling",
	"exchanger": "58d3e14c4e37fa0004cc71e1"
}' http://localhost:3000/api/post/create?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4ZDNlMTRjNGUzN2ZhMDAwNGNjNzFlMSIsImlhdCI6MTQ5MDI4NjQ4M30.miLJ-HQB9RCdvzl8XtqB7I0I2wk709nqUXsajA6BQgE