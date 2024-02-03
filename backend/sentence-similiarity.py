import cohere
import numpy as np

co = cohere.Client("VePHOLKqDhxGAQDXc10Y3CJFhJu0CpbJQXXFGaE5")

# get the embeddings
phrases = ["i love soup", "soup is my favorite", "london is far away"]

model="embed-english-v3.0"
input_type="search_query"

res = co.embed(texts=phrases,
                model=model,
                input_type=input_type,
                embedding_types=['float'])

(soup1, soup2, london) = res.embeddings.float

# compare them
def calculate_similarity(a, b):
  return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

print(calculate_similarity(soup1, soup2)) # 0.85 - very similar!
print(calculate_similarity(soup1, london)) # 0.16 - not similar!