#!/bin/bash

curl -H "Content-Type: application/json" -X DELETE -d '{
	"_id" : "58d2f602e2ec1e18ec0d553e"
}' http://localhost:3000/api/post/delete?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4ZDE2OTIyNDBiNTFkMWM0OGUwYjUzZCIsImlhdCI6MTQ5MDIxNjgwM30.0SGOs_Rja-MaIAjHcNdAK4USnHcF3GZSa7Kwg_u3GWA
