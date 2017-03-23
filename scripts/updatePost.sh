#!/bin/bash

curl -H "Content-Type: application/json" -X POST -d '{
	"_id" : "58d2f602e2ec1e18ec0d553e",
	"title": "Sell Econ Textbook",
	"description": "with past exams",
	"creator": "58d1692240b51d1c48e0b53d",
	"book": "58d2e8b94ec3a00f1cfa65bd",
	"price": 100,
	"condition": 55,
	"type": "Selling"
}' http://localhost:3000/api/post/update?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4ZDE2OTIyNDBiNTFkMWM0OGUwYjUzZCIsImlhdCI6MTQ5MDIxNjgwM30.0SGOs_Rja-MaIAjHcNdAK4USnHcF3GZSa7Kwg_u3GWA
