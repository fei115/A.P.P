#!/bin/bash

curl -H "Content-Type: application/json" -X PUT -d '{
	"ratee": "58d434672fb12200042185f8",
	"value": "5"
}' http://localhost:3000/api/user/visit/rate?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4ZDRhOWI2Y2E2Y2ZjMjEwMDA0MjgyZSIsImlhdCI6MTQ5MDM2MjYwMX0.a4riUYx60KurNG75avSpZyqaBgJ0tMEH53k19noyZWY