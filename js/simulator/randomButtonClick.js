window.onload = () => {
    const randomButton = document.getElementById('random-button');

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
                //console.log(testBoard);
                loadCardsState(testBoard);
            });
        })();
    });
};


