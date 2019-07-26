// массив для хранения сырых строк действий
var rawActionList = [];

// Класс строка действий
class ActionString {
    constructor(street, player, balance, action, pot, amount, position, gto, isHero) {
        this.street = street;
        this.player = player;
        this.balance = balance;
        this.action = action;
        this.pot = pot;
        this.amount = amount;
        this.position = position;
        this.gto = gto;
        this.isHero = isHero;
    }

    set setNickname(newNickname) {
        this.player = newNickname;
    }

};

// тестовый массив из бекенда  // тестовый массив для префлопа из бекенда   // тестовый массив для префлопа из бекенда

// bet 1, raise 2, call 3, check 4, fold 5
// 9 sb, 8 bb, BTN 0, CO 1, MP2 2 ........
// (street, player, balance, action, pot, amount, position, isGTO, isHero)
// rawActionList[0] = new ActionString(0, "mammoth", 25.15, 3, 0, 0.10, 9, false, true); // post SB
// rawActionList[1] = new ActionString(0, "checkmateN1", 37.25, 1, 0.10, 0.25, 8, false, false); // post BB
// rawActionList[2] = new ActionString(0, "gulyaka", 27, 5, 0.35, 0, 3, false, false);  // MP1
// rawActionList[3] = new ActionString(0, "zlo-Mishka", 32, 5, 0.35, 0, 2, false, false); // MP2
// rawActionList[4] = new ActionString(0, "3D action", 45.37, 5, 0.35, 0, 1, false, false); // CO
// rawActionList[5] = new ActionString(0, "joooe84", 60, 2, 0.35, 0.75, 0, false, false); // bet 0.75 BTN
// rawActionList[6] = new ActionString(0, "mammoth", 25.05, 3, 1.10, 0.75, 9, false, true);
// rawActionList[7] = new ActionString(0, "checkmateN1", 37, 3, 1.75, 0.75, 8, false, false); // call BB
//
// rawActionList[8] = new ActionString(1, "mammoth", 24.40, 4, 2.25, 0.00, 9, false, true);
// rawActionList[9] = new ActionString(1, "checkmateN1", 36.5, 4, 2.25, 0.00, 8, false, false);
// rawActionList[10] = new ActionString(1, "joooe84", 59.25, 1, 2.25, 1.6, 0, false, false);
// rawActionList[11] = new ActionString(1, "mammoth", 24.40, 3, 3.85, 1.6, 9, false, true);
// rawActionList[12] = new ActionString(1, "checkmateN1", 36.5, 3, 5.45, 1.6, 8, false, false);
//
// rawActionList[13] = new ActionString(2, "mammoth", 22.8, 1, 7.05, 4.00, 9, false, true);
// rawActionList[14] = new ActionString(2, "checkmateN1", 34.9, 2, 11.05, 34.9, 8, false, false);
// rawActionList[15] = new ActionString(2, "joooe84", 57.65, 2, 45.95, 57.65, 0, false, false);


// rawActionList[0] = new ActionString(0, "mammoth", 25.15, 3, 0, 0.10, 9, false, true); // post SB
// rawActionList[1] = new ActionString(0, "checkmateN1", 37.25, 1, 0.10, 0.25, 8, false, false); // post BB
// rawActionList[2] = new ActionString(0, "joooe84", 60, 2, 0.35, 0.75, 0, false, false); // bet 0.75 BTN
// rawActionList[3] = new ActionString(0, "mammoth", 25.05, 3, 1.10, 0.75, 9, false, true);
// rawActionList[4] = new ActionString(0, "checkmateN1", 37, 3, 1.75, 0.75, 8, false, false); // call BB
//
// rawActionList[5] = new ActionString(1, "mammoth", 24.40, 4, 2.25, 0.00, 9, false, true);
// rawActionList[6] = new ActionString(1, "checkmateN1", 36.5, 4, 2.25, 0.00, 8, false, false);
// rawActionList[7] = new ActionString(1, "joooe84", 59.25, 1, 2.25, 1.6, 0, false, false);
// rawActionList[8] = new ActionString(1, "mammoth", 24.40, 3, 3.85, 1.6, 9, false, true);
// rawActionList[9] = new ActionString(1, "checkmateN1", 36.5, 3, 5.45, 1.6, 8, false, false);
//
// rawActionList[10] = new ActionString(2, "mammoth", 22.8, 1, 7.05, 4.00, 9, false, true);
// rawActionList[11] = new ActionString(2, "checkmateN1", 34.9, 2, 11.05, 34.9, 8, false, false);
// rawActionList[12] = new ActionString(2, "joooe84", 57.65, 2, 45.95, 57.65, 0, false, false);

// (street, player, balance, action, pot, amount, position, isGTO, isHero)
// multipot
// rawActionList[0] = new ActionString(0, "mammoth", 5.15, 3, 0, 0.10, 9, false, true); // post SB   -20
// rawActionList[1] = new ActionString(0, "checkmateN1", 7.25, 1, 0.10, 0.25, 8, false, false); // post BB  -30
// rawActionList[2] = new ActionString(0, "joooe84", 5, 2, 0.35, 0.75, 0, false, false); // bet 0.75 BTN    -55
// rawActionList[3] = new ActionString(0, "mammoth", 5.05, 3, 1.10, 0.75, 9, false, true);
// rawActionList[4] = new ActionString(0, "checkmateN1", 7, 3, 1.75, 0.75, 8, false, false); // call BB
//
// rawActionList[5] = new ActionString(1, "mammoth", 4.40, 4, 2.25, 0.00, 9, false, true);
// rawActionList[6] = new ActionString(1, "checkmateN1", 6.5, 4, 2.25, 0.00, 8, false, false);
// rawActionList[7] = new ActionString(1, "joooe84", 4.25, 1, 2.25, 1.6, 0, false, false);
// rawActionList[8] = new ActionString(1, "mammoth", 4.40, 3, 3.85, 1.6, 9, false, true);
// rawActionList[9] = new ActionString(1, "checkmateN1", 6.5, 3, 5.45, 1.6, 8, false, false);

// ha
rawActionList[0] = new ActionString(0, "checkmateN1", 7.25, 3, 0, 0.1, 0, false, false); // post BB  -30
rawActionList[1] = new ActionString(0, "joooe84", 5, 1, 0.1, 0.25, 8, false, false);       // bet 0.75 BTN   -55
rawActionList[2] = new ActionString(0, "checkmateN1", 7.15, 2, 0.35, 0.75, 0, false, false);   // call BB
rawActionList[3] = new ActionString(0, "joooe84", 4.75, 3, 1, 0.75, 8, false, false);       // bet 0.75 BTN   -55
//

// ha allin
// rawActionList[0] = new ActionString(0, "checkmateN1", 7.25, 3, 0, 0.1, 8, false, false); // post BB  -30
// rawActionList[1] = new ActionString(0, "joooe84", 5, 1, 0.1, 0.25, 0, false, false);       // bet 0.75 BTN   -55
// rawActionList[2] = new ActionString(0, "checkmateN1", 7.15, 2, 0.35, 7.15, 8, false, false);   // call BB
// rawActionList[3] = new ActionString(0, "joooe84", 4.75, 3, 1, 4.75, 0, false, false);       // bet 0.75 BTN   -55

//
// rawActionList[6] = new ActionString(1, "checkmateN1", 6.5, 4, 2.25, 0.00, 8, false, false);
// rawActionList[7] = new ActionString(1, "joooe84", 4.25, 1, 2.25, 1.6, 0, false, false);
// rawActionList[9] = new ActionString(1, "checkmateN1", 6.5, 3, 5.45, 1.6, 8, false, false);





// функция копирующая в массив сырые действия из загруженной с сервера руки
function copyActionList(arr) {
    rawActionList.length = 0;
}

function getPositionText(position) {
    let arr = ["BTN", "CO", "MP3", "MP2", "MP1", "UTG2", "UTG1", "UTG0", "BB", "SB"];
    return arr[position];
}

function getActionText(action, index) {
    let arr = [index == 0 ? "PostSB" : "PostBB", "bet", "raise", "call", "check", "fold", "\t&ltselect\t&gt"];
    return arr[action];
}

function getStreetText(street) {
    let arr = ["Preflop", "Flop", "Turn", "River"];
    return arr[street];
}

function getActionIndex(text) {
    let arr = [null, "bet", "raise", "call", "check", "fold", "\t&ltselect\t&gt"];
    return arr.indexOf(text);
}
function getStreetName(streetNumber) {
    let streets = ["preflop", "flop", "turn", "river"];
    return streets[streetNumber];
}


// bet 1, raise 2, call 3, check 4, fold 5
// 9 sb, 8 bb, BTN 0, CO 1, MP2 2 ........
// (street, player, balance, action, pot, amount, position)

displayActions();
// отрисовывает текущий массив действий
function displayActions() {

    if (rawActionList.length > 0) {
        for (let i = 0; i < rawActionList.length; i++) {

            let Move = document.querySelector("." + getStreetName(rawActionList[i].street) + "-moves .all-info-table");
            let tr = document.createElement("tr");  // создали строку

            // (player, balance, action, pot, amount, position)
            let td = document.createElement("td");
            td.innerHTML = rawActionList[i].player;
            tr.appendChild(td);

            if (rawActionList[i].street === 0) {
                td = document.createElement("td");
                td.innerHTML = getPositionText(rawActionList[i].position);
                tr.appendChild(td);
            }

            td = document.createElement("td");
            td.innerHTML = "$" + rawActionList[i].balance;
            tr.appendChild(td);

            td = document.createElement("td");
            td.innerHTML = getActionText(rawActionList[i].action, i);
            tr.appendChild(td);

            td = document.createElement("td");
            td.innerHTML = "$" + rawActionList[i].pot;
            tr.appendChild(td);

            td = document.createElement("td");
            if (rawActionList[i].amount) {
                td.innerHTML = "$" + rawActionList[i].amount;
            } else {td.innerHTML = ""};
            tr.appendChild(td);

            Move.appendChild(tr);
            Move.classList.remove("hide-table-row");
            if (rawActionList[i].gto) {
                if (rawActionList[i].isHero) {
                    tr.style.color = "#7793ff";
                } else {tr.style.color = "#c737ff";}
            } else if (rawActionList[i].isHero) {tr.style.color = "#7793ff";}
            if (i === whatIsFirstGTOindex()) {
                tr.style.color = "red";
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

    if (nPlayers.length <= 1 && rawActionList[rawActionList.length - 1].action >= 3 && whoIsInGame() == rawActionList[rawActionList.length - 1].position) {
        return true;
    }

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
    if (rawActionList[rawActionList.length - 1].action === 6) {
        alert("Choose action before adding new action string!");
        return;
    }
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
    if(rawActionList[oldActionListLength - 1].street > 0) {
        rawActionList[oldActionListLength].street = isTerminalStreetStateTmp ? (rawActionList[oldActionListLength - 1].street + 1) : (rawActionList[oldActionListLength - 1].street);
    } else {rawActionList[oldActionListLength].street = 1}

    for (let i = oldActionListLength - 1; i > 0; i--) {
        if (rawActionList[i].position === whoIsNextMoveTmp) {
            //console.group("addActionString test group");
            //console.log("rawActionList[i].player = " + rawActionList[i].player);
            //console.log("parseFloat(whatIsPlayerBalance(rawActionList[i].position, oldActionListLength).toFixed(2) = " + parseFloat(whatIsPlayerBalance(rawActionList[i].position, oldActionListLength).toFixed(2)));
            //console.log("parseFloat(whatIsThePot(oldActionListLength).toFixed(2)) = " + parseFloat(whatIsThePot(oldActionListLength).toFixed(2)));
            //console.log("rawActionList[i].position = " + rawActionList[i].position);
            //console.groupEnd();
            rawActionList[oldActionListLength].player = rawActionList[i].player;
            rawActionList[oldActionListLength].balance = parseFloat(whatIsPlayerBalance(rawActionList[i].position, oldActionListLength).toFixed(2));
            rawActionList[oldActionListLength].action = parseInt(6); // нужно выбрать - появляется селект
            rawActionList[oldActionListLength].pot = parseFloat(whatIsThePot(oldActionListLength)).toFixed(2);
            rawActionList[oldActionListLength].amount = parseFloat(0); // нужно выбрать - появляется слайдер
            rawActionList[oldActionListLength].position = rawActionList[i].position;
            if (rawActionList[oldActionListLength - 1].gto) {
                rawActionList[oldActionListLength].gto = true;
            } else {rawActionList[oldActionListLength].gto = false;}
            rawActionList[oldActionListLength].isHero = rawActionList[i].isHero;
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

function clearAllrawActionsList() {
    rawActionList = [];
}

//очищает таблицы c действиями постфлопа
function removeActions() {
    //console.log(rawActionList);
    let preflopMoves = document.querySelector(".preflop-moves .all-info-table");
    let flopMoves = document.querySelector(".flop-moves .all-info-table");
    let turnMoves = document.querySelector(".turn-moves .all-info-table");
    let riverMoves = document.querySelector(".river-moves .all-info-table");

    while(preflopMoves.childElementCount > 2) {preflopMoves.removeChild(preflopMoves.lastChild);}
    while(flopMoves.childElementCount > 2) {flopMoves.removeChild(flopMoves.lastChild);}
    while(turnMoves.childElementCount > 2) {turnMoves.removeChild(turnMoves.lastChild);}
    while(riverMoves.childElementCount > 2) {riverMoves.removeChild(riverMoves.lastChild);}
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
    let preflopStrings = document.querySelector(".preflop-moves .all-info-table");
    let flopStrings = document.querySelector(".flop-moves .all-info-table");
    let turnStrings = document.querySelector(".turn-moves .all-info-table");
    let riverStrings = document.querySelector(".river-moves .all-info-table");

    if (preflopStrings.contains(elNode)) {
        currentStreet = 0;
        curSreetTable = preflopStrings;

    } else if (flopStrings.contains(elNode)) {
        currentStreet = 1;
        curSreetTable = flopStrings;
    } else if (turnStrings.contains(elNode)) {
        currentStreet = 2;
        curSreetTable = turnStrings;
    } else if (riverStrings.contains(elNode)) {
        currentStreet = 3;
        curSreetTable = riverStrings;
    }

    for (let i = curSreetTable.children.length - 1; i >= 0; i--) {
        if (curSreetTable.children[i].contains(elNode)) {
            if (currentStreet === 0) {return i - 2}
            for (let j = rawActionList.length - 1; j >= 0; j--) {
                if (rawActionList[j].street == currentStreet - 1 || (j === 1 && currentStreet === 0)) {
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

// возвращает индекс первого элемента массива в сырых действиях с включенным GTO
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