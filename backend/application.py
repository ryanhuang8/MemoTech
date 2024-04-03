from flask import Flask, jsonify, redirect, render_template, request, url_for
import pymongo
from bson import json_util
from vector_search import vector_search
# import json

import os

import openai

from flask_cors import CORS

from dotenv import load_dotenv
from pathlib import Path

# load .env file
dotenv_path = Path('/Users/ericcho/Desktop/cs/MemoTech/backend/.env')
load_dotenv(dotenv_path=dotenv_path)

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
MONGO_URI = os.getenv('MONGO_URI')
# MONGO_URI_RYAN = os.getenv('MONGO_URI_RYAN')
STATUS = os.getenv('STATUS')
PORT = os.getenv('DEV_PORT') if STATUS == 'development' else os.getenv('PROD_PORT') # String
PORT = int(PORT)

application = Flask(__name__)
CORS(application)
openai.api_key = OPENAI_API_KEY
os.environ["OPEN_API_KEY"] = OPENAI_API_KEY
# os.environ["ATLAS_CONNECTION_STRING"] = MONGO_URI_RYAN
# client = pymongo.MongoClient(os.environ["ATLAS_CONNECTION_STRING"])
# db = client.Memotech
# collection = db.embeddings

# Configure MongoDB connection
application.config['MONGO_URI'] = MONGO_URI
mongo = pymongo.MongoClient(application.config['MONGO_URI'])
db = mongo.get_database('Database')
collection = db['vector_search']

@application.route('/', methods=['GET'])
def home():
    data_from_mongo = collection.find({})
    json_data = json_util.dumps(data_from_mongo)
    return jsonify(message='Hello, MongoDB with Flask!', data_from_mongo=json_data)

@application.route('/', methods=['POST'])
def post_data():
    # Retrieve data from the request's JSON payload
    request_data = request.get_json()

    # completion_message = completion.choices[0].message.content
    # print(completion_message)
    # response = {"message": completion_message}

    # Your logic to process or store the data goes here
    processed_data = {'message': 'Data received successfully', 'received_data': request_data}

    result = collection.insert_many(request_data)

    return jsonify(processed_data)

@application.route("/get-feedback")
def index():
    question = request.args.get('q')
    answer = request.args.get('a')
    completion = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a grader, giving a student feedback for their answer to their question"},
            {"role": "user", "content": f"The question is '{question}' and they responded with '{answer}'. In your response, first say whether the student's answer is correct (either Yes or No). Then, give them feedback to help guide them to the correct answer without saying the answer"}
        ]
    )

    completion_message = completion.choices[0].message.content

    response = jsonify({"message": completion_message})

    return response

@application.route("/vector-search")
def vec_search():
    # query = request.args.get('query')
    # return vector_search(query)
    return {1 : '[{"id":1,"question":"","answer":""}]'}

if __name__ == '__main__':
    application.run(debug=True, port=PORT)