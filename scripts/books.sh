#!/bin/bash

curl -H "Content-Type: application/json" -X POST -d '{
  "title": "How to Express JS",
  "authors": [
    "Phillip",
    "Sultaan"
  ],
  "isbn": "9782123456803",
  "publisher": "UW"
}' http://localhost:3000/api/book/create