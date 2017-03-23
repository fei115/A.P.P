#!/bin/bash

 curl -H "Content-Type: application/json" -X POST -d '{
	 "firstname": "Kilua",
     "phone": "123456789"
 }' http://localhost:3000/api/user/profile/update?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4ZDNlMTRjNGUzN2ZhMDAwNGNjNzFlMSIsImlhdCI6MTQ5MDI4NjQ4M30.miLJ-HQB9RCdvzl8XtqB7I0I2wk709nqUXsajA6BQgE