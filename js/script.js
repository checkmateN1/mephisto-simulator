var cardsModal = document.querySelector(".hidden-cards-select-modal");
var ul = document.querySelector(".mini-card-list");
var cards = document.querySelector(".cards");



//создаем миникарты
for (var i = 0; i < 52; i++) {
    let li = document.createElement("li");
    ul.appendChild(li);
    li.id = i; // добавили мини-картам id
    li.style.backgroundImage = "url('img/cards/card_" + i + "_alt.png')";

}

function showModalCardsLeft() {
    cardsModal.classList.add("visually");
    if (cardsModal.classList.contains("position-right")) {
        cardsModal.classList.remove("position-right");
    }
}

function showModalCardsRight() {
    cardsModal.classList.add("visually");
    cardsModal.classList.add("position-right");
}


//закрываем модальное окно с мини-картами
function modalCardsClose() {
    cardsModal.classList.remove("visually");
    checkedCards.wherefrom = null;
    setBigCardState();                   //вызываем перерисовку больших карт
    if (cardsModal.classList.contains("position-right")) {
        cardsModal.classList.remove("position-right");
    }
}

window.addEventListener("keydown", function (event) {
    if (event.keyCode === 27) {
        if (cardsModal.classList.contains("visually")) {
            cardsModal.classList.remove("visually");
            checkedCards.wherefrom = null;
            setBigCardState();                   //вызываем перерисовку больших карт
        }
        if (cardsModal.classList.contains("position-right")) {
            cardsModal.classList.remove("position-right");
        }
    }
});


var checkedCards = [null, null, null, null, null, null, null, null]; //первая hole = 3h

//записываем в карту какой улицы мы кликнули
cards.addEventListener('click', function(e){
    let id = e.target.classList;

    if (id.contains("hole")) {
        checkedCards[0] = "hole";
        //if (checkedCards[3] !== null){document.getElementById(checkedCards[3]).style.opacity = "0";}
       // if (checkedCards[4] !== null){document.getElementById(checkedCards[4]).style.opacity = "0";}
       //if (checkedCards[5] !== null){document.getElementById(checkedCards[5]).style.opacity = "0";}
    } else if (id.contains("flop")) {
        checkedCards[0] = "flop";
    } else if (id.contains("turn")) {
        checkedCards[0] = "turn";
    } else if (id.contains("river")){
        checkedCards[0] = "river";
    }
    //alert("записали в нулевой элемента массива - какую карту мы хотим выбрать: " + checkedCards[0]);
});

// ожидаем клика в миникарту
ul.addEventListener('click', function(e){
    let id = e.target.id;
    changeCardState(id);  // вызываем функцию которая отображает и меняет состояние карты и добавляет/удаляет в массив
});

function changeCardState(id) {
    if (checkedCards[0] == "hole") { // если это карта на руках

        if (checkedCards.indexOf(id) >= 0) { // если эта карта уже выбрана где-то в симуляторе

            if (checkedCards.indexOf(id) == 1) { // если это первая карта hole
                document.getElementById(id).style.opacity = "1";
                checkedCards[1] = null;
                return;
            } else if (checkedCards.indexOf(id) == 2) {
                document.getElementById(id).style.opacity = "1";
                checkedCards[2] = null;
                return;
            }
        } else if (checkedCards[1] !== null) { //если первая карта hole выбрана
            if (checkedCards[2] !== null) {// если и вторая выбрана - ничего не делать
                return;
            } else {
                document.getElementById(id).style.opacity = "0.1";
                checkedCards[2] = id;
                return;
            }
        } else {
            document.getElementById(id).style.opacity = "0.1";
            checkedCards[1] = id;
            return;
        }
    }

    if (checkedCards[0] == "flop") { // если это карта FLOP

        if (checkedCards.indexOf(id) >= 0) { // если эта карта уже выбрана где-то в симуляторе

            if (checkedCards.indexOf(id) == 3) { // если это первая карта flop отжимаем ее и выходим из ф-ции
                document.getElementById(id).style.opacity = "1";
                checkedCards[3] = null;
                return;
            } else if (checkedCards.indexOf(id) == 4) { // если это вторая карта flop отжимаем ее и выходим из ф-ции
                document.getElementById(id).style.opacity = "1";
                checkedCards[4] = null;
                return;
            } else if (checkedCards.indexOf(id) == 5) { // если это третья карта flop отжимаем ее и выходим из ф-ции
                document.getElementById(id).style.opacity = "1";
                checkedCards[5] = null;
                return;
            }
        } else if (checkedCards[3] !== null) { //если первая карта flop выбрана
            if (checkedCards[4] !== null) { // если и вторая выбрана - ничего не делать
                if (checkedCards[5] !== null) { // если и третья выбрана - ничего не делать
                    return;
                } else {
                    document.getElementById(id).style.opacity = "0.1";
                    checkedCards[5] = id;
                    return;
                }
            } else {
                document.getElementById(id).style.opacity = "0.1";
                checkedCards[4] = id;
                return;
            }
        } else {
            document.getElementById(id).style.opacity = "0.1";
            checkedCards[3] = id;
            return;
        }
    }

    if (checkedCards[0] == "turn") { // если это карта TURN

        if (checkedCards.indexOf(id) >= 0) { // если эта карта уже выбрана где-то в симуляторе

            if (checkedCards.indexOf(id) == 6) { // если это карта turn мы ее отжимаем
                document.getElementById(id).style.opacity = "1";
                checkedCards[6] = null;
                return;
            }
        } else if (checkedCards[6] !== null) { //если карта TURN выбрана
            return;

            } else {
                document.getElementById(id).style.opacity = "0.1";
                checkedCards[6] = id;
                return;
            }
    }

    if (checkedCards[0] == "river") { // если это карта RIVER

        if (checkedCards.indexOf(id) >= 0) { // если эта карта уже выбрана где-то в симуляторе

            if (checkedCards.indexOf(id) == 7) { // если это карта RIVER мы ее отжимаем
                document.getElementById(id).style.opacity = "1";
                checkedCards[7] = null;
                return;
            }
        } else if (checkedCards[7] !== null) { //если карта TURN выбрана
            return;

        } else {
            document.getElementById(id).style.opacity = "0.1";
            checkedCards[7] = id;
            return;
        }
    }

}

// Отрисовка больших карт
function setBigCardState() {
    for (var i = 1; i < checkedCards.length; i++) {
        if (checkedCards[i] !== null) {
            document.getElementById('card_' + i).style.backgroundImage = "url('img/cards3/card_" + checkedCards[i] + "_alt.svg')";
        } else {document.getElementById('card_' + i).style.backgroundImage = "url('img/cards/card_back6.png')";}
    }
}

// удаляем все карты и возвращаем все состояния в дефолт
function cardsRemove() {
    for (var i = 0; i < checkedCards.length; i++) {
        checkedCards[i] = null;
    }
    if (cardsModal.classList.contains("visually")) {
        cardsModal.classList.remove("visually");
        checkedCards.wherefrom = null;
    }
    if (cardsModal.classList.contains("position-right")) {
        cardsModal.classList.remove("position-right");
    }
    for (let i = 0; i < 52; i++) {
        document.getElementById(i).style.opacity = "1";
    }

    setBigCardState();  //вызываем перерисовку больших карт
}

jQuery("body").append("<a href=\"index.html\">test ref!</a>");

//////////   ДЕЙСТВИЯ  /////////////////   ДЕЙСТВИЯ  /////////////////   ДЕЙСТВИЯ  /////////////////   ДЕЙСТВИЯ  /////////////////

// массив для хранения сырых строк действий
var boardCardsList = [];
var rawActionList = [];


// bet 1, raise 2, call 3, check 4, fold 5
// 9 sb, 8 bb, BTN 0, CO 1, MP2 2 ........

// Класс строка действий
class ActionString {
    constructor(street, player, balance, action, pot, amount, position) {
        this.street = street;
        this.player = player;
        this.balance = balance;
        this.action = action;
        this.pot = pot;
        this.amount = amount;
        this.position = position;
    }

    set setNickname(newNickname) {
        this.player = newNickname;
    }

};


// тестовый массив из бекенда  // тестовый массив для префлопа из бекенда   // тестовый массив для префлопа из бекенда

// bet 1, raise 2, call 3, check 4, fold 5
// 9 sb, 8 bb, BTN 0, CO 1, MP2 2 ........
// (street, player, balance, action, pot, amount, position)
rawActionList[0] = new ActionString(0, "gulyaka", 27, 5, 0.35, 0, 3);  // MP1
rawActionList[1] = new ActionString(0, "zlo-Mishka", 32, 5, 0.35, 0, 2); // MP2
rawActionList[2] = new ActionString(0, "3D action", 45.37, 5, 0.35, 0, 1); // CO
rawActionList[3] = new ActionString(0, "Joooe84", 60, 2, 0.35, 0.75, 0); // bet 0.75 BTN
rawActionList[4] = new ActionString(0, "mammoth", 25, 5, 0.35, 0, 9); // fold SB
rawActionList[5] = new ActionString(0, "checkmateN1", 37, 3, 1.1, 0.75, 8); // call BB

rawActionList[6] = new ActionString(1, "checkmateN1", 37, 4, 1.6, 0, 8);
rawActionList[7] = new ActionString(1, "Joooe84", 50.25, 1, 1.6, 1.3, 0);


// функция копирующая в массив сырые действия из загруженной с сервера руки
function copyActionList(arr) {
    rawActionList.length=0;
    // далее копируем масссив действий
}

// функция добавляющая строку в существующий массив с заполненным префлопом
function addRow() {

}

// функция удаляющая строку в существующий массив с заполненным префлопом
function removeRow() {

}

function getPositionText(position) {
    let arr = ["BTN", "CO", "MP3", "MP2", "MP1", "UTG2", "UTG1", "UTG0", "BB", "SB"];
    return arr[position];
}

function getActionText(action) {
    let arr = [null, "bet", "raise", "call", "check", "fold"];
    return arr[action];
}


// отрисовывает текущий массив
function displayActions() {

    if (rawActionList.length > 0) {
        for (let i = 0; i < rawActionList.length; i++) {

            if (rawActionList[i].street === 0) { // если улица PREFLOP

                let preflopMove = document.querySelector(".preflop-moves .all-info-table");
                let tr = document.createElement("tr");  // создали строку

                // (player, balance, action, pot, amount, position)
                let td = document.createElement("td");
                td.innerHTML = rawActionList[i].player;
                tr.appendChild(td);

                td = document.createElement("td");
                td.innerHTML = getPositionText(rawActionList[i].position);
                tr.appendChild(td);

                td = document.createElement("td");
                td.innerHTML = "$" + rawActionList[i].balance;
                tr.appendChild(td);

                td = document.createElement("td");
                td.innerHTML = getActionText(rawActionList[i].action);
                tr.appendChild(td);

                td = document.createElement("td");
                td.innerHTML = "$" + rawActionList[i].pot;
                tr.appendChild(td);

                td = document.createElement("td");
                if (rawActionList[i].amount) {
                    td.innerHTML = "$" + rawActionList[i].amount;
                } else {td.innerHTML = ""};
                tr.appendChild(td);

                preflopMove.appendChild(tr);
                preflopMove.classList.remove("hide-table-row");

            } else if (rawActionList[i].street === 1) { //если улица FLOP
                let flopMove = document.querySelector(".flop-moves .all-info-table");
                let tr = document.createElement("tr");  // создали строку

                // (player, balance, action, pot, amount, position)
                let td = document.createElement("td");
                td.innerHTML = rawActionList[i].player;
                tr.appendChild(td);

                td = document.createElement("td");
                td.innerHTML = "$" + rawActionList[i].balance;
                tr.appendChild(td);

                td = document.createElement("td");
                td.innerHTML = getActionText(rawActionList[i].action);
                tr.appendChild(td);

                td = document.createElement("td");
                td.innerHTML = "$" + rawActionList[i].pot;
                tr.appendChild(td);

                td = document.createElement("td");
                if (rawActionList[i].amount) {
                    td.innerHTML = "$" + rawActionList[i].amount;
                } else {td.innerHTML = ""};
                tr.appendChild(td);

                flopMove.appendChild(tr);
                flopMove.classList.remove("hide-table-row");
            } else if (rawActionList[i].street === 2) { //если улица TURN

            } else if (rawActionList[i].street === 3) { //если улица RIVER

            }
        }
    }
}

displayActions();

// bet 1, raise 2, call 3, check 4, fold 5
// 9 sb, 8 bb, BTN 0, CO 1, MP2 2 ........




























//function changeCardOpacity(id)
//test git

/*
var div = document.createElement("div");
div.className = "alert alert-success";
div.innerHTML = "<strong>Ура!</strong> Вы прочитали это важное сообщение.";

cardsModal.appendChild(ul);
ul.appendChild(li);
li.innerHTML = "test li";
document.body.appendChild(ul);

for (let i = 0; i < 3; i++) {
    let li = document.body.createElement('li');
    ul.appendChild(li);
    li.innerHTML = i;
}

*/