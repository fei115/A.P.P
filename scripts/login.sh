#!/bin/bash

curl -H "Content-Type: application/json" -X POST -d '{
		"username": "pyfjie",
		"password": "1122312"
	}' http://localhost:3000/api/user/login
curl -H "Content-Type: application/json" -X POST -d '{
		"username": "seshah",
		"password": "123454321"
	}' http://localhost:3000/api/user/login
curl -H "Content-Type: application/json" -X POST -d '{
		"username": "l235chen",
		"password": "235235"
	}' http://localhost:3000/api/user/login
curl -H "Content-Type: application/json" -X POST -d '{
		"username": "h222chen",
		"password": "222222"
	}' http://localhost:3000/api/user/login
