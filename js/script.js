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