#!/bin/bash

curl -H "Content-Type: application/json" -X PUT -d '{
	"title": "Sell CS446 Textbook",
	"description": "With assignments + exams",
	"creator": "58d1692240b51d1c48e0b53d",
	"book": "58d1938332307519b8916420",
	"price": 20,
	"condition": 95,
	"type": "Selling"
}' http://localhost:3000/api/post/create?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4ZDE2OTIyNDBiNTFkMWM0OGUwYjUzZCIsImlhdCI6MTQ5MDEyNjc5NH0.oSY2xe3PWca63JViIGp3f-a8ziYKscSXh54aczYjJQQ

