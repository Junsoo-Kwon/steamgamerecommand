#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd # 데이터프레임 사용을 위해
from math import log # IDF 계산을 위해
import numpy as np


# In[2]:


steamdb = pd.read_csv("./steam_games.csv")
docs = steamdb["popular_tags"]
docs


# In[4]:


tags = list(set(
w for doc in docs for w in str(doc).split(",")
))


# In[5]:


tags.sort()
tags


# In[6]:


N = len(docs) # 총 문서의 수

def tf(t, d):
    return d.count(t)

def idf(t):
    df = 0
    for doc in docs:
        df += t in str(doc)
    return log(N/(df + 1))

def tfidf(t, d):
    return tf(t,d)* idf(t)


# In[7]:


result = []
for i in range(N): # 각 문서에 대해서 아래 명령을 수행
    result.append([])
    d = str(docs[i])
    for j in range(len(tags)):
        t = tags[j]        
        result[-1].append(tf(t, d))

tf_ = pd.DataFrame(result, columns = tags)
tf_


# In[8]:


result = []
for j in range(len(tags)):
    t = tags[j]
    result.append(idf(t))

idf_ = pd.DataFrame(result, index = tags, columns = ["IDF"])
idf_


# In[ ]:


result = []
for i in range(N):
    result.append([])
    d = str(docs[i])
    for j in range(len(tags)):
        t = tags[j]

        result[-1].append(tfidf(t,d))

tfidf_ = pd.DataFrame(result, columns = tags)
tfidf_


# In[8]:


docstemp = [
  '먹고 싶은 사과',
  '먹고 싶은 바나나',
  '길고 노란 바나나 바나나',
  '저는 과일이 좋아요'
] 


# In[37]:


docstemp[0].split()


# In[29]:


vocab = list(set(w for doc in docstemp for w in doc.split()))
vocab.sort()


# In[34]:


vocab


# In[131]:


N = len(docstemp) # 총 문서의 수

def tf(t, d):
    return d.count(t)

def idf(t):
    df = 0
    for doc in docstemp:
        df += t in doc
    return log(N/(df + 1))

def tfidf(t, d):
    return tf(t,d)* idf(t)


# In[132]:


result = []
for j in range(len(vocab)):
    t = vocab[j]
    result.append(idf(t))

idf_ = pd.DataFrame(result, index = vocab, columns = ["IDF"])
idf_


# In[121]:


t = vocab[1]
idf(t)


# In[64]:


t = vocab[2]
result[-1].append(tf(t, d))
result

