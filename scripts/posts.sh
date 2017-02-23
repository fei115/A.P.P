#!/bin/bash

curl -H "Content-Type: application/json" -X POST -d '{
	"title": "Sell CS446 Textbook",
	"description": "With assignments",
	"creator": "58ae75fd83d2c80e143e5336",
	"book": "58ae761183d2c80e143e5338",
	"price": 20,
	"condition": 95,
	"type": "Selling"
}' http://localhost:3000/api/post/create

