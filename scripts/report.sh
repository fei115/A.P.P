#!/bin/bash

curl -H "Content-Type: application/json" -X PUT -d '{
	"post" : "58d55d09ada397161850b2e0"
}' http://localhost:3000/api/post/report?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4ZDRhOWI2Y2E2Y2ZjMjEwMDA0MjgyZSIsImlhdCI6MTQ5MDM2MjYwMX0.a4riUYx60KurNG75avSpZyqaBgJ0tMEH53k19noyZWY