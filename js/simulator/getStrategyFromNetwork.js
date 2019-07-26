let getStrategyFromServer = (obj, rawActionListIndex) => {
    $("#waiting-progress-bar2").addClass("appear");
    (async () => {
        const rawResponse = await fetch(url + '/simulations', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj),
        });
        const content = await rawResponse.json().then(function(data) {
            console.log(data);

            //rawActionListIndex, data.allHands.filter(obj => obj.weight !== -1)

            $(".hill-info").addClass("appear-fast");
            createAllCombinationsArr("strategy", rawActionListIndex, data); //вызвали функцию рисующую график
            $('#waiting-progress-bar2').removeClass("appear");
            restartListener();

            // let c4 = data.board.c4 == null? null : cardsName.indexOf(data.board.c4).toString();
            // let c5 = data.board.c5 == null? null : cardsName.indexOf(data.board.c5).toString();
            // testBoard = [null,
            //     cardsName.indexOf(data.hand.h1).toString(),
            //     cardsName.indexOf(data.hand.h2).toString(),
            //     cardsName.indexOf(data.board.c1).toString(),
            //     cardsName.indexOf(data.board.c2).toString(),
            //     cardsName.indexOf(data.board.c3).toString(),
            //     c4,
            //     c5
            // ];
            // loadCardsState(testBoard);
            // clearAllrawActionsList();
            //
            // rawActionList = data.actions.slice();
            // let postflopActionsCount = 0;
            //
            // for (let i = 2; i < rawActionList.length; i++) {
            //     if (rawActionList[i].amount > 0 && rawActionList[i].action < 3) {
            //         rawActionList[i].amount = Math.min(parseFloat(rawActionList[i].amount + maxAmountAtCurrentStreetRandom(i)).toFixed(0), initPlayerBalanceOnCurrentStreet(i));
            //         wasBet(i) ? rawActionList[i].action = 2 : rawActionList[i].action = 1;
            //     } else if (rawActionList[i].amount > 0) {  //call
            //         if (maxOwnPreviousAmountOnCurrentStreet(i) > 0) {
            //             rawActionList[i].amount = parseFloat(rawActionList[i].amount + maxOwnPreviousAmountOnCurrentStreet(i)).toFixed(0);
            //         }
            //     }
            // }
            //
            // console.log(rawActionList);
            //
            // removeActions();
            // displayActions();
            // displayAddRemoveButtons();
            // restartListener();
            // $('#waiting-progress-bar2').removeClass("appear");
            // document.getElementById('randomHandNumber').innerText = data.randomHandNumber;
        });
    })();
};