import pymongo
import requests

client = pymongo.MongoClient("mongodb+srv://dasomi04:Ys78O453Etbhe7IZ@cluster1.29ruiho.mongodb.net/?retryWrites=true&w=majority")
db = client.Database
collection = db.vector_search

hf_token = "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"
embedding_url = "https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2"

def generate_embedding(text: str) -> list[float]:

  response = requests.post(
    embedding_url,
    headers={"Authorization": f"Bearer {hf_token}"},
    json={"inputs": text})

  if response.status_code != 200:
    raise ValueError(f"Request failed with status code {response.status_code}: {response.text}")

  return response.json()

for doc in collection.find({'premise':{"$exists":True}}):
   doc['plot_embedding_hf'] = generate_embedding(doc['premise'])
   collection.replace_one({'_id': doc['_id']}, doc)

def vector_search(query):

  results = collection.aggregate([
    {"$vectorSearch": {
      "queryVector": generate_embedding(query),
      "path": "plot_embedding_hf",
      "numCandidates": 10,
      "limit": 3, # num results returned
      "index": "default",
      }}
  ])
  
  q_and_a = {}
  i = 0
  for document in results:
      parsed = document["q_a"]
      q_and_a[i] = parsed
      i+=1
    
  return q_and_a