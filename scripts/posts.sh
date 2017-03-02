#!/bin/bash

curl -H "Content-Type: application/json" -X POST -d '{
	"title": "Sell CS446 Textbook",
	"description": "With assignments",
	"creator": "58b3291604873f0b502a2a1f",
	"book": "58b328f604873f0b502a29fa",
	"price": 20,
	"condition": 95,
	"type": "Selling"
}' http://localhost:3000/api/post/create

