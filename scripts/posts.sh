#!/bin/bash

curl -H "Content-Type: application/json" -X POST -d '{
	"title": "Sell CS446 Textbook",
	"description": "With assignments",
	"creator": "58ad973c3fa41f07342caf4e",
	"book": "58ad97423fa41f07342caf4f",
	"price": 20,
	"condition": 95,
	"type": "Selling"
}' http://localhost:3000/api/post/create

