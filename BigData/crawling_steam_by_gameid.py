#!/usr/bin/env python
# coding: utf-8

# In[20]:


import requests
from bs4 import BeautifulSoup
import pandas as pd
data = pd.read_csv("./survey_game.csv")


# In[21]:


for i in range(0, 40):
    for j in range(1, 10):
        print(data.loc[i][j])


# In[22]:


new_data = pd.DataFrame(columns = ['_id', 'url','name','desc_snippet','recent_reviews_count', 'recent_reviews_percent', 'all_reviews_count', 'all_reviews_percent', 'release_date','developer','publisher','popular_tags','game_details','languages','achievements','genre','game_description','mature_content','minimum_requirements','recommended_requirements','original_price'
])


# In[23]:


new_data


# In[24]:


def getdata(soup):
    tempdf = pd.DataFrame(columns = ['_id', 'url','name','desc_snippet','recent_reviews_count','recent_reviews_percent','all_reviews_count', 'all_reviews_percent','release_date','developer','publisher','popular_tags','game_details','languages','achievements','genre','game_description','mature_content','minimum_requirements','recommended_requirements','original_price'
])
    url = soup.find('link', rel='canonical').get('href')
    name = soup.find('div',class_='apphub_AppName').text
    webtoon_area = soup.find("div",{"class": "game_description_snippet"})
    for child in webtoon_area.children:
        child.strip()
    desc_snippet = child.strip()
    try:
        recent_reviews = soup.find_all("span",{"class": "nonresponsive_hidden responsive_reviewdesc"})[0].text.strip()
        recent_reviews_percent = str(recent_reviews).split("%")[0][-2:]
        count = ""
        try:
            for j in str(recent_reviews.split("%")[1]).split()[2]:
                if j !=',':
                    count = count + j
            recent_reviews_count = count
        except:
            recent_reviews_count = str(recent_reviews).split()[0]
            recent_reviews_percent = float("NaN")
        #print(all_reviews_count + " " + all_reviews_percent)


    except:
        recent_reviews_count = float("NaN")
        recent_reviews_percent = float("NaN")
    try:
        all_reviews = soup.find_all("span",{"class": "nonresponsive_hidden responsive_reviewdesc"})[1].text.strip()
        all_reviews_percent = str(all_reviews).split("%")[0][-2:]
        count = ""
        try:
            for j in str(all_reviews.split("%")[1]).split()[2]:
                if j !=',':
                    count = count + j
            all_reviews_count = count
        except:
            all_reviews_count = str(all_reviews).split()[0]
            all_reviews_percent = float("NaN")
        #print(all_reviews_count + " " + all_reviews_percent)

    except:
        all_reviews_count = float("NaN")
        all_reviews_percent = float("NaN")
        
    release_date = soup.find("div",{"class": "date"}).text
    developer = soup.find_all("div",{"class": "dev_row"})[0].find("a").text
    publisher = soup.find_all("div",{"class": "dev_row"})[1].find("a").text
    popular_tags = ""
    for i in soup.find_all("a",{"class": "app_tag"}):
        popular_tags += i.get_text().strip() + ","
    popular_tags = popular_tags[:-1]
    try:
        achievements = soup.find("div",{"id": "achievement_block"}).find("a").text.split()[1]
    except:
        achievements = float("NaN")
    game_details = ""
    for i in soup.find_all("div",{"class": "game_area_details_specs"}):
        game_details += i.get_text().strip() + ","
    game_details = game_details[:-1]
    languages = ""
    for i in soup.find_all("td",{"class": "ellipsis"}):
        languages += i.get_text().strip() + ","
    languages = languages[:-1]
    genre = ""
    for i in soup.find("div",{"class": "details_block"}).find_all("a")[:-2]:
        genre += i.get_text() + ","
    genre = genre[:-1]
    game_description = soup.find("div",{"class": "game_area_description"}).text.strip()
    try:  
        mature_content = soup.find_all("div",{"class": "game_area_description"})[1].text.strip()
    except:
        mature_content = float("NaN")
    try:
        minimum_requirements = soup.find("div",{"class": "game_area_sys_req_leftCol"}).text.strip()
        recommended_requirements = soup.find("div",{"class": "game_area_sys_req_rightCol"}).text.strip()
    except:
        minimum_requirements = float("NaN")
        recommended_requirements = float("NaN")
    try:
        original_price_temp = soup.find("div",{"class": "game_purchase_price price"})
        for child in original_price_temp.children:
            child.strip()
        original_price = child.strip()
    except:
        original_price = "Free"
    tempdf = tempdf.append({'_id':_id,'url' : url,'name' : name ,'desc_snippet' : desc_snippet,'recent_reviews_count' : recent_reviews_count, 'recent_reviews_percent' : recent_reviews_percent, 'all_reviews_count' : all_reviews_count, 'all_reviews_percent' : all_reviews_percent,'release_date' : release_date,'developer' : developer,'publisher' : publisher ,'popular_tags' : popular_tags,'game_details' : game_details,'languages' : languages ,'achievements' : achievements,'genre' : genre,'game_description' : game_description,'mature_content' : mature_content,'minimum_requirements' : minimum_requirements,'recommended_requirements' : recommended_requirements,'original_price' : original_price
                    }, ignore_index=True)
    return tempdf


# In[25]:


for i in range(0, 40):
    for j in range(1, 10):
        _id = data.loc[i][j]
        #gameid = 1149640
        url = "https://store.steampowered.com/app/" + str(_id)
        req = requests.get(url)
        html = req.text
        soup = BeautifulSoup(html, 'html.parser')
        try:
            _id = soup.find("div",{"class": "glance_details"}).find("a").get('href').split("/")[4]
            url = "https://store.steampowered.com/app/" + str(_id)
            req = requests.get(url)
            html = req.text
            soup = BeautifulSoup(html, 'html.parser')
            new_data = new_data.append(getdata(soup))
        except AttributeError:
            new_data = new_data.append(getdata(soup))
       


# In[26]:


new_data


# In[27]:


new_data.to_csv("./survey_game_list.csv")


# In[32]:


new_data[0:40].to_csv("./survey_game_list_1.csv")
new_data[41:80].to_csv("./survey_game_list_2.csv")


# In[10]:





# In[9]:


new_data2.rename(columns={'gameid' : '_id'}).to_csv("./survey_game_list.csv")

