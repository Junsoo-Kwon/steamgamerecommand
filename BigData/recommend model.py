#!/usr/bin/env python
# coding: utf-8

# In[97]:


get_ipython().run_line_magic('matplotlib', 'inline')
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats
from ast import literal_eval
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.metrics.pairwise import linear_kernel, cosine_similarity
from nltk.stem.snowball import SnowballStemmer
from nltk.stem.wordnet import WordNetLemmatizer
from nltk.corpus import wordnet
from surprise import SVD
from surprise import Dataset
from surprise.model_selection import cross_validate

import warnings; warnings.simplefilter('ignore')

import glob
import os


# In[100]:


input_file = r'C:\bigdata\gamedata' # csv파일들이 있는 디렉토리 위치
output_file = r'C:\bigdata\gamedata\steamgame.csv' # 병합하고 저장하려는 파일명

allFile_list = glob.glob(os.path.join(input_file, 'onlyapp_*')) # glob함수로 sales_로 시작하는 파일들을 모은다
print(allFile_list)
allData = [] # 읽어 들인 csv파일 내용을 저장할 빈 리스트를 하나 만든다
for file in allFile_list:
    md = pd.read_csv(file) # for구문으로 csv파일들을 읽어 들인다
    allData.append(md) # 빈 리스트에 읽어 들인 내용을 추가한다

dataCombine = pd.concat(allData, axis=0, ignore_index=True) # concat함수를 이용해서 리스트의 내용을 병합
# axis=0은 수직으로 병합함. axis=1은 수평. ignore_index=True는 인데스 값이 기존 순서를 무시하고 순서대로 정렬되도록 한다.
dataCombine.to_csv(output_file, index=False) # to_csv함수로 저장한다. 인데스를 빼려면 False로 설정


# In[101]:


md = pd.read_csv('C:/bigdata/gamedata/steamgame.csv')
md.head()


# In[102]:


all_reviews_counts = md[md['all_reviews_count'].notnull()]['all_reviews_count'].astype('int')
recent_reviews_counts = md[md['recent_reviews_count'].notnull()]['recent_reviews_count'].astype('int')
all_scores =md[md['all_reviews_percent'].notnull()]['all_reviews_percent'].astype('int')
recent_scores =md[md['recent_reviews_percent'].notnull()]['recent_reviews_percent'].astype('int')
C1 = all_scores.mean()
C2 = recent_scores.mean()
print(C1)
print(C2)


# In[103]:


m1 = all_reviews_counts.quantile(0.95)
m2 = recent_reviews_counts.quantile(0.95)
print(m1)
print(m2)


# In[104]:


md['year'] = pd.to_datetime(md['release_date'], errors='coerce').apply(lambda x: str(x).split('-')[0] if x != np.nan else np.nan)
print(md['year'])


# In[105]:


qualified1 = md[(md['all_reviews_count'] >= m1) & (md['all_reviews_count'].notnull()) & (md['all_reviews_percent'].notnull())][['name', 'year', 'all_reviews_count', 'all_reviews_percent', 'popular_tags']]
qualified1['all_reviews_count'] = qualified1['all_reviews_count'].astype('int')
qualified1['all_reviews_percent'] = qualified1['all_reviews_percent'].astype('int')
print(qualified1.shape)

qualified2 = md[(md['recent_reviews_count'] >= m2) & (md['recent_reviews_count'].notnull()) & (md['recent_reviews_percent'].notnull())][['name', 'year', 'recent_reviews_count', 'recent_reviews_percent', 'popular_tags']]
qualified2['recent_reviews_count'] = qualified2['recent_reviews_count'].astype('int')
qualified2['recent_reviews_percent'] = qualified2['recent_reviews_percent'].astype('int')
print(qualified2.shape)


# In[106]:


def all_weighted_rating(x):
    v = x['all_reviews_count']
    R = x['all_reviews_percent']
    return (v/(v+m1) * R) + (m1/(m1+v) * C1)


# In[107]:


def recent_weighted_rating(x):
    v = x['recent_reviews_count']
    R = x['recent_reviews_percent']
    return (v/(v+m2) * R) + (m2/(m2+v) * C2)


# In[108]:


qualified1['wr'] = qualified1.apply(all_weighted_rating, axis = 1)


# In[109]:


qualified2['wr'] = qualified2.apply(recent_weighted_rating, axis = 1)


# In[110]:


qualified1 = qualified1.sort_values('wr', ascending = False).head(250)


# In[111]:


qualified2 = qualified2.sort_values('wr', ascending = False).head(250)


# In[75]:


qualified1.head(15)


# In[113]:


qualified2.head(15)


# In[115]:


s = md.apply(lambda x: pd.Series(x['popular_tags']), axis=1).stack().reset_index(level=1, drop=True)
s.name = 'popular_tags'
tags_md = md.drop('popular_tags', axis=1).join(s)


# In[144]:


def build_chart(popular_tags, percentile=0.85):
    df = tags_md[tags_md['popular_tags'].str.contains(popular_tags, na = True)]
    all_reviews_counts = df[df['all_reviews_count'].notnull()]['all_reviews_count'].astype('int')
    all_reviews_percents = df[df['all_reviews_percent'].notnull()]['all_reviews_percent'].astype('int')
    C = all_reviews_percents.mean()
    m = all_reviews_counts.quantile(percentile)
    
    qualified = df[(df['all_reviews_count'] >= m) & (df['all_reviews_count'].notnull()) & (df['all_reviews_percent'].notnull())][['name', 'year', 'all_reviews_count', 'all_reviews_percent']]
    qualified['all_reviews_count'] = qualified['all_reviews_count'].astype('int')
    qualified['all_reviews_percent'] = qualified['all_reviews_percent'].astype('int')
    
    qualified['wr'] = qualified.apply(lambda x: (x['all_reviews_count']/(x['all_reviews_count'] + m) * x['all_reviews_percent']) + (m/(m+x['all_reviews_count']) * C), axis=1)
    qualified = qualified.sort_values('wr', ascending=False).head(250)
    
    return qualified


# In[146]:


build_chart('Indie').head(15)


# In[151]:


smd = md
smd.shape


# In[153]:


smd['popular_tags'] = smd['popular_tags'].fillna('')
smd['description'] = smd['game_description'] + smd['popular_tags']
smd['game_description'] = smd['game_description'].fillna('')


# In[156]:


tf = TfidfVectorizer(analyzer='word',ngram_range=(1, 2),min_df=0, stop_words='english')
tfidf_matrix = tf.fit_transform(smd['description'])


# In[158]:


tfidf_matrix.shape


# In[160]:


cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)


# In[162]:


cosine_sim[0]


# In[168]:


smd = smd.reset_index()
names = smd['name']
indices = pd.Series(smd.index, index=smd['name'])


# In[169]:


def get_recommendations(name):
    idx = indices[name]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:31]
    game_indices = [i[0] for i in sim_scores]
    return names.iloc[game_indices]


# In[174]:


get_recommendations('Stardew Valley').head(10)


# In[188]:


smd['soup'] = smd['genre'] + smd['developer'] + smd['publisher'] + smd['popular_tags']
smd['soup'] = smd['soup'].fillna('')


# In[190]:


count = CountVectorizer(analyzer='word', ngram_range=(1, 2), min_df=0, stop_words='english')
count_matrix = count.fit_transform(smd['soup'])


# In[192]:


cosine_sim = cosine_similarity(count_matrix, count_matrix)


# In[198]:


# smd = smd.reset_index()
names = smd['name']
indices = pd.Series(smd.index, index=smd['name'])


# In[200]:


get_recommendations('Stardew Valley').head(10)


# In[349]:


def improved_recommendations(_id):
    selectone = smd.query("_id == " + _id)
    name = selectone['name'].values[0]
    idx = indices[name]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:26]
    game_indices = [i[0] for i in sim_scores]
    
    games = smd.iloc[game_indices][['name', 'all_reviews_count', 'all_reviews_percent', 'year']]
    all_reviews_counts = games[games['all_reviews_count'].notnull()]['all_reviews_count'].astype('int')
    all_reviews_percents = games[games['all_reviews_percent'].notnull()]['all_reviews_percent'].astype('int')
    C = all_reviews_percents.mean()
    m = all_reviews_counts.quantile(0.60)
    qualified = games[(games['all_reviews_count'] >= m) & (games['all_reviews_count'].notnull()) & (games['all_reviews_percent'].notnull())]
    qualified['all_reviews_count'] = qualified['all_reviews_count'].astype('int')
    qualified['all_reviews_percent'] = qualified['all_reviews_percent'].astype('int')
    qualified['wr'] = qualified.apply(all_weighted_rating, axis=1)
    qualified = qualified.sort_values('wr', ascending=False).head(10)
    return qualified


# In[350]:


improved_recommendations('413150')

