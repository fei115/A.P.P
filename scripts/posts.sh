#!/bin/bash

curl -H "Content-Type: application/json" -X POST -d '{
	"title": "Sell CS446 Textbook",
	"description": "With assignments",
	"creator": "58ac24e7c01f9313a048566f",
	"book": "58ac3e80127f8b183c9f02da",
	"price": 20,
	"condition": 95,
	"type": "Selling"
}' http://localhost:3000/api/post/create

