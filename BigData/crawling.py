#!/usr/bin/env python
# coding: utf-8

# In[2]:


import pandas as pd
import csv
import json
import requests
import time
import os

num = input("숫자 입력 ( 0 ~ 14 )")

start = (2720 * int(num)) + 1
end = (2720 * int(num)) + 2720

data = pd.read_csv("./steam_games.csv")
df = data[{'url', 'types', 'name'}]
gamedf = pd.DataFrame(df.url.str.split('/').tolist())
df_gameid = gamedf[{4}]
data = df_gameid[start:end]
list_g = data.values.tolist()
game_columns = [{ "gameid", "history"}]

i = 0
if not os.path.exists('./gamehistory/'):
    os.makedirs('./gamehistory/')
    
for appid in list_g:
    print(str(i) + ' / '+str(len(list_g)), end='')
    i = i + 1
    print(" - 예상 남은 시간 : " + str((len(list_g)-i)*7/60) + "분")
    url = 'https://steamdb.info/api/GetPriceHistory/?appid=' + str(appid)[2:-2] + '&cc=kr'
    req = requests.get(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.18363"})
    tempdata = req.json()
    
    if i % 50 == 0:
        print("50개 경과 - 2분 휴식합니다.")
        time.sleep(120)
    
    if tempdata['success']:
        filename = './gamehistory/' + str(appid)[2:-2] + '.json'
        with open(filename, 'w', encoding='utf-8') as make_file:
            json.dump(tempdata, make_file, indent="\t")
        for timet in range(1, 6):
            print("■", end='')
            time.sleep(1)
        print("appid : ", end='')
        print(appid)
    else:
        print("크롤링 막힘 =================================================== " + str(appid) + "는 다시 할 것")
        text = open('./gamehistory/' + str(appid)[2:-2] + ".txt", 'w')
        print("10분 대기합니다.")
        time.sleep(600)
    

