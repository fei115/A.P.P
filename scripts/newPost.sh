#!/bin/bash

curl -H "Content-Type: application/json" -X PUT -d '{
	"title": "Sell CS446 Textbook",
	"description": "With assignments + exams",
	"creator": "58d032da1958fa10a4a330e3",
	"book": "58d034256f937e1bf06bbdde",
	"price": 20,
	"condition": 95,
	"type": "Selling"
}' http://localhost:3000/api/post/create?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4ZDAzMmRhMTk1OGZhMTBhNGEzMzBlMyIsImlhdCI6MTQ5MDAzOTUyMX0.vfOkjLCqfzhijuhun_GD7KMzf0wWVljPjdqEu9DYXPY

