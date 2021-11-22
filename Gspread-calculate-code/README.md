# 如何使用
#### 使用 Apps Script 去計算上傳至 Google Spreadsheet 上的值

##### 首先至資料表點擊Apps Script

<img src = https://raw.githubusercontent.com/vincent-chang-rightfighter/coolpc-crawler-sqlitedb-with-gspread/master/img/sheet_appscript.jpg>

##### 將下列程式碼複製貼上至程式碼區域

```js

function onEdit() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];

  var range = sheet.getDataRange();
  var data  = range.getValues();
  console.log(data.length)
   for (var i=1; i<data.length; i++) {
     if(data[i][2]!==''){
      data[i][7] = (data[i][4])-(data[i][2]);
      data[i][8] = (data[i][2])/(data[i][4]);
    }else
    {
      data[i][8] = 0;
    }
  }
  range.setValues(data);
  // Logger.log(Date())
}

```

##### 選取旁邊的觸發條件

<img src = https://raw.githubusercontent.com/vincent-chang-rightfighter/coolpc-crawler-sqlitedb-with-gspread/master/img/sheet_appscript_2.jpg>

##### 接著就新增觸發條件

<img src = https://raw.githubusercontent.com/vincent-chang-rightfighter/coolpc-crawler-sqlitedb-with-gspread/master/img/sheet_appscript_3.jpg>

##### 修改成下圖所示

<img src = https://raw.githubusercontent.com/vincent-chang-rightfighter/coolpc-crawler-sqlitedb-with-gspread/master/img/sheet_appscript_4.jpg>


##### 這樣你每次更新時就會獲得價差和價差百分比