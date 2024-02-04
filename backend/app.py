from flask import Flask, jsonify, redirect, render_template, request, url_for
import pymongo
from bson import json_util
# import json

# import os

# import openai

from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# openai.api_key = "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"
# os.environ["OPEN_API_KEY"] = "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"
# os.environ["ATLAS_CONNECTION_STRING"] = "mongodb+srv://ryanyhuang:ctwj2kRNIVNOV1Wd@cluster0.yualorr.mongodb.net/?retryWrites=true&w=majority"
# client = pymongo.MongoClient(os.environ["ATLAS_CONNECTION_STRING"])
# db = client.Memotech
# collection = db.embeddings

# Configure MongoDB connection
app.config['MONGO_URI'] = 'mongodb+srv://dasomi04:Ys78O453Etbhe7IZ@cluster1.29ruiho.mongodb.net/?retryWrites=true&w=majority'
mongo = pymongo.MongoClient(app.config['MONGO_URI'])
db = mongo.get_database('MemoTech')
collection = db['sat words']

@app.route('/', methods=['GET'])
def home():
    data_from_mongo = collection.find({})
    json_data = json_util.dumps(data_from_mongo)
    return jsonify(message='Hello, MongoDB with Flask!', data_from_mongo=json_data)

@app.route('/', methods=['POST'])
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

# @app.route("/get-feedback")
# def index():
#     question = request.args.get('q')
#     answer = request.args.get('a')
#     completion = openai.chat.completions.create(
#         model="gpt-3.5-turbo",
#         messages=[
#             {"role": "system", "content": "You are a grader, giving a student feedback for their answer to their question"},
#             {"role": "user", "content": f"The question is '{question}' and they responded with '{answer}'. In your response, first say whether the student's answer is correct (either Yes or No). Then, give them feedback to help guide them to the correct answer without saying the answer"}
#         ]
#     )

#     completion_message = completion.choices[0].message.content
#     print(completion_message)
#     response = jsonify({"message": completion_message})

#     return response

if __name__ == '__main__':
    app.run(debug=True, port=5000)