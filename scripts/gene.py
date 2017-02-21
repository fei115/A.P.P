import json

json_string = '{"article":{"title":"Great Expectations"}}'
python_data = json.loads(json_string)
print(type(python_data))
print(python_data['article']['title'])