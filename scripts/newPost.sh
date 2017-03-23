#!/bin/bash

curl -H "Content-Type: application/json" -X PUT -d '{
	"title": "Sell CS446 Textbook",
	"description": "With assignments + exams",
	"book": "58d2e8ba4ec3a00f1cfa65bf",
	"price": 20,
	"condition": 95,
	"type": "Selling"
}' http://localhost:3000/api/post/create?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4ZDMyNGE4ODcxNzZlMTM1NGI4ZWQ0YSIsImlhdCI6MTQ5MDIzMzM2Nn0.xuGTwlSAAoq8wKzojd-EhiyukbRY9CSebH0i827lw4E
