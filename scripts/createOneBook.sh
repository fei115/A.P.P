#!/bin/bash
 curl -H "Content-Type: application/json" -X PUT -d '{
     "title":"phil is here                        "
    ,"isbn":"12345678"
    ,"courses":["CS106"]
	,"amazon":"0"
	,"uwbook":"0"
	,"feds":"0"
    ,"thumbnail":"https://images-na.ssl-images-amazon.com/images/I/51oA4HMxfHL._SX342_QL70_.jpg"
 }' http://localhost:3000/api/book/create?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4ZGEzOWZiMDI2MTk1MjFlY2NiOWJiYyIsImlhdCI6MTQ5MDY5Njc0M30.Xs8DcxYJH1e88Yh-O1yEFFxEKRNOmB2vtRkvmvgSUp4