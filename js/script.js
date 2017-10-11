var cardsModal = document.querySelector(".hidden-cards-select-modal");
var ul = document.querySelector(".mini-card-list");
var cards = document.querySelector(".cards");
let playerStats = document.getElementById("player-stats");


//создаем миникарты
createMinCards();
function createMinCards() {
    for (var i = 0; i < 52; i++) {
        let li = document.createElement("li");
        ul.appendChild(li);
        li.id = i; // добавили мини-картам id
        li.style.backgroundImage = "url('img/cards/card_" + i + "_alt.png')";
    }
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
    checkedCards[0] = null;
    setBigCardState();                   //вызываем перерисовку больших карт
    if (cardsModal.classList.contains("position-right")) {
        cardsModal.classList.remove("position-right");
    }
}

window.addEventListener("keydown", function (event) {
    if (event.keyCode === 27) {
        if (cardsModal.classList.contains("visually")) {
            cardsModal.classList.remove("visually");
            checkedCards[0] = null;
            setBigCardState();                   //вызываем перерисовку больших карт
        }
        if (cardsModal.classList.contains("position-right")) {
            cardsModal.classList.remove("position-right");
        }
        if (!playerStats.classList.contains("hidden")) {
            playerStats.classList.add("hidden");
        }
    }
});

var checkedCards = [null, null, null, null, null, null, null, null];
var testBoard = [null, "12", "24", "25", "4", "37", "22", "41"];
loadCardsState(testBoard);

//записываем в карту какой улицы мы кликнули
cards.addEventListener('click', function(e){
    let id = e.target.classList;

    if (id.contains("hole")) {
        checkedCards[0] = "hole";
    } else if (id.contains("flop")) {
        checkedCards[0] = "flop";
    } else if (id.contains("turn")) {
        checkedCards[0] = "turn";
    } else if (id.contains("river")){
        checkedCards[0] = "river";
    }
});

// ожидаем клика в миникарту
ul.addEventListener('click', function(e){
    let id = e.target.id;
    changeCardState(id);  // вызываем функцию которая отображает и меняет состояние карты и добавляет/удаляет в массив
});

//
function changeCardState(id) {
    if (checkedCards[0] === "hole") { // если это карта на руках

        if (checkedCards.indexOf(id) >= 0) { // если эта карта уже выбрана где-то в симуляторе

            if (checkedCards.indexOf(id) == 1) { // если это первая карта hole
                document.getElementById(id).classList.toggle("min-cards-opacity");
                checkedCards[1] = null;
                return;
            } else if (checkedCards.indexOf(id) == 2) {
                document.getElementById(id).classList.toggle("min-cards-opacity");
                checkedCards[2] = null;
                return;
            }
        } else if (checkedCards[1] !== null) { //если первая карта hole выбрана
            if (checkedCards[2] !== null) {// если и вторая выбрана - ничего не делать
                return;
            } else {
                document.getElementById(id).classList.toggle("min-cards-opacity");
                checkedCards[2] = id;
                return;
            }
        } else {
            document.getElementById(id).classList.toggle("min-cards-opacity");
            checkedCards[1] = id;
            return;
        }
    }

    if (checkedCards[0] === "flop") { // если это карта FLOP

        if (checkedCards.indexOf(id) >= 0) { // если эта карта уже выбрана где-то в симуляторе

            if (checkedCards.indexOf(id) >= 3 && checkedCards.indexOf(id) <= 5) { // если это первая карта flop отжимаем ее и выходим из ф-ции
                document.getElementById(id).classList.toggle("min-cards-opacity");
                checkedCards[checkedCards.indexOf(id)] = null;
                return;
            }
        } else if (checkedCards[3] !== null) { //если первая карта flop выбрана
            if (checkedCards[4] !== null) { // если и вторая выбрана - ничего не делать
                if (checkedCards[5] !== null) { // если и третья выбрана - ничего не делать
                    return;
                } else {
                    document.getElementById(id).classList.toggle("min-cards-opacity");
                    checkedCards[5] = id;
                    return;
                }
            } else {
                document.getElementById(id).classList.toggle("min-cards-opacity");
                checkedCards[4] = id;
                return;
            }
        } else {
            document.getElementById(id).classList.toggle("min-cards-opacity");
            checkedCards[3] = id;
            return;
        }
    }

    if (checkedCards[0] === "turn") { // если это карта TURN

        if (checkedCards.indexOf(id) >= 0) { // если эта карта уже выбрана где-то в симуляторе

            if (checkedCards.indexOf(id) == 6) { // если это карта turn мы ее отжимаем
                document.getElementById(id).classList.toggle("min-cards-opacity");
                checkedCards[6] = null;
                return;
            }
        } else if (checkedCards[6] !== null) { //если карта TURN выбрана
            return;

            } else {
                document.getElementById(id).classList.toggle("min-cards-opacity");
                checkedCards[6] = id;
                return;
            }
    }

    if (checkedCards[0] === "river") { // если это карта RIVER

        if (checkedCards.indexOf(id) >= 0) { // если эта карта уже выбрана где-то в симуляторе

            if (checkedCards.indexOf(id) == 7) { // если это карта RIVER мы ее отжимаем
                document.getElementById(id).classList.toggle("min-cards-opacity");
                checkedCards[7] = null;
            }
        } else if (checkedCards[7] !== null) { //если карта RIVER выбрана

        } else {
            document.getElementById(id).classList.toggle("min-cards-opacity");
            checkedCards[7] = id;
        }
    }
}

// Отрисовка больших карт
function setBigCardState() {
    for (let i = 1; i < checkedCards.length; i++) {
        if (checkedCards[i] !== null) {
            document.getElementById('card_' + i).style.backgroundImage = "url('img/cards3/card_" + checkedCards[i] + "_alt.svg')";
        } else {document.getElementById('card_' + i).style.backgroundImage = "url('img/cards/card_back6.png')";}
    }
}

//
function loadCardsState(arr) {
    cardsRemove();
    checkedCards = arr;
    for (let i = 1; i < 8; i++) {
        if (checkedCards[i] !== null) {
            document.getElementById('card_' + i).style.backgroundImage = "url('img/cards3/card_" + checkedCards[i] + "_alt.svg')";
            document.getElementById(checkedCards[i]).classList.add("min-cards-opacity");
        }
    }
}

// удаляем все карты и возвращаем все состояния в дефолт
function cardsRemove() {
    for (let i = 0; i < 8; i++) {
        checkedCards[i] = null;
    }
    if (cardsModal.classList.contains("visually")) {
        cardsModal.classList.remove("visually");
        checkedCards[0] = null;
    }
    if (cardsModal.classList.contains("position-right")) {
        cardsModal.classList.remove("position-right");
    }
    for (let i = 0; i < 52; i++) {
        document.getElementById(i).classList.remove("min-cards-opacity");
    }

    setBigCardState();  //вызываем перерисовку больших карт
}



//////////   ДЕЙСТВИЯ  /////////////////   ДЕЙСТВИЯ  /////////////////   ДЕЙСТВИЯ  /////////////////   ДЕЙСТВИЯ  /////////////////


// массив для хранения сырых строк действий
var rawActionList = [];

// Класс строка действий
class ActionString {
    constructor(street, player, balance, action, pot, amount, position, gto) {
        this.street = street;
        this.player = player;
        this.balance = balance;
        this.action = action;
        this.pot = pot;
        this.amount = amount;
        this.position = position;
        this.gto = gto;
    }

    set setNickname(newNickname) {
        this.player = newNickname;
    }

};

class Player {
    constructor(player, id) {
        this.player = player;
        this.id = id;
    }
};


// тестовый массив из бекенда  // тестовый массив для префлопа из бекенда   // тестовый массив для префлопа из бекенда

// bet 1, raise 2, call 3, check 4, fold 5
// 9 sb, 8 bb, BTN 0, CO 1, MP2 2 ........
// (street, player, balance, action, pot, amount, position, isGTO)
rawActionList[0] = new ActionString(0, "mammoth", 25.15, 3, 0, 0.10, 9, false); // post SB
rawActionList[1] = new ActionString(0, "checkmateN1", 37.25, 1, 0.10, 0.25, 8, false); // post BB
rawActionList[2] = new ActionString(0, "gulyaka", 27, 5, 0.35, 0, 3, false);  // MP1
rawActionList[3] = new ActionString(0, "zlo-Mishka", 32, 5, 0.35, 0, 2, false); // MP2
rawActionList[4] = new ActionString(0, "3D action", 45.37, 5, 0.35, 0, 1, false); // CO
rawActionList[5] = new ActionString(0, "joooe84", 60, 2, 0.35, 0.75, 0, false); // bet 0.75 BTN
rawActionList[6] = new ActionString(0, "mammoth", 25, 3, 1.10, 0.75, 9, false);
rawActionList[7] = new ActionString(0, "checkmateN1", 37, 3, 1.75, 0.75, 8, false); // call BB

rawActionList[8] = new ActionString(1, "mammoth", 24.40, 4, 2.25, 0.00, 9, false);
rawActionList[9] = new ActionString(1, "checkmateN1", 36.5, 4, 2.25, 0.00, 8, false);
rawActionList[10] = new ActionString(1, "joooe84", 59.25, 1, 2.25, 30.25, 0, false);
rawActionList[11] = new ActionString(1, "mammoth", 24.40, 3, 32.75, 24.40, 9, false);
rawActionList[12] = new ActionString(1, "checkmateN1", 36.5, 5, 57.15, 0.00, 8, false);


//rawActionList[6] = new ActionString(0, "mammoth", 25, 5, 0.35, 0, 9); // fold SB
//rawActionList[7] = new ActionString(0, "checkmateN1", 37, 3, 1.10, 0.75, 8); // call BB

//rawActionList[8] = new ActionString(1, "checkmateN1", 36.50, 1, 1.60, 1.00, 8);
//rawActionList[8] = new ActionString(1, "checkmateN1", 36.50, 4, 1.60, 0, 8);
//rawActionList[9] = new ActionString(1, "joooe84", 59.25, 1, 1.60, 1.30, 0);
//rawActionList[10] = new ActionString(1, "checkmateN1", 36.5, 3, 2.90, 1.3, 8);

//rawActionList[11] = new ActionString(2, "checkmateN1", 35.2, 4, 4.20, 0, 8);
//rawActionList[12] = new ActionString(2, "joooe84", 57.95, 1, 4.20, 3, 0);
//rawActionList[13] = new ActionString(2, "checkmateN1", 35.2, 3, 7.20, 3, 8);

//rawActionList[14] = new ActionString(3, "checkmateN1", 32.20, 1, 10.20, 10.20, 8);
//rawActionList[15] = new ActionString(3, "joooe84", 54.95, 2, 20.40, 45.95, 0);


// функция копирующая в массив сырые действия из загруженной с сервера руки
function copyActionList(arr) {
    rawActionList.length=0;
    // далее копируем масссив действий
}

function getPositionText(position) {
    let arr = ["BTN", "CO", "MP3", "MP2", "MP1", "UTG2", "UTG1", "UTG0", "BB", "SB"];
    return arr[position];
}

function getActionText(action) {
    let arr = [null, "bet", "raise", "call", "check", "fold", "\t&ltselect\t&gt"];
    return arr[action];
}

function getActionIndex(text) {
    let arr = [null, "bet", "raise", "call", "check", "fold", "\t&ltselect\t&gt"];
    return arr.indexOf(text);
}


// bet 1, raise 2, call 3, check 4, fold 5
// 9 sb, 8 bb, BTN 0, CO 1, MP2 2 ........
// (street, player, balance, action, pot, amount, position)

displayActions();
// отрисовывает текущий массив действий
function displayActions() {

    if (rawActionList.length > 0) {
        for (let i = 2; i < rawActionList.length; i++) {

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
                if (rawActionList[i].gto == true) {tr.style.color = "crimson"}
                flopMove.classList.remove("hide-table-row");
            } else if (rawActionList[i].street === 2) { //если улица TURN
                let turnMove = document.querySelector(".turn-moves .all-info-table");
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

                turnMove.appendChild(tr);
                if (rawActionList[i].gto == true) {tr.style.color = "crimson"}
                turnMove.classList.remove("hide-table-row");
            } else if (rawActionList[i].street === 3) { //если улица RIVER
                let riverMove = document.querySelector(".river-moves .all-info-table");
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

                riverMove.appendChild(tr);
                if (rawActionList[i].gto == true) {tr.style.color = "crimson"}
                riverMove.classList.remove("hide-table-row");
            }
        }
    }
}

// делает видимымм нужные кнопки добавления/удаления действий
displayAddRemoveButtons();

// функция показывающая или скрывающая кнопки добавить/удалить действие
function displayAddRemoveButtons() {

    document.querySelector(".add-move-button.flop").classList.add("hidden"); // добавили кнопку флопа
    document.querySelector(".sub-move-button.flop").classList.add("hidden"); // добавили кнопку флопа
    document.querySelector(".add-move-button.turn").classList.add("hidden");
    document.querySelector(".sub-move-button.turn").classList.add("hidden");
    document.querySelector(".add-move-button.river").classList.add("hidden");
    document.querySelector(".sub-move-button.river").classList.add("hidden");

    if(rawActionList[rawActionList.length - 1].street == 0) { // если улица последнего действия preflop
        document.querySelector(".add-move-button.flop").classList.remove("hidden"); // кнопка флопа
        return;
    }

    if ((whoIsInGame().length == 1 && (whoIsInGame() == rawActionList[rawActionList.length - 1].position)) || whoIsInGame().length == 0 || rawActionList[rawActionList.length - 1].action == 6 || (isTerminalStreetState() && whoIsInGame().length <= 1)) {
        if(rawActionList[rawActionList.length - 1].street == 1) { // улица последнего действия flop
            document.querySelector(".sub-move-button.flop").classList.remove("hidden"); // добавили кнопку флопа
            return;
        }
        if (rawActionList[rawActionList.length - 1].street == 2) {  // улица последнего действия turn
            document.querySelector(".sub-move-button.turn").classList.remove("hidden");
            return;
        }
        if (rawActionList[rawActionList.length - 1].street == 3) {  // улица последнего действия river
            document.querySelector(".sub-move-button.river").classList.remove("hidden");
            return;
        }
    }

    if (!isTerminalStreetState()) { // если не терминальное состояние
        if(rawActionList[rawActionList.length - 1].street == 1) { // улица последнего действия flop
            document.querySelector(".add-move-button.flop").classList.remove("hidden"); // добавили кнопку флопа
            document.querySelector(".sub-move-button.flop").classList.remove("hidden"); // добавили кнопку флопа
            return;
        }
        if (rawActionList[rawActionList.length - 1].street == 2) {  // улица последнего действия turn
            document.querySelector(".add-move-button.turn").classList.remove("hidden");
            document.querySelector(".sub-move-button.turn").classList.remove("hidden");
            return;
        }
        if (rawActionList[rawActionList.length - 1].street == 3) {  // улица последнего действия river
            document.querySelector(".add-move-button.river").classList.remove("hidden");
            document.querySelector(".sub-move-button.river").classList.remove("hidden");
            return;
        }
    }
    if (isTerminalStreetState()) {   // если терминальное состояние
        if(rawActionList[rawActionList.length - 1].street == 1) { // улица последнего действия flop
            document.querySelector(".sub-move-button.flop").classList.remove("hidden"); // добавили кнопку флопа
            document.querySelector(".add-move-button.turn").classList.remove("hidden"); // добавили кнопку флопа
            return;
        }
        if (rawActionList[rawActionList.length - 1].street == 2) {  // улица последнего действия turn
            document.querySelector(".sub-move-button.turn").classList.remove("hidden"); // добавили кнопку флопа
            document.querySelector(".add-move-button.river").classList.remove("hidden"); // добавили кнопку флопа
            return;
        }
        if (rawActionList[rawActionList.length - 1].street == 3) {  // улица последнего действия turn
            document.querySelector(".sub-move-button.river").classList.remove("hidden"); // добавили кнопку флопа
            return;
        }
    }
}

//определяет терминальное состояние на улице
function isTerminalStreetState() {
    let currentAmount = maxAmountAtCurrentStreet();
    let nPlayers = whoIsInGame().slice();
    //alert("nPlayers.length = " + nPlayers.length);
    //alert("whatIsPlayerBalance ? " + whatIsPlayerBalance(rawActionList[rawActionList.length - 1], rawActionList.length));
    //alert("whoIsInGame() ? " + whoIsInGame());

    if (nPlayers.length <= 1 && rawActionList[rawActionList.length - 1].action >= 3 && whoIsInGame() == rawActionList[rawActionList.length - 1].position) {
        //alert("Глюк мультипота");
       //alert("whoIsInGame() = " + whoIsInGame());
        return true;
    } // Глюк мультипота
    //alert("point");
    //alert("nPlayers.length = " + nPlayers.length);
    let currentStreet = rawActionList[rawActionList.length - 1].street;
    if (rawActionList[rawActionList.length - 1].action < 3) {return false;}
    //alert("ищем утечку");
    for (let i = rawActionList.length - 1; i > 0; i--) {
        if (nPlayers.indexOf(rawActionList[i].position) >= 0) { // если среди играющих есть такой игрок
            if (rawActionList[i].amount == currentAmount && rawActionList[i].street == currentStreet) { // проверяем совпадает ли значение его ставки и улица
                nPlayers.splice(nPlayers.indexOf(rawActionList[i].position), 1); // удаляем игрока с совпавшей позицией
                if (nPlayers.length == 0) {
                    return true;
                }
            } else {return false;}
        }
    }
}

// удаляет все действия постфлопа
function removeAllActions() {
    let length = rawActionList.length -1;
    for (let i = length; i >= 0; i--) {
        if (rawActionList[i].street > 0) {
            rawActionList.pop();
        }
    }

    removeActions();
    displayActions();
    displayAddRemoveButtons();
}

// добавляет строку в массив сырых действий и вызывает перерисовывание строк
function addActionString() {
    // валидатор
    if (rawActionList[rawActionList.length - 1].action === 1 && rawActionList[rawActionList.length - 1].amount === 0) {
        alert("Choose bet amount!");
        return;
    }
    if (rawActionList[rawActionList.length - 1].action === 2 && rawActionList[rawActionList.length - 1].amount === 0) {
        alert("Choose raise amount!");
        return;
    }

    let oldActionListLength = rawActionList.length;
    let isTerminalStreetStateTmp = isTerminalStreetState();
    let whoIsNextMoveTmp = whoIsNextMove();
    rawActionList[oldActionListLength] = new ActionString();
    rawActionList[oldActionListLength].street = isTerminalStreetStateTmp ? (rawActionList[oldActionListLength - 1].street + 1) : (rawActionList[oldActionListLength - 1].street);

    for (let i = oldActionListLength - 1; i > 0; i--) {
        if (rawActionList[i].position === whoIsNextMoveTmp) {
            rawActionList[oldActionListLength].player = rawActionList[i].player;
            rawActionList[oldActionListLength].balance = parseFloat(whatIsPlayerBalance(rawActionList[i].position, oldActionListLength).toFixed(2));
            rawActionList[oldActionListLength].action = parseInt(6); // нужно выбрать - появляется селект
            rawActionList[oldActionListLength].pot = parseFloat(whatIsThePot(oldActionListLength).toFixed(2));
            rawActionList[oldActionListLength].amount = parseFloat(0); // нужно выбрать - появляется слайдер
            rawActionList[oldActionListLength].position = rawActionList[i].position;
            if (rawActionList[oldActionListLength - 1].gto) {
                rawActionList[oldActionListLength].gto = true;
            } else {rawActionList[oldActionListLength].gto = false;}
        }
    }
    removeActions();
    displayActions();
    displayAddRemoveButtons();
    restartListener();
}

// удаляет последнее действие
function removeLastActionString() {
    if (rawActionList[rawActionList.length - 1].street > 0) {
        rawActionList.pop();
        removeActions();
        displayActions();
        displayAddRemoveButtons();
        restartListener();
    }
}

//очищает таблицы c действиями постфлопа
function removeActions() {
    let preflopMoves = document.querySelector(".preflop-moves .all-info-table");
    let flopMoves = document.querySelector(".flop-moves .all-info-table");
    let turnMoves = document.querySelector(".turn-moves .all-info-table");
    let riverMoves = document.querySelector(".river-moves .all-info-table");

    while(preflopMoves.childElementCount > 2) {preflopMoves.removeChild(preflopMoves.lastChild);}
    while(flopMoves.childElementCount > 2) {flopMoves.removeChild(flopMoves.lastChild);}
    while(turnMoves.childElementCount > 2) {turnMoves.removeChild(turnMoves.lastChild);}
    while(riverMoves.childElementCount > 2) {riverMoves.removeChild(riverMoves.lastChild);}
}

// функция возвращает массив всех игроков кто еще в игре и может вкладывать деньги, не учитывая супер терминального состояния раздачи
function whoIsInGame() {
    let playersInGame = []; //добавляем всех у кого УМНЫЙ баланc больше нуля и кто не делал фолд
    let blackList = [];
    let allPlayers = [];
    for (let i = rawActionList.length - 1; i >= 0; i--) { //добавляем всех кто сфолдил или баланс = 0
        if (Math.abs(initPlayerBalance(rawActionList[i].position, rawActionList.length - 1) - rawActionList[i].amount) < 0.0001 || rawActionList[i].action === 5) {
            blackList.push(rawActionList[i].position);
        }
    }
    //alert("blackList + " + blackList);
    for (let i = rawActionList.length - 1; i >= 0; i--) { // добавляем всех игроков
        if (allPlayers.indexOf(rawActionList[i].position) < 0) {
            allPlayers.push(rawActionList[i].position);
        }
    }
    for (let i = allPlayers.length - 1; i >= 0; i--) { // добавляем только тех кто остался
        if (blackList.indexOf(allPlayers[i]) < 0) {
            playersInGame.push(allPlayers[i]);
        }
    }
    return playersInGame;
}

// возвращает позицию того кто будет ходить следующим
function whoIsNextMove() {
    if (isTerminalStreetState()) {
        return Math.max.apply(null, whoIsInGame()); // наибольшее число из массива
    } else {
        let nPlayers = whoIsInGame().slice();
        nPlayers.sort(function(a,b){return a-b;});
        nPlayers.join(); // посортировали массив
        for (let i = rawActionList.length - 1; i > 0; i--) {
            if (nPlayers.indexOf(rawActionList[i].position) >= 0) {
                if (nPlayers.indexOf(rawActionList[i].position) > 0) { // если игрок не в позиции ко всем оставшимся
                    return nPlayers[nPlayers.indexOf(rawActionList[i].position) - 1]; // возвращаем более ближнего к BTN
                } else {return nPlayers[nPlayers.length - 1];} // если он ближайший к бтн - ходить будет ближайший к SB
            }
        }
    }
}

// определяет текущий размер пота на момент добавления нового действия
function whatIsThePot(oldActionListLength) {
    let lastPlayerPosition = rawActionList[oldActionListLength - 1].position;
    let curentLastAmount = rawActionList[oldActionListLength - 1].amount;

    for (let i = oldActionListLength - 2; i >= 0; i--) {
        if (rawActionList[i].position === lastPlayerPosition && rawActionList[i].street === rawActionList[oldActionListLength - 1].street) {
            return rawActionList[oldActionListLength - 1].pot + curentLastAmount - rawActionList[i].amount;
        }
    }
    return rawActionList[oldActionListLength - 1].pot + curentLastAmount;
}

// определяет баланс игрока на момент добавления нового действия для него
function whatIsPlayerBalance(position, oldActionListLength) {
    let currentStreetForBalance;
    let lastPlayerAmount;
    let initBalance;

    for (let i = oldActionListLength - 1; i >= 0; i--) {
        if (rawActionList[i].position === position) {
            currentStreetForBalance = rawActionList[i].street;
            lastPlayerAmount = rawActionList[i].amount;
            initBalance = rawActionList[i].balance;
            break;
        }
    }

    for (let i = oldActionListLength - 1; i >= 0; i--) {
        if (rawActionList[i].position === position) {
           if (rawActionList[i].street === currentStreetForBalance) {
               initBalance = rawActionList[i].balance;
           } else {return initBalance - lastPlayerAmount;}
        }
    }
    return initBalance - lastPlayerAmount; // если улица префлоп
}

// возвращает начальны баланс на улице заданного игрока
function initPlayerBalance(position, oldActionListLength) {
    let currentStreetForBalance;
    let lastPlayerAmount; //34.45 last amount joooe84
    let initBalance; //57.25 init balance joooe84
    for (let i = oldActionListLength - 1; i > 0; i--) {
        if (rawActionList[i].position === position) {
            currentStreetForBalance = rawActionList[i].street;
            lastPlayerAmount = rawActionList[i].amount; //34.45 last amount joooe84
            initBalance = rawActionList[i].balance; //57.25 init balance joooe84
            break;
        }
    }

    for (let i = oldActionListLength - 1; i > 0; i--) {
        if (rawActionList[i].position === position) {
            if (rawActionList[i].street === currentStreetForBalance) {
                initBalance = rawActionList[i].balance;
            } else {return initBalance;}
        }
    }
    return initBalance; // если улица префлоп
}

var tdAmount = $(".all-info-table td:nth-child(5)"); // селектим amount
tdAmount.on('click', amountClick);
// функция обрабатывающая клик в amount
function amountClick(e) {
    var el = $(this);
    let elNode= e.target; // nodeType == 1

    if (rawActionList[rawActionList.length - 1].action >= 3) {
        return;
    }
    if (getRawActionsIndex(elNode) != rawActionList.length - 1) {
        return;
    }

    var slider = $("<form class=\"raise-form\" onsubmit=\"return false\" oninput=\"level.value = flevel.valueAsNumber.toFixed(2)\">\n" +
        "  <label for=\"flying\"></label>\n" +
        "  <input class=\"raise-amount\" name=\"flevel\" id=\"flying\" type=\"range\" min=\"" + Math.min(initPlayerBalance(rawActionList[rawActionList.length - 1].position, rawActionList.length), minAmount()).toFixed(2) + "\" max=\"" + initPlayerBalance(rawActionList[rawActionList.length - 1].position, rawActionList.length).toFixed(2) + "\" step=\"0.05\" value=\"" + rawActionList[rawActionList.length - 1].amount + "\"> \n" +
        "  <span class=\"dollar\">$</span> \n" +
        "  <output for=\"flying\" name=\"level\">" + Math.min(initPlayerBalance(rawActionList[rawActionList.length - 1].position, rawActionList.length), Math.max(rawActionList[rawActionList.length - 1].amount, minAmount())).toFixed(2) + "</output>" +
        "</form>");
    el.replaceWith(slider);
    $('input').focus();
    slider.focusout(function(){
        let td = document.createElement("td");
        td.innerHTML = "$" + $("#flying").val();
        rawActionList[rawActionList.length - 1].amount = parseFloat($("#flying").val());
        slider.replaceWith(td);
        removeActions();
        displayActions();
        displayAddRemoveButtons();
        restartListener();
    });
}


var tdPlayerStats = $(".all-info-table td:nth-child(1)"); // nickname stats
tdPlayerStats.on('contextmenu', displayStats);
// функция показывающая статистику на игрока
function displayStats(e) {
    event.preventDefault();
    $('#player-stats').remove();
    $(".all-info-table td:nth-child(1)").removeClass("color-yellow");
    var el = $(this);

    let playerStats = $("<div id=\"player-stats\" class=\"hidden\"></div>");
    let nickname = $("<h3 id=\"stats-nickname\"></h3>");
    let allStats = $("<h4>Preflop</h4>\n" +
        "            <div class=\"preflop-stats\">\n" +
        "                <p><span></span></p>\n" +
        "                <p><span></span></p>\n" +
        "            </div>");

    this.classList.add("color-yellow");
    el.append(playerStats);
    el.css("overflow", "visible");
    let div = document.getElementById("player-stats");
    div.classList.remove("hidden");
    let offset = el.offset();

    div.style.left = getValidXCoordinates(offset.left) +'px';
    div.style.top = getValidYCoordinates(offset.top) +'px';

    $(document).on('click', dontCloseStats);
    function dontCloseStats(e) {
        if($(e.target).closest('#player-stats').length === 0) {
            el.removeClass("color-yellow");
            el.css("overflow", "hidden");
            playerStats.remove();
            removeActions();
            displayActions();
            displayAddRemoveButtons();
            restartListener();
        }
    }

    $(document).keyup(function(e) {
        if (e.keyCode == 27) { // escape
            el.removeClass("color-yellow");
            el.css("overflow", "hidden");
            playerStats.remove();
            removeActions();
            displayActions();
            displayAddRemoveButtons();
            restartListener();
        }
    });

}

var tdActionMenu = $(".all-info-table.postflop td:nth-child(3)"); // action menu
tdActionMenu.on('contextmenu', actionMenu);
// функция обрабатывающая ПРАВЫЙ клик в amount
function actionMenu(e) {
    event.preventDefault();

    var el = $(this);
    let elNode = e.target; // nodeType == 1
    let isGTO = "";
    if (whatIsFirstGTOindex() == getRawActionsIndex(elNode)) {
        isGTO = "checked";
    }

    let actionMenu = $("<div id=\"action-menu\" class=\"hidden\">\n" +
        "            <input type=\"button\" id=\"range\" name=\"action-checkbox\" hidden>\n" +
        "            <label for=\"range\">Show range</label>\n" +
        "            <input type=\"button\" id=\"probabilities\" name=\"action-checkbox\" hidden>\n" +
        "            <label for=\"probabilities\">Show probabilities</label>\n" +
        "            <input type=\"button\" id=\"ev\" name=\"action-checkbox\" hidden>\n" +
        "            <label for=\"ev\">Evaluate EV's</label>\n" +
        "            <input type=\"checkbox\" id=\"gto\" name=\"action-checkbox\" " + isGTO + " hidden>\n" +
        "            <label for=\"gto\">Start GTO from here</label>\n" +
        "        </div>");

    this.classList.add("color-violet");
    el.append(actionMenu);
    let div = document.getElementById("action-menu");
    div.classList.remove("hidden");
    div.style.left = 35 +'px';
    div.style.top = 13 +'px';
    //tdAction.off();
    tdAction.off();
    $("#gto").on("click", function () {
        if (isGTO == "checked") {
            removeAllGTOstrings();
        } else {
            for (let i = rawActionList.length - 1; i >= 0; i--) {
                rawActionList[i].gto = false;
            }
            setGTOtoAllStings(getRawActionsIndex(elNode));
        }
    });

    $(document).on('click', dontCloseAction);
    function dontCloseAction(e) {
        if($(e.target).closest('#action-menu').length === 0) {
            el.removeClass("color-violet");
            actionMenu.remove();
            removeActions();
            displayActions();
            displayAddRemoveButtons();
            restartListener();
        }
    }

    $(document).keyup(function(e) {
        if (e.keyCode == 27) { // escape
            el.removeClass("color-violet");
            actionMenu.remove();
            removeActions();
            displayActions();
            displayAddRemoveButtons();
            restartListener();
        }
    });

}

function getValidXCoordinates(x) {
    //alert("x = " + x);
    let width = 427;
    let xOffset = 55;
    let needWidth = x + width + xOffset;
    if ($(window).width() - needWidth > 0) {
        return xOffset;
    } else {
        return ($(window).width() - x - width);
    }
}

function getValidYCoordinates(y) {
    //alert("x = " + x);
    let height = 350;
    let yOffset = 13;
    let needHeight = y + height + yOffset;
    if ($(window).height() - needHeight > 0) {
        return yOffset;
    } else {
        return ($(window).height() - y - height);
    }
}


var tdAction = $(".all-info-table td:nth-child(3)"); // селектим action
tdAction.on('click', actionClick);
// функция обрабатывающая ЛЕВЫЙ клик в action
function actionClick(e){
    var el = $(this);
    let el2= e.target; // nodeType == 1

    rawActionList[rawActionList.length - 1].action = parseInt(6); // необходимо для глюка с количеством оставшихся игроков и невозможностью рейзить

    let lastActionString = document.querySelector(getCurrentTableClass() + " .all-info-table").lastElementChild; // последняя строка действий c таблицей на соотв улице
    if (!lastActionString.contains(el2)) {
        return;
    }

    let oldActionListLength = rawActionList.length - 1;
    if (wasBet(oldActionListLength)) {
        if (whoIsInGame().length > 1) {
            if (maxAmountAtCurrentStreet() < initPlayerBalance(rawActionList[rawActionList.length - 1].position, oldActionListLength)) {
                var arr = [
                    {val: 1, text: 'raise'},
                    {val: 2, text: 'call'},
                    {val: 3, text: 'fold'}
                ];
            } else  {
                var arr = [
                    {val: 1, text: 'call'},
                    {val: 2, text: 'fold'}
                ];
            }
        } else {
            var arr = [
                {val: 1, text: 'call'},
                {val: 2, text: 'fold'}
            ];
        }

        var sel = $("<select id=\"flying2\" name=\"selectAmount\">");

        $(arr).each(function() {
            sel.append($("<option>").attr('value',this.val).text(this.text));
        });
    } else {
        var arr = [
            {val : 1, text: 'bet'},
            {val : 2, text: 'check'}
        ];

        var sel = $("<select id=\"flying2\">");
        $(arr).each(function() {
            sel.append($("<option>").attr('value',this.val).text(this.text));
        });
    }

    el.replaceWith(sel);

    sel.focusout(function(){
        let td = document.createElement("td");
        var sel = document.getElementById("flying2");
        td.innerHTML = sel.options[sel.selectedIndex].text;

        rawActionList[rawActionList.length - 1].action = parseFloat(getActionIndex(sel.options[sel.selectedIndex].text));
        if (parseFloat(getActionIndex(sel.options[sel.selectedIndex].text)) == 3) {
            rawActionList[rawActionList.length - 1].amount = parseFloat(Math.min(initPlayerBalance(rawActionList[rawActionList.length - 1].position, oldActionListLength), maxAmountAtCurrentStreet()));
        }
        if (parseFloat(getActionIndex(sel.options[sel.selectedIndex].text)) == 5 || parseFloat(getActionIndex(sel.options[sel.selectedIndex].text)) == 4) {
            rawActionList[rawActionList.length - 1].amount = parseFloat(0);
        }
        sel.replaceWith(td);
        if (rawActionList[rawActionList.length - 1].action === 2 && rawActionList[rawActionList.length - 1].amount < minAmount() && rawActionList[rawActionList.length - 1].balance > minAmount()) {
            rawActionList[rawActionList.length - 1].amount = parseFloat(0);
        }
        removeActions();
        displayActions();
        displayAddRemoveButtons();
        restartListener();
    });

}

// возвращает наибольший Amount на текущей улице
function maxAmountAtCurrentStreet() {
   let currentStreet = rawActionList[rawActionList.length - 1].street;
    for (let i = rawActionList.length - 2; i > 0; i--) {
       if (rawActionList[i].street === currentStreet) {
           if (rawActionList[i].action < 3) {
               return parseFloat(rawActionList[i].amount);
           }
       } else {return parseFloat(0);}
   }
}

// возвращает минимальную возможную ставку для игрока в последней строке
function minAmount() {
    let lastAgroAmount = parseFloat(0);
    let indexLastAgro = 1000;
    let currentStreet = rawActionList[rawActionList.length - 1].street;
    for (let i = rawActionList.length - 2; i >= 0; i--) {
        if (rawActionList[i].street === currentStreet) {
            if (rawActionList[i].action < 3) { // агромув
                if (indexLastAgro > 999) {
                    lastAgroAmount = rawActionList[i].amount;
                    indexLastAgro = i;
                    continue;
                } else {return (2 * lastAgroAmount - rawActionList[i].amount);}
            }
        } else {return (2 * lastAgroAmount);}
    }
}

// функция перезагружающая listener
function restartListener() {
    tdAmount.off();
    tdAmount = $(".all-info-table td:nth-child(5)");
    tdAmount.on('click', amountClick);

    tdAction.off();
    tdAction = $(".all-info-table td:nth-child(3)");
    tdAction.on('click', actionClick);

    tdPlayerStats.off();
    tdPlayerStats = $(".all-info-table td:nth-child(1)"); // селектим amount
    tdPlayerStats.on('contextmenu', displayStats);

    tdActionMenu.off();
    tdActionMenu = $(".all-info-table.postflop td:nth-child(3)");
    tdActionMenu.on('contextmenu', actionMenu);

    $(document).off();
}

// был ли бет на улице с последним ходом?
function wasBet(oldActionListLength) {
    let currentStreet = rawActionList[oldActionListLength].street;
    for (let i = oldActionListLength - 1; i > 0; i--) {
        if (rawActionList[i].street === currentStreet) {
            if (rawActionList[i].action < 3) {
                return true;
            }
        } else {
            return false;
        }
    }
}

// возвращает класс таблицы для улицы последнего действия
function getCurrentTableClass() {
    if (rawActionList[rawActionList.length - 1].street === 0) {
        return ".preflop-moves";
    }
    if (rawActionList[rawActionList.length - 1].street === 1) {
        return ".flop-moves";
    }
    if (rawActionList[rawActionList.length - 1].street === 2) {
        return ".turn-moves";
    }
    if (rawActionList[rawActionList.length - 1].street === 3) {
        return ".river-moves";
    }
}

// возвращает номер массива rawActionList в элемент строки которого мы кликнули в симулятор
function getRawActionsIndex(elNode) {
    let currentStreet;
    let curSreetTable;
    let flopStrings = document.querySelector(".flop-moves .all-info-table");
    let turnStrings = document.querySelector(".turn-moves .all-info-table");
    let riverStrings = document.querySelector(".river-moves .all-info-table");
    if (flopStrings.contains(elNode)) {
        currentStreet = 1;
        curSreetTable = flopStrings;
    } else if (turnStrings.contains(elNode)) {
        currentStreet = 2;
        curSreetTable = turnStrings;
    } else if (riverStrings.contains(elNode)) {
        currentStreet = 3;
        curSreetTable = riverStrings;
    }

    for (let i = curSreetTable.children.length - 1; i > 0; i--) {
        if (curSreetTable.children[i].contains(elNode)) {
            for (let j = rawActionList.length - 1; j > 0; j--) {
                if (rawActionList[j].street == currentStreet - 1) {
                    //alert("Функция возвращает i + j - 1 = " + (i + j - 1));
                    return i + j - 1;
                }
            }
        }
    }

}

//усанавливает флаг гто на конкретной строке и добавляет его всем следующим 
function setGTOtoAllStings(startRawGTOIndex) {
    for(let i = startRawGTOIndex; i < rawActionList.length; i++) {
        rawActionList[i].gto = true;
    }
    removeActions();
    displayActions();
    displayAddRemoveButtons();
    restartListener();

}

// возвращает индекс первого элемента массива с включенным GTO
function whatIsFirstGTOindex() {
    for (let i = 2; i < rawActionList.length; i++) {
        if (rawActionList[i].gto == true) {
            return i;
        }
    }
    return -1;
}

function removeAllGTOstrings() {
    for (let i = rawActionList.length - 1; i >= 0; i--) {
        rawActionList[i].gto = false;
    }
    removeActions();
    displayActions();
    displayAddRemoveButtons();
    restartListener();
}
/*
//alert(document.querySelector("td").classList.contains("hidden"));
// bet 1, raise 2, call 3, check 4, fold 5
// 9 sb, 8 bb, BTN 0, CO */