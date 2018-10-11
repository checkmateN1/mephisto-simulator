window.onload = () => {
    const randomButton = document.getElementById('random-button');

    function maxAmountAtCurrentStreetRandom(index) {
        let currentStreet = rawActionList[index].street;
        for (let i = index - 1; i >= 0; i--) {
            if (rawActionList[i].street === currentStreet) {
                if (rawActionList[i].action < 3) {
                    return parseFloat(rawActionList[i].amount);
                }
            } else {return parseFloat(0);}
        }
        return parseFloat(0);
    }

    randomButton.addEventListener('click', () => {
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
                //console.log(`rawActionList.length after cleaning in random button = ${rawActionList.length}`);
                rawActionList = data.actions.slice();
                for (let i = 2; i < rawActionList.length; i++) {
                    if (rawActionList[i].amount > 0 && rawActionList[i].action < 3) {
                        rawActionList[i].amount = parseFloat(rawActionList[i].amount + maxAmountAtCurrentStreetRandom(i)).toFixed(0);
                    }
                }
                console.log(rawActionList);
                
                removeActions();
                displayActions();
                displayAddRemoveButtons();
                restartListener();
            });
        })();
    });
};


