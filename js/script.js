var cardsModal = document.querySelector(".hidden-cards-select-modal");
var ul = document.querySelector(".mini-card-list");
var cards = document.querySelector(".cards");
let playerStats = document.getElementById("player-stats");
var uploadWindow = document.getElementById("upload-window");

//обработка событий главного меню навигации
navigationListener();
function navigationListener() {
    var mephisto_links = $(".navigation-menu li:not(:last-child) a");
    var pages = $(".pages");
    var left_navigation = $(".left-navigation");
    var navigationMenu = $("#nav-3 li");
    mephisto_links.on("click", function (e) {
        pages.addClass("hidden");
        pages.removeClass("text-pages-appear");
        left_navigation.addClass("hidden");
        left_navigation.removeClass("left-navigation-appear");
        left_navigation.addClass("left-navigation-appear");
        left_navigation.empty();
        navigationMenu.removeClass("nav-active");
        let elNode= e.target; // nodeType == 1
        //alert(elNode.textContent);
        let selectedPage = $("#" + elNode.textContent + "-html");
        selectedPage.removeClass("hidden");
        selectedPage.addClass("text-pages-appear");
        if (elNode.textContent !== 'simulator') {
            if (elNode.textContent === 'mephisto') {
                left_navigation.css("background-color", "dodgerblue");
                let text = $("<h2>Особенности ИИ Mephisto:</h2>\n" +
                    "                <ul>\n" +
                    "                    <li>- Высокая скорость симуляций</li>\n" +
                    "                    <li>- Точность модели оппонента в любой ситуации</li>\n" +
                    "                    <li>- Рассчет EV в реальном времени на любой улице</li>\n" +
                    "                    <li>- Любое количество игроков за столом</li>\n" +
                    "                    <li>- Любые сайзинги ставок</li>\n" +
                    "                    <li>- Расчет равновесия Нэша с флопа в реальном времени</li>\n" +
                    "                </ul>");
                left_navigation.append(text);
            } else if (elNode.textContent === 'neuromodeling') {
                left_navigation.css("background-color", "#8c2eac");
                let text = $("<h2>Средства разработки:</h2>\n" +
                    "                <ul>\n" +
                    "                    <li>- C++</li>\n" +
                    "                    <li>- Oracle</li>\n" +
                    "                    <li>- Python</li>\n" +
                    "                    <li>- CNTK</li>\n" +
                    "                    <li>- Sparse autoencoder</li>\n" +
                    "                    <li>- Deep belief networks</li>\n" +
                    "                    <li>- Hopfield network</li>\n" +
                    "                </ul>");
                left_navigation.append(text);
            } else if (elNode.textContent === 'manual') {
                left_navigation.css("background-color", "#47ac1b");
                let text = $("<h2>Основные возможности:</h2>\n" +
                    "                <p>- Загрузка истории раздач</p>\n" +
                    "                <p>- Вычисление EV</p>\n" +
                    "                <p>- Отображение стратегии</p>\n" +
                    "                <p>- Отображение спектров</p>\n" +
                    "                <p>- Отображение вероятности действий</p>\n" +
                    "                <p>- Режим обучения</p>\n" +
                    "                <p>- Тестирование</p>\n" +
                    "                <p>- Расчет равновесия Нэша</p>\n" +
                    "                <p>- Обработка 100 000 сыгранных игроком рук с выводом ошибочных ходов</p>");
                left_navigation.append(text);
            } else if (elNode.textContent === 'buy') {
                left_navigation.css("background-color", "#492cac"); //#ac3935
                let text = $("<h2>Особенности тренировок:</h2>\n" +
                    "                <ul>\n" +
                    "                    <li>- Опыт тренировки с реальными оппонентами из покер румов</li>\n" +
                    "                    <li>- Тренировка по реальным раздачам</li>\n" +
                    "                    <li>- Работа над слабыми местами в вашей игре</li>\n" +
                    "                    <li>- Глубокое понимание адаптации после тренировок</li>\n" +
                    "                    <li>- Ощутимая практическая польза, в отличие от чисто равновесных программ</li>\n" +
                    "                    <li>- Образцовая player-ориентированная игра от ИИ Mephisto</li>\n" +
                    "                    <li>- Загрузка вашей раздачи в один клик</li>\n" +
                    "                    <li>- Получение результатов анализа за 15секунд</li>\n" +
                    "                </ul>");
                left_navigation.append(text);
            } else if (elNode.textContent === 'contacts') {
                left_navigation.css("background-color", "#2987ac");
                let text = $("<h2>Будем рады:</h2>\n" +
                    "                <ul>\n" +
                    "                    <li>- Услышать любые отзывы</li>\n" +
                    "                    <li>- Прочитать любые пожелания</li>\n" +
                    "                    <li>- Рассмотреть предложения по сотрудничеству</li>\n" +
                    "                </ul>");
                left_navigation.append(text);
            }

            left_navigation.removeClass("hidden");
            left_navigation.addClass("left-navigation-appear");
        }
        elNode.parentNode.classList.add("nav-active");
    });
}

//создаем миникарты
createMinCards();
function createMinCards() {
    for (var i = 0; i < 52; i++) {
        let li = document.createElement("li");
        ul.appendChild(li);
        li.id = i; // добавили мини-картам id
        li.style.backgroundImage = "url('img/png_cards_min/card_" + i + "_alt.png')";
    }
}


function showModalCardsLeft() {
    cardsModal.classList.add("appear-very-fast");
    if (cardsModal.classList.contains("position-right")) {
        cardsModal.classList.remove("position-right");
    }
}

function showModalCardsRight() {
    cardsModal.classList.add("appear-very-fast");
    cardsModal.classList.add("position-right");
}


//закрываем модальное окно с мини-картами
function modalCardsClose() {
    cardsModal.classList.remove("appear-very-fast");
    checkedCards[0] = null;
    setBigCardState();                   //вызываем перерисовку больших карт
    if (cardsModal.classList.contains("position-right")) {
        cardsModal.classList.remove("position-right");
    }
}

window.addEventListener("keydown", function (event) {
    if (event.keyCode === 27) {
        if (uploadWindow.classList.contains("appear-fast")) {
            uploadWindow.classList.remove("appear-fast");
        }

        if (loginForm.classList.contains("visually")) {
            loginForm.classList.remove("visually");
            $('#bg_layer').removeClass("visually");
        }
        if (cardsModal.classList.contains("appear-very-fast")) {
            cardsModal.classList.remove("appear-very-fast");
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

var cardsName = ["2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "Th", "Jh", "Qh", "Kh", "Ah", "2c", "3c", "4c", "5c", "6c", "7c", "8c", "9c", "Tc", "Jc", "Qc", "Kc", "Ac", "2d", "3d", "4d", "5d", "6d", "7d", "8d", "9d", "Td", "Jd", "Qd", "Kd", "Ad", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "Ts", "Js", "Qs", "Ks", "As"];

// checkedCards[0] = null || hole || flop || turn || river... все остальные элементы массива - карты
var checkedCards = [null, null, null, null, null, null, null, null];
var testBoard = [null, "12", "24", "25", "4", "37", "48", null];
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
        } else {document.getElementById('card_' + i).style.backgroundImage = "url('img/cards/card_back7.png')";}
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

/*
// пример простейшей функции с мемоизацией
const add = (n) => (n + 10);
add(9);

// a simple memoized function to add something
const memoizedAdd = () => { //идентично объявлению function memoizedAdd() {.....}
    let cache = {};
    return (n) => {
        if (n in cache) {
            console.log('Fetching from cache');
            return cache[n];
        }
        else {
            console.log('Calculating result');
            let result = n + 10;
            cache[n] = result;
            return result;
        }
    }
};

// returned function from memoizedAdd
const newAdd = memoizedAdd();
alert(newAdd(9));	// calculated
alert(newAdd(9));	// cached
//const pii = 3.14;
//alert(`Проверка новых данных ${pii}`);

*/

// a simple pure function to get a value adding 10
const add = (n) => (n + 10);
console.log('Simple call', add(3));

// a simple memoize function that takes in a function
// and returns a memoized function
const memoize = (fn) => {
    let cache = {};
    return (...args) => {
        let n = args[0];
        if (n in cache) {
            console.log('Fetching from cache');
            return cache[n];
        }
        else {
            console.log('Calculating result');
            let result = fn(n);
            cache[n] = result;
            return result;
        }
    }
}

// creating a memoized function for the 'add' pure function
const memoizedAdd = memoize(add);
console.log(memoizedAdd(3));
console.log(memoizedAdd(3));
console.log(memoizedAdd(4));
console.log(memoizedAdd(4));

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

class Player {
    constructor(player, id) {
        this.player = player;
        this.id = id;
    }
};

var loginNavigationButton = document.getElementById("login-form");
function displayLoginForm() {
    loginNavigationButton.classList.add("visually");
    $('#bg_layer').addClass("visually");
}

var loginForm = document.getElementById("login-form");
function loginFormClose() {
    loginForm.classList.remove("visually");
    $('#bg_layer').removeClass("visually");
}

// тестовый массив из бекенда  // тестовый массив для префлопа из бекенда   // тестовый массив для префлопа из бекенда

// bet 1, raise 2, call 3, check 4, fold 5
// 9 sb, 8 bb, BTN 0, CO 1, MP2 2 ........
// (street, player, balance, action, pot, amount, position, isGTO, isHero)
rawActionList[0] = new ActionString(0, "mammoth", 25.15, 3, 0, 0.10, 9, false, true); // post SB
rawActionList[1] = new ActionString(0, "checkmateN1", 37.25, 1, 0.10, 0.25, 8, false, false); // post BB
rawActionList[2] = new ActionString(0, "gulyaka", 27, 5, 0.35, 0, 3, false, false);  // MP1
rawActionList[3] = new ActionString(0, "zlo-Mishka", 32, 5, 0.35, 0, 2, false, false); // MP2
rawActionList[4] = new ActionString(0, "3D action", 45.37, 5, 0.35, 0, 1, false, false); // CO
rawActionList[5] = new ActionString(0, "joooe84", 60, 2, 0.35, 0.75, 0, false, false); // bet 0.75 BTN
rawActionList[6] = new ActionString(0, "mammoth", 25.05, 3, 1.10, 0.75, 9, false, true);
rawActionList[7] = new ActionString(0, "checkmateN1", 37, 3, 1.75, 0.75, 8, false, false); // call BB

rawActionList[8] = new ActionString(1, "mammoth", 24.40, 4, 2.25, 0.00, 9, false, true);
rawActionList[9] = new ActionString(1, "checkmateN1", 36.5, 4, 2.25, 0.00, 8, false, false);
rawActionList[10] = new ActionString(1, "joooe84", 59.25, 1, 2.25, 1.6, 0, false, false);
rawActionList[11] = new ActionString(1, "mammoth", 24.40, 3, 3.85, 1.6, 9, false, true);
rawActionList[12] = new ActionString(1, "checkmateN1", 36.5, 3, 5.45, 1.6, 8, false, false);

rawActionList[13] = new ActionString(2, "mammoth", 22.8, 1, 7.05, 4.00, 9, false, true);
rawActionList[14] = new ActionString(2, "checkmateN1", 34.9, 2, 11.05, 34.9, 8, false, false);
rawActionList[15] = new ActionString(2, "joooe84", 57.65, 2, 45.95, 57.65, 0, false, false);



// функция копирующая в массив сырые действия из загруженной с сервера руки
function copyActionList(arr) {
    rawActionList.length=0;

}

function getPositionText(position) {
    let arr = ["BTN", "CO", "MP3", "MP2", "MP1", "UTG2", "UTG1", "UTG0", "BB", "SB"];
    return arr[position];
}

function getActionText(action) {
    let arr = [null, "bet", "raise", "call", "check", "fold", "\t&ltselect\t&gt"];
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
        for (let i = 2; i < rawActionList.length; i++) {

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
    let currentLastAmount = parseFloat(rawActionList[oldActionListLength - 1].amount);
    for (let i = oldActionListLength - 2; i >= 0; i--) {
        if (rawActionList[i].position == lastPlayerPosition && rawActionList[i].street == rawActionList[oldActionListLength - 1].street) {
            return parseFloat(rawActionList[oldActionListLength - 1].pot) + currentLastAmount - parseFloat(rawActionList[i].amount);
        }
    }
    return parseFloat(rawActionList[oldActionListLength - 1].pot) + currentLastAmount;
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
    if(Math.abs(Math.min(initPlayerBalance(rawActionList[rawActionList.length - 1].position, rawActionList.length), minAmount()).toFixed(2) - initPlayerBalance(rawActionList[rawActionList.length - 1].position, rawActionList.length).toFixed(2)) < 0.0001) {
            let td = document.createElement("td");
            td.innerHTML = "$" + initPlayerBalance(rawActionList[rawActionList.length - 1].position, rawActionList.length).toFixed(2);
            el.replaceWith(td);
            rawActionList[rawActionList.length - 1].amount = initPlayerBalance(rawActionList[rawActionList.length - 1].position, rawActionList.length).toFixed(2);
            removeActions();
            displayActions();
            displayAddRemoveButtons();
            restartListener();
            return;
    }

    var slider = $("<form class=\"raise-form\" onsubmit=\"return false\" oninput=\"level.value = flevel.valueAsNumber.toFixed(2)\">\n" +
        "  <label for=\"flying\"></label>\n" +
        "  <input class=\"raise-amount\" name=\"flevel\" id=\"flying\" type=\"range\" min=\"" + Math.min(initPlayerBalance(rawActionList[rawActionList.length - 1].position, rawActionList.length), minAmount()).toFixed(2) + "\" max=\"" + initPlayerBalance(rawActionList[rawActionList.length - 1].position, rawActionList.length).toFixed(2) + "\" step=\"0.05\" value=\"" + rawActionList[rawActionList.length - 1].amount + "\"> \n" +
        "  <span class=\"dollar\">$</span> \n" +
        "  <output for=\"flying\" name=\"level\">" + Math.min(initPlayerBalance(rawActionList[rawActionList.length - 1].position, rawActionList.length), Math.max(rawActionList[rawActionList.length - 1].amount, minAmount())).toFixed(2) + "</output>" +
        "</form>");

    el.replaceWith(slider);
    //$('input').focus();
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
var PlayerStatsInStrategy = $("#h4id");
PlayerStatsInStrategy.on('contextmenu', displayStats);
// функция показывающая статистику на игрока
function displayStats(e) {
    //alert("зашли в функцию правым кликом в ФФ");
    e.preventDefault();
    let elNode= e.target; // nodeType == 1
    $('#player-stats').remove();
    $(".all-info-table td:nth-child(1)").removeClass("color-yellow");
    var el = $(this);

    //let player = rawActionList[getRawActionsIndex(elNode)].player;   - НЕ  РАБОТАЕТ НА ПРЕФЛОПЕ!!!

    let playerStats = $("<div id=\"player-stats\"></div>");

    let allStats = $("<h4>Preflop</h4>\n" +
        "\n" +
        "            <p><span>VPIP: </span><span id=\"stats-vpip\">22</span><span>, PFR: </span><span id=\"stats-pfr\">17.5</span><span>, 3-Bet: </span><span id=\"stats-3bet\">7.3</span><span>, hands: </span><span id=\"stats-hands\">13300</span></p>\n" +
        "            <p><span>Steal CO: </span><span id=\"stats-stealCO\">27</span><span>, Steal BTN: </span><span id=\"stats-stealBTN\">55</span><span>, Steal SB: </span><span id=\"stats-stealSB\">47</span></p>\n" +
        "            <p><span>Fold To Steal BB vs SB: </span><span id=\"stats-foldStealBBvsSB\">55</span><span>, Fold To Steal BB vs BTN: </span><span id=\"stats-foldStealBBvsBTN\">60</span><span>, Fold To Steal BB vs CO: </span><span id=\"stats-foldStealBBvsCO\">73</span></p>\n" +
        "            <p><span>Fold To Steal SB vs BTN: </span><span id=\"stats-foldStealSBvsBTN\">80</span><span>, Fold To Steal SB vs CO: </span><span id=\"stats-foldStealSBvsCO\">86</span><span>, Fold To 3-Bet Steal: </span><span id=\"stats-foldTo3BetSteal\">53</span></p>\n" +
        "            <p><span>4-Bet: </span><span id=\"stats-4bet\">11.4</span><span>, Fold To 4-Bet: </span><span id=\"stats-foldTo4Bet\">48</span></p>\n" +
        "\n" +
        "            <h4>Postflop</h4>\n" +
        "\n" +
        "            <p><span>Raise%: </span><span id=\"stats-raisePersent\">8</span><span>, Call%: </span><span id=\"stats-callPercent\">40</span></p>\n" +
        "            <p><span>WTSD: </span><span id=\"stats-WTSD\">27</span><span>, WSF: </span><span id=\"stats-WSF\">44</span><span>, W$SD No Raise: </span><span id=\"stats-WSD\">53</span></p>\n" +
        "\n" +
        "            <h4>Flop</h4>\n" +
        "\n" +
        "            <p><span>Agg% Flop: </span><span id=\"stats-aggPersentFlop\">28</span><span>, Cbet Flop: </span><span id=\"stats-cbetFlop\">54</span><span>, Fold To Cbet Flop: </span><span id=\"stats-foldToCbetFlop\">45</span></p>\n" +
        "            <p><span>Donk Flop: </span><span id=\"stats-donkFlop\">4</span><span>, Fold To Raise Flop: </span><span id=\"stats-foldRaiseFlop\">40</span><span>, W$SD Raise Flop: </span><span id=\"stats-WSDraiseFlop\">58</span></p>\n" +
        "\n" +
        "            <h4>Turn</h4>\n" +
        "\n" +
        "            <p><span>Agg% Turn: </span><span id=\"stats-aggPersentTurn\">27</span><span>, Cbet Turn: </span><span id=\"stats-cbetTurn\">50</span><span>, Fold To Cbet Turn: </span><span id=\"stats-foldToCbetTurn\">39</span></p>\n" +
        "            <p><span>Fold To Raise Turn: </span><span id=\"stats-foldRaiseTurn\">38</span><span>, W$SD Raise Turn: </span><span id=\"stats-WSDraiseTurn\">60</span></p>\n" +
        "\n" +
        "            <h4>River</h4>\n" +
        "\n" +
        "            <p><span>Agg% River: </span><span id=\"stats-aggPersentRiver\">23</span><span>, W$SD Raise River: </span><span id=\"stats-WSDraiseRiver\">61</span><span>, River Call Win%: </span><span id=\"stats-riverCallWin\">48</span></p>\n");

    this.classList.add("color-yellow");
    el.append(playerStats);
    el.css("overflow", "visible");
    $("#player-stats").append(allStats);
    //$("#player-stats").append(nicknameTXT);
    tdPlayerStats.off();
    tdPlayerStats = $(".all-info-table td:nth-child(1)");
    tdPlayerStats.on('contextmenu', displayStats);

    let div = document.getElementById("player-stats");
    let offset = el.offset();

    div.style.left = getValidXCoordinates(offset.left) +'px';
    div.style.top = getValidYCoordinates(offset.top) +'px';

    $(document).on('click', dontCloseStats);
    function dontCloseStats(e) {
        if(document.getElementById("player-stats") == null) {
            return;
        }
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

//тестовый массив с игроками на выбор
var playersList = [];
playersList.push("TAG1", "TAG2", "Fish1", "TAG3", "Fish2", "TAG4", "TAG5", "TAG6", "TAG7", "Fish3", "TAG8", "Fish4", "TAG9", "TAG10");

var playersSelect = $("<input class=\"type-search\" type=\"text\" id=\"nickname-input\"/>\n" +
    "                                    <select size=\"7\" id=\"list\">\n" +
    "                                    </select>");

var tdPlayer2 = $(".all-info-table td:nth-child(1)"); // nickname
tdPlayer2.on('click', selectPlayer);
// функция меняющая никнейм игрока в данной строке
function selectPlayer(e) {
    //alert("зашли в функцию правым кликом в ФФ");
    e.preventDefault();
    let elNode= e.target; // nodeType == 1
    var el = $(this);

    var arr = [];
    for (let i = 0; i < playersList.length; i++) {
        arr[i] = {val: 1, text: playersList[i]};
    }
    $(arr).each(function() {
        playersSelect.append($("<option>").attr('value',this.val).text(this.text));
    });


    //$(".all-info-table td:nth-child(1)").css("overflow", "visible");
    this.classList.add("color-yellow");

    el.append(playersSelect);

    $(".all-info-table td:nth-child(1)").css("overflow", "visible");
    tdPlayer2.off();

    $('#nickname-input').off();
    $('#nickname-input').on('keyup', playerSearch);
    $('#list').off('change');
    $('#list').change(playerSearchSelectedList);
    $('#list option').off();
    $('#list option').on('dblclick', setNewPlayer);

    //this.parentNode.firstChild.innerHTML = "test text"; - меняет на то, что нужно.. использовать в конце в конце
        playersSelect.focusout(function(){
            let td = document.createElement("td");
            var sel = document.getElementById("nickname-input");
            td.innerHTML = sel.options[sel.selectedIndex].text;
            sel.replaceWith(td);

            removeActions();
            displayActions();
            displayAddRemoveButtons();
            restartListener();
        });


    $(document).keyup(function(e) {
        if (e.keyCode == 27) { // escape
            el.removeClass("color-yellow");
            el.css("overflow", "hidden");
            playersSelect.remove();
            removeActions();
            displayActions();
            displayAddRemoveButtons();
            restartListener();
        }
    });
}


var tdActionMenu = $(".all-info-table.postflop td:nth-child(3), .all-info-table.preflop td:nth-child(4)"); // action menu
tdActionMenu.on('contextmenu', actionMenu);
// функция обрабатывающая ПРАВЫЙ клик в action
function actionMenu(e) {
    e.preventDefault();

    var el = $(this);
    let elNode = e.target; // nodeType == 1
    let isGTO = "";
    if (whatIsFirstGTOindex() == getRawActionsIndex(elNode)) {
        isGTO = "checked";
    }
    function showEV() {
       if (rawActionList[getRawActionsIndex(elNode)].isHero)  {
           return "<input type=\"button\" id=\"ev\" name=\"action-checkbox\" hidden>\n" +
               "                        <label for=\"ev\">Evaluate EV's</label>"
       } else {return "";}
    }
    let actionMenu = $("<div id=\"action-menu\" class=\"hidden\">\n" +
        "            <input type=\"button\" id=\"range\" name=\"action-checkbox\" hidden>\n" +
        "            <label for=\"range\">Show range</label>\n" +
        "            <input type=\"button\" id=\"probabilities\" name=\"action-checkbox\" hidden>\n" +
        "            <label for=\"probabilities\">Show strategy</label>\n" +
        showEV() +
        "            <input type=\"checkbox\" id=\"gto\" name=\"action-checkbox\" " + isGTO + " hidden>\n" +
        "            <label for=\"gto\">Start GTO from here</label>\n" +
        "        </div>");

    this.classList.add("color-violet");
    el.append(actionMenu);
    let div = document.getElementById("action-menu");

    //меняет размер окна action menu в зависимости от наличия пункта Evaluate EV's
    if (!rawActionList[getRawActionsIndex(elNode)].isHero) {
        div.style.height = "120px";
    } else {
        div.style.height = "150px";
    }

    div.classList.remove("hidden");
    div.style.left = 40 +'px';
    div.style.top = 13 +'px';

    tdAction.off();

    $('#range').on('click', showRange); //присваеваем обработчик клика в range
    $('#probabilities').on('click', showStrategy);
    //открывает окно с отобажением спектра игрока
    function showRange() {
        actionToJson(getRawActionsIndex(elNode), "range");
        tdActionMenu.off();
        actionMenu.remove();
        //$("#waiting-progress-bar").addClass("appear");
        $("#waiting-progress-bar2").addClass("appear");
        setTimeout(function() {
            el.removeClass("color-violet");
            //$('#waiting-progress-bar').removeClass("appear");
            $('#waiting-progress-bar2').removeClass("appear");
            //createHillInfo(); // заголовок окна со спектром
            $(".hill-info").addClass("appear-fast");
            createAllCombinationsArr("range", getRawActionsIndex(elNode)); //вызвали функцию рисующую график// Первый аргумент - превышение ставки над максимальной
            restartListener();

        }, 2000);

        return false;
    }

    function showStrategy() {
        actionToJson(getRawActionsIndex(elNode), "strategy");
        tdActionMenu.off();
        actionMenu.remove();
        $("#waiting-progress-bar2").addClass("appear");
        setTimeout(function() {
            el.removeClass("color-violet");
            //$('#waiting-progress-bar').removeClass("appear");
            $('#waiting-progress-bar2').removeClass("appear");
            //createHillInfo(); // заголовок окна со спектром
            $(".hill-info").addClass("appear-fast");
            createAllCombinationsArr("strategy", getRawActionsIndex(elNode)); //вызвали функцию рисующую график
            restartListener();

        }, 2000);

        return false;
    }

    $("#ev").on("click", function() {
        actionToJson(getRawActionsIndex(elNode), "ev");
        tdActionMenu.off();
        actionMenu.remove();
        $("#waiting-progress-bar").addClass("appear");
        //$("#waiting-progress-bar2").addClass("appear");
        setTimeout(function() {
            el.removeClass("color-violet");
            $('#waiting-progress-bar').removeClass("appear");
            //$('#waiting-progress-bar2').removeClass("appear");
            createEVinfo();
            $(".probabilities-info").addClass("appear-fast");
            restartListener();

        }, 2000);

        return false;
    });

    $("#gto").on("click", function() {
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
        if(document.getElementById("action-menu") == null) {
            return;
        }
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

//обйект с названием всех комбинаций
var combinations = {
    "no made hand": 0,
    "ace high": 0,
    "weak pair": 0,
    "middle pair": 0,
    "top pair": 0,
    "over pair": 0,
    "two pair": 0,
    "set": 0,
    "straight": 0,
    "flash": 0,
    "full house": 0,
    "care": 0,
    "straight flash": 0,
    "royal flash": 0
};


function combination() {

}

//заполняет окно спектра информацией
function createAllCombinationsArr(strategyORrange, rawActionIndex) {

    //Width and height svg on the left
    var w = 300;
    var h = 2000;

    //цвета диаграмм
    var agroColor = "#7d1008";
    var callColor = "#899600";
    var foldColor = "#36342d";

    var currentColor = "#000082";
    var nodeColor = "#628cb9";
    var preflopColor = "#9fab00";

    var testStrategy = {
        allHands: [
            {
                hand: 'AhKh',
                moves: {
                    "1.3": {strategy: 0.24, ev: 0.8},
                    "1": {strategy: 0.26, ev: 1},
                    "0.5": {strategy: 0.1, ev: 0.55},
                    "0": {strategy: 0.25, ev: 0.3},
                    "-1": {strategy: 0.15}
                },
                weight: 0.67,
                preflopWeight: 0.97,
                combination: "A high"
            },
            {
                hand: 'AcKc',
                moves: {
                    "1.3": {strategy: 0, ev: 0.8},
                    "1": {strategy: 0, ev: 1},
                    "0.5": {strategy: 0, ev: 0.55},
                    "0": {strategy: 0, ev: 0.3},
                    "-1": {strategy: 1}
                },
                weight: 0.77,
                preflopWeight: 0.97,
                combination: "A high"
            },
            {
                hand: 'AsKs',
                moves: {
                    "1.3": {strategy: 0, ev: 0.8},
                    "1": {strategy: 0.2, ev: 1},
                    "0.5": {strategy: 0.05, ev: 0.55},
                    "0": {strategy: 0.75, ev: 1.52},
                    "-1": {strategy: 0}
                },
                weight: 0.55,
                preflopWeight: 0.97,
                combination: "A high"
            },
            {
                hand: 'AdKd',
                moves: {
                    "1.3": {strategy: 0, ev: 0.8},
                    "1": {strategy: 0.2, ev: 1},
                    "0.5": {strategy: 0.05, ev: 0.55},
                    "0": {strategy: 0.75, ev: 0.55},
                    "-1": {strategy: 0}
                },
                weight: 0.2,
                preflopWeight: 0.97,
                combination: "A high"
            },
            {
                hand: 'AdAh',
                moves: {
                    "1.3": {strategy: 0.33, ev: 1.8},
                    "1": {strategy: 0.5, ev: 20.13},
                    "0.5": {strategy: 0.17, ev: 1.55},
                    "0": {strategy: 0, ev: 1.33},
                    "-1": {strategy: 0}
                },
                weight: 1,
                preflopWeight: 0.88,
                combination: "tptk"
            },
            {
                hand: 'KsKc',
                moves: {
                    "1.3": {strategy: 0.03, ev: 1.3},
                    "1": {strategy: 0.1, ev: 1.66},
                    "0.5": {strategy: 0.35, ev: 1.1},
                    "0": {strategy: 0.52, ev: -0.27},
                    "-1": {strategy: 0}
                },
                weight: 0.77,
                preflopWeight: 0.92,
                combination: "tptk"
            },
            {
                hand: 'KcKh',
                moves: {
                    "1.3": {strategy: 0, ev: 1.3},
                    "1": {strategy: 0, ev: 1.66},
                    "0.5": {strategy: 0, ev: 1.1},
                    "0": {strategy: 1, ev: 0.3},
                    "-1": {strategy: 0}
                },
                weight: 0.55,
                preflopWeight: 0.92,
                combination: "tptk"
            },
            {
                hand: 'QsQc',
                moves: {
                    "1.3": {strategy: 0, ev: -0.37},
                    "1": {strategy: 0, ev: 1.66},
                    "0.5": {strategy: 0.25, ev: 1.1},
                    "0": {strategy: 0.1, ev: 0.3},
                    "-1": {strategy: 0.65}
                },
                weight: 0.68,
                preflopWeight: 0.83,
                combination: "2d pair"
            },
            {
                hand: 'AsKc',
                moves: {
                    "1.3": {strategy: 0.2, ev: 1.3},
                    "1": {strategy: 0, ev: 1.66},
                    "0.5": {strategy: 0.03, ev: 1.1},
                    "0": {strategy: 0.77, ev: 0.3},
                    "-1": {strategy: 0}
                },
                weight: 0.88,
                preflopWeight: 0.92,
                combination: "tptk"
            },
            {
                hand: 'AhKs',
                moves: {
                    "1.3": {strategy: 0.1, ev: 1.3},
                    "1": {strategy: 0, ev: 1.66},
                    "0.5": {strategy: 0, ev: 1.1},
                    "0": {strategy: 0.9, ev: 0.3},
                    "-1": {strategy: 0}
                },
                weight: 0.88,
                preflopWeight: 0.92,
                combination: "tptk"
            }
        ]
    };

    if (strategyORrange != "strategy") {
        strategyORrange = "1.3"; //временно - будем парсить нужный сайзинг из джейсона с сервера
    }

    //текущее отображение в окне: strategy/сайзинг рейнжа
    var currentMoveOrStrategyState = strategyORrange;

    //текущая выбранная группа рук в матрице
    var currentMatrixHand = null;
    //текущая выбранная конкретная рука в левой диаграмме
    var currentHandInDiagram = null;

    function getHandEV(hand, sizing) {
        for (let i = 0; i < testStrategy.allHands.length; i++) {
            if (testStrategy.allHands[i].hand == hand) {
                for(var key in testStrategy.allHands[i].moves) {
                    if (key == sizing) {return parseFloat(testStrategy.allHands[i].moves[key].ev);}
                }
            }
      }
    }

    //дает вес в сайзинге мува - способен дать суммарный вес всех агромувов
    function getWeightInSizing(sizing) {
        let curWeight = 0;
        let otherWeight = 0;
        if (currentMatrixHand == null) {
            for (let i = 0; i < testStrategy.allHands.length; i++) {
                for (let key in testStrategy.allHands[i].moves) {
                    if (sizing == "agro" && parseFloat(key) > 0) {
                        curWeight += testStrategy.allHands[i].moves[key].strategy * testStrategy.allHands[i].weight;
                    } else if (key == sizing) {
                        curWeight += testStrategy.allHands[i].moves[key].strategy * testStrategy.allHands[i].weight;
                    } else {
                        otherWeight += testStrategy.allHands[i].moves[key].strategy * testStrategy.allHands[i].weight;
                    }
                }
            }
        } else {
            for (let i = 0; i < testStrategy.allHands.length; i++) {
                for (let key in testStrategy.allHands[i].moves) {
                    if (isCombinationNameEqualMatrix(currentMatrixHand, i)) {
                        if (currentHandInDiagram != null) {
                            if (testStrategy.allHands[i].hand == currentHandInDiagram) {
                                if (key == sizing) {
                                    curWeight += testStrategy.allHands[i].moves[key].strategy * testStrategy.allHands[i].weight;
                                } else {
                                    otherWeight += testStrategy.allHands[i].moves[key].strategy * testStrategy.allHands[i].weight;
                                }
                            }
                        } else if (sizing == "agro" && parseFloat(key) > 0) {
                            curWeight += testStrategy.allHands[i].moves[key].strategy * testStrategy.allHands[i].weight;
                        } else if (key == sizing) {
                            curWeight += testStrategy.allHands[i].moves[key].strategy * testStrategy.allHands[i].weight;
                        } else {
                            otherWeight += testStrategy.allHands[i].moves[key].strategy * testStrategy.allHands[i].weight;
                        }
                    }
                }
            }
        }

        return (curWeight * 100/(curWeight + otherWeight)).toFixed(2);
    }

    createStrategyList();
    //создает визуальное отображение всех возможных мувов с их сайзингами над матрицей в верхней части окна
    function createStrategyList() {
        var sortable = [];
        for (var key in testStrategy.allHands[0].moves) {
            sortable.push([parseFloat(key), testStrategy.allHands[0].moves[key]]);
        }

        sortable.sort(function(a, b) {
            return b[0] - a[0];
        });

        var strategyMoves = document.getElementById("strategy-moves");
        strategyMoves.innerHTML = ''; // удаляем childNodes

        let wasBet2 = wasBet(rawActionIndex);
        for (let i = 0; i < sortable.length; i++) {
            let currentSizing;
            let li = document.createElement("li");
            if (sortable[i][0] < 0) {
                li.style.color = "#1f1d18";
                li.innerHTML = "fold";
                currentSizing = -1;
                li.id = "strategyMove_-1";
            } else if (sortable[i][0]  == 0) {
                if (wasBet2) {
                    li.style.color = callColor;
                    li.id = "strategyMove_0";
                    currentSizing = +Math.min(maxAmountAtCurrentIndex(rawActionIndex), rawActionList[rawActionIndex].balance).toFixed(2); //меньшее из баланса или макс ставки
                    li.innerHTML = "call $" + currentSizing;
                } else {
                    li.style.color = "#a0ad00";
                    li.id = "strategyMove_0";
                    currentSizing = 0;
                    li.innerHTML = "check";
                }
            } else {
                if (wasBet2) {
                    li.style.color = "#ba000b";
                    li.id = "strategyMove_" + +parseFloat(sortable[i][0] ).toFixed(2);
                    currentSizing = +parseFloat(maxAmountAtCurrentIndex(rawActionIndex) + parseFloat(sortable[i][0] )).toFixed(2)
                    li.innerHTML = "raise $" + currentSizing;
                } else {
                    li.style.color = "#ba000b";
                    li.id = "strategyMove_" + +sortable[i][0];
                    currentSizing = +sortable[i][0];
                    li.innerHTML = "bet $" + currentSizing;
                }
            }
            let span = document.createElement("span");
            span.innerHTML = +getWeightInSizing(sortable[i][0]) + "%";
            span.classList.add("stat-probability");
            li.appendChild(span);
            li.classList.add("oneOfStrategyMove");
            strategyMoves.appendChild(li);
            if(currentHandInDiagram != null) {
              var spanEV = document.createElement("span");
              if (currentSizing >= 0) {
                  let EV = getHandEV(currentHandInDiagram, currentSizing);
                  if (EV >= 0) {
                    spanEV.innerHTML = "EV:$" + EV;
                  } else {spanEV.innerHTML = "EV:-$" + Math.abs(EV);}
              }
              spanEV.classList.add("ev-sizing");
              li.appendChild(spanEV);
              spanEV.style.width = li.clientWidth + "px";
            }
            span.style.width = li.clientWidth + "px";
        }
    }

    changeInfoDiagram(strategyORrange);
    //перерисовывает info-diagram цвета кубиков и тексты в зависимости от значения move сайзинг/стратегия
    function changeInfoDiagram(move) {
        let curWeight = document.getElementById("curWeight");
        let curSpan = document.querySelector("#curWeight + span");
        let nodeWeight = document.getElementById("nodeWeight");
        let nodeSpan = document.querySelector("#nodeWeight + span");
        let preflopWeight = document.getElementById("preflopWeight");
        let preflopSpan = document.querySelector("#preflopWeight + span");

        if (move == "strategy") {
            curWeight.style.background = agroColor;
            curSpan.innerHTML = "-aggressive weight";
            nodeWeight.style.background = callColor;
            if (wasBet(rawActionIndex)) {
                nodeSpan.innerHTML = "-call weight";
            } else {nodeSpan.innerHTML = "-check weight";}
            preflopWeight.style.background = "#2e2c24";
            preflopSpan.innerHTML = "-fold weight";
        } else {
            curWeight.style.background = currentColor;
            curSpan.innerHTML = "-current weight";
            nodeWeight.style.background = nodeColor;
            nodeSpan.innerHTML = "-node weight";
            preflopWeight.style.background = preflopColor;
            preflopSpan.innerHTML = "-preflop weight";
        }
    }

    //выделяет цветом текущий мув в стратегии над матрицей или снимает выделение в зависимости от currentMoveOrStrategyState
    function setSelectedStrategyList() {
        if (currentMoveOrStrategyState != "strategy") {
            var li = document.getElementById("strategyMove_" + currentMoveOrStrategyState);
            $("#strategy-moves li").addClass("not-selected-move");
            li.classList.add("selected-move");
            li.classList.remove("not-selected-move");
        }
    }

    //меняем цвет кликнутого мува в стратегии и выводим стратегию/спектр в зависимости от состояния мува
    $("#strategy-moves > li").on('click', changeStrategyListOn);
    function changeStrategyListOn(e) {
        let li = e.target;
        if (li.type == undefined) {return;}
        if (li.classList.contains("selected-move")) {
            li.classList.remove("selected-move");
            $("#strategy-moves li").removeClass("not-selected-move");

            //меняем глобальное состояние окна
            currentMoveOrStrategyState = "strategy";

            //удаляем рейнж и рисуем стратегию
            removeAllPreviousElements("all");
            displayAllMoveStrategyInfo("strategy", "all");

            //меняем hill-info
            changeInfoDiagram("strategy");

            //меняем заголовок окна со стратегией
            createHillInfo("strategy");

        } else {
            $("#strategy-moves li").addClass("not-selected-move");
            $("#strategy-moves li").removeClass("selected-move");
            li.classList.remove("not-selected-move");
            li.classList.add("selected-move");

            //меняем глобальное состояние мува окна
            currentMoveOrStrategyState = li.id.split('strategyMove_')[1];

            //удаляем рейнж или стратегию и рисуем рейнж с целевым сайзингом
            removeAllPreviousElements("all");
            displayAllMoveStrategyInfo(li.id.split('strategyMove_')[1], "all");

            //меняем hill-info
            changeInfoDiagram(li.id.split('strategyMove_')[1]);

            //меняем заголовок окна со стратегией
            createHillInfo(li.id.split('strategyMove_')[1]);
        }
    }

    createHillInfo(strategyORrange);
    //создет текст заголовка окна
    function createHillInfo(move) {
        let hillTitle = document.getElementById("h4id");
        if (move == "strategy") {
            hillTitle.innerText = rawActionList[rawActionIndex].player + "'s " + "strategy on " + getStreetText(rawActionList[rawActionIndex].street);
        } else if (move == 0) {
            if (wasBet(rawActionIndex)) {
                hillTitle.innerText = rawActionList[rawActionIndex].player + "'s " + "call " + " $" + +Math.min(maxAmountAtCurrentIndex(rawActionIndex), rawActionList[rawActionIndex].balance).toFixed(2) + " on " + getStreetText(rawActionList[rawActionIndex].street);
            } else {
                hillTitle.innerText = rawActionList[rawActionIndex].player + "'s " + "check" + " on " + getStreetText(rawActionList[rawActionIndex].street);
            }
        } else if (move < 0) {
            hillTitle.innerText = rawActionList[rawActionIndex].player + "'s " + "fold" + " on " + getStreetText(rawActionList[rawActionIndex].street);
        } else if (move > 0) {
            if (wasBet(rawActionIndex)) {
                hillTitle.innerText = rawActionList[rawActionIndex].player + "'s " + "raise" + " $" + +parseFloat(maxAmountAtCurrentIndex(rawActionIndex) + +parseFloat(move)).toFixed(2) + " on " + getStreetText(rawActionList[rawActionIndex].street);
            } else {
                hillTitle.innerText = rawActionList[rawActionIndex].player + "'s " + "bet" + " $" + move + " on " + getStreetText(rawActionList[rawActionIndex].street);
                }
            }
       }

    //создает и сортирует данные под конкретный мув с сайзингом или под стратегию из стратегии в джейсоне
    //подаем любую цифру в качестве второго аргумента если хотим посортировать по весу в узле или префлопу
    function createHillData(strategy, move, orderBy) { // orderBy: strategy/preflop/range
        let handsSize = strategy.allHands.length;
        let data_strategy = {};
        let maxWeight = 0; //максимальный вес какой-то руки в конкретном муве(для масштаба диаграммы)
        let tmpWeight = 0;

        if (orderBy == "strategy") {
            maxWeight = 1;
            if (currentMatrixHand == null) {
                for (let i = 0; i < handsSize; i++) {
                    data_strategy[strategy.allHands[i].hand] = strategy.allHands[i].weight;
                }
            } else {
                for (let i = 0; i < handsSize; i++) {
                    if (isCombinationNameEqualMatrix(currentMatrixHand, i)) {
                        data_strategy[strategy.allHands[i].hand] = strategy.allHands[i].weight;
                    }
                }
            }

        } else if (orderBy == "preflop") {
            maxWeight = 1;
            for (let i = 0; i < handsSize; i++) {
                data_strategy[strategy.allHands[i].hand] = strategy.allHands[i].preflopWeight;
            }
        } else if (orderBy == "range") {
            if (currentMatrixHand == null) {
                for (let i = 0; i < handsSize; i++) {
                    for (var key in strategy.allHands[i].moves) {
                        if (move == key) {
                            tmpWeight = strategy.allHands[i].moves[key].strategy * strategy.allHands[i].weight;
                            if (tmpWeight > maxWeight) {
                                maxWeight = tmpWeight;
                            }
                            data_strategy[strategy.allHands[i].hand] = tmpWeight;
                            break;
                        }
                    }
                }
            } else {
                for (let i = 0; i < handsSize; i++) {
                    for (var key in strategy.allHands[i].moves) {
                        if (move == key) {
                            tmpWeight = strategy.allHands[i].moves[key].strategy * strategy.allHands[i].weight;
                            if (tmpWeight > maxWeight) {
                                maxWeight = tmpWeight;
                            }
                            if (isCombinationNameEqualMatrix(currentMatrixHand, i)) {
                                data_strategy[strategy.allHands[i].hand] = tmpWeight;
                                break;
                            }

                        }
                    }
                }
            }

        }

        //сортируем ключи по убыванию веса комбинации в спектре для диаграммы
        keysSorted = Object.keys(data_strategy).sort(function(a,b){return data_strategy[b] - data_strategy[a]});

        //записали все веса агромувов в один ключ W если это стратегия для диаграммы(orderBy)
        //Нужно записать в файнал дата в ключ W для агромувов вес всех агромувов для каждой руки
        function createFinalDate(keysSorted, handsSize, move, maxWeight, orderBy) {
            let hillData = [];
                for (let i = 0; i < keysSorted.length; i++) {
                let hand = keysSorted[i];
                for (let j = 0; j < handsSize; j++) {
                    if (strategy.allHands[j].hand == hand) {
                        hillData[i] = {
                            w: 0,
                            h: hand,
                            pw: strategy.allHands[j].preflopWeight,
                            nw: strategy.allHands[j].weight,
                            cb: strategy.allHands[j].combination
                        };
                        for (var key in strategy.allHands[j].moves) {
                            if (orderBy == "strategy" && parseFloat(key) == 0) {
                                hillData[i].call = strategy.allHands[j].moves[key].strategy * strategy.allHands[j].weight;
                            } else if (orderBy == "strategy" && parseFloat(key) < 0) {
                                hillData[i].fold = strategy.allHands[j].moves[key].strategy * strategy.allHands[j].weight;
                            } else if (orderBy == "strategy" && parseFloat(key) > 0) {
                                hillData[i].w += strategy.allHands[j].moves[key].strategy * strategy.allHands[j].weight;
                            } else if (move == key) {
                                hillData[i] = {
                                    h: hand,
                                    w: strategy.allHands[j].moves[key].strategy * strategy.allHands[j].weight * (1/Math.max(maxWeight, 0.00000001)), //weight in current move
                                    pw: strategy.allHands[j].preflopWeight,
                                    nw: strategy.allHands[j].weight,
                                    cb: strategy.allHands[j].combination,
                                    ev: strategy.allHands[j].moves[key].ev
                                };
                            }
                        }
                    }
                }
            }
            return hillData;
        }
        return createFinalDate(keysSorted, handsSize, move, maxWeight, orderBy);
    }

    var data_strategy = [];

    displayAllMoveStrategyInfo(strategyORrange, "all");
    function displayAllMoveStrategyInfo(move, whatDisplay) {
        if (move == "strategy") {
            data_strategy = createHillData(testStrategy, "0", "strategy"); //strategy, preflop, range(3й аргумент)
            currentHandInDiagram = null;
            createDiagram("strategy"); //если хотим рейнж - передаем "range" а не сайзинг
            if (whatDisplay == "all") {
                createMatrix("strategy");
            }

        } else {
            $("#strategy-moves li").addClass("not-selected-move");
            let arr = document.getElementById("strategy-moves").childNodes;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].id.split('strategyMove_')[1] == move) {
                    arr[i].classList.remove("not-selected-move");
                    arr[i].classList.add("selected-move");
                    break;
                }
            }

            data_strategy = createHillData(testStrategy, move, "range"); //strategy, preflop, range(3й аргумент)
            currentHandInDiagram = null;
            createDiagram("range"); //если хотим рейнж - передаем "range" а не сайзинг
            if (whatDisplay == "all") {
                createMatrix(move);
            }
        }
    }

    function removeAllPreviousElements(whatRemove) {
        if (whatRemove == "strategy") {
            let strategyMoves = document.getElementById("strategy-moves");
            strategyMoves.innerHTML = '';
            return;
        }
        let oldSVG = document.getElementById("mCSB_1_container");
        oldSVG.innerHTML = ''; // медленный способ// удаляем childNodes

        if (whatRemove == "all") {
            let paras = document.getElementsByClassName('matrix-strategy');
            for (let i = paras.length - 1; i >= 0; i--) {
                paras[i].parentNode.removeChild(paras[i]);
            }
        }


    }

    function getMaxAgroEV(hand) {
        for (let i = 0; i < testStrategy.allHands.length; i++) {
            if (testStrategy.allHands[i].hand == hand) {
                let maxEV = -9000;
                for (var key in testStrategy.allHands[i].moves) {
                    if (parseFloat(key) > 0 && parseFloat(testStrategy.allHands[i].moves[key].ev) > maxEV) {
                        maxEV = parseFloat(testStrategy.allHands[i].moves[key].ev);
                    }
                }
                return maxEV;
            }
        }
    }

    var currentHandInDiagram = null;
    //создаем диаграмму в левой части главного окна hill info
    function createDiagram(move) {
        removeAllPreviousElements("left");

        var offset = 0;
        var offsetOld = 0;
        var offsetTMP = 0;

        //Create SVG element
        var svg = d3.select("#mCSB_1_container")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        var transparentLvl = ".15";
        var transparentTXT = ".5";
        createOrderSVG();
        function createOrderSVG() {
            if (move == "strategy") {
                if (currentMatrixHand != null) {
                    drawText();
                    drawText2();
                    drawAgroWeight();
                    drawAgroEV();
                    drawAgroPercent();
                    drawCallWeight();
                    drawCallEV();
                    drawCallPercent();
                    drawFoldWeight();
                    drawFoldPercent();
                } else {
                    drawFoldWeight();
                    drawCallWeight();
                    drawAgroWeight();
                    drawText();
                    drawText2();
                }
                if (currentMatrixHand != null) {

                } else {
                    drawWeight("node");
                }

            } else {
                drawPreflopWeight();
                drawNodeWeight();
                drawCurrentWeight();
                drawText();
                drawText2();
                drawWeight();
            }
        }

        function getSuit(char) {
            if (char === 'c') {return String.fromCharCode(9827)}
            if (char === 's') {return String.fromCharCode(9824)}
            if (char === 'h') {return String.fromCharCode(9829)}
            if (char === 'd') {return String.fromCharCode(9830)}
        }

        function getColor(char) {
            if (char === 'c') {return "#88b750"}
            if (char === 's') {return "#cfac40"}
            if (char === 'h') {return "#d92f21"}
            if (char === 'd') {return "#5d91d1"}
        }

        function drawPreflopWeight() {
            // рисуем префлоп вес
            svg.selectAll("rect.preflop")
                .data(data_strategy)
                .enter()
                .append("rect")
                .attr("class", "preflop")
                .attr("x", 31)
                .attr("y", function(d, i) {
                    /*if (currentMatrixHand != null) {
                        return i * 85 + 30;
                    }*/
                    return i * 25 + 6;
                })
                .attr("width", function(d) {
                    //console.log('d.w = ' + d.w);
                    //console.log(d.h);
                    return (d.pw * 250) + "px";
                })
                .attr("height", function(d) {
                    //console.log('d.w = ' + d.w);
                    return 15 + "px";
                })
                .attr("fill", function(d) {
                    return preflopColor;
                });
        }
        function drawNodeWeight() {
            // рисуем вес руки на входе в узел
            svg.selectAll("rect.node")
                .data(data_strategy)
                .enter()
                .append("rect")
                .attr("class", "node")
                .attr("x", 31)
                .attr("y", function(d, i) {
                    /*if (currentMatrixHand != null) {
                        return i * 85 + 15;
                    }*/
                    return i * 25 + 3;
                })
                .attr("width", function(d) {
                    //console.log('d.w = ' + d.w);
                    //console.log(d.h);
                    return (d.nw * 250) + "px";
                })
                .attr("height", function(d) {
                    //console.log('d.w = ' + d.w);
                    return 15 + "px";
                })
                .attr("fill", function(d) {
                    return nodeColor;
                });
        }
        function drawCurrentWeight() {
            // рисуем прямоугольники текущего спектра
            svg.selectAll("rect.current")
                .data(data_strategy)
                .enter()
                .append("rect")
                .attr("class", "current")
                .attr("x", 31)
                .attr("y", function(d, i) {
                    /*if (currentMatrixHand != null) {
                        return i * 85;
                    }*/
                    return i * 25;
                })
                .attr("width", function(d) {
                    //console.log('d.w = ' + d.w);
                    //console.log(d.h);
                    return (d.w * 250) + "px";
                })
                .attr("height", function(d) {
                    //console.log('d.w = ' + d.w);
                    return 15 + "px";
                })
                .attr("fill", function(d) {
                    return "rgb(0, 0, 130)";
                });

        }
        function drawText() {
            // выводим текст названия комбинации
            offset = 0;
            var hole;
            svg.selectAll("text.title")
                .data(data_strategy)
                .enter()
                .append("text")
                .attr("class", "title")
                .attr("id", function(d) {
                    return d.h;
                })
                .text(function(d) {
                    hole = (d.h).split('');
                    return hole[0] + getSuit(hole[1]);
                })
                .attr("x", 0)
                .attr("y", function(d, i) {
                    if (currentMatrixHand != null && currentMoveOrStrategyState == "strategy") {
                        offsetTMP = 0;
                        offsetOld = offset;
                        if (d.w < 0.002) {offsetTMP += 15;}
                        if (d.call < 0.002) {offsetTMP += 15;}
                        if (d.fold < 0.002) {offsetTMP += 15;}
                        if (offsetTMP > 30) {offsetTMP = 30;}
                        offset += offsetTMP;
                        return i * 85 + 26 - offsetOld - offsetTMP/2;
                    }
                    return i * 25 + 12;
                })
                .attr("font-family", "sans-serif")
                .attr("font-size", "11px")
                .attr("fill", function(d) {
                    if (currentMatrixHand == null) {
                        return getColor((d.h).split('')[1]);
                    } else if (currentHandInDiagram != null && d.h != currentHandInDiagram) {
                        return ("rgba(219, 219, 219, " + transparentLvl + ")");
                    } else {return getColor((d.h).split('')[1]);}
                });
        }
        function drawText2() {// выводим текст названия комбинации
            offset = 0;
            var hole;
            svg.selectAll("text.title2")
                .data(data_strategy)
                .enter()
                .append("text")
                .attr("class", "title2")
                .attr("id", function(d) {
                    return d.h + "2";
                })
                .text(function(d) {
                    hole = (d.h).split('');
                    return hole[2] + getSuit(hole[3]);
                })
                .attr("x", 15)
                .attr("y", function(d, i) {
                    if (currentMatrixHand != null && currentMoveOrStrategyState == "strategy") {
                        offsetTMP = 0;
                        offsetOld = offset;
                        if (d.w < 0.002) {offsetTMP += 15;}
                        if (d.call < 0.002) {offsetTMP += 15;}
                        if (d.fold < 0.002) {offsetTMP += 15;}
                        if (offsetTMP > 30) {offsetTMP = 30;}
                        offset += offsetTMP;
                        return i * 85 + 26 - offsetOld - offsetTMP/2;
                    }
                    return i * 25 + 12;
                })
                .attr("font-family", "sans-serif")
                .attr("font-size", "11px")
                .attr("fill", function(d) {
                    if (currentMatrixHand == null) {
                        return getColor((d.h).split('')[3]);
                    } else if (currentHandInDiagram != null && d.h != currentHandInDiagram) {
                        return ("rgba(219, 219, 219, " + transparentLvl + ")");
                    } else {return getColor((d.h).split('')[3]);}
                });

            $('#content-m svg .title').on('click', function(e){
                let el = e.target;
                //alert(el.id);
                if (currentMatrixHand != null) {
                    if (currentHandInDiagram != null) {
                        if (el.id != currentHandInDiagram) {
                            return
                        } else {
                            removeAllPreviousElements("left");
                            currentHandInDiagram = null;
                            createDiagram(currentMoveOrStrategyState);
                            removeAllPreviousElements("strategy");
                            createStrategyList();
                            $("#strategy-moves > li").on('click', changeStrategyListOn);
                        }
                    } else {
                        removeAllPreviousElements("left");
                        currentHandInDiagram = el.id;
                        createDiagram(currentMoveOrStrategyState);
                        removeAllPreviousElements("strategy");
                        createStrategyList();
                        $("#strategy-moves > li").on('click', changeStrategyListOn);
                    }
                }
            })

            $('#content-m svg .title2').on('click', function(e){
                let el = e.target;
                //alert(el.id.split('').slice(0, 4).join(''));
                if (currentMatrixHand != null) {
                    if (currentHandInDiagram != null) {
                        if (el.id.split('').slice(0, 4).join('') != currentHandInDiagram) {
                            return
                        } else {
                            removeAllPreviousElements("left");
                            currentHandInDiagram = null;
                            createDiagram(currentMoveOrStrategyState);
                            removeAllPreviousElements("strategy");
                            createStrategyList();
                            $("#strategy-moves > li").on('click', changeStrategyListOn);
                        }
                    } else {
                        removeAllPreviousElements("left");
                        currentHandInDiagram = el.id.split('').slice(0, 4).join('');
                        createDiagram(currentMoveOrStrategyState);
                        removeAllPreviousElements("strategy");
                        createStrategyList();
                        $("#strategy-moves > li").on('click', changeStrategyListOn);
                    }
                }
            })
        }
        function drawWeight(weightType) {
            // выводим вес комбинации
            svg.selectAll("text.value")
                .data(data_strategy)
                .enter()
                .append("text")
                .attr("class", "value")
                .text(function(d) {
                    if (weightType == "node") {
                        return d.nw.toFixed(2);
                    } else {
                        if (d.ev === undefined) {
                            return d.w.toFixed(2);
                        } else if (d.ev < 0) {
                            return (d.w.toFixed(2) + "  \u00A0  EV: -$" + Math.abs(d.ev));
                        } else {return (d.w.toFixed(2) + "  \u00A0  EV: $" + d.ev);}
                    }
                })
                .attr("x", 35)
                .attr("y", function(d, i) {
                    return i * 25 + 12;
                })
                .attr("font-family", "sans-serif")
                .attr("font-size", "11px")
                .attr("fill", "rgba(210, 210, 210, .75)");
        }

        function drawFoldWeight() {
            // рисуем префлоп вес
            offset = 0;
            svg.selectAll("rect.fold")
                .data(data_strategy)
                .enter()
                .append("rect")
                .attr("class", "fold")
                .attr("x", 31)
                .attr("y", function(d, i) {
                    if (currentMatrixHand != null) {
                        if (d.call < 0.002) {offset += 15;}
                        if (d.w < 0.002) {offset += 15;}
                        if (d.fold < 0.002) {offset += 15;}
                        if (d.call < 0.002 && d.w < 0.002 && d.fold < 0.002) {
                            offset -= 15;
                        }
                        return i * 85 + 30 - offset;
                    }
                    return i * 25 + 6;
                })
                .attr("width", function(d) {
                    if (currentMatrixHand != null) {
                        return d.fold * 185 + "px";
                    } else {return d.fold * 250 + "px";}
                })
                .attr("height", function(d) {
                    return 15 + "px";
                })
                .attr("fill", function(d) {
                    if (currentMatrixHand == null) {
                        return foldColor;
                    } else if (currentHandInDiagram != null && d.h != currentHandInDiagram) {
                        return ("rgba(54, 52, 45, " + transparentLvl + ")");
                    } else {return foldColor;}
                });
        }
        function drawCallWeight() {
            // рисуем вес руки на входе в узел
            offset = 0;
            offsetOld = 0;
            svg.selectAll("rect.call")
                .data(data_strategy)
                .enter()
                .append("rect")
                .attr("class", "call")
                .attr("x", 31)
                .attr("y", function(d, i) {
                    if (currentMatrixHand != null) {
                        offsetTMP = 0;
                        offsetOld = offset;
                        if (d.call < 0.002) {offset += 15;}
                        if (d.w < 0.002) {offset += 15; offsetTMP += 15;}
                        if (d.fold < 0.002) {offset += 15;}
                        if (d.call < 0.002 && d.w < 0.002 && d.fold < 0.002) {
                            offset -= 15;
                        }
                        return i * 85 + 15 - offsetTMP - offsetOld;
                    }
                    return i * 25 + 3;
                })
                .attr("width", function(d) {
                    if (currentMatrixHand != null) {
                        return d.call * 185 + "px";
                    } else {return d.call * 250 + "px";}
                })
                .attr("height", function(d) {
                    //console.log('d.w = ' + d.w);
                    return 15 + "px";
                })
                .attr("fill", function(d) {
                    if (currentMatrixHand == null) {
                        return callColor;
                    } else if (currentHandInDiagram != null && d.h != currentHandInDiagram) {
                        return ("rgba(137, 150, 0, " + transparentLvl + ")");
                    } else {return callColor;}
                });
        }
        function drawAgroWeight() {
            // рисуем прямоугольники agro спектра
            offset = 0;
            offsetOld = 0;
            svg.selectAll("rect.agro")
                .data(data_strategy)
                .enter()
                .append("rect")
                .attr("class", "agro")
                .attr("x", 31)
                .attr("y", function(d, i) {
                    if (currentMatrixHand != null) {
                        offsetOld = offset;
                        if (d.call < 0.002) {offset += 15;}
                        if (d.w < 0.002) {offset += 15;}
                        if (d.fold < 0.002) {offset += 15;}
                        if (d.call < 0.002 && d.w < 0.002 && d.fold < 0.002) {
                            offset -= 15;
                        }
                        return i * 85 - offsetOld;
                    }
                    return i * 25;
                })
                .attr("width", function(d) {
                    if (d.fold < 0.002 && d.call < 0.002 && d.w < 0.002) {return 0.002 * 200 + "px";}
                    if (currentMatrixHand != null) {
                        return d.w * 185 + "px";
                    } else {return d.w * 250 + "px";}

                })
                .attr("height", function(d) {
                    return 15 + "px";
                })
                .attr("fill", function(d) {
                    if (currentMatrixHand == null) {
                        return agroColor;
                    } else if (currentHandInDiagram != null && d.h != currentHandInDiagram) {
                        return ("rgba(125, 16, 8, " + transparentLvl + ")");
                    } else {return agroColor;}
                });

        }
        function drawAgroPercent() {
            // выводим процент агро действий
            offset = 0;
            offsetOld = 0;
            svg.selectAll("text.value")
                .data(data_strategy)
                .enter()
                .append("text")
                .attr("class", "agroPercent")
                .text(function(d) {
                    if (d.w < 0.02) {return}
                    return ((d.w * 100)/(d.w + d.call + d.fold)).toFixed(1) + "%";
                })
                .attr("x", 35)
                .attr("y", function(d, i) {
                    offsetOld = offset;
                    if (d.call < 0.002) {offset += 15;}
                    if (d.w < 0.002) {offset += 15;}
                    if (d.fold < 0.002) {offset += 15;}
                    if (d.call < 0.002 && d.w < 0.002 && d.fold < 0.002) {
                        offset -= 15;
                    }
                    return i * 85 + 12 - offsetOld;
                })
                .attr("font-family", "sans-serif")
                .attr("font-size", "11px")
                .attr("fill", function(d) {
                    if (currentMatrixHand == null) {
                        return ("rgba(210, 210, 210, " + transparentTXT + ")");
                    } else if (currentHandInDiagram != null && d.h != currentHandInDiagram) {
                        return ("rgba(210, 210, 210, " + transparentLvl + ")");
                    } else {return ("rgba(210, 210, 210, " + transparentTXT + ")");}
                });
        }
        function drawAgroEV() {
            offset = 0;
            offsetOld = 0;
            svg.selectAll("text.value")
                .data(data_strategy)
                .enter()
                .append("text")
                .attr("class", "agroPercent")
                .text(function(d) {
                    if (d.w < 0.02) {return}
                    let maxAgroEV = parseFloat(getMaxAgroEV(d.h));
                    if(maxAgroEV > 0) {
                        return "EVmax: $" + maxAgroEV.toFixed(2);
                    } else {
                        return "EVmax: -$" + Math.abs(maxAgroEV).toFixed(2);
                    }
                })
                .attr("x", function(d, i) {
                    if (d.fold < 0.002 && d.call < 0.002 && d.w < 0.002) {return 70;}
                    return Math.max((d.w * 185 + 35), 70);
                })
                .attr("y", function(d, i) {
                    offsetOld = offset;
                    if (d.call < 0.002) {offset += 15;}
                    if (d.w < 0.002) {offset += 15;}
                    if (d.fold < 0.002) {offset += 15;}
                    if (d.call < 0.002 && d.w < 0.002 && d.fold < 0.002) {
                        offset -= 15;
                    }
                    return i * 85 + 12 - offsetOld;
                })
                .attr("font-family", "sans-serif")
                .attr("font-size", "11px")
                .attr("fill", function(d) {
                    if (currentMatrixHand == null) {
                        return ("rgba(210, 210, 210, " + transparentTXT + ")");
                    } else if (currentHandInDiagram != null && d.h != currentHandInDiagram) {
                        return ("rgba(210, 210, 210, " + transparentLvl + ")");
                    } else {return ("rgba(210, 210, 210, " + transparentTXT + ")");}
                });
        }
        function drawCallPercent() {
            // выводим процент агро действий
            offset = 0;
            offsetOld = 0;
            svg.selectAll("text.value")
                .data(data_strategy)
                .enter()
                .append("text")
                .attr("class", "agroPercent")
                .text(function(d) {
                    if (d.call < 0.002) {return}
                    return ((d.call * 100)/(d.w + d.call + d.fold)).toFixed(1) + "%";
                })
                .attr("x", 35)
                .attr("y", function(d, i) {
                    offsetTMP = 0;
                    offsetOld = offset;
                    if (d.call < 0.002) {offset += 15;}
                    if (d.w < 0.002) {offset += 15; offsetTMP += 15;}
                    if (d.fold < 0.002) {offset += 15;}
                    if (d.call < 0.002 && d.w < 0.002 && d.fold < 0.002) {
                        offset -= 15;
                    }
                    return i * 85 + 15 + 12 - offsetTMP - offsetOld;
                })
                .attr("font-family", "sans-serif")
                .attr("font-size", "11px")
                .attr("fill", function(d) {
                    if (currentMatrixHand == null) {
                        return ("rgba(210, 210, 210, " + transparentTXT + ")");
                    } else if (currentHandInDiagram != null && d.h != currentHandInDiagram) {
                        return ("rgba(210, 210, 210, " + transparentLvl + ")");
                    } else {return ("rgba(210, 210, 210, " + transparentTXT + ")");}
                });
        }
        function drawCallEV() {
            // выводим процент агро действий
            offset = 0;
            offsetOld = 0;
            svg.selectAll("text.value")
                .data(data_strategy)
                .enter()
                .append("text")
                .attr("class", "agroPercent")
                .text(function(d) {
                    if (d.call < 0.002) {return}
                    let callEV = parseFloat(getHandEV(d.h, "0"));
                    if(callEV > 0) {
                        return "EV: $" + callEV.toFixed(2);
                    } else {
                        return "EV: -$" + Math.abs(callEV).toFixed(2);
                    }
                })
                .attr("x", function(d, i) {
                    return Math.max((d.call * 185 + 35), 70);
                })
                .attr("y", function(d, i) {
                    offsetTMP = 0;
                    offsetOld = offset;
                    if (d.call < 0.002) {offset += 15;}
                    if (d.w < 0.002) {offset += 15; offsetTMP += 15;}
                    if (d.fold < 0.002) {offset += 15;}
                    if (d.call < 0.002 && d.w < 0.002 && d.fold < 0.002) {
                        offset -= 15;
                    }
                    return i * 85 + 15 + 12 - offsetTMP - offsetOld;
                })
                .attr("font-family", "sans-serif")
                .attr("font-size", "11px")
                .attr("fill", function(d) {
                    if (currentMatrixHand == null) {
                        return ("rgba(210, 210, 210, " + transparentTXT + ")");
                    } else if (currentHandInDiagram != null && d.h != currentHandInDiagram) {
                        return ("rgba(210, 210, 210, " + transparentLvl + ")");
                    } else {return ("rgba(210, 210, 210, " + transparentTXT + ")");}
                });
        }
        function drawFoldPercent() {
            // выводим процент агро действий
            offset = 0;
            svg.selectAll("text.value")
                .data(data_strategy)
                .enter()
                .append("text")
                .attr("class", "agroPercent")
                .text(function(d) {
                    if (d.fold < 0.002) {return}
                    return ((d.fold * 100)/(d.w + d.call + d.fold)).toFixed(1) + "%";
                })
                .attr("x", 35)
                .attr("y", function(d, i) {
                    if (d.call < 0.002) {offset += 15;}
                    if (d.w < 0.002) {offset += 15;}
                    if (d.fold < 0.002) {offset += 15;}
                    if (d.call < 0.002 && d.w < 0.002 && d.fold < 0.002) {
                        offset -= 15;
                    }
                    return i * 85 + 30 + 12 - offset;
                })
                .attr("font-family", "sans-serif")
                .attr("font-size", "11px")
                .attr("fill", function(d) {
                    if (currentMatrixHand == null) {
                        return ("rgba(210, 210, 210, " + transparentTXT + ")");
                    } else if (currentHandInDiagram != null && d.h != currentHandInDiagram) {
                        return ("rgba(210, 210, 210, " + transparentLvl + ")");
                    } else {return ("rgba(210, 210, 210, " + transparentTXT + ")");}
                });
        }

    }

    //проверяет соответствие комбинации
    function isCombinationNameEqual(combinationName, index) {
        let handHillArr = data_strategy[index].h.split('');
        let curCombArr = combinationName.split('');
        if (handHillArr[0] != curCombArr[0] || handHillArr[2] != curCombArr[1]) {
            return false;
        } else if (curCombArr.length == 2) { // карманные пары
            return true;
        } else if (handHillArr[1] == handHillArr[3] && curCombArr[2] == "s") {
            return true;
        } else if (handHillArr[1] != handHillArr[3] && curCombArr[2] == "o") {
            return true;
        } else {return false;}
    }

    function isCombinationNameEqualMatrix(combinationName, index) {
        let handHillArr = testStrategy.allHands[index].hand.split('');
        let curCombArr = combinationName.split('');

        if (handHillArr[0] != curCombArr[0] || handHillArr[2] != curCombArr[1]) {
            return false;
        } else if (curCombArr.length == 2) { // карманные пары
            return true;
        } else if (handHillArr[1] == handHillArr[3] && curCombArr[2] == "s") {
            return true;
        } else if (handHillArr[1] != handHillArr[3] && curCombArr[2] == "o") {
            return true;
        } else {return false;}
    }

    //функция отрисовывающая матрицу в центральной части окна
    //createMatrix("1.3");

    var cardsArr = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

    //функция возвращающая название комбинации для матрицы
    function createTD(i, j) {
        if (i < j) {
            //alert(cardsArr[i] + cardsArr[j]);
            return (cardsArr[i] + cardsArr[j]) + "s";
        } else if (i == j) {
            return (cardsArr[i] + cardsArr[j]);
        } else {
            //alert(cardsArr[i] + cardsArr[j]);
            return (cardsArr[j] + cardsArr[i]) + "o";
        }
    };

    // создает и отображает матрицу // moveType = сайзинг мува или strategy
    function createMatrix(moveType) {
        let hill_matrix = document.querySelector("#matrix");
        let cardsArr = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

        //функция возвращающая название комбинации для матрицы
        function createTD(i, j) {
            if (i < j) {
                return (cardsArr[i] + cardsArr[j]) + "s";
            } else if (i == j) {
                return (cardsArr[i] + cardsArr[j]);
            } else {
                return (cardsArr[j] + cardsArr[i]) + "o";
            }
        };
        
        function getMatrixTdColor(title) {
            let arr = title.split('');
            if (arr.length == 2) {
                return "rgba(150, 150, 150, 0.25)";
            } else if (arr[2] == 's') {
                return "rgba(251, 230, 175, 0.25)";
            } else {return "rgba(229, 240, 244, 0.25)";}
        }
        //создаем матрицу если она пустая
        if (hill_matrix.childNodes.length <= 1) {
            //alert("hill_matrix.childNodes.length = " + hill_matrix.childNodes.length);
            for(let i = 0; i < 13; i++) {
                let tr = document.createElement("tr");
                hill_matrix.appendChild(tr);
                for(let j = 0; j < 13; j++) {
                    let td = document.createElement("td");
                    let span = document.createElement("span");
                    let title = createTD(i, j);
                    tr.appendChild(td);
                    td.appendChild(span);
                    td.setAttribute("class", "matrix_td");
                    td.setAttribute("id", title);
                    span.innerHTML = title;

                    let div = document.createElement("div");
                    div.style.background = getMatrixTdColor(title);
                    div.style.width = "100%";
                    div.style.height = "100%";
                    div.style.position = "absolute";
                    div.style.top = "0";
                    div.style.zIndex = "-500";
                    td.appendChild(div);
                }
            }
        }

        //возвращает массив с весами(если они разные внутри одной комбинации)
        function getCombinationWeight(combinationName, moveType) {
            let weightMin = 1;
            let weightMax = 0;

            function justDoIt(w) {
                if (w > weightMax) {
                    weightMax = w;
                }
                if (w < weightMin) {
                    weightMin = w;
                }
            }

            for(let i = 0; i < data_strategy.length; i++) {
                if (isCombinationNameEqual(combinationName, i)) {
                    if (moveType > 0 || moveType == "strategy" || moveType == "range") {
                        let w = data_strategy[i].w;
                        justDoIt(w);
                    } else if (moveType == 0) {
                        let w = data_strategy[i].call;
                        justDoIt(w);
                    } else if (moveType < 0) {
                        let w = data_strategy[i].fold;
                        justDoIt(w);
                    } else if (moveType == "preflop") {
                        let w = data_strategy[i].pw;
                        justDoIt(w);
                    } else if (moveType == "node") {
                        let w = data_strategy[i].nw;
                        justDoIt(w);
                    }
                }
            }
            return [weightMin, weightMax];
        }

        displayOrderMatrix();
        function displayOrderMatrix() {
            if (moveType != "strategy") {
                createMatrixIMG("preflop", moveType);
                createMatrixIMG("node", moveType);
                createMatrixIMG("range", moveType);
            } else {
                if (wasBet(rawActionIndex)) {
                    createMatrixIMG("-1");
                    createMatrixIMG("0");
                    createMatrixIMG("strategy", moveType);
                } else {
                    createMatrixIMG("-1"); //временно для проверки глюков, что ничего не фолдит сеть когда есть возможность чекать
                    createMatrixIMG("0");
                    createMatrixIMG("strategy", moveType);
                }

            }
        }

        function createMatrixIMG(moveType) {

            function setMinRangeColor(weight) {
                let tmp = Math.round(parseInt(weight[1]/Math.max(weight[0], 0.1)));
                if(tmp > 3 || (weight[0] < 0.17 && tmp > 1.6) || (weight[0] < 0.12)) {
                    return "rgb(0, 0, 250)";
                } else {return "rgb(0, 0, " + Math.max((tmp * 12 + 130), 185) + ")";}
            };

            function setMinStrategyColor(weight) {
                let tmp = Math.round(parseInt(weight[1]/Math.max(weight[0], 0.1)));
                if(tmp > 4 || (weight[0] < 0.15 && tmp > 1.6) || (weight[0] < 0.12)) {
                    return "rgb(190, 16, 8)";
                } else {return "rgb(" + Math.max((tmp * 12 + 125), 145) + ", 16, 8)";}
            };

            function setMinNodeColor(weight) {
                let tmp = Math.round(parseInt(weight[1]/Math.max(weight[0], 0.1)));
                if(tmp > 4 || (weight[0] < 0.15 && tmp > 1.6) || (weight[0] < 0.12)) {
                    return "rgb(120, 180, 240)";
                } else {return "rgb(" + Math.max((tmp * 4 + 98), 101) + ", " + Math.max((tmp * 7 + 140), 150) + ", " + Math.max((tmp * 10 + 185), 200) + ")";}
            };

            function setMinCallColor(weight) {
                let tmp = Math.round(parseInt(weight[1]/Math.max(weight[0], 0.1)));
                if(tmp > 3 || (weight[0] < 0.15 && tmp > 1.6) || (weight[0] < 0.12)) {
                    return "rgb(191, 204, 0)";
                } else {return "rgb(" + Math.max((tmp * 11 + 126), 150) + ", " + Math.max((tmp * 14 + 126), 167) + ", 0)";}
            };

            for (let i = 0; i < 13; i++) {
                for(let j = 0; j < 13; j++) {
                    let comb = createTD(i, j);
                    let td = document.getElementById(comb);
                    let weight = getCombinationWeight(comb, moveType);
                    //alert("weight = " + weight + "comb = " + comb);

                    let div = document.createElement("div");
                    div.classList.add("matrix-strategy");
                    if (moveType == "strategy") {
                        //div.style.background = "rgb(0, 0, 130)";
                        div.style.background = agroColor;
                        div.style.height = "86%";
                        div.style.zIndex = "-30";
                    } else if (moveType == "range") {
                        div.style.background = currentColor;
                        div.style.height = "86%";
                        div.style.zIndex = "-30";
                    } else if (moveType == 0 || moveType == "node") {
                        if (moveType == "node") {
                            div.style.background = nodeColor;
                        } else {
                            div.style.background = callColor;
                        }
                        div.style.zIndex = "-50";
                        div.style.height = "93%";
                    } else if (moveType < 0 || moveType == "preflop") {
                        if (moveType == "preflop") {
                            div.style.background = preflopColor;
                        } else {div.style.background = foldColor}
                        div.style.height = "100%";
                        div.style.zIndex = "-70";
                    }

                    div.style.width = (weight[1] * 100) + "%";
                    div.style.position = "absolute";
                    div.style.top = "0";
                    td.appendChild(div);

                    if (weight[1] - weight[0] > 0.1) {
                        let div = document.createElement("div");
                        div.classList.add("matrix-strategy");


                        if (moveType == "range") {
                            div.style.background = setMinRangeColor(weight);
                            //div.style.background = "#0000e7";
                            div.style.height = "86%";
                            div.style.zIndex = "-29";
                        } else if (moveType > 0 || moveType == "strategy") {
                            div.style.background = setMinStrategyColor(weight);
                            div.style.zIndex = "1000";
                            div.style.height = "86%";
                            div.style.zIndex = "-29";
                        } else if (moveType == 0 || moveType == "node") {
                            if (moveType == "node"){
                                div.style.background = setMinNodeColor(weight);
                            } else {
                                div.style.background = setMinCallColor(weight);
                            }
                            div.style.height = "93%";
                            div.style.zIndex = "-49";
                        } else if (moveType < 0) {
                            div.style.background = "#525045";
                            div.style.height = "100%";
                            div.style.zIndex = "-69";
                        }
                        if (weight[0] < 0.06) {
                            div.style.width = (0.06 * 100) + "%";
                        } else {div.style.width = (weight[0] * 100) + "%";}
                        div.style.position = "absolute";
                        div.style.top = "0";
                        td.appendChild(div);
                    }
                }
            }
        }
    }

    matrixTDclick();
    //кликаем в ячейку матрицы чтобы посмотреть детально информацию о комбинациях
    function matrixTDclick() {
        $(".matrix_td").on('click', function (e) {
            let td = e.target;
            if (td.id == '') {
                td = td.parentNode;
            }

            if (td.classList.contains("td-selected")) {
                removeAllPreviousElements("left");
                currentMatrixHand = null;
                currentHandInDiagram = null;
                createStrategyList();
                setSelectedStrategyList();
                $("#strategy-moves > li").off;
                $("#strategy-moves > li").on('click', changeStrategyListOn);
                if (currentMoveOrStrategyState != "strategy") {
                    data_strategy = createHillData(testStrategy, currentMoveOrStrategyState, "range");
                    currentHandInDiagram = null;
                    createDiagram(currentMoveOrStrategyState);
                    createMatrix(currentMoveOrStrategyState);
                } else {
                    data_strategy = createHillData(testStrategy, "0", "strategy");
                    currentHandInDiagram = null;
                    createDiagram("strategy");
                    createMatrix("strategy");
                }

                var paras = document.getElementsByClassName("tmp-blur");
                for (let i = paras.length - 1; i >= 0; i--) {
                    paras[i].parentNode.removeChild(paras[i]);
                }
                td.classList.remove("td-selected");
            } else {
                var paras = document.getElementsByClassName("td-selected");
                if (paras.length == 1) {return;}
                currentMatrixHand = td.id;
                createStrategyList();
                setSelectedStrategyList();
                //alert("test");
                $("#strategy-moves > li").off;
                $("#strategy-moves > li").on('click', changeStrategyListOn);
                if (currentMoveOrStrategyState == "strategy") {
                    data_strategy = createHillData(testStrategy, "0", "strategy");
                    currentHandInDiagram = null;
                    createDiagram("strategy");
                } else {
                    data_strategy = createHillData(testStrategy, currentMoveOrStrategyState, "range");
                    currentHandInDiagram = null;
                    createDiagram(currentMoveOrStrategyState);
                }

                for (let i = 0; i < 13; i++) {
                    for (let j = 0; j < 13; j++) {
                        let tdID = document.getElementById(createTD(i, j));
                        if (tdID.id != td.id) {
                            let div = document.createElement("div");
                            div.classList.add("tmp-blur");
                            tdID.appendChild(div);
                        }
                    }
                }
                td.classList.add("td-selected");
            }
        });
    }
}

//заполняет информацией окно с вероятностями
function createProbabilitiesInfo() {
    document.getElementById("h4-probabilities").innerHTML = "Probab";
    return;
}

//заполняет информацией окно с вероятностями
function createEVinfo() {
    document.getElementById("h4-probabilities").innerHTML = "EV";
    return;
}

function removeHillInfo() {
    $(".hill-info").removeClass("appear-fast");
    let matrix = document.getElementById("matrix");
    while (matrix.firstChild) {
        matrix.removeChild(matrix.firstChild);
    }

    removeActions();
    displayActions();
    displayAddRemoveButtons();
    restartListener();
}

function removeProbabInfo() {
    $(".probabilities-info").removeClass("appear-fast");
    removeActions();
    displayActions();
    displayAddRemoveButtons();
    restartListener();
}

function getValidXCoordinates(x) {
    //alert("x = " + x);
    let width = 447;
    let xOffset = 55;
    let needWidth = x + width + xOffset;
    if ($(window).width() - needWidth > 0) {
        return xOffset;
    } else {
        return ($(window).width() - x - width - 10);
    }
}

function getValidYCoordinates(y) {
    //alert("x = " + x);
    let height = 315;
    let yOffset = 13;
    let needHeight = y + height + yOffset;
    if ($(window).height() - needHeight > 0) {
        return yOffset;
    } else {
        return ($(window).height() - y - height -15);
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
        if (parseFloat(getActionIndex(sel.options[sel.selectedIndex].text)) == 2) {
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

function maxAmountAtCurrentIndex(rawActionIndex) {
    let currentStreet = rawActionList[rawActionIndex].street;
    for (let i = rawActionIndex - 1; i >= 0; i--) {
        if (rawActionList[i].street === currentStreet) {
            if (rawActionList[i].action < 3) {
                return parseFloat(rawActionList[i].amount);
            }
        } else {return parseFloat(0);}
    }
}

//возвращает превышение над максимальной ставкой на улице
function excessSmartOverMaximum(rawActionIndex) {
    if (maxAmountAtCurrentIndex(rawActionIndex) == 0) {
        return rawActionList[rawActionIndex].amount;
    } else if (rawActionList[rawActionIndex].action < 3) {

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
    let preflopStrings = document.querySelector(".preflop-moves .all-info-table");
    let flopStrings = document.querySelector(".flop-moves .all-info-table");
    let turnStrings = document.querySelector(".turn-moves .all-info-table");
    let riverStrings = document.querySelector(".river-moves .all-info-table");

    if (preflopStrings.contains(elNode)) {
        //alert("Зашли в улицу префлоп в getRawActionsIndex()");
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
            for (let j = rawActionList.length - 1; j >= 0; j--) {
                if (rawActionList[j].street == currentStreet - 1 || (j == 1 && currentStreet == 0)) {
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

// поиск никнейма игрока
$('#nickname-input').on('keyup', playerSearch);
function playerSearch() {
    //console.log("зашли в функцию меняющую содержимое select");
    var q = new RegExp($(this).val(), 'ig');
    var field = $('#list').find('option');
    for (var i = 0, l = field.length; i < l; i += 1) {
        var option = $(field[i]),
            parent = option.parent();

        if ($(field[i]).text().match(q)) {
            if (parent.is('span')) {
                option.show();
                parent.replaceWith(option);
            }
        } else {
            if (option.is('option') && (!parent.is('span'))) {
                option.wrap('<span>').hide();
            }
        }
    }
}

//работа со списком поиска и выбором никнейма
$('#list').change(playerSearchSelectedList);
function playerSearchSelectedList() {
    var val = $("#list option:selected").text();
}


$('#list option').on('dblclick', setNewPlayer);
function setNewPlayer() {
    //alert("удачно зашли в изменить плеера");
    var val = $("#list option:selected").text();
    //alert(val);
    //$('#nickname-input').value =  $("#list option:selected").text();
    this.parentNode.parentNode.classList.remove("color-yellow");
    //alert("getRawActionsIndex(this.parentNode.parentNode) = " + getRawActionsIndex(this.parentNode.parentNode)); work!
    setNewRawPlayer(this.parentNode.parentNode, val);
    //this.parentNode.parentNode.innerHTML = val;
}
function setNewRawPlayer(elNode, val) {
    let oldPlayer = rawActionList[getRawActionsIndex(elNode)].player;
    for (let i = 0; i < rawActionList.length; i++) {
        if (rawActionList[i].player == oldPlayer) {
            rawActionList[i].player = val;
        }
    }

    removeActions();
    displayActions();
    displayAddRemoveButtons();
    restartListener();
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
    tdPlayerStats = $(".all-info-table td:nth-child(1)");
    tdPlayerStats.on('contextmenu', displayStats);

    PlayerStatsInStrategy.off();
    PlayerStatsInStrategy = $("#h4id");
    PlayerStatsInStrategy.on('contextmenu', displayStats);

    tdActionMenu.off();
    tdActionMenu = $(".all-info-table.postflop td:nth-child(3), .all-info-table.preflop td:nth-child(4)");
    tdActionMenu.on('contextmenu', actionMenu);

    tdPlayer2.off();
    tdPlayer2 = $(".all-info-table td:nth-child(1)");
    tdPlayer2.on('click', selectPlayer);


    $('#nickname-input').off();
    $('#nickname-input').on('keyup', playerSearch);
    $('#list').off('change');
    $('#list').change(playerSearchSelectedList);
    $('#list option').off();
    $('#list option').on('dblclick', setNewPlayer);
}

function removeUpload() {
    if (uploadWindow.classList.contains("appear-fast")) {
        uploadWindow.classList.remove("appear-fast");
    }
    return false;
}

function displayUploadWindow() {
    if (!uploadWindow.classList.contains("appear-fast")) {
        uploadWindow.classList.add("appear-fast");
    }
}

function actionToJson(rawActionListIndex, request) {

    var myJSON = {
        hand: {
            lm: Math.max(rawActionList[0].amount, rawActionList[1].amount),
            c1: getCardName(checkedCards[3]),
            c2: getCardName(checkedCards[4]),
            c3: getCardName(checkedCards[5]),
            c4: getCardName(checkedCards[6]),
            c5: getCardName(checkedCards[7]),
        },
        players: [],
        actions: createStreets(),
        request: createRequest()
    }

    function createStreets() {
        if (rawActionList[rawActionList.length - 1].street === 3) {
            var objRiver = {
                preflop: [],
                flop: [],
                turn: [],
                river: []
            }
            return objRiver;

        } else if (rawActionList[rawActionList.length - 1].street === 2) {
            var objTurn = {
                preflop: [],
                flop: [],
                turn: []
            }
            return objTurn;
        } else if (rawActionList[rawActionList.length - 1].street === 1) {
            var objFlop = {
                preflop: [],
                flop: []
            }
            return objFlop;
        } else {
            var objPreflop = {
                preflop: []
            }
            return objPreflop;
        }
    }

    function createRequest() {
        var obj = {
            type: request,
            street: getStreetName(rawActionList[rawActionListIndex].street),
            act_num: actNumberAtStreet()
        }

        function actNumberAtStreet() {
            var count = 1;
            for (let i = rawActionListIndex - 1; i >= 0; i--) {
                if (rawActionList[i].street === rawActionList[rawActionListIndex].street && i > 1) {
                    count++;
                } else {return count;}
            }
        }
        return obj;
    }

    playersForJson();
    function playersForJson() {
        var allPlayersIndexes = initPreflopPlayersIndexes();
        for (let i = 0; i < allPlayersIndexes.length; i++) {
            myJSON.players.push({name: rawActionList[allPlayersIndexes[i]].player,
                position: getPositionText(rawActionList[allPlayersIndexes[i]].position),
                stack: rawActionList[allPlayersIndexes[i]].balance,
                bet: rawActionList[allPlayersIndexes[i]].amount,
                hole1: getHeroHole1(),
                hole2: getHeroHole2()
            });


            function getHeroHole1() {
                if (rawActionList[i].isHero) {
                    return cardsName[checkedCards[1]];
                } else {return}
            }
            function getHeroHole2() {
                if (rawActionList[i].isHero) {
                    return cardsName[checkedCards[2]];
                } else {return}
            }
        }
    }

    ActionForJson();
    function ActionForJson() {
        //var streetNames = ["preflop", "flop", "turn", "river"];
        for (let i = 2; i < rawActionList.length; i++) {
            if (rawActionList[i].street === 0) {
                myJSON.actions.preflop.push({act_num: i - 1,
                    player: rawActionList[i].player,
                    balance: rawActionList[i].balance,
                    action: getActionText(rawActionList[i].action),
                    pot: rawActionList[i].pot,
                    amount: getAmountForJson(i)
                    })
            }
            if (rawActionList[i].street === 1) {
                myJSON.actions.flop.push({act_num: i - 1,
                    player: rawActionList[i].player,
                    balance: rawActionList[i].balance,
                    action: getActionText(rawActionList[i].action),
                    pot: rawActionList[i].pot,
                    amount: getAmountForJson(i)
                })
            }
            if (rawActionList[i].street === 2) {
                myJSON.actions.turn.push({act_num: i - 1,
                    player: rawActionList[i].player,
                    balance: rawActionList[i].balance,
                    action: getActionText(rawActionList[i].action),
                    pot: rawActionList[i].pot,
                    amount: getAmountForJson(i)
                })
            }
            if (rawActionList[i].street === 3) {
                myJSON.actions.river.push({act_num: i - 1,
                    player: rawActionList[i].player,
                    balance: rawActionList[i].balance,
                    action: getActionText(rawActionList[i].action),
                    pot: rawActionList[i].pot,
                    amount: getAmountForJson(i)
                })
            }
        }

        function getAmountForJson(i) {
            if (rawActionList[i].amount != 0) {
                return rawActionList[i].amount;
            } else {return}
        }
    }


    var jsonObj = JSON.stringify(myJSON, "", 3);
    console.log(jsonObj);

    $.ajax({
        type: "POST",
        url: "http://localhost:8888/request",  //url сервера mephisto
        dataType: "json",
        success: function (msg) {
            if (msg) {
                alert("Somebody" + name + " was added in list !");
                location.reload(true);
            } else {
                alert("Cannot add to list !");
            }
        },

        data: jsonObj
    });
}

function getCardName(cardNumber) {
    return cardsName[cardNumber];
}

function initPreflopPlayersIndexes() {
    var players = [];
    var playersIndexes = [];
    for (let i = 0; i < rawActionList.length; i++) {
        if (rawActionList[i].street === 0) {
            if (players.indexOf(rawActionList[i].player) === -1) {
               players.push(rawActionList[i].player);
               playersIndexes.push(i);
            }
        } else {return playersIndexes;}
    }
}

/*

// bet 1, raise 2, call 3, check 4, fold 5
// 9 sb, 8 bb, BTN 0, CO 1, MP2 2 ........
// (street, player, balance, action, pot, amount, position, isGTO)
rawActionList[0] = new ActionString(0, "mammoth", 25.15, 3, 0, 0.10, 9, false); // post SB
rawActionList[1] = new ActionString(0, "checkmateN1", 37.25, 1, 0.10, 0.25, 8, false); // post BB
rawActionList[2] = new ActionString(0, "gulyaka", 27, 5, 0.35, 0, 3, false);  // MP1


//JSON
{
  "hand": {
    "lm": 0.25,
    "c1": "Ac",
    "c2": "7c",
    "c3": "Kd",
    "c4": "Js"
  },
  "players": [
    {
      "name": "gulyaka",
      "position": "MP2",
      "stack": 27,
      "bet": 0
    },
    {
      "name": "zlo-Mishka",
      "position": "MP3",
      "stack": 32,
      "bet": 0
    },
    {
      "name": "3D action",
      "position": "CO",
      "stack": 45.37,
      "bet": 0
    },
    {
      "name": "joooe84",
      "position": "BTN",
      "stack": 60,
      "bet": 0
    },
    {
      "name": "mammoth",
      "position": "SB",
      "stack": 25.1,
      "bet": 0.1,
      "hole1": "Ah",
      "hole2": "Kc"
    },
    {
      "name": "checkmateN1",
      "position": "BB",
      "stack": 37.25,
      "bet": 0.25
    }
  ],
  "actions": {
    "preflop": [
      {
        "act_num": 1,
        "player": "gulyaka",
        "balance": 27,
        "action": "fold",
        "pot": 0.35
      },
      {
        "act_num": 2,
        "player": "zlo-Mishka",
        "balance": 32,
        "action": "fold",
        "pot": 2.25
      },
      {
        "act_num": 3,
        "player": "3D action",
        "balance": 45.37,
        "action": "fold",
        "pot": 2.25
      },
      {
        "act_num": 4,
        "player": "joooe84",
        "balance": 60,
        "action": "raise",
        "pot": 3.85,
        "amount": 0.5
      },
      {
        "act_num": 5,
        "player": "mammoth",
        "balance": 25,
        "action": "call",
        "pot": 1.1,
        "amount": 0.65
      },
      {
        "act_num": 6,
        "player": "checkmateN1",
        "balance": 37,
        "action": "call",
        "pot": 1.75,
        "amount": 0.5
      }
    ],
    "flop": [
      {
        "act_num": 1,
        "player": "mammoth",
        "balance": 24.4,
        "action": "check",
        "pot": 2.25
      },
      {
        "act_num": 2,
        "player": "checkmateN1",
        "balance": 36.5,
        "action": "check",
        "pot": 2.25
      },
      {
        "act_num": 3,
        "player": "joooe84",
        "balance": 59.25,
        "action": "bet",
        "pot": 2.25,
        "amount": 1.6
      },
      {
        "act_num": 4,
        "player": "mammoth",
        "balance": 24.4,
        "action": "call",
        "pot": 3.85,
        "amount": 1.6
      },
      {
        "act_num": 5,
        "player": "checkmateN1",
        "balance": 36.5,
        "action": "call",
        "pot": 5.45,
        "amount": 1.6
      }
    ],
    "turn": [
      {
        "act_num": 1,
        "player": "mammoth",
        "balance": 22.8,
        "action": "bet",
        "pot": 7.05,
        "amount": 4
      },
      {
        "act_num": 2,
        "player": "checkmateN1",
        "balance": 36.5,
        "action": "raise",
        "pot": 30.9
      },
      {
        "act_num": 3,
        "player": "joooe84",
        "balance": 57.65,
        "action": "raise",
        "pot": 45.95,
        "amount": 22.75
      }
    ]
  },
  */