#!/bin/bash

curl -H "Content-Type: application/json" -X PUT -d '{
		"firstname": "phillip",
		"lastname": "jie",
		"password": "1122312",
		"name": "Phillip Jie",
		"email": "jieyifei2@hotmail.com",
		"phone": "5195804678",
		"role": "Admin"
	}' http://localhost:3000/api/auth/signup/local
