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

    var slider = $("<td><form class=\"raise-form\" onsubmit=\"return false\" oninput=\"level.value = flevel.valueAsNumber.toFixed(2)\">\n" +
        "  <label for=\"flying\"></label>\n" +
        "  <input class=\"raise-amount\" autofocus name=\"flevel\" id=\"flying\" type=\"range\" min=\"" + Math.min(initPlayerBalance(rawActionList[rawActionList.length - 1].position, rawActionList.length), minAmount()).toFixed(2) + "\" max=\"" + initPlayerBalance(rawActionList[rawActionList.length - 1].position, rawActionList.length).toFixed(2) + "\" step=\"0.05\" value=\"" + rawActionList[rawActionList.length - 1].amount + "\"> \n" +
        "  <span class=\"dollar\">$</span> \n" +
        "  <output for=\"flying\" name=\"level\">" + Math.min(initPlayerBalance(rawActionList[rawActionList.length - 1].position, rawActionList.length), Math.max(rawActionList[rawActionList.length - 1].amount, minAmount())).toFixed(2) + "</output>" +
        "</form></td>");


    el.replaceWith(slider);
    document.getElementById('flying').focus();

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

    let player = rawActionList[getRawActionsIndex(elNode)].player;

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