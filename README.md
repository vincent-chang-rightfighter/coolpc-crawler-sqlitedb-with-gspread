# coolpc-crawler-sqlitedb-with-gspread

原價屋爬蟲配合 Sqlite3 資料庫

上傳結果至 Google Spreadsheets  

## 環境 Environment

請先安裝 Nodejs 及 Python 3

我所使用的開發環境

Nodejs 14.17.3

Python 3.7.4

## 目錄樹 File Tree

#### 若想使用自己的紀錄可以先將 ```coolpcdb.db``` 刪除
#### 程式會重新建立檔案

```
coolpc-crawler-sqlitedb-with-gspread/
├─ img/
├─ coolpcdb.db
├─ index.js
├─ package.json
├─ README.md
├─ requirements.txt
├─ run.sh
└─ SQLitetoGspreadUpdate.py
```

## 首次執行前 First Time Setup

進入該目錄

使用終端機執行安裝命令

Enter the directory

Use install command in terminal 

```shell
npm install --save
```

```shell
pip install -r requirements.txt
```

執行完之後目錄樹會像這樣:

After that File Tree would change like :

```
coolpc-crawler-sqlitedb-with-gspread/
├─ img/
├─ node_modules/
├─ coolpcdb.db
├─ index.js
├─ package.json
├─ package-lock.json
├─ README.md
├─ requirements.txt
├─ run.sh
└─ SQLitetoGspreadUpdate.py
```

## 啟用 Google Sheets API
[參考這篇文章手法](https://www.learncodewithmike.com/2021/06/pandas-and-google-sheets.html)

將 json 金鑰儲存至此目錄下並重新命名成 ``` secrettoken.json ```

並將授權帳戶添加至要修改的 Gspread 檔案中

將 Gspread 檔案開啟複製白色連結部分,如圖所示

<img src = https://raw.githubusercontent.com/vincent-chang-rightfighter/coolpc-crawler-sqlitedb-with-gspread/master/img/sheet_pic.jpg>

並打開編輯器修改 ```SQLitetoGspreadUpdate.py```

第 14 行將引號內的內容,替換成白色部分文字

儲存離開

```py
Sheet = GoogleSheets.open_by_key(
    'your_gspread_file_key')
```

##  執行 Excute


### 先執行爬蟲程式 Crawler Part Program

```shell
node index.js
```

### 再執行上傳部分 Upload Part Program

```shell
python3 SQLitetoGspreadUpdate.py
```

### 傻瓜腳本 Noob Execute File

最終目錄樹會長這樣:
```
coolpc-crawler-sqlitedb-with-gspread/
├─ img/
├─ node_modules/
├─ coolpcdb.db
├─ index.js
├─ package.json
├─ README.md
├─ requirements.txt
├─ run.sh
├─ secrettoken.json
└─ SQLitetoGspreadUpdate.py
```

我的執行的環境

Debian GNU/Linux 11

#### Linux shell script
使用終端機執行

```shell
sh run.sh
```
#### 