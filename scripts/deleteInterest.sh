#!/bin/bash

curl -H "Content-Type: application/json" -X POST -d '{
	"user": "58d44d102fb12200042185fa"
}' http://localhost:3000/api/user/interests/delete?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4ZDNlMTRjNGUzN2ZhMDAwNGNjNzFlMSIsImlhdCI6MTQ5MDI4NjQ4M30.miLJ-HQB9RCdvzl8XtqB7I0I2wk709nqUXsajA6BQgE