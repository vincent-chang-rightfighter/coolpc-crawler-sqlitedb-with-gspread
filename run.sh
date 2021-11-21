#!/bin/bash
while [ 1 ] ;do
    echo "start run"
    sleep 5
    node index.js
    sleep 10
    echo "crawler finish"
    python3 SQLitetoGspreadUpdate.py
    sleep 5
    echo "Gspread Update finish"
    echo "sleep 40 second to re run"
    sleep 40
done