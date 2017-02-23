#!/bin/bash

curl -H "Content-Type: application/json" -X POST -d '{
	"title": "Sell CS446 Textbook",
	"description": "With assignments",
	"creator": "58aed33049e7390c64174313",
	"book": "58aed477c740df1e3ccd3ff7",
	"price": 20,
	"condition": 95,
	"type": "Selling"
}' http://localhost:3000/api/post/create

