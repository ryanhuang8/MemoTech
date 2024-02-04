import pymongo
import requests

client = pymongo.MongoClient("mongodb+srv://ryanyhuang:ctwj2kRNIVNOV1Wd@cluster0.yualorr.mongodb.net/?retryWrites=true&w=majority")
db = client.Memotech
collection = db.embeddings

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

# for doc in collection.find({'question':{"$exists":True}}):
#    doc['plot_embedding_hf'] = generate_embedding(doc['question'])
#    collection.replace_one({'_id': doc['_id']}, doc)

def vector_search(query):

  results = collection.aggregate([
    {"$vectorSearch": {
      "queryVector": generate_embedding(query),
      "path": "plot_embedding_hf",
      "numCandidates": 100,
      "limit": 4, # num results returned
      "index": "PlotSemanticSearch",
      }}
  ])

  q_and_a = {}
  for document in results:
      q_and_a[document["question"]] = document["answer"]
    
  return q_and_a