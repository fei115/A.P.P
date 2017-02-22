#!/bin/bash

curl -H "Content-Type: application/json" -X POST -d '{
		"username": "pyfjie",
		"password": "1122312"
	}' http://localhost:3000/api/user/login
