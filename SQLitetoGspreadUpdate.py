# coding: utf-8
import sqlite3
import gspread
from oauth2client.service_account import ServiceAccountCredentials as SAC
from gspread.models import Cell

Url = ['https://spreadsheets.google.com/feeds']
con = sqlite3.connect('coolpcdb.db')

Connect = SAC.from_json_keyfile_name('secrettoken.json', Url)
GoogleSheets = gspread.authorize(Connect)

Sheet = GoogleSheets.open_by_key(
    'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
Sheets = Sheet.sheet1
dataTitle = ["品名", "類別", "價格", "更新時間", "開機後第一次取得價格",
             "開機後第一次取得時間", "本紀錄最低價", "價差", "價差百分比"]

cur = con.cursor()
sqlite_read_from = cur.execute(
    'SELECT rowid AS id, name , class , price , date , old_price , old_date , low_price FROM Stuff;')
cells = []
for i in range(len(dataTitle)):
    cells.append(Cell(row=1, col=(i+1), value=dataTitle[i]))

counter_i = 2
for row in sqlite_read_from:

    cells.append(Cell(row=counter_i, col=1, value=row[1]))
    cells.append(Cell(row=counter_i, col=2, value=row[2]))
    cells.append(Cell(row=counter_i, col=3, value=row[3]))
    cells.append(Cell(row=counter_i, col=4, value=row[4]))
    cells.append(Cell(row=counter_i, col=5, value=row[5]))
    cells.append(Cell(row=counter_i, col=6, value=row[6]))
    cells.append(Cell(row=counter_i, col=7, value=row[7]))
    counter_i += 1

con.close()
Sheets.update_cells(cells)
