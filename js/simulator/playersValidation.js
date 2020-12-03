let playerStats = document.getElementById("player-stats");

class Player {
    constructor(player, id) {
        this.player = player;
        this.id = id;
    }
};

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
    console.log('rawActionList', rawActionList);
    // console.log('allPlayers', allPlayers);
    for (let i = allPlayers.length - 1; i >= 0; i--) { // добавляем только тех кто остался
        if (blackList.indexOf(allPlayers[i]) < 0) {
            playersInGame.push(allPlayers[i]);
        }
    }
    // console.log('blackList', blackList);
    // console.log('playersInGame', playersInGame);
    return playersInGame;
}

// возвращает позицию того кто будет ходить следующим
function whoIsNextMove() {
    if (isTerminalStreetState()) {
        // console.log('Math.max.apply(null, whoIsInGame())', Math.max.apply(null, whoIsInGame()))
        // console.log('whoIsInGame()', whoIsInGame());
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
    let initBalance;
    for (let i = rawActionList.length - 1; i >= 0; i--) {
        if (rawActionList[i].position === position) {
            currentStreetForBalance = rawActionList[i].street;
            initBalance = rawActionList[i].balance;
            break;
        }
    }

    for (let i = rawActionList.length - 2; i >= 0; i--) {
        if (rawActionList[i].position === position) {
            if (rawActionList[i].street === currentStreetForBalance) {
                initBalance = rawActionList[i].balance;
            } else {return initBalance;}
        }
    }
    return initBalance; // если улица префлоп
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
    // alert(elNode);
    // console.log(elNode);
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
        // $("#waiting-progress-bar2").addClass("appear");
        el.removeClass("color-violet");
        // setTimeout(function() {
        //     //$('#waiting-progress-bar').removeClass("appear");
        //     //createHillInfo(); // заголовок окна со спектром
        //     // $(".hill-info").addClass("appear-fast");
        //     // createAllCombinationsArr("strategy", getRawActionsIndex(elNode)); //вызвали функцию рисующую график
        //     // restartListener();
        //
        // }, 2000);

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

function initPreflopPlayersIndexes() {
    var players = [];
    var playersIndexes = [];
    for (let i = 0; i < rawActionList.length; i++) {
        if (players.indexOf(rawActionList[i].player) !== -1) {return playersIndexes}
                players.push(rawActionList[i].player);
                playersIndexes.push(i);
    }
}