import pymongo

import os
import json
import openai
from openai import OpenAI

from dotenv import load_dotenv
from pathlib import Path
import certifi

# load .env file
dotenv_path = Path('backend/.env')
load_dotenv(dotenv_path=dotenv_path)

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
MONGO_URI = os.getenv('MONGO_URI')

openai.api_key = OPENAI_API_KEY
os.environ["OPEN_API_KEY"] = OPENAI_API_KEY

client = pymongo.MongoClient(MONGO_URI, tlsCAFile=certifi.where())
db = client.Database
collection = db.vector_search

def generate_embedding(text: str) -> list[float]:

    client = OpenAI(api_key=os.environ["OPEN_API_KEY"])

    response = client.embeddings.create(
        input=text[:1000], # to cap input limit
        model="text-embedding-ada-002",
    )
    return response.data[0].embedding

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
      "index": "vector_index",
      "similarity": "cosine"
      }}
  ])
  
  q_and_a = {}
  i = 0
  for document in results:
      parsed = document["q_a"]
      q_and_a[i] = parsed
      i+=1
    
  return q_and_a


def main():
   print(generate_embedding("I am a sentence."))

if __name__ == "__main__":
   main()