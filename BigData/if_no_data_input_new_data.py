import requests
import pandas as pd
from pymongo import MongoClient
from bs4 import BeautifulSoup
import json

# In[2]:


db = MongoClient("mongodb://")
db_sgr_gameinfo = db['sgr']['gameinfo']


# In[3]:


def getdata(soup, _id):
    tempdf = pd.DataFrame(columns = ['_id', 'url','name','descSnippet','recentReviewsCount', 'recentReviewsPercent', 'allReviewsCount', 'allReviewsPercent', 'releaseDate','developer','publisher','popularTags','gameDetails','languages','achievements','genre','gameDescription','matureContent','minimumRequirements','recommendedRequirements','originalPrice'
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
    tempdf = tempdf.append({'_id':_id,'url' : url,'name' : name ,'descSnippet' : desc_snippet,'recentReviewsCount' : int(recent_reviews_count), 'recentReviewsPercent' : int(recent_reviews_percent), 'allReviewsCount' : int(all_reviews_count), 'allReviewsPercent' : int(all_reviews_percent),'releaseDate' : release_date,'developer' : developer,'publisher' : publisher ,'popularTags' : popular_tags,'gameDetails' : game_details,'languages' : languages ,'achievements' : achievements,'genre' : genre,'gameDescription' : game_description,'matureContent' : mature_content,'minimumRequirements' : minimum_requirements,'recommendedRequirements' : recommended_requirements,'originalPrice' : original_price
                    }, ignore_index=True)
    return tempdf


# In[4]:


def gameexistInDB(collection, gameid):
    check = False;
    #pr = collection.find_one({"_id" : gameid})
    if collection.find_one({"_id" : gameid}):
        check = True
    return check


# In[11]:


def gamecheck_and_input(collection, _id):
    if gameexistInDB(collection, _id) == False:
        new_data = pd.DataFrame(columns = ['_id', 'url','name','descSnippet','recentReviewsCount', 'recentReviewsPercent', 'allReviewsCount', 'allReviewsPercent', 'releaseDate','developer','publisher','popularTags','gameDetails','languages','achievements','genre','gameDescription','matureContent','minimumRequirements','recommendedRequirements','originalPrice'
    ])
        url = "https://store.steampowered.com/app/" + str(_id)
        req = requests.get(url)
        html = req.text
        soup = BeautifulSoup(html, 'html.parser')
        try:
            new_id = int(soup.find("div",{"class": "glance_details"}).find("a").get('href').split("/")[4])
            url = "https://store.steampowered.com/app/" + str(_id)
            req = requests.get(url)
            html = req.text
            soup = BeautifulSoup(html, 'html.parser')
            new_data = new_data.append(getdata(soup, new_id))
        except AttributeError:
            new_data = new_data.append(getdata(soup, _id))
        new_data['releaseDate'] = pd.to_datetime(new_data['releaseDate'])
    
    collection.insert(json.loads(new_data.T.to_json()).values())


# In[15]:

def ifmain(gameid):
    gamecheck_and_input(db_sgr_gameinfo, gameid)

