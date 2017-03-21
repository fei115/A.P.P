#!/bin/bash

 curl -H "Content-Type: application/json" -X POST -d '{
     "phone": "123456789"
 }' http://localhost:3000/api/user/profile/update?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4ZDE2OTIyNDBiNTFkMWM0OGUwYjUzZCIsImlhdCI6MTQ5MDEyNjc5NH0.oSY2xe3PWca63JViIGp3f-a8ziYKscSXh54aczYjJQQ