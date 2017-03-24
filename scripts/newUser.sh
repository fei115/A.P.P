#!/bin/bash

curl -H "Content-Type: application/json" -X PUT -d '{
		"firstname": "Queen",
		"lastname": "Elizabeth",
		"password": "1122312",
		"name": "Phillip Jie",
		"email": "queen2@gmail.com",
		"phone": "5195804678",
		"role": "Admin"
	}' http://localhost:3000/api/auth/signup/local
