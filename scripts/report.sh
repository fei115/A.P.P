#!/bin/bash

curl -H "Content-Type: application/json" -X PUT -d '{
	"post" : "58d329dc0d0d2110e066bd29"
}' http://localhost:3000/api/post/report?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4ZDMyNGE4ODcxNzZlMTM1NGI4ZWQ0YSIsImlhdCI6MTQ5MDIzMzM2Nn0.xuGTwlSAAoq8wKzojd-EhiyukbRY9CSebH0i827lw4E
