#!/bin/bash

curl -H "Content-Type: application/json" -X POST -d '{
		"email": "jieyifei@hotmail.com",
		"password": "1122312"
	}' https://eztextbook.herokuapp.com/api/auth/login/local
