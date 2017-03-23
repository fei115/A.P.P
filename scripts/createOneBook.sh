#!/bin/bash
 curl -H "Content-Type: application/json" -X PUT -d '{
     "title":"phil is here                        "
    ,"isbn":"12345678"
    ,"courses":["CS106"]
    ,"thumbnail":"https://images-na.ssl-images-amazon.com/images/I/51oA4HMxfHL._SX342_QL70_.jpg"
 }' http://localhost:3000/api/book/create?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4ZDNlMTRjNGUzN2ZhMDAwNGNjNzFlMSIsImlhdCI6MTQ5MDI4NjQ4M30.miLJ-HQB9RCdvzl8XtqB7I0I2wk709nqUXsajA6BQgE