#!/bin/bash

curl -H "Content-Type: application/json" -X DELETE -d '{
	"post": "58d561f7d804970c0c74e6ff"
}' http://localhost:3000/api/post/delete?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4ZDRhOWI2Y2E2Y2ZjMjEwMDA0MjgyZSIsImlhdCI6MTQ5MDM2MjYwMX0.a4riUYx60KurNG75avSpZyqaBgJ0tMEH53k19noyZWY