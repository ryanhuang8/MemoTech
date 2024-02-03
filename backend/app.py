from flask import Flask, jsonify
from pymongo import MongoClient
from bson import json_util

app = Flask(__name__)

# Configure MongoDB connection
app.config['MONGO_URI'] = 'mongodb+srv://dasomi04:Ys78O453Etbhe7IZ@cluster1.29ruiho.mongodb.net/?retryWrites=true&w=majority'
mongo = MongoClient(app.config['MONGO_URI'])
db = mongo.get_database('MemoTech')
collection = db['sat words']

@app.route('/')
def home():
    data_from_mongo = collection.find_one({})
    json_data = json_util.dumps(data_from_mongo)
    return jsonify(message='Hello, MongoDB with Flask!', data_from_mongo=json_data)

if __name__ == '__main__':
    app.run(debug=True)