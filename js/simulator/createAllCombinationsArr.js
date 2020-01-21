//заполняет окно спектра информацией
function createAllCombinationsArr(strategyORrange, rawActionIndex, data) {

    let ball = document.getElementById('draggable');
    ball.style.left = '30px';
    ball.style.top = '124px';

    //заполняем массив всех возможных комбинаций рук с текущим бордом пока сервер рассчитывает стратегию
    //console.log(allHandsCombination);
    // console.log('inside createAllCombinationsArr!!!');
    // console.log(strategyORrange);
    // console.log(rawActionIndex);
    // console.log(data);
    // console.log(rawActionList[rawActionIndex].street);

    //возвращает значимые карты борда для запроса юзера в зависимости от конкретной улицы где был клик
    const getUsefulBoard = (board) => {
        let street = getStreetText(rawActionList[rawActionIndex].street);
        //console.log(street);
        if (street === 'Flop') {
          return board.slice(0, 6);
        } else if (street === 'Turn') {
          return board.slice(0, 7);
        } else if (street === 'River'){
          return board.slice(0, 8);
        }
    };
    if (rawActionList[rawActionIndex].street > 0) {setCombNameToAllHands(getUsefulBoard(testBoard));}

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

    //Width and height svg on the left
    var w = 300;
    var h = 25 * data.allHands.length;

    //цвета диаграмм
    var agroColor = "#7d1008";
    var callColor = "#899600";
    var foldColor = "#36342d";

    var currentColor = "#000082";
    var nodeColor = "#628cb9";
    var preflopColor = "#9fab00";

    //стратегия с сервера
    var strategyRaw = data;
    // var strategyRaw = {
    //     allHands: [
    //         {
    //             hand: 'AhKh',
    //             moves: {
    //                 "1.3": {strategy: 0.24, ev: 0.8},
    //                 "1": {strategy: 0.26, ev: 1},
    //                 "0.5": {strategy: 0.1, ev: 0.55},
    //                 "0": {strategy: 0.25, ev: 0.3},
    //                 "-1": {strategy: 0.15}
    //             },
    //             weight: 0.67,
    //             preflopWeight: 0.97,
    //             combination: "A high"
    //         },
    //         {
    //             hand: 'AcKc',
    //             moves: {
    //                 "1.3": {strategy: 0, ev: 0.8},
    //                 "1": {strategy: 0, ev: 1},
    //                 "0.5": {strategy: 0, ev: 0.55},
    //                 "0": {strategy: 0, ev: 0.3},
    //                 "-1": {strategy: 1}
    //             },
    //             weight: 0.77,
    //             preflopWeight: 0.97,
    //             combination: "A high"
    //         },
    //         {
    //             hand: 'AsKs',
    //             moves: {
    //                 "1.3": {strategy: 0, ev: 0.8},
    //                 "1": {strategy: 0.2, ev: 1},
    //                 "0.5": {strategy: 0.05, ev: 0.55},
    //                 "0": {strategy: 0.75, ev: 1.52},
    //                 "-1": {strategy: 0}
    //             },
    //             weight: 0.55,
    //             preflopWeight: 0.97,
    //             combination: "A high"
    //         },
    //         {
    //             hand: 'AdKd',
    //             moves: {
    //                 "1.3": {strategy: 0, ev: 0.8},
    //                 "1": {strategy: 0.2, ev: 1},
    //                 "0.5": {strategy: 0.05, ev: 0.55},
    //                 "0": {strategy: 0.75, ev: 0.55},
    //                 "-1": {strategy: 0}
    //             },
    //             weight: 0.2,
    //             preflopWeight: 0.97,
    //             combination: "A high"
    //         },
    //         {
    //             hand: 'AdAh',
    //             moves: {
    //                 "1.3": {strategy: 0.33, ev: 1.8},
    //                 "1": {strategy: 0.5, ev: 20.13},
    //                 "0.5": {strategy: 0.17, ev: 1.55},
    //                 "0": {strategy: 0, ev: 1.33},
    //                 "-1": {strategy: 0}
    //             },
    //             weight: 1,
    //             preflopWeight: 0.88,
    //             combination: "tptk"
    //         },
    //         {
    //             hand: 'KsKc',
    //             moves: {
    //                 "1.3": {strategy: 0.03, ev: 1.3},
    //                 "1": {strategy: 0.1, ev: 1.66},
    //                 "0.5": {strategy: 0.35, ev: 1.1},
    //                 "0": {strategy: 0.52, ev: -0.27},
    //                 "-1": {strategy: 0}
    //             },
    //             weight: 0.77,
    //             preflopWeight: 0.92,
    //             combination: "tptk"
    //         },
    //         {
    //             hand: 'KcKh',
    //             moves: {
    //                 "1.3": {strategy: 0, ev: 1.3},
    //                 "1": {strategy: 0, ev: 1.66},
    //                 "0.5": {strategy: 0, ev: 1.1},
    //                 "0": {strategy: 1, ev: 0.3},
    //                 "-1": {strategy: 0}
    //             },
    //             weight: 0.55,
    //             preflopWeight: 0.92,
    //             combination: "tptk"
    //         },
    //         {
    //             hand: 'QsQc',
    //             moves: {
    //                 "1.3": {strategy: 0, ev: -0.37},
    //                 "1": {strategy: 0, ev: 1.66},
    //                 "0.5": {strategy: 0.25, ev: 1.1},
    //                 "0": {strategy: 0.1, ev: 0.3},
    //                 "-1": {strategy: 0.65}
    //             },
    //             weight: 0.68,
    //             preflopWeight: 0.83,
    //             combination: "2d pair"
    //         },
    //         {
    //             hand: 'AsKc',
    //             moves: {
    //                 "1.3": {strategy: 0.2, ev: 1.3},
    //                 "1": {strategy: 0, ev: 1.66},
    //                 "0.5": {strategy: 0.03, ev: 1.1},
    //                 "0": {strategy: 0.77, ev: 0.3},
    //                 "-1": {strategy: 0}
    //             },
    //             weight: 0.88,
    //             preflopWeight: 0.92,
    //             combination: "tptk"
    //         },
    //         {
    //             hand: 'AhKs',
    //             moves: {
    //                 "1.3": {strategy: 0.1, ev: 1.3},
    //                 "1": {strategy: 0, ev: 1.66},
    //                 "0.5": {strategy: 0, ev: 1.1},
    //                 "0": {strategy: 0.9, ev: 0.3},
    //                 "-1": {strategy: 0}
    //             },
    //             weight: 0.88,
    //             preflopWeight: 0.92,
    //             combination: "tptk"
    //         }
    //     ]
    // };

    //стратегия с фильтром в зависимости от выбранной комбинации

    var testStrategy = data;
    // var testStrategy = {
    //     allHands: [
    //         {
    //             hand: 'AhKh',
    //             moves: {
    //                 "1.3": {strategy: 0.24, ev: 0.8},
    //                 "1": {strategy: 0.26, ev: 1},
    //                 "0.5": {strategy: 0.1, ev: 0.55},
    //                 "0": {strategy: 0.25, ev: 0.3},
    //                 "-1": {strategy: 0.15}
    //             },
    //             weight: 0.67,
    //             preflopWeight: 0.97,
    //             combination: "A high"
    //         },
    //         {
    //             hand: 'AcKc',
    //             moves: {
    //                 "1.3": {strategy: 0, ev: 0.8},
    //                 "1": {strategy: 0, ev: 1},
    //                 "0.5": {strategy: 0, ev: 0.55},
    //                 "0": {strategy: 0, ev: 0.3},
    //                 "-1": {strategy: 1}
    //             },
    //             weight: 0.77,
    //             preflopWeight: 0.97,
    //             combination: "A high"
    //         },
    //         {
    //             hand: 'AsKs',
    //             moves: {
    //                 "1.3": {strategy: 0, ev: 0.8},
    //                 "1": {strategy: 0.2, ev: 1},
    //                 "0.5": {strategy: 0.05, ev: 0.55},
    //                 "0": {strategy: 0.75, ev: 1.52},
    //                 "-1": {strategy: 0}
    //             },
    //             weight: 0.55,
    //             preflopWeight: 0.97,
    //             combination: "A high"
    //         },
    //         {
    //             hand: 'AdKd',
    //             moves: {
    //                 "1.3": {strategy: 0, ev: 0.8},
    //                 "1": {strategy: 0.2, ev: 1},
    //                 "0.5": {strategy: 0.05, ev: 0.55},
    //                 "0": {strategy: 0.75, ev: 0.55},
    //                 "-1": {strategy: 0}
    //             },
    //             weight: 0.2,
    //             preflopWeight: 0.97,
    //             combination: "A high"
    //         },
    //         {
    //             hand: 'AdAh',
    //             moves: {
    //                 "1.3": {strategy: 0.33, ev: 1.8},
    //                 "1": {strategy: 0.5, ev: 20.13},
    //                 "0.5": {strategy: 0.17, ev: 1.55},
    //                 "0": {strategy: 0, ev: 1.33},
    //                 "-1": {strategy: 0}
    //             },
    //             weight: 1,
    //             preflopWeight: 0.88,
    //             combination: "tptk"
    //         },
    //         {
    //             hand: 'KsKc',
    //             moves: {
    //                 "1.3": {strategy: 0.03, ev: 1.3},
    //                 "1": {strategy: 0.1, ev: 1.66},
    //                 "0.5": {strategy: 0.35, ev: 1.1},
    //                 "0": {strategy: 0.52, ev: -0.27},
    //                 "-1": {strategy: 0}
    //             },
    //             weight: 0.77,
    //             preflopWeight: 0.92,
    //             combination: "tptk"
    //         },
    //         {
    //             hand: 'KcKh',
    //             moves: {
    //                 "1.3": {strategy: 0, ev: 1.3},
    //                 "1": {strategy: 0, ev: 1.66},
    //                 "0.5": {strategy: 0, ev: 1.1},
    //                 "0": {strategy: 1, ev: 0.3},
    //                 "-1": {strategy: 0}
    //             },
    //             weight: 0.55,
    //             preflopWeight: 0.92,
    //             combination: "tptk"
    //         },
    //         {
    //             hand: 'QsQc',
    //             moves: {
    //                 "1.3": {strategy: 0, ev: -0.37},
    //                 "1": {strategy: 0, ev: 1.66},
    //                 "0.5": {strategy: 0.25, ev: 1.1},
    //                 "0": {strategy: 0.1, ev: 0.3},
    //                 "-1": {strategy: 0.65}
    //             },
    //             weight: 0.68,
    //             preflopWeight: 0.83,
    //             combination: "2d pair"
    //         },
    //         {
    //             hand: 'AsKc',
    //             moves: {
    //                 "1.3": {strategy: 0.2, ev: 1.3},
    //                 "1": {strategy: 0, ev: 1.66},
    //                 "0.5": {strategy: 0.03, ev: 1.1},
    //                 "0": {strategy: 0.77, ev: 0.3},
    //                 "-1": {strategy: 0}
    //             },
    //             weight: 0.88,
    //             preflopWeight: 0.92,
    //             combination: "tptk"
    //         },
    //         {
    //             hand: 'AhKs',
    //             moves: {
    //                 "1.3": {strategy: 0.1, ev: 1.3},
    //                 "1": {strategy: 0, ev: 1.66},
    //                 "0.5": {strategy: 0, ev: 1.1},
    //                 "0": {strategy: 0.9, ev: 0.3},
    //                 "-1": {strategy: 0}
    //             },
    //             weight: 0.88,
    //             preflopWeight: 0.92,
    //             combination: "tptk"
    //         }
    //     ]
    // };

    //console.log(setWeightToAllCombinations(testStrategy, strategyORrange));

    if (strategyORrange !== "strategy") {
        strategyORrange = "1"; //временно - будем парсить нужный сайзинг из джейсона с сервера
    }
    var currentMoveOrStrategyState = strategyORrange;


    //текущее отображение в окне: strategy/сайзинг рейнжа
    //текущая выбранная группа рук в матрице
    var currentMatrixHand = null;
    //текущая выбранная конкретная рука в левой диаграмме
    var currentHandInDiagram = null;

    //есть проблемы с рейзами: key != sizing
    function getHandEV(hand, sizing) {
        for (let i = 0; i < testStrategy.allHands.length; i++) {
            if (testStrategy.allHands[i].hand == hand) {
                for(var key in testStrategy.allHands[i].moves) {
                    //console.log(`key = ${key}, sizing = ${sizing}`);
                    if (key == sizing) {
                        //alert(`key == sizing!`);
                        //console.log(`parseFloat(testStrategy.allHands[i].moves[key].ev) = ${parseFloat(testStrategy.allHands[i].moves[key].ev)}`);
                        return parseFloat(testStrategy.allHands[i].moves[key].ev);
                    }
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
        let sortable = [];
        for (let key in testStrategy.allHands[0].moves) {
            sortable.push([parseFloat(key), testStrategy.allHands[0].moves[key]]);
        }

        sortable.sort(function(a, b) {
            return b[0] - a[0];
        });

        let strategyMoves = document.getElementById("strategy-moves");
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
                    //console.log(`EV = ${EV}`);
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
        if (currentMoveOrStrategyState !== "strategy") {
            var li = document.getElementById("strategyMove_" + currentMoveOrStrategyState);
            $("#strategy-moves li").addClass("not-selected-move");
            li.classList.add("selected-move");
            li.classList.remove("not-selected-move");
        }
    }

    //функция отрисовывающая комбинации с их весами а так же обрабатывающая клик в название комбинации
    function displayCombinationWeight(move) {
        let table = document.getElementById("hill-combination");
        table.innerHTML = '';
        setWeightToAllCombinations(testStrategy, move).forEach(combination => {
            for (let property in combination ) {
                //console.log(`property = ${property}`);
                if (property !== 'combNumber') {
                    let tr = table.insertRow();
                    let tdComb = tr.insertCell();
                    let tdPercent = tr.insertCell();

                    tr.id = 'combName_' + combination.combNumber;
                    tdComb.appendChild(document.createTextNode(property + ": "));
                    tdPercent.appendChild(document.createTextNode(combination[property]));
                }
            }
        });
        //меняем цвет кликнутой комбинации и выводим стратегию/спектр с учетом фильтра комбинации
        // $("#hill-combination td:nth-child(1)").on('click', changeFilterHands);
        function changeFilterHands(e) {
            let li = e.target;

            if ($('.matrix_td').hasClass("td-selected")) {
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
                $('.matrix_td').removeClass("td-selected");
            }

            if (li.parentNode.classList.contains("selected-move")) {
                li.parentNode.classList.remove("selected-move");
                $("#hill-combination tr").removeClass("not-selected-move");
                testStrategy.allHands = strategyRaw.allHands;
                if ($("#strategy-moves li").hasClass('selected-move')) {
                    let li = document.querySelector('li.selected-move');

                    //удаляем рейнж или стратегию и рисуем рейнж с целевым сайзингом
                    removeAllPreviousElements("all");
                    displayAllMoveStrategyInfo(li.id.split('strategyMove_')[1], "all");

                    //меняем hill-info
                    changeInfoDiagram(li.id.split('strategyMove_')[1]);

                    createStrategyList();
                    setSelectedStrategyList();
                } else {
                    //удаляем рейнж и рисуем стратегию
                    removeAllPreviousElements("all");
                    displayAllMoveStrategyInfo("strategy", "all");

                    //меняем hill-info
                    changeInfoDiagram("strategy");

                    createStrategyList();
                }
            } else {
                $("#hill-combination tr").addClass("not-selected-move");
                $("#hill-combination tr").removeClass("selected-move");

                // console.log(`testStrategy before = ${testStrategy.allHands}`);

                testStrategy.allHands = strategyRaw.allHands.filter(handObj => allHandsCombination[handObj.hand] == li.parentNode.id.split('combName_')[1]);

                // console.log(`testStrategy after = ${testStrategy.allHands}`);

                if ($("#strategy-moves li").hasClass('selected-move')) {
                    let li = document.querySelector('li.selected-move');

                    //удаляем рейнж или стратегию и рисуем рейнж с целевым сайзингом
                    removeAllPreviousElements("all");
                    displayAllMoveStrategyInfo(li.id.split('strategyMove_')[1], "all");

                    //меняем hill-info
                    changeInfoDiagram(li.id.split('strategyMove_')[1]);

                    createStrategyList();
                    setSelectedStrategyList();
                } else {
                    //удаляем рейнж и рисуем стратегию
                    removeAllPreviousElements("all");
                    displayAllMoveStrategyInfo("strategy", "all");

                    //меняем hill-info
                    changeInfoDiagram("strategy");

                    createStrategyList();
                }

                li.parentNode.classList.remove("not-selected-move");
                li.parentNode.classList.add("selected-move");
            }
            $("#strategy-moves > li").off;
            $("#strategy-moves > li").on('click', changeStrategyListOn);
        }
    }
    displayCombinationWeight(strategyORrange);

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
        console.log(`зашли в createHillData`);
        let handsSize = strategy.allHands.length;
        let data_strategy = {};
        let maxWeight = 0; //максимальный вес какой-то руки в конкретном муве(для масштаба диаграммы)
        let tmpWeight = 0;

        if (orderBy === "strategy") {
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


        } else if (orderBy === "preflop") {
            maxWeight = 1;
            for (let i = 0; i < handsSize; i++) {
                data_strategy[strategy.allHands[i].hand] = strategy.allHands[i].preflopWeight;
            }
        } else if (orderBy === "range") {
            if (currentMatrixHand == null) {
                for (let i = 0; i < handsSize; i++) {
                    for (let key in strategy.allHands[i].moves) {
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
        let keysSorted = Object.keys(data_strategy).sort(function(a,b){return data_strategy[b] - data_strategy[a]});

        //записали все веса агромувов в один ключ W если это стратегия для диаграммы(orderBy)
        //Нужно записать в файнал дата в ключ W для агромувов вес всех агромувов для каждой руки
        function createFinalDate(keysSorted, handsSize, move, maxWeight, orderBy) {

            let hillData = [];
            for (let i = 0; i < keysSorted.length; i++) {
                let hand = keysSorted[i];
                for (let j = 0; j < handsSize; j++) {
                    if (strategy.allHands[j].hand === hand) {
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
        if (move === "strategy") {
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
                // alert(el.id);
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
                    td.setAttribute("id", 'matrix_' + title);
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
                    if (moveType > 0 || moveType === "strategy" || moveType === "range") {
                        let w = data_strategy[i].w;
                        justDoIt(w);
                    } else if (moveType == 0) {
                        let w = data_strategy[i].call;
                        justDoIt(w);
                    } else if (moveType < 0) {
                        let w = data_strategy[i].fold;
                        justDoIt(w);
                    } else if (moveType === "preflop") {
                        let w = data_strategy[i].pw;
                        justDoIt(w);
                    } else if (moveType === "node") {
                        let w = data_strategy[i].nw;
                        justDoIt(w);
                    }
                }
            }
            return [weightMin, weightMax];
        }

        displayOrderMatrix();
        function displayOrderMatrix() {
            if (moveType !== "strategy") {
                createMatrixIMG("range", moveType);
                createMatrixIMG("node", moveType);
                createMatrixIMG("preflop", moveType);
            } else {
                if (wasBet(rawActionIndex)) {
                    createMatrixIMG("strategy", moveType);
                    createMatrixIMG("0");
                    createMatrixIMG("-1");
                } else {
                    createMatrixIMG("strategy", moveType);
                    createMatrixIMG("0");
                    createMatrixIMG("-1"); //временно для проверки глюков, что ничего не фолдит сеть когда есть возможность чекать
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
                    let td = document.getElementById('matrix_' + comb);
                    let weight = getCombinationWeight(comb, moveType);
                    //alert("weight = " + weight + "comb = " + comb);

                    let div = document.createElement("div");
                    div.classList.add("matrix-strategy");
                    if (moveType === "strategy") {
                        div.style.background = agroColor;
                        div.style.height = "100%";
                        div.style.zIndex = "-30";
                        td.setAttribute('data-internalid', weight[1]);
                        div.style.width = (weight[1] * 100) + "%";
                    } else if (moveType === "range") {
                        div.style.background = currentColor;
                        div.style.height = "86%";
                        div.style.zIndex = "-30";
                        td.removeAttribute('data-internalid');
                        div.style.width = (weight[1] * 100) + "%";
                    } else if (moveType == 0 || moveType === "node") {
                        if (moveType === "node") {
                            div.style.background = nodeColor;
                            div.style.height = "93%";
                            div.style.width = (weight[1] * 100) + "%";
                        } else {
                            div.style.background = callColor;
                            div.style.height = "100%";
                            if (td.hasAttribute('data-internalid')) {
                                div.style.width = ((parseFloat(td.getAttribute('data-internalid')) + weight[1]) * 100) + "%";
                                td.setAttribute('data-internalid', parseFloat(td.getAttribute('data-internalid')) + weight[1]);
                            } else {
                                div.style.width = (weight[1] * 100) + "%";
                            }

                        }
                        div.style.zIndex = "-50";
                    } else if (moveType < 0 || moveType === "preflop") {
                        if (moveType === "preflop") {
                            div.style.background = preflopColor;
                            div.style.width = (weight[1] * 100) + "%";
                        } else {
                            div.style.background = foldColor;
                            if (td.hasAttribute('data-internalid')) {
                                div.style.width = ((parseFloat(td.getAttribute('data-internalid')) + weight[1]) * 100) + "%";
                            } else {div.style.width = (weight[1] * 100) + "%";}
                        }
                        div.style.height = "100%";
                        div.style.zIndex = "-70";
                    }

                    div.style.position = "absolute";
                    div.style.top = "0";
                    td.appendChild(div);

                    if (weight[1] - weight[0] > 0.1) {
                        let div = document.createElement("div");
                        div.classList.add("matrix-strategy");


                        if (moveType === "range") {
                            div.style.background = setMinRangeColor(weight);
                            div.style.height = "86%";
                            div.style.zIndex = "-29";
                        } else if (moveType > 0 || moveType === "strategy") {
                            div.style.background = setMinStrategyColor(weight);
                            div.style.zIndex = "1000";
                            div.style.height = "86%";
                            div.style.zIndex = "-29";
                        } else if (moveType == 0 || moveType === "node") {
                            if (moveType === "node"){
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
            if (td.id === '') {
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
                currentMatrixHand = td.id.replace('matrix_', '');
                createStrategyList();
                setSelectedStrategyList();
                //alert("test");
                $("#strategy-moves > li").off();
                $("#strategy-moves > li").on('click', changeStrategyListOn);
                if (currentMoveOrStrategyState === "strategy") {
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
                        const tdBlur = 'matrix_' + createTD(i, j);
                        let tdID = document.getElementById(tdBlur);

                        if (tdBlur !== td.id) {
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




