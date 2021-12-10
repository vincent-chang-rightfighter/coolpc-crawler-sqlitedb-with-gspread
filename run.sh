#!/bin/bash
while [ 1 ] ;do
    echo "Start run"
    sleep 5
    echo "Start crawler"
    node index.js
    sleep 10
    echo "Start Gspread Update"
    python3 SQLitetoGspreadUpdate.py
    sleep 5
    echo "Sleep 40 second to re-run"
    sleep 40
done