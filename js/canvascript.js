var canvas = $("#myCanvas");
var ctx = canvas[0].getContext("2d");
ShowView();

function ShowView() {

    setTimeout(function () {
        ctx.lineWidth = 12;
        ctx.fillStyle = "rgb(255,127,80)";
        ctx.fillRect(30, 54, 350, 75);  //先畫上部區塊   54開始畫75
    }, 250);

    setTimeout(function () {
        ctx.strokeStyle = "rgb(0,255,255)";
        ctx.strokeRect(30, 54, 350, 75); //再畫外框
    }, 500);

    setTimeout(function () {
        ctx.strokeStyle = "rgb(165,42,42)";
        ctx.strokeRect(30, 54, 350, 410);
    }, 750);

    setTimeout(function () {
        ctx.fillStyle = "rgb(0,0,0)"
        ctx.fillRect(80, 74, 40, 30);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgb(255,255,255)"
        ctx.strokeRect(80, 74, 40, 30);
        ctx.fillStyle = "rgb(255,0,0)"
        ctx.font = "25px Arial";
        ctx.fillText("010", 80, 99, 40, 30);
    }, 1000);


    setTimeout(function () {
        ctx.strokeStyle = "rgb(255,255,255)";
        ctx.strokeRect(190, 65, 50, 50);
        let img = new Image();
        img.onload = function () {
            ctx.drawImage(img, 190, 65, 50, 50);
        }
        img.src = "img/noface.png";
    }, 1250);

    setTimeout(function () {
        ctx.fillStyle = "rgb(0,0,0)"
        ctx.fillRect(300, 74, 40, 30);

        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgb(255,255,255)"
        ctx.strokeRect(300, 74, 40, 30);

        ctx.fillStyle = "rgb(255,0,0)"
        ctx.font = "25px Arial";
        ctx.fillText("000", 300, 99, 40, 30);
    }, 1500);
    ctx.fillStyle = "rgb(255,255,255)"
    ctx.strokeStyle = "rgb(0,0,0)"

    setTimeout(function () {
        for (let count2 = 0; count2 < 8; count2++) {
            for (let count = 0; count < 8; count++) {
                setTimeout(function () {
                    ctx.fillStyle = "rgb(255,255,255)"
                    ctx.strokeStyle = "rgb(0,0,0)";
                    ctx.fillRect(38 + count * (42), 138 + count2 * (40), 39, 39);
                    ctx.strokeRect(38 + count * (42), 138 + count2 * (40), 39, 39);
                }, 10 * (count + count2 * 8 + 1))
            }
        }
        playView();
    }, 1750);
}

var Canvasmaps = [];
var Canvasbomb = [];
var flag = 1;
var mapwidth = 8;
var mapsize = mapwidth * mapwidth;
var bombcQuantity =10;
var flagCCount = 10;
function playView() {
    if (flag == 1) {
        ctx.save();
        flag--;
    }
    flagCCount = 10;
    ctx.restore();
    Canvasinit();
    CanvasOpen();
}

function CanvasOpen() {
    for (let count2 = 0; count2 < 8; count2++) {
        for (let count = 0; count < 8; count++) {
            setTimeout(function () {
                ctx.fillStyle = "rgb(255,0,0)"
                ctx.strokeStyle = "rgb(0,0,0)"
                ctx.beginPath();
                ctx.arc(38 + count * (42) + 20, 138 + count2 * (40) + 20, 10, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.fill();
                setTimeout(function () {
                    if (Canvasmaps[count + 1 + count2 * 8] != -1) {
                        ctx.fillStyle = "darkgrey"
                        ctx.strokeStyle = "rgb(0,0,0)";
                        ctx.fillRect(38 + count * (42), 138 + count2 * (40), 39, 39);
                        ctx.strokeRect(38 + count * (42), 138 + count2 * (40), 39, 39);
                        if (Canvasmaps[count + 1 + count2 * 8] != 0) {
                            switch (Canvasmaps[count + 1 + count2 * 8]) {
                                case 1:
                                    ctx.fillStyle = "blue"
                                    break;
                                case 2:
                                    ctx.fillStyle = "green"
                                    break;

                                case 3:
                                    ctx.fillStyle = "red"
                                    break;
                                case 4:
                                    ctx.fillStyle = "purple"
                                    break;
                                default:
                                    ctx.fillStyle = "darked"
                                    break;
                            }
                            ctx.font = "20px Arial";
                            ctx.fillText(Canvasmaps[count + 1 + count2 * 8], 38 + count * (42) + 16, 138 + count2 * (40) + 23);
                        }
                    }
                    else {
                        ctx.fillStyle = "rgb(255,255,255)"
                        ctx.strokeStyle = "rgb(0,0,0)";
                        ctx.fillRect(38 + count * (42), 138 + count2 * (40), 39, 39);
                        ctx.strokeRect(38 + count * (42), 138 + count2 * (40), 39, 39);
                        let img = new Image();
                        img.onload = function () {
                            ctx.drawImage(img, 38 + count * (42) + 2, 138 + count2 * (40) + 2, 35, 35);
                        }
                        img.src = "img/flag.png";
                        ctx.clearRect(80,74,40,30);
                        ctx.fillStyle = "rgb(0,0,0)"
                        ctx.fillRect(80, 74, 40, 30);
                        ctx.lineWidth = 1;
                        ctx.strokeStyle = "rgb(255,255,255)"
                        ctx.strokeRect(80, 74, 40, 30);
                        ctx.fillStyle = "rgb(255,0,0)"
                        ctx.font = "25px Arial";
                        flagCCount--;
                        ctx.fillText("00"+flagCCount, 80, 99, 40, 30);
                        


                    }
                }, 100)

            }, 200 * (count + count2 * 8 + 1))
        }
    }
    setTimeout(function () {
        ctx.strokeStyle = "rgb(255,255,255)";
        ctx.strokeRect(190, 65, 50, 50);
        let img = new Image();
        img.onload = function () {
            ctx.drawImage(img, 190, 65, 50, 50);
        }
        img.src = "img/happy.png";
        setTimeout(function () {
            ctx.clearRect(0, 0, 500, 600);
            Canvasmaps = [];
            Canvasbomb = [];
            ShowView();
        }, 1000)
    }, 200 * 64 + 200);
}

function Canvasinit() {
    let pickPool = [];
    for (let count = 1; count < mapsize + 1; count++) { //數字1-mapsize
        pickPool[count] = count; //先生成要挑選的數字池    
    }

    for (let count = 0; count < bombcQuantity; count++) {
        let pick;
        pick = Math.floor(Math.random() * (mapsize - count) + 1); //random生成炸彈位置
        Canvasbomb.push(pickPool[pick]);//將位置push到bomb裡面
        pickPool.splice(pick, 1);//將已使用位置拿出
    }

    for (let count = 1; count < mapsize + 1; count++) { //從1開始 不使用0位置
        Canvasmaps[count] = 0;   //先將地圖全部歸為0
    }

    for (let count = 0; count < bombcQuantity; count++) {
        CanvasBombNumCount(count);
    }
}
function CanvasBombNumCount(inId) { //生成炸彈周圍數字
    var upFlag = 0;   //判斷上下左右有無數字
    var leftFlag = 0;
    var rightFlag = 0;
    var downFlag = 0;

    Canvasmaps[Canvasbomb[inId]] = -1; //放置炸彈

    if (Canvasbomb[inId] > mapwidth) { //如果bomb所在位置在第二排以上(大於地圖寬度)     
        upFlag = 1;//代表有上面的位置
        CanvasCheckADD(Canvasbomb[inId] - mapwidth);//傳入炸彈位置的上面位置
    }

    if (Canvasbomb[inId] < (mapsize - mapwidth + 1)) { //如果bomb所在位置在最後一排以前(小於最後一排第一個)
        downFlag = 1;//代表有下面的位置
        CanvasCheckADD(Canvasbomb[inId] + mapwidth);//傳入炸彈位置的下面位置
    }

    if (Canvasbomb[inId] % mapwidth != 1) {  //如果bomb所在位置不在最左邊
        leftFlag = 1;//有左邊的位置
        CanvasCheckADD(Canvasbomb[inId] - 1);//傳入炸彈位置的左邊位置
    }

    if (Canvasbomb[inId] % mapwidth != 0) { //如果bomb所在位置不在最右邊   
        rightFlag = 1;//有右邊的位置
        CanvasCheckADD(Canvasbomb[inId] + 1);//傳入炸彈位置的右邊位置
    }

    if (upFlag == 1 && leftFlag == 1) { //有上有左
        CanvasCheckADD(Canvasbomb[inId] - mapwidth - 1);//傳入炸彈位置的左上位置
    }

    if (upFlag == 1 && rightFlag == 1) { //有上有右
        CanvasCheckADD(Canvasbomb[inId] - mapwidth + 1);//傳入炸彈位置的右上位置
    }

    if (downFlag == 1 && leftFlag == 1) { //有下有左
        CanvasCheckADD(Canvasbomb[inId] + mapwidth - 1);//傳入炸彈位置的左下位置
    }

    if (downFlag == 1 && rightFlag == 1) { //有下有右
        CanvasCheckADD(Canvasbomb[inId] + mapwidth + 1) //傳入炸彈位置的右下位置
    }
}

function CanvasCheckADD(inId) { //檢查是不是炸彈 不是就+1
    if (Canvasmaps[inId] != -1) {
        Canvasmaps[inId] += 1;
    }
}
