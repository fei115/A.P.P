#!/bin/bash

curl -H "Content-Type: application/json" -X PUT -d '{
	"post" : "58d193dc32307519b8916445"
}' http://localhost:3000/api/post/report?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4ZDMyNGE4ODcxNzZlMTM1NGI4ZWQ0YSIsImlhdCI6MTQ5MDIzMjU0MH0.5cN06javzNAaCbT0DHFzDwmtzGppX_LVX72P4azl_Fk
