window.onload = () => {
    const randomButton = document.getElementById('random-button');

    function maxAmountAtCurrentStreetRandom(index) {
        let currentStreet = rawActionList[index].street;
        for (let i = index - 1; i >= 0; i--) {
            if (rawActionList[i].street === currentStreet) {
                if (rawActionList[i].action < 3) {
                    return parseFloat(rawActionList[i].amount);
                }
            } else {return 0}
        }
        return 0;
    }

    function initPlayerBalanceOnCurrentStreet(index) {
        let currentBalance = rawActionList[index].balance;
        let currentPosition = rawActionList[index].position;
        let currentStreet = rawActionList[index].street;

        for(let i = 0; i < index; i++) {
            if (rawActionList[i].street == currentStreet && rawActionList[i].position == currentPosition) {
                return rawActionList[i].balance;
            }
        }
        return currentBalance;
    }

    function maxOwnPreviousAmountOnCurrentStreet(index) {
        let currentAmount = rawActionList[index].amount;
        let currentPosition = rawActionList[index].position;
        let currentStreet = rawActionList[index].street;

        for(let i = index - 1; i > 0; i--) {
            if (rawActionList[i].street == currentStreet && rawActionList[i].position == currentPosition) {
                return rawActionList[i].amount;
            }
        }
        return 0;
    }

    let getRandomHand = () => {
        $("#waiting-progress-bar2").addClass("appear");
        (async () => {
            const rawResponse = await fetch(url + '/random', {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            const content = await rawResponse.json().then(function(data) {
                if (data.success === false) {
                    getRandomHand();
                    return;
                }
                console.log(data);
                let c4 = data.board.c4 == null? null : cardsName.indexOf(data.board.c4).toString();
                let c5 = data.board.c5 == null? null : cardsName.indexOf(data.board.c5).toString();
                testBoard = [null,
                    cardsName.indexOf(data.hand.h1).toString(),
                    cardsName.indexOf(data.hand.h2).toString(),
                    cardsName.indexOf(data.board.c1).toString(),
                    cardsName.indexOf(data.board.c2).toString(),
                    cardsName.indexOf(data.board.c3).toString(),
                    c4,
                    c5
                ];
                loadCardsState(testBoard);
                clearAllrawActionsList();

                rawActionList = data.actions.slice();
                let postflopActionsCount = 0;

                for (let i = 2; i < rawActionList.length; i++) {
                    if (rawActionList[i].amount > 0 && rawActionList[i].action < 3) {
                        rawActionList[i].amount = Math.min(parseFloat(rawActionList[i].amount + maxAmountAtCurrentStreetRandom(i)).toFixed(0), initPlayerBalanceOnCurrentStreet(i));
                        wasBet(i) ? rawActionList[i].action = 2 : rawActionList[i].action = 1;
                    } else if (rawActionList[i].amount > 0) {  //call
                        if (maxOwnPreviousAmountOnCurrentStreet(i) > 0) {
                            rawActionList[i].amount = parseFloat(rawActionList[i].amount + maxOwnPreviousAmountOnCurrentStreet(i)).toFixed(0);
                        }
                    }
                }

                console.log(rawActionList);

                removeActions();
                displayActions();
                displayAddRemoveButtons();
                restartListener();
                $('#waiting-progress-bar2').removeClass("appear");
                document.getElementById('randomHandNumber').innerText = data.randomHandNumber;
            });
        })();
    };

    randomButton.addEventListener('click', getRandomHand);
};


