#!/bin/bash

curl -H "Content-Type: application/json" -X POST -d '{
		"username": "pyfjie",
		"password": "1122312",
		"name": "Phillip Jie",
		"email": "jieyifei@hotmail.com",
		"phone": "5195804678",
		"role": "Admin"
	}' http://localhost:3000/api/user/create

