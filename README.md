# coolpc-crawler-sqlitedb-with-gspread

原價屋爬蟲配合 Sqlite3 資料庫

上傳結果至 Google Spreadsheets  

## 環境 Environment

請先安裝 Nodejs 及 Python 3

我所使用的開發環境

Nodejs 14.17.3

Python 3.7.4

## 目錄樹 File Tree

```
coolpc-crawler-sqlitedb-with-gspread/
├─ coolpcdb.db
├─ index.js
├─ package.json
├─ README.md
├─ requirements.txt
└─ SQLitetoGspreadUpdate.py
```

## 首次執行前 First Time Setup

進入該目錄

使用終端機執行安裝命令

Enter the directory

Use install command in terminal 

```cmd
npm install --save
```

```cmd
pip install -r requirements.txt
```

執行完之後目錄樹會像這樣:

After that File Tree would change like :

```
coolpc-crawler-sqlitedb-with-gspread/
├─ node_modules/
├─ coolpcdb.db
├─ index.js
├─ package.json
├─ README.md
├─ requirements.txt
└─ SQLitetoGspreadUpdate.py
```

## 啟用 Google Sheets API
[參考這篇文章手法](https://www.learncodewithmike.com/2021/06/pandas-and-google-sheets.html)

##  執行 Excute

### 先執行爬蟲程式 Crawler Part Program

```cmd 
node index.js
```

### 再執行上傳部分 Upload Part Program

```cmd
python3 SQLitetoGspreadUpdate.py
```

### 傻瓜腳本 Noob Execute File 
#### Coming soon