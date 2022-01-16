#!/usr/bin/env python
# coding: utf-8

# In[1]:


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

db = MongoClient("mongodb://SSAFYMONGO:ssafyadmin1234@j3b305.p.ssafy.io:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false")


# In[2]:


def load_mongodb(collectionname):
    df = pd.DataFrame(list(db['sgr'][collectionname].find()))
    return df

def tag_split(mode, df):
    if mode == 0:
        s = allTags(df)
    else:
        s = selectTags(df)
        
    s.name = 'popularTags'
    tags_df = df.drop('popularTags', axis=1).join(s)
    return tags_df

def allTags(df):
    s = df.apply(lambda x: pd.Series(x['popularTags']), axis=1).stack().reset_index(level=1, drop=True)
    return s   


# In[ ]:


def selectTags(df):
    s = df.apply(lambda x: pd.Series(x['popularTags'].split(",")), axis=1).stack().reset_index(level=1, drop=True)
    return s


# In[3]:


# In[ ]:



def all_build_chart(popularTags, tags_df):
    df = tags_df[tags_df['popularTags'].str.contains(popularTags, na = True)]
    all_reviews_counts = df[df['allReviewsCount'].notnull()]['allReviewsCount'].astype('int')
    all_reviews_percents = df[df['allReviewsPercent'].notnull()]['allReviewsPercent'].astype('int')
    C = all_reviews_percents.mean()
    m = all_reviews_counts.quantile(0.7)
    
    qualified = df[(df['allReviewsCount'] >= m) & (df['allReviewsCount'].notnull()) & (df['allReviewsPercent'].notnull())][['_id','name', 'allReviewsCount', 'allReviewsPercent', 'popularTags', 'genre', 'gameDetails']]
    qualified['allReviewsCount'] = qualified['allReviewsCount'].astype('int')
    qualified['allReviewsPercent'] = qualified['allReviewsPercent'].astype('int')
    
    qualified['wr'] = qualified.apply(lambda x: (x['allReviewsCount']/(x['allReviewsCount'] + m) * x['allReviewsPercent']) + (m/(m+x['allReviewsCount']) * C), axis=1)
    qualified = qualified.sort_values('wr', ascending=False).head(30)
    
    json_data = ""
    query = "{'$or':["
    for game_id in list(qualified['_id']):
        query += "{'_id':" + str(game_id) + "},"
    query = query[:-1] + "]}"
    json_str = query.replace("'", "\"")
    p_json = json.loads(json_str)
    json_data = dumps(db['sgr']['gameinfo'].find(p_json))
    #result = json.loads(json_data)
    
    return json_data


# In[4]:


# In[ ]:
df = load_mongodb('gameinfo')
all_list = tag_split(0, df)
tag_list = tag_split(1, df)


# In[5]:


def select_main(tagname, mode):
    if mode == 0:
        return all_build_chart(tagname, all_list)
    else:
        return all_build_chart(tagname, tag_list)


# In[8]:


userdf = pd.DataFrame(list(db['sgr']['users'].find()))


# In[32]:


def tag_total(userid):
    temp = sorted(list(userdf[userdf['_id'].isin([userid])]['popularTags'])[0].items(), key=(lambda x: x[1]), reverse = True)[:10]
    output_list = "{"
    for num in temp:
        output_list += "\"" + num[0] + "\":" + json.dumps(select_main(num[0], 1))
        output_list += ","
    output_list = output_list[:-1]
    output_list += "}"
    tojson = json.loads(output_list)
    return tojson
# with open('C:\\SSAFY\\bigdata\\gogoogo.json', 'w', encoding='utf-8') as make_file:
#     json.dump(tojson, make_file)

