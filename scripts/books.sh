#!/bin/bash

curl -H "Content-Type: application/json" -X POST -d '{
  "title": "How to Express JS",
  "courses": [
	"CS446"
  ],
  "isbn": "9782123456803"
}' http://localhost:3000/api/book/create

curl -H "Content-Type: application/json" -X POST -d '{
  "title": "No fear, Shakespeare",
  "courses": [
	"ENGL101",
	"ESL401"
  ],
  "isbn": "9782123456805"
}' http://localhost:3000/api/book/create