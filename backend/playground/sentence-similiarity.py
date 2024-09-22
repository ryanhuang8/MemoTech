import cohere
import numpy as np

import os
from dotenv import load_dotenv
from pathlib import Path

# load .env file
dotenv_path = Path('/Users/ericcho/Desktop/cs/MemoTech/backend/.env')
load_dotenv(dotenv_path=dotenv_path)

COHERE_API_KEY = os.getenv('COHERE_API_KEY')

co = cohere.Client(COHERE_API_KEY)

def calculate_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

def similarity_score(real, input):
    # get the embeddings
    phrases = [real, input]

    model="embed-english-v3.0"
    input_type="search_query"

    res = co.embed(texts=phrases,
                    model=model,
                    input_type=input_type,
                    embedding_types=['float'])

    (r, i) = res.embeddings.float

    # compare them
    return calculate_similarity(r, i)

print(similarity_score('50','fifty'))