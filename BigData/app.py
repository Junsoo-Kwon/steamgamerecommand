from flask import Flask
import flask_cors CORS, cross_origin
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.metrics.pairwise import linear_kernel, cosine_similarity

import warnings; warnings.simplefilter('ignore')

import requests
from pymongo import MongoClient
import json
from bson.json_util import dumps
from bs4 import BeautifulSoup

app = Flask (__name__)

CORS(app)

db = MongoClient("mongodb://SSAFYMONGO:ssafyadmin1234@j3b305.p.ssafy.io:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false")

import tag_recommend as tag_re
import user_recommender as user_re
    
@app.route('/custom/game/all')
def tag_main_all():
    return tag_re.select_main('', 0)
    

@app.route('/custom/user/<userid>')
def user_main(userid):
    tagjson = tag_re.tag_total(userid)
    userjson = user_re.recommender_main(userid)
    
    tagstr = json.dumps(tagjson)
    userstr = json.dumps(userjson)
    
    result = ""
    result += "{" + "\"userTotalRecommend\" : " + userstr + "," + "\"tagTotalRecommend\" : " + tagstr + "}"
    
    return result
 
if __name__ == "__main__":
    #app.run(host='172.26.0.145', port=5500)
    #app.run(host='127.0.0.1', port=5500)
    app.run(host='0.0.0.0', port=5500)