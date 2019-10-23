'use strict'
var mapWidth = 8;
var mapSize = mapWidth * mapWidth;
var bombQuantity = 10;
var map = [];
var bombSet = new Set();
var gameStatus = -1;
var winCount = 0;
var leftCount = mapSize;
var flagCount = 0;
var timeFlag = 0, sec = 0;
var MouseOverColor = "rgb(0, 255, 255)";
var ButtonDefaultColor = "rgb(255, 200, 100)";
var firstTimeFlag = true;
var openBackColor = "rgb(169, 169, 169)"
var nineId;
var nineFlag = false;

var sound = [$("#bgmusic")[0], $("#clickSound")[0], $("#spaceSound")[0], $("#reSound")[0], $("#bombSound")[0],$("#winSound")[0]]

sound.forEach(function (value) {
    value.volume = 0.2;
})


init();
function init() {
    $("#flagText").html(PaddingLeft(bombQuantity, 3));
    BombRandom();
    BombNumSet();
    ButtonCreate();
}

function BombRandom() {
    bombSet = new Set();
    let errorCount = 0;
    while (bombSet.size < bombQuantity) {
        let randomvar = Math.floor(Math.random() * (mapSize) + 1);
        if (!bombSet.has(randomvar + 1) && !bombSet.has(randomvar - 1)) //&&!bombSet.has(randomvar + mapWidth)||!bombSet.has(randomvar - mapWidth))
            bombSet.add(randomvar);
        else
            errorCount++;
        if (errorCount > 1000) {
            bombSet.add(randomvar);
            errorCount = 0;
        }
    }
}

function BombNumSet() {
    for (let count = 1; count < mapSize + 1; count++) { //從1開始 不使用0位置
        map[count] = 0;   //先將地圖全部歸為0
    }

    bombSet.forEach(function (position) {
        var x = getNineNear(position);
        map[position] = -1;
        x.forEach(function (ninePosition) {
            if (map[ninePosition] != -1) {
                map[ninePosition] += 1;
            }
        })
    });
}

function getNineNear(Position) {
    let x = [];
    if (Position > parseInt(mapWidth)) { //如果bomb所在位置在第二排以上(大於地圖寬度)     

        x.push(parseInt(Position) - parseInt(mapWidth));//傳入炸彈位置的上面位置

        if (Position % parseInt(mapWidth) != 1) {  //如果bomb所在位置不在最左邊
            x.push(parseInt(Position) - parseInt(mapWidth) - 1);//傳入炸彈位置的上左邊位置
        }

        if (Position % parseInt(mapWidth) != 0) { //如果bomb所在位置不在最右邊   
            x.push(parseInt(Position) - parseInt(mapWidth) + 1);//傳入炸彈位置的上右邊位置
        }
    }
    if (Position < (mapSize - parseInt(mapWidth) + 1)) { //如果bomb所在位置在最後一排以前(小於最後一排第一個)
        x.push(parseInt(Position) + parseInt(mapWidth));//傳入炸彈位置的下面位置

        if (Position % parseInt(mapWidth) != 1) {  //如果bomb所在位置不在最左邊
            x.push(parseInt(Position) + parseInt(mapWidth) - 1);//傳入炸彈位置的下左邊位置
        }

        if (Position % parseInt(mapWidth) != 0) { //如果bomb所在位置不在最右邊   
            x.push(parseInt(Position) + parseInt(mapWidth) + 1);//傳入炸彈位置的下右邊位置
        }
    }

    if (Position % parseInt(mapWidth) != 1) {  //如果bomb所在位置不在最左邊
        x.push(parseInt(Position) - 1);//傳入炸彈位置的左邊位置
    }

    if (Position % parseInt(mapWidth) != 0) { //如果bomb所在位置不在最右邊   
        x.push(parseInt(Position) + 1);//傳入炸彈位置的右邊位置
    }
    return x;
}

function PaddingLeft(str, leng) {
    if (str.length >= leng)
        return str;
    else
        return PaddingLeft("0" + str, leng);
}

function ButtonCreate() {
    for (let count = 1; count < mapSize + 1; count++) { //生成button 並給ID 1-mapSize
        $("#gameZone").append("<button " +
            "class = 'ZoneButton'"+
            "onclick = 'ButtonClickEffct(this.id,event)'" +
            "onmouseover = 'ButtonOverEffect(this)'" +
            "onmouseout = 'ButtonOutEffect(this)'" +
            "onmouseup = 'ButtonUpEffect()'" +
            "onmousedown = 'ButtonDownEffect(this.id,event)'" +
            "oncontextmenu = 'Mark(this)'" +
            "style='background-color: " + ButtonDefaultColor + ";'" +
            "id = " + count +
            "> </button>")
        if (count % mapWidth == 0) { //換行
            $("#gameZone").append("<br>");
        }
    }
    alert($("body").width());
    if($("body").width()>800){
        $("#whole").css("left",$("body").width()/2-$("#whole").width()/2);
    }
    else{
        $("#whole").css("left","0");
    }
}

function ButtonClickEffct(id, event) {
    if (event.buttons == 3) {
        return;
    }

    if (($("#" + id).css("background-image")).includes("flag"))
        return
    CheckFirstTime();
    if ($("#" + id).html() == " ") {
        switch (map[id]) {
            case 0:
                $("#spaceSound")[0].currentTime = 0;
                $("#spaceSound")[0].play();

                ClickSpaceZone(id);
                break;
            case -1:
                ClickBomb(id);
                break;
            default:
                NormalClick(id);
                break;
        }
        if(map[id]!=-1){
            CheckWin();
        }
    }

}

function ButtonOutEffect(Obj) {
    if (!nineFlag) {
        if ($(Obj).css('background-color') == MouseOverColor) {
            if (Obj.innerHTML == " ")
                $(Obj).css('background-color', ButtonDefaultColor);
            else
                $(Obj).css('background-color', openBackColor);
        }

        if (Obj.style.opacity == 0.5) {
            Obj.style.opacity = 1;
        }

    }
}

function ButtonOverEffect(Obj) {
    if (!nineFlag) {
        if (Obj.innerHTML != "" && Obj.style.backgroundColor != openBackColor) {
            $(Obj).css('background-color', MouseOverColor);
        }
        else if (Obj.style.backgroundColor == openBackColor) {
            Obj.style.opacity = 0.5;
        }

    }
}

function Mark(Obj) {
    if (flagCount <= bombQuantity) {
        if (Obj.style.backgroundColor == MouseOverColor) {
            if (Obj.style.backgroundImage.includes("flag")) {
                Obj.style.backgroundImage = "";
                Obj.style.backgroundSize = "";
                Obj.innerHTML = " ";
                flagCount--;
                $("#flagText").html(PaddingLeft(String(bombQuantity - flagCount), 3));
            }
            else if (flagCount < bombQuantity && Obj.style.backgroundColor != openBackColor) {
                flagCount++;
                $("#flagText").html(PaddingLeft(String(bombQuantity - flagCount), 3));
                Obj.style.backgroundImage = "url('img/flag.png')";
                Obj.style.backgroundSize = "50px 50px";
                Obj.innerHTML = " ";
            }
        }
    }
}

function restart() {
    $("#reSound")[0].currentTime = 0;
    $("#reSound")[0].play();
    flagCount = 0;
    mapSize = mapWidth * mapWidth;
    bombSet = new Set();
    map = [];
    clearInterval(timeFlag);
    firstTimeFlag = true;
    sec = 0;
    leftCount = mapSize;
    $("#startIconButton").html('<i class="far fa-meh fa-2x" style="color:rgba(255, 255, 0, 0.801)"></i>');
    $("#timeText").html(PaddingLeft(sec, 3));
    $("#gameZone").empty();
    init();
}


function CheckFirstTime() {
    if (firstTimeFlag) { //初次進入時間開始計算
        sec = 1;
        if(sound[0].currentTime==0){
            sound[0].play();
        }
        $("#timeText").html(PaddingLeft(String(sec), 3));
        timeFlag = setInterval(() => {
            sec = sec + 1;
            $("#timeText").html(PaddingLeft(String(sec), 3));
        }, 1000);
        firstTimeFlag = false;
    }
}

function ClickSpaceZone(id) {
    map[id] = -2;

    $("#" + id).html("");
    $("#" + id).css("backgroundColor", openBackColor);
    $("#" + id).css("border", "2px solid buttonface");
    $("#" + id).attr("disabled", true);

    if (id > mapWidth) {
        recallAndShowNear(Number(id) - Number(mapWidth));
    }

    if (id < (mapSize - mapWidth) + 1) { //如果bomb所在位置在最後一排以前(小於最後一排第一個)
        recallAndShowNear(Number(id) + Number(mapWidth));
    }

    if (id % mapWidth != 1) {  //如果bomb不在最左邊
        recallAndShowNear(Number(id) - 1);
    }

    if (id % mapWidth != 0) { //如果bomb不在最右邊
        recallAndShowNear(Number(id) + 1);
    }

}
function recallAndShowNear(id) {
    if (map[id] == 0) {//如果bomb上面的位置的數字是0
        ClickSpaceZone(id);
    }
    else {
        if (map[id] > 0) { //如果上面不是炸彈且不為零
            $("#" + id).html(map[id]);
            $("#" + id).css("backgroundColor", openBackColor);
            ChangeTextColor(id);
        }
    }
}

function UnClickCount() {
    leftCount = 0;
    for (let count = 1; count < mapSize + 1; count++) {
        if ($("#" + count).css("background-color") == ButtonDefaultColor) {
            leftCount++;
        }
    }
}

function CheckWin() {
    UnClickCount();
    if (leftCount == bombQuantity) {
        clearInterval(timeFlag);
        $("#startIconButton").html('<i class="fas fa-smile fa-2x" style="color:pink"></i>');
        bombSet.forEach(function (value) {
            $("#" + value).css("background-image", "url('img/flag.png')")
            $("#" + value).css("background-size", "50px 50px")
            $("#" + value).attr("disabled", true);
        })
        alert("Win");
        $("#winSound")[0].currentTime = 0;
        $("#winSound")[0].play();
        
    }

}

function ClickBomb(id) {
    $("#bombSound")[0].currentTime = 0;
    $("#bombSound")[0].play();

    bombSet.forEach(function (value) {
        if (!($("#" + value).css("background-image")).includes("flag")) {
            $("#" + value).css("background-image", "url('img/mine.png')");
            $("#" + value).css("background-repeat", "no-repeat");
            $("#" + value).css("background-size", "contain");
        }
    })

    $("#" + id).css("backgroundColor", "red");
    for (let count = 1; count < mapSize + 1; count++) {
        if (($("#" + count).css("background-image")).includes("flag") && !bombSet.has(count)) {
            $("#" + count).css("background-image", "url('img/notFlag.png')");
            $("#" + count).css("background-size", "50px 50px");
        }
        $("#" + count).attr("disabled", true);
    }

    $("#startIconButton").html('<i class="far fa-2x fa-tired" style="color:rgba(255, 0, 0, 0.801)"></i>');
    clearInterval(timeFlag);
}


function ChangeTextColor(id) {
    switch (map[id]) { //判斷button數值 設定數值顏色
        case 1:
            $("#" + id).css("color", "blue");
            break;
        case 2:
            $("#" + id).css("color", "green");
            break;
        case 3:
            $("#" + id).css("color", "red");
            break;
        case 4:
            $("#" + id).css("color", "purple");
            break;
        default:
            $("#" + id).css("color", "darkred");
            break;
    }

}
function NormalClick(id) {
    $("#clickSound")[0].currentTime = 0;
    $("#clickSound")[0].play();
    ChangeTextColor(id);
    $("#" + id).css("backgroundColor", openBackColor);
    $("#" + id).html(map[id]);
}

function set() {

    mapWidth = $("#width").val()
    bombQuantity = $("#bombQuantity").val()

    if (mapWidth < 8) {
        mapWidth = 8;
        $("#width").val(mapWidth);
    }

    else if (mapWidth > 20) {
        mapWidth = 20;
        $("#width").val(mapWidth);
    }

    if (bombQuantity > mapWidth * mapWidth / 5) {
        bombQuantity = Math.floor(mapWidth * mapWidth / 5 - 1);
        $("#bombQuantity").val(bombQuantity);
    }
    else if (bombQuantity < 5) {
        bombQuantity = 5;
        $("#bombQuantity").val(bombQuantity);

    }

    restart();
}

function volumeButtonEvent(id) {
    let x = sound[0].volume;
    if (id.includes("Up") && x != 1) {
        sound.forEach(function (value) {
            value.volume = (x * 10 + 1) / 10;
        })
    }
    else if (id.includes("Down") && x != 0) {
        sound.forEach(function (value) {
            value.volume = (x * 10 - 1) / 10;
        })
    }
    else if (id.includes("Muted") && x != 0) {
        sound.forEach(function (value) {
            value.volume = 0;
        })
    }
    $("#clickSound")[0].currentTime=0;
    $("#clickSound")[0].play();
    
    $("#volumeVar").html(Math.floor(sound[0].volume * 100) + "%");
}


function ButtonUpEffect() {
    if (nineFlag) {
        let x = getNineNear(nineId);
        let flagNum = 0;
        let unOpen = 0;
        let bombCount = 0;
        let bombId = 0
        let unOpenIds = [];
        if ($("#" + nineId).html() != " " && $("#" + nineId).html() != "") {
            x.forEach(function (value) {
                if ($("#" + value).html() == " ")
                    $("#" + value).css('background-color', ButtonDefaultColor);
                else if ($("#" + value).html() != "") {
                    $("#" + value).css('background-color', openBackColor);
                }

                if (($("#" + value).css("background-image")).includes("flag")) {
                    flagNum++;
                }
                else if ($("#" + value).html() == " ") {
                    unOpen++;
                    unOpenIds.push(value);
                    if (map[value] == -1) {
                        bombCount++;
                        bombId = value;
                    }
                }
            });
            if (flagNum >= parseInt($("#" + nineId).html())) {
                if (bombCount != 0) {
                    ClickBomb(bombId);
                }
                else if (unOpen != 0) {
                    unOpenIds.forEach(function (value) {
                        if (map[value] > 0)
                            NormalClick(value);
                        else {
                            $("#spaceSound")[0].currentTime = 0;
                            $("#spaceSound")[0].play();
                            ClickSpaceZone(value);
                        }
                    });
                    CheckWin();
                }
            }


        }
        else {
            x.forEach(function (value) {
                if ($("#" + value).html() == " ")
                    $("#" + value).css('background-color', ButtonDefaultColor);
                else if ($("#" + value).html() != "") {
                    $("#" + value).css('background-color', openBackColor);
                }
            });
        }
        nineFlag = false;
    }
}

function ButtonDownEffect(id, event) {
    if (event.buttons == 3) {
        nineId = id;
        nineFlag = true;
        let x = getNineNear(id);
        x.forEach(function (value) {
            if ($("#" + value).html() != "") {
                if ($("#" + value).html() == " ")
                    $("#" + value).css('backgroundColor', 'rgb(200,255,255)');
                else
                    $("#" + value).css('backgroundColor', 'grey');

            }
        });
    }
}
