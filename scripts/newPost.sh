#!/bin/bash

curl -H "Content-Type: application/json" -X PUT -d '{
	"title": "Trial and Error",
	"description": "With assignments + exams",
	"book": "58d48d481dc463251cd57850",
	"price": 20,
	"condition": 95,
	"type": "Selling",
	"images": ["abc.png"]
}' http://localhost:3000/api/post/create?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4ZDMyNGE4ODcxNzZlMTM1NGI4ZWQ0YSIsImlhdCI6MTQ5MDU3NTg0Nn0.mCqNbtYj0HLRtV46f5fm68J7t7t2pA5mfSxwaAwS1pE