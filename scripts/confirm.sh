#!/bin/bash

curl -H "Content-Type: application/json" -X POST -d '{
		"email": "jieyifei@hotmail.com",
		"password": "1122312"
	}' http://localhost:3000/api/auth/email/confirm
