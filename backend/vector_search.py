import pymongo
import requests

import os
import json
import openai
from openai import OpenAI

openai.api_key = "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"
os.environ["OPEN_API_KEY"] = "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"



client = pymongo.MongoClient("mongodb+srv://dasomi04:Ys78O453Etbhe7IZ@cluster1.29ruiho.mongodb.net/?retryWrites=true&w=majority")
db = client.Database
collection = db.vector_search

# hugging face specs
# hf_token = "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"
# embedding_url = "https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2"

def generate_embedding(text: str) -> list[float]:

  # hugging face
  # response = requests.post(
  #   embedding_url,
  #   headers={"Authorization": f"Bearer {hf_token}"},
  #   json={"inputs": text})

  # if response.status_code != 200:
  #   raise ValueError(f"Request failed with status code {response.status_code}: {response.text}")

    client = OpenAI(api_key=os.environ["OPEN_API_KEY"])

    response = client.embeddings.create(
        input=text,
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


def main():
   print(generate_embedding("I am a sentence."))

if __name__ == "__main__":
   main()