#!/bin/bash

curl -H "Content-Type: application/json" -X PUT -d '{
	"title": "Sell CS446 Textbook",
	"description": "With assignments + exams",
	"book": "58d48d481dc463251cd57850",
	"price": 20,
	"condition": 95,
	"type": "Selling"
}' http://localhost:3000/api/post/create?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4ZDRhOWI2Y2E2Y2ZjMjEwMDA0MjgyZSIsImlhdCI6MTQ5MDM2MjYwMX0.a4riUYx60KurNG75avSpZyqaBgJ0tMEH53k19noyZWY