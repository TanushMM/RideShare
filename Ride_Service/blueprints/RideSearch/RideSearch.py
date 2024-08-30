from flask import Blueprint
from flask_jwt_extended import jwt_required
from pymongo import MongoClient
from bson.objectid import ObjectId

client = MongoClient("mongodb://3.110.16.132:27017/")
db = client['rideshare']
collection = db['searches']

ridesearch_bp = Blueprint('ridesearch',__name__)

@ridesearch_bp.route("/")
def main():
    pass

