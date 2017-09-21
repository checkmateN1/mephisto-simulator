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
    if (cardsModal.classList.contains("position-right")) {
        cardsModal.classList.remove("position-right");
    }
}

window.addEventListener("keydown", function (event) {
    if (event.keyCode === 27) {
        if (cardsModal.classList.contains("visually")) {
            cardsModal.classList.remove("visually");
            checkedCards.wherefrom = null;
        }
        if (cardsModal.classList.contains("position-right")) {
            cardsModal.classList.remove("position-right");
        }
    }
});


var checkedCards = [null, null, null, 7, null, null, null, null];

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
    alert("записали в нулевой элемента массива - какую карту мы хотим выбрать: " + checkedCards[0]);
});

// ожидаем клика в миникарту
ul.addEventListener('click', function(e){
    let id = e.target.id;
    changeCardState(id);  // вызываем функцию которая отображает и меняет состояние карты и добавляет/удаляет в массив
    document.getElementById(id).style.opacity = "0.15";

});

function changeCardState(id) {
    if (checkedCards[0] == "hole") { // если это карта на руках
        if (checkedCards.indexOf(id) > 0){ // если эта карта уже выбрана
            if (checkedCards.indexOf(id) == 1) { // если это первая карта на руках
                document.getElementById(id).style.opacity = "1";
                checkedCards[1] = null;
            }
        }
    }
}


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