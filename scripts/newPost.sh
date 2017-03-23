#!/bin/bash

curl -H "Content-Type: application/json" -X PUT -d '{
	"title": "Sell CS446 Textbook",
	"description": "With assignments + exams",
	"creator": "58d1692240b51d1c48e0b53d",
	"book": "58d2e8b94ec3a00f1cfa65bd",
	"price": 20,
	"condition": 95,
	"type": "Selling"
}' http://localhost:3000/api/post/create?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4ZDE2OTIyNDBiNTFkMWM0OGUwYjUzZCIsImlhdCI6MTQ5MDIxNjgwM30.0SGOs_Rja-MaIAjHcNdAK4USnHcF3GZSa7Kwg_u3GWA
