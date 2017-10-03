var cardsModal = document.querySelector(".hidden-cards-select-modal");
var ul = document.querySelector(".mini-card-list");
var cards = document.querySelector(".cards");



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
    }
});


var checkedCards = [null, null, null, null, null, null, null, null];
var testBoard = [null, "12", "24", "25", "4", "37", "22", "41"];
loadCardsState(testBoard);
//loadCardsState();
//setBigCardState();
//loadCardsState();
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
    //alert("записали в нулевой элемента массива - какую карту мы хотим выбрать: " + checkedCards[0]);
});

// ожидаем клика в миникарту
ul.addEventListener('click', function(e){
    let id = e.target.id;
    changeCardState(id);  // вызываем функцию которая отображает и меняет состояние карты и добавляет/удаляет в массив
});

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
rawActionList[0] = new ActionString(0, "mammoth", 25.15, 3, 0, 0.10, 9); // post SB
rawActionList[1] = new ActionString(0, "checkmateN1", 37.25, 1, 0.10, 0.25, 8); // post BB
rawActionList[2] = new ActionString(0, "gulyaka", 27, 5, 0.35, 0, 3);  // MP1
rawActionList[3] = new ActionString(0, "zlo-Mishka", 32, 5, 0.35, 0, 2); // MP2
rawActionList[4] = new ActionString(0, "3D action", 45.37, 5, 0.35, 0, 1); // CO
rawActionList[5] = new ActionString(0, "joooe84", 60, 2, 0.35, 0.75, 0); // bet 0.75 BTN
rawActionList[6] = new ActionString(0, "mammoth", 25, 5, 0.35, 0, 9); // fold SB
rawActionList[7] = new ActionString(0, "checkmateN1", 37, 3, 1.10, 0.75, 8); // call BB

rawActionList[8] = new ActionString(1, "checkmateN1", 36.50, 4, 1.60, 0, 8);
//rawActionList[9] = new ActionString(1, "joooe84", 59.25, 1, 1.60, 1.30, 0);
//rawActionList[10] = new ActionString(1, "checkmateN1", 36.5, 3, 2.90, 1.3, 8);

//rawActionList[11] = new ActionString(2, "checkmateN1", 35.2, 4, 4.20, 0, 8);
//rawActionList[12] = new ActionString(2, "joooe84", 57.95, 1, 4.20, 3, 0);
//rawActionList[13] = new ActionString(2, "checkmateN1", 35.2, 3, 7.20, 3, 8);

//rawActionList[14] = new ActionString(3, "checkmateN1", 32.20, 1, 10.20, 10.20, 8);
//rawActionList[15] = new ActionString(3, "joooe84", 54.95, 2, 20.40, 45.95, 0);



// bet 1, raise 2, call 3, check 4, fold 5
// 9 sb, 8 bb, BTN 0, CO 1, MP2 2 ........
// (street, player, balance, action, pot, amount, position)
/*
rawActionList[9] = new ActionString(2, "checkmateN1", 35.2, 4, 4.2, 0, 8);
rawActionList[10] = new ActionString(2, "james", 21.5, 4, 4.2, 3, 2);
rawActionList[11] = new ActionString(2, "joooe84", 48.95, 1, 4.2, 3, 0);
rawActionList[12] = new ActionString(2, "checkmateN1", 35.2, 3, 7.2, 3, 8);
rawActionList[13] = new ActionString(2, "james", 21.5, 3, 7.2, 3, 2);

rawActionList[14] = new ActionString(3, "checkmateN1", 32.2, 4, 10.2, 0, 8);
rawActionList[15] = new ActionString(3, "james", 20.5, 4, 4.2, 0, 2);
rawActionList[16] = new ActionString(3, "joooe84", 45.95, 1, 20.4, 10, 0);
*/





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
    let arr = [null, "bet", "raise", "call", "check", "fold", "(choose)"];
    return arr[action];
}

function getActionIndex(text) {
    let arr = [null, "bet", "raise", "call", "check", "fold", "(choose)"];
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
    //alert("Терминально ли состояние?" + isTerminalStreetState());
    if (!isTerminalStreetState()) { // если не терминальное состояние
        //alert("Зашли в действие префлопа");
        if(rawActionList[rawActionList.length - 1].street == 1) { // улица последнего действия flop
            //alert("зашли в иф которой говорит, что последнее действие на флопе");
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
            //alert("зашли в иф которой говорит, что последнее действие на флопе");
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
    let currentAmount = rawActionList[rawActionList.length - 1].amount;
    let nPlayers = whoIsInGame().slice();
    let currentStreet = rawActionList[rawActionList.length - 1].street;
    if (rawActionList[rawActionList.length - 1].action < 3) {return false;}

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
    //alert("oldActionListLength = " + oldActionListLength);
    let isTerminalStreetStateTmp = isTerminalStreetState();
    //alert("isTerminalStreetStateTmp = " + isTerminalStreetStateTmp);
    //alert("test");
    let whoIsNextMoveTmp = whoIsNextMove();
    //alert("whoIsNextMoveTmp = " + whoIsNextMoveTmp);
    // начинаем заполнять новую строку после нажатия кнопки +
    rawActionList[oldActionListLength] = new ActionString();
    //alert("создали новую строку и тперь rawActionList.length = " + rawActionList.length);
    //alert("Сейчас терминальное состояние? " + isTerminalStreetStateTmp);
    rawActionList[oldActionListLength].street = isTerminalStreetStateTmp ? (rawActionList[oldActionListLength - 1].street + 1) : (rawActionList[oldActionListLength - 1].street);
    //alert("Первое присвоение rawActionList[oldActionListLength].street = " + rawActionList[oldActionListLength].street);
    //alert("typeof rawActionList[rawActionList.length -2].player = " + typeof rawActionList[rawActionList.length -2].player);
    //alert("typeof rawActionList[rawActionList.length -2].balance = " + typeof rawActionList[rawActionList.length -2].balance);
    //alert("typeof rawActionList[rawActionList.length -2].action = " + typeof rawActionList[rawActionList.length -2].action);
    //alert("typeof rawActionList[rawActionList.length -2].pot = " + typeof rawActionList[rawActionList.length -2].pot);
    //alert("typeof rawActionList[rawActionList.length -2].amount = " + typeof rawActionList[rawActionList.length -2].amount);
    //alert("typeof rawActionList[rawActionList.length -2].position = " + typeof rawActionList[rawActionList.length -2].position);
    for (let i = oldActionListLength - 1; i > 0; i--) {
        if (rawActionList[i].position === whoIsNextMoveTmp) {
            rawActionList[oldActionListLength].player = rawActionList[i].player;
            rawActionList[oldActionListLength].balance = parseFloat(whatIsPlayerBalance(rawActionList[i].position, oldActionListLength).toFixed(2));
            rawActionList[oldActionListLength].action = parseInt(6); // нужно выбрать - появляется селект
            rawActionList[oldActionListLength].pot = parseFloat(whatIsThePot(oldActionListLength).toFixed(2));
            rawActionList[oldActionListLength].amount = parseFloat(0); // нужно выбрать - появляется слайдер
            rawActionList[oldActionListLength].position = rawActionList[i].position;
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
    // 1 игрок который сделал фолд ИЛИ у которого УМНЫЙ баланс = 0 выбывает из игроков в игре которые могут ходить - нужен массив игроки в игре
    let playersInGame = []; //добавляем всех у кого УМНЫЙ баланc больше нуля и кто не делал фолд
    //alert("Кто ходил последний? " + lastPlayerMovePosition);
    for (let i = rawActionList.length - 1; i >= 0; i--) {
        if (rawActionList[i].action != 5 && Math.abs(rawActionList[i].balance - rawActionList[i].amount) > 0.0001) {
            // действие не фолд И разница баланса со ставкой  больше нуля
            if (rawActionList[rawActionList.length - 1].position === rawActionList[i].position && (i < rawActionList.length - 1)) {
                // если текущий не последний игрок это последний игрок
                if (rawActionList[i].action < 3) { // если действие агро
                    return playersInGame; // сделали замыкание =)
                } else if (rawActionList[i].action == 3) {
                    for (let j = i - 1; j >= 0; j--) {
                        if (rawActionList[j].action != 5 && Math.abs(rawActionList[j].balance - rawActionList[j].amount) > 0.0001) {
                            if (rawActionList[i].action < 3) {
                                if (playersInGame.indexOf(rawActionList[i].position) == -1) { // такого игрока еще не было в массиве тех кто еще в игре
                                    playersInGame.push(rawActionList[i].position); //добавили позицицию такого игрока в массив всех кто в игре
                                    return playersInGame;
                                }
                            }
                        }
                    }
                }
            }
            if (playersInGame.indexOf(rawActionList[i].position) == -1) { // такого игрока еще не было в массиве тех кто еще в игре
                playersInGame.push(rawActionList[i].position); //добавили позицицию такого игрока в массив всех кто в игре
            }
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
        //alert("Зашли узнать кто следующий, и отсортированный массив = " + nPlayers.join());
        nPlayers.join(); // посортировали массив
        for (let i = rawActionList.length - 1; i > 0; i--) {
            if (nPlayers.indexOf(rawActionList[i].position >= 0)) {
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
    let curentStreetForBalance;
    let lastPlayerAmount;
    let initBalance;
    for (let i = oldActionListLength - 1; i > 0; i--) {
        if (rawActionList[i].position === position) {
            curentStreetForBalance = rawActionList[i].street;
            lastPlayerAmount = rawActionList[i].amount;
            initBalance = rawActionList[i].balance;
            break;
        }
    }

    for (let i = oldActionListLength - 1; i > 0; i--) {
        if (rawActionList[i].position === position) {
           if (rawActionList[i].street === curentStreetForBalance) {
               initBalance = rawActionList[i].balance;
           } else {return initBalance - lastPlayerAmount;}
        }
    }
    return initBalance - lastPlayerAmount; // если улица префлоп
}


var tdAmount = $(".all-info-table td:nth-child(5)"); // селектим amount
tdAmount.on('click', amountClick);
// функция обрабатывающая клик в amount
function amountClick() {

//var tdAmount = document.querySelector(".all-info-table td:nth-child(5)");
//tdAmount.addEventListener('click', function() {
        var el = $(this);
        if (rawActionList[rawActionList.length - 1].action > 3) {
            return;
        }
        var slider = $("<form class=\"raise-form\" onsubmit=\"return false\" oninput=\"level.value = flevel.valueAsNumber.toFixed(2)\">\n" +
            "  <label for=\"flying\"></label>\n" +
            "  <input class=\"raise-amount\" name=\"flevel\" id=\"flying\" type=\"range\" min=\"0\" max=\"100\" step=\"0.05\" value=\"0\"> \n" +
            "  <span class=\"dollar\">$</span> \n" +
            "  <output for=\"flying\" name=\"level\">0.00</output>" +
            "</form>");
        el.replaceWith(slider);

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


var tdAction = $(".all-info-table td:nth-child(3)"); // селектим action
tdAction.on('click', actionClick);
// функция обрабатывающая клик в action
function actionClick() {
    var el = $(this);
    let oldActionListLength = rawActionList.length - 1;
    if (wasBet(oldActionListLength)) {
        var arr = [
            {val : 1, text: 'raise'},
            {val : 2, text: 'call'},
            {val : 3, text: 'fold'}
        ];

        var sel = $("<select id=\"flying2\">");

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
            rawActionList[rawActionList.length - 1].amount = parseFloat(Math.min(rawActionList[rawActionList.length - 1].balance, maxAmountAtCurrentStreet()));
        }
        if (parseFloat(getActionIndex(sel.options[sel.selectedIndex].text)) == 5 || parseFloat(getActionIndex(sel.options[sel.selectedIndex].text)) == 4) {
            rawActionList[rawActionList.length - 1].amount = parseFloat(0);
        }
        sel.replaceWith(td);
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

// функция перезагружающая listener
function restartListener() {
    tdAmount.off();
    tdAmount = $(".all-info-table td:nth-child(5)");
    tdAmount.on('click', amountClick);

    tdAction.off();
    tdAction = $(".all-info-table td:nth-child(3)");
    tdAction.on('click', actionClick);
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


/*
//alert(document.querySelector("td").classList.contains("hidden"));
// bet 1, raise 2, call 3, check 4, fold 5
// 9 sb, 8 bb, BTN 0, CO 1, MP2 2 ........
*/






















