#!/usr/bin/env python
# coding: utf-8

# In[18]:


import pandas as pd
data = pd.read_csv("./steam_games_gameid_add.csv")


# In[19]:


data = data[data['types'] == "app"]
new_data = pd.DataFrame(columns = ['all_reviews_count', 'all_reviews_percent'])
for i in data.index:
    all_reviews_percent = str(data["all_reviews"][i]).split("%")[0][-2:]
    count = ""
    try:
        for j in str(data["all_reviews"][i].split("%")[1]).split()[2]:
            if j !=',':
                count = count + j
        all_reviews_count = count
    except:
        all_reviews_count = str(data["all_reviews"][i]).split()[0]
        all_reviews_percent = "NaN"
    #print(all_reviews_count + " " + all_reviews_percent)
    new_data = new_data.append(pd.DataFrame([[data["_id"][i], all_reviews_count, all_reviews_percent]], columns=['_id', 'all_reviews_count', 'all_reviews_percent']))
new_data = pd.merge(data, new_data, on = "_id")


# In[20]:


new_data


# In[21]:


data
new_data2 = pd.DataFrame(columns = ['recent_reviews_count', 'recent_reviews_percent'])
for i in data.index:
    recent_reviews_percent = str(data["recent_reviews"][i]).split("%")[0][-2:]
    count = ""
    try:
        for j in str(data["recent_reviews"][i].split("%")[1]).split()[2]:
            if j !=',':
                count = count + j
        recent_reviews_count = count
    except:
        recent_reviews_count = str(data["recent_reviews"][i]).split()[0]
        recent_reviews_percent = "NaN"
    #print(all_reviews_count + " " + all_reviews_percent)
    new_data2 = new_data2.append(pd.DataFrame([[data["_id"][i], recent_reviews_count, recent_reviews_percent]], columns=['_id', 'recent_reviews_count', 'recent_reviews_percent']))


# In[22]:


new_data3 = pd.merge(new_data, new_data2, on = "_id")


# In[25]:


new_data3


# In[27]:


reviews_pro = new_data3[['_id', 'url', 'name', 'desc_snippet', 'recent_reviews_count', 'recent_reviews_percent', 'all_reviews_count', 'all_reviews_percent', 'release_date', 'developer', 'publisher', 'popular_tags', 'game_details', 'languages', 'achievements', 'genre', 'game_description', 'mature_content', 'minimum_requirements', 'recommended_requirements', 'original_price']]


# In[40]:


reviews_pro


# In[37]:


for i in reviews_pro.index:
    if reviews_pro["recent_reviews_count"][i] == "nan":
        reviews_pro["recent_reviews_count"][i] = float("nan")
    if reviews_pro["all_reviews_count"][i] == "nan":
        reviews_pro["all_reviews_count"][i] = float("nan")


# In[38]:


appdf1 = reviews_pro[0:13000]
appdf2 = reviews_pro[13001:26000]
appdf3 = reviews_pro[26001:39000]


# In[39]:


appdf1.to_csv("./onlyapp_games_1.csv", header=True, index=False)
appdf2.to_csv("./onlyapp_games_2.csv", header=True, index=False)
appdf3.to_csv("./onlyapp_games_3.csv", header=True, index=False)

