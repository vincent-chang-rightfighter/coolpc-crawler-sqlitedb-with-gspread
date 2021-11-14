const got = require('got');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const iconv = require("iconv-lite");
var fs = require("fs");
var file_path = "./coolpcdb.db";
var sqlite3 = require("sqlite3").verbose();
const sourcesurl = 'https://coolpc.com.tw/evaluate.php';
var renewtime = "";

const blankLines = new RegExp(/(^[ \t]*\n)/, "gm");
const heartLines = new RegExp(/(^[\u2764] *.*)\n/, "gm");
const arrowLine = new RegExp(/(.*[\u21AA] *.*)\n/, "g");
const downarrowLine = new RegExp(/[\u25BC].*$/, "gm");

function removeBlanklines(input) {
    return input.replace(blankLines, "");
};

function removeHeartlines(input) {
    return input.replace(heartLines, "");
};

function removAarrowlines(input) {
    return input.replace(arrowLine, "");
};
function removeDownaarrowlines(input) {
    return input.replace(downarrowLine, "");
};

function db_init() {
    var db = new sqlite3.Database(file_path);
    db.serialize(function () {
        db.run("CREATE TABLE IF NOT EXISTS Stuff(name TEXT PRIMARY KEY NOT NULL,class TEXT,price INTEGER,date TEXT,old_price INTEGER,old_date TEXT,low_price INTEGER)");
    });
    db.close();
};

function item_split_insert_db(input, item_class) {
    items = removeBlanklines(removeHeartlines(removAarrowlines(input.substring(input.indexOf("\n\n"))))).split(/\n/);
    items.forEach(element => {
        item_title = removeDownaarrowlines(element.split(",")[0]);
        item_price = element.split("$").pop().split(" ")[0];
        // item_total = item_title + item_price + '\n';
        data = {
            $name: item_title,
            $price: item_price,
            $date: renewtime,
            $class: item_class,
        };
        var db1 = new sqlite3.Database(file_path);
        db1.configure("busyTimeout", 12000);
        db1.serialize(function () {
            db1.run(`INSERT INTO Stuff(name,class,price,date,old_price,old_date,low_price)VALUES($name,$class,"","",$price,$date,"") ON CONFLICT (Name) DO UPDATE SET price = $price, date = $date ;`, data);
        });
        db1.close();
        // fs.appendFileSync("coolpc_crawler.txt", item_total);
    });
};

function db_remove_1_blank() {
    var db2 = new sqlite3.Database(file_path);
    db2.configure("busyTimeout", 12000);
    data = {
        $price: 1,
        $prcie2: "",
    };
    db2.serialize(function () {
        db2.run(`DELETE FROM Stuff WHERE old_price == $price OR old_price == $prcie2`, data);
    });
    db2.close();
};

function db_low_price() {
    var db3 = new sqlite3.Database(file_path);
    db3.configure("busyTimeout", 12000);
    db3.serialize(function () {
        db3.run("UPDATE Stuff SET low_price = price WHERE price < low_price; ");
    });
    db3.close();
};

(async () => {
    try {
        db_init();
        const response = await got(sourcesurl);
        console.log('statusCode:', response.statusCode);
        response.body = iconv.decode(Buffer.from(response.rawBody), "big5");
        const dom = new JSDOM(response.body);
        const response_last_renew_time = dom.window.document.querySelector("#Mdy").textContent;
        renewtime = response_last_renew_time.slice(0, -2);
        for (i = 1; i < 30; i++) {
            response_text = "#tbdy > tr:nth-child(" + i.toString() + ") > td:nth-child(3) > select";
            var response_all = dom.window.document.querySelector(response_text).textContent;
            var x = "";
            switch (i) {
                case 1: x = "品牌小主機、AIO｜VR 虛擬"; break;
                case 2: x = "手機｜平板｜筆電｜穿戴"; break;
                case 3: x = "酷！PC 套裝產線 "; break;
                case 4: x = "處理器 CPU"; break;
                case 5: x = "主機板 MB"; break;
                case 6: x = "記憶體 RAM"; break;
                case 7: x = "固態硬碟 M.2｜SSD"; break;
                case 8: x = "傳統內接硬碟 HDD"; break;
                case 9: x = "外接硬碟｜隨身碟｜記憶卡"; break;
                case 10: x = "散熱器｜散熱墊｜散熱膏"; break;
                case 11: x = "封閉式｜開放式水冷"; break;
                case 12: x = "顯示卡 VGA"; break;
                case 13: x = "螢幕｜投影機｜壁掛"; break;
                case 14: x = "機殼 CASE"; break;
                case 15: x = "電源供應器"; break;
                case 16: x = "機殼風扇｜機殼配件"; break;
                case 17: x = "鍵盤+鼠｜搖桿｜桌+椅"; break;
                case 18: x = "滑鼠｜鼠墊｜數位板"; break;
                case 19: x = "IP 分享器｜網卡｜網通設備"; break;
                case 20: x = "網路 NAS｜網路 IPCAM"; break;
                case 21: x = "音效卡｜電視卡(盒)｜影音"; break;
                case 22: x = "喇叭｜耳機｜麥克風"; break;
                case 23: x = "燒錄器 CD / DVD / BD"; break;
                case 24: x = "USB 週邊｜硬碟座｜讀卡機"; break;
                case 25: x = "行車紀錄器｜USB 視訊鏡頭"; break;
                case 26: x = "UPS 不斷電｜印表機｜掃描"; break;
                case 27: x = "介面擴充卡｜專業 Raid 卡"; break;
                case 28: x = "網路、傳輸線、轉頭｜KVM"; break;
                case 29: x = "OS + 應用軟體｜禮物卡"; break;
            }
            item_split_insert_db(response_all, x);
        }
        db_remove_1_blank();
        db_low_price();
    } catch (error) {
        console.log(error.response.body);
    }
})();
