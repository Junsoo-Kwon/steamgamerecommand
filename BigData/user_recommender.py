from flask import Flask
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


db = MongoClient("mongodb://")

def load_mongodb(collectionname):
    md = pd.DataFrame(list(db['sgr'][collectionname].find()))
    return md

# In[ ]:


def all_weighted_rating(x):
    v = x['allReviewsCount']
    R = x['allReviewsPercent']
    return (v/(v+m1) * R) + (m1/(m1+v) * C1)


# In[ ]:


def recent_weighted_rating(x):
    v = x['recentReviewsCount']
    R = x['recentReviewsPercent']
    return (v/(v+m2) * R) + (m2/(m2+v) * C2)


# In[ ]:


def weighted_rating(x):
    v1 = x['allReviewsCount']
    R1 = x['allReviewsPercent']
    v2 = x['recentReviewsCount']
    R2 = x['recentReviewsPercent']
    return (((v1+v2)/2)/(((v1+m1)+(v2+m2))/2) * (R1+R2)/2) + (((m1+m2)/2)/(((m1+v1)+(m2+v2))/2) * (C1+C2)/2)


# In[ ]:
C1 = 0.0
C2 = 0.0
m1 = 0.0
m2 = 0.0

def pretreatment(md):
    md['year'] = pd.to_datetime(md['releaseDate'], errors='coerce').apply(lambda x: str(x).split('-')[0] if x != np.nan else np.nan)
    all_reviews_counts = md[md['allReviewsCount'].notnull()]['allReviewsCount'].astype('int')
    recent_reviews_counts = md[md['recentReviewsCount'].notnull()]['recentReviewsCount'].astype('int')
    all_scores =md[md['allReviewsPercent'].notnull()]['allReviewsPercent'].astype('int')
    recent_scores =md[md['recentReviewsPercent'].notnull()]['recentReviewsPercent'].astype('int')
    global C1
    C1 = all_scores.mean()
    global C2
    C2 = recent_scores.mean()
    global m1
    m1 = all_reviews_counts.quantile(0.7)
    global m2
    m2 = recent_reviews_counts.quantile(0.7)
    smd = md
    smd['popularTags'] = smd['popularTags'].fillna('')
    smd['description'] = smd['gameDescription'] + smd['popularTags']
    smd['gameDescription'] = smd['gameDescription'].fillna('')
    
    return smd
    
def indexing(smd):
    smd = smd.reset_index()
    names = smd['name']
    gameids = smd['_id']
    indices = pd.Series(smd.index, index=smd['_id'])
    return indices
    


smd = pretreatment(load_mongodb('gameinfo'))
indices = indexing(smd)
# In[ ]:


def tfidf():
    tf = TfidfVectorizer(analyzer='word',ngram_range=(1, 2),min_df=0, stop_words='english')
    tfidf_matrix = tf.fit_transform(smd['description'].values.astype('U'))
    return tfidf_matrix

tfidf_matrix = tfidf()
# In[ ]:


def cos_sim():
    cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
    return cosine_sim
cosine_sim = cos_sim()

# In[ ]:

# #user_recommend_cos, gamecheck, get_survey_game_list는 improved_recommendations에서 호출함. 인자 userid

# In[ ]:


def user_recommend_cos(survey_game_id):
    tot_sim_scores = []
    for game_id in survey_game_id:
#         selectone = smd.query("_id == " + str(game_id))
#         name = selectone['name'].values[0]
#         idx = indices[name]
        idx = indices[game_id]
        sim_scores = list(enumerate(cosine_sim[idx]))
        for i, score in enumerate(sim_scores):
            if len(tot_sim_scores) <= i:
                tot_sim_scores.insert(i, score)
            else:
                tot_sim_scores[i] = (tot_sim_scores[i][0], tot_sim_scores[i][1] + score[1])
                
    game_count = len(survey_game_id)
    for (i, sim_score) in enumerate(tot_sim_scores):
        sim_score = (sim_score[0], sim_score[1]/game_count)
        tot_sim_scores[i] = sim_score
        
    return tot_sim_scores


# In[ ]:


def gamecheck(gameid, data):
    mygames = []
    for mygamedata in data['games']:
        mygames.append(mygamedata['appid'])
    if gameid in mygames:
        return True
    else:
        return False


# In[ ]:


def get_survey_game_list(userid):
    db = MongoClient("mongodb://")
    userinfo = list(db['sgr']['users'].find({'_id':userid}, {'survey_game_id' : 1}))
    survey_game_list = userinfo[0]['survey_game_id']
    return survey_game_list


# In[ ]:


def improved_recommendations(userid):
    
    survey_list = get_survey_game_list(str(userid))
    survey_game_id = survey_list
    sim_scores = user_recommend_cos(survey_game_id)
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:100]
    game_indices = [i[0] for i in sim_scores]
    
    games = smd.iloc[game_indices][['_id', 'name', 'allReviewsCount', 'allReviewsPercent', 'recentReviewsCount', 'recentReviewsPercent', 'year']]
    
    url = 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=11B61EB5984F1F23A3991FC9C24A0E0A&steamid=' + str(userid)
    req = requests.get(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.18363"})
    data = req.json()['response']
    
    for game_id in survey_game_id:
        idx = indices[game_id]
        for gidx in games.index.values:
            if(gidx == idx):
                games = games.drop(idx)
                break
                
    gameidlist = list(games['_id'])
    res = bool(data)
    if res:
        for game_id in gameidlist:
            if(gamecheck(game_id, data)):
                idx = indices[game_id]
                games = games.drop(idx)
            
        
    all_reviews_counts = games[games['allReviewsCount'].notnull()]['allReviewsCount'].astype('int')
    all_reviews_percents = games[games['allReviewsPercent'].notnull()]['allReviewsPercent'].astype('int')
    recent_reviews_counts = games[games['recentReviewsCount'].notnull()]['recentReviewsCount'].astype('int')
    recent_reviews_percents = games[games['recentReviewsPercent'].notnull()]['recentReviewsPercent'].astype('int')
    C = all_reviews_percents.mean()
    C2 = recent_reviews_percents.mean()
    m = all_reviews_counts.quantile(0.40)
    m2 = recent_reviews_counts.quantile(0.40)
    qualified = games[(games['allReviewsCount'] >= m) & (games['allReviewsCount'].notnull()) & (games['allReviewsPercent'].notnull())]
    qualified = games[(games['recentReviewsCount'] >= m2) & (games['recentReviewsCount'].notnull()) & (games['recentReviewsPercent'].notnull())]
    qualified['allReviewsCount'] = qualified['allReviewsCount'].fillna(0).astype('int')
    qualified['allReviewsPercent'] = qualified['allReviewsPercent'].fillna(0).astype('int')
    qualified['recentReviewsCount'] = qualified['recentReviewsCount'].fillna(0).astype('int')
    qualified['recentReviewsPercent'] = qualified['recentReviewsPercent'].fillna(0).astype('int')
    qualified['wr'] = qualified.apply(weighted_rating, axis=1)
    qualified = qualified.sort_values('wr', ascending=False).head(30)
    
    json_data = ""
    query = "{'$or':["
    for game_id in list(qualified['_id']):
        query += "{'_id':" + str(game_id) + "},"
    query = query[:-1] + "]}"
    json_str = query.replace("'", "\"")
    p_json = json.loads(json_str)
    json_data = dumps(db['sgr']['gameinfo'].find(p_json))
    result = json.loads(json_data)    
    
    return result


# In[ ]:


def recommender_main(user_id):
    return improved_recommendations(user_id)
    

