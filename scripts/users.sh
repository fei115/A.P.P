#!/bin/bash

curl -H "Content-Type: application/json" -X POST -d '{
	"name": "phillip"
}' http://localhost:3000/api/user/create

