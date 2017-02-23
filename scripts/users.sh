#!/bin/bash

curl -H "Content-Type: application/json" -X POST -d '{
		"username": "pyfjie",
		"password": "1122312",
		"name": "Phillip Jie",
		"email": "jieyifei@hotmail.com",
		"phone": "5195804678",
		"role": "Admin"
	}' http://localhost:3000/api/user/create

curl -H "Content-Type: application/json" -X POST -d '{
		"username": "seshah",
		"password": "123454321",
		"name": "Sultaan Shah",
		"email": "s-shah@hotmail.com",
		"phone": "6474039042",
		"role": "Admin"
	}' http://localhost:3000/api/user/create


curl -H "Content-Type: application/json" -X POST -d '{
		"username": "l235chen",
		"password": "235235",
		"name": "Betty Chen",
		"email": "l235chen@uwaterloo.ca",
		"phone": "",
		"role": "Admin"
	}' http://localhost:3000/api/user/create


curl -H "Content-Type: application/json" -X POST -d '{
		"username": "h222chen",
		"password": "222222",
		"name": "Hau Chen",
		"email": "h222@uwaterloo.ca",
		"phone": "",
		"role": "Admin"
	}' http://localhost:3000/api/user/create


