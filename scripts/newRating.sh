#!/bin/bash

curl -H "Content-Type: application/json" -X PUT -d '{
	"ratee": "58d3e14c4e37fa0004cc71e1",
	"value": "3"
}' http://localhost:3000/api/user/visit/rate?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4ZDMyNGE4ODcxNzZlMTM1NGI4ZWQ0YSIsImlhdCI6MTQ5MDU2NTgyNn0.5hSN4gnOhlf-QoBfroVHGoSeuox9B37Dv4MKH7aRWAU