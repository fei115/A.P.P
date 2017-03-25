#!/bin/bash

curl -H "Content-Type: application/json" -X POST -d '{
		"email": "jieyifei2@hotmail.com",
		"password": "1122312"
	}' http://localhost:3000/api/auth/email/confirm
