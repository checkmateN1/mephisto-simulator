// const ioClient = io.connect(url);
const token = 'uidfksicnm730pdemg662oermfyf75jdf9djf';  // simulator
const WebSocketServer = {
    isConnected: false,
    socket: null,
    interval: null,
    connect() {
        if (this.socket) {
            this.socket.destroy();
            delete this.socket;
            this.socket = null;
        }
        this.socket = io.connect(url, {
            reconnection: false,
            timeout: 60000,
            pingTimeout: 60000,
        });
        this.socket.on('connect', () => {
            this.isConnected = true;
            // authorization
            this.socket.emit('authorization', token);
            this.socket.on('authorizationSuccess', () => {
                console.info('authorization success: simulator');
            });
        });

        this.socket.on('disconnect', () => {
            this.isConnected = false;
            this.interval = window.setInterval(() => {
                if (this.isConnected) {
                    clearInterval(this.interval);
                    this.interval = null;
                    return;
                }
                WebSocketServer.connect()
            }, 3000);
        });

        return this.socket;
    }
};

const ioClient = WebSocketServer.connect();
// var socket = WebSocketServer.connect();

let actionIndex = 0;

// // authorization
// ioClient.emit('authorization', token);
// ioClient.on('authorizationSuccess', () => {
//     console.info('authorization success: simulator');
// });

ioClient.on('unauthorizedAccess', () => {
    console.info('Unauthorized Access: please check your token');
});

ioClient.on('simulationsSuccess', () => {
    console.log(`server got simulation request successful`);
});

ioClient.on('testInterval', () => {
    console.log(`got test fake frame`);
});

ioClient.on('simulationError', (data) => {
    console.info(`simulation error ${data}`);
});

ioClient.on('simulationsResponse', (data) => {
    console.log('simulationsResponse!!!');
    console.log(data);
    $("#draggable").addClass("appear-fast");
    $("#draggable").show();
    createAllCombinationsArr("strategy", actionIndex, data); //вызвали функцию рисующую график
    $('#waiting-progress-bar2').removeClass("appear");
    restartListener();

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

ioClient.on('disconnect', () => {
    console.info('server gone');

});

const getStrategyFromServer = (obj, rawActionListIndex) => {
    actionIndex = rawActionListIndex;
    console.log(obj);
    ioClient.emit('simulations', obj);
    $("#waiting-progress-bar2").addClass("appear");
};
//
// const getStrategyFromServer = (obj, rawActionListIndex) => {
//     $("#waiting-progress-bar2").addClass("appear");
//     (async () => {
//         const rawResponse = await fetch(url + '/simulations', {
//             method: 'POST',
//             mode: 'cors',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(obj),
//         });
//         const content = await rawResponse.json().then(function(data) {
//             console.log(data);
//
//             //rawActionListIndex, data.allHands.filter(obj => obj.weight !== -1)
//
//             $(".hill-info").addClass("appear-fast");
//             createAllCombinationsArr("strategy", rawActionListIndex, data); //вызвали функцию рисующую график
//             $('#waiting-progress-bar2').removeClass("appear");
//             restartListener();
//
//             let c4 = data.board.c4 == null? null : cardsName.indexOf(data.board.c4).toString();
//             let c5 = data.board.c5 == null? null : cardsName.indexOf(data.board.c5).toString();
//             testBoard = [null,
//                 cardsName.indexOf(data.hand.h1).toString(),
//                 cardsName.indexOf(data.hand.h2).toString(),
//                 cardsName.indexOf(data.board.c1).toString(),
//                 cardsName.indexOf(data.board.c2).toString(),
//                 cardsName.indexOf(data.board.c3).toString(),
//                 c4,
//                 c5
//             ];
//             loadCardsState(testBoard);
//             clearAllrawActionsList();
//
//             rawActionList = data.actions.slice();
//             let postflopActionsCount = 0;
//
//             for (let i = 2; i < rawActionList.length; i++) {
//                 if (rawActionList[i].amount > 0 && rawActionList[i].action < 3) {
//                     rawActionList[i].amount = Math.min(parseFloat(rawActionList[i].amount + maxAmountAtCurrentStreetRandom(i)).toFixed(0), initPlayerBalanceOnCurrentStreet(i));
//                     wasBet(i) ? rawActionList[i].action = 2 : rawActionList[i].action = 1;
//                 } else if (rawActionList[i].amount > 0) {  //call
//                     if (maxOwnPreviousAmountOnCurrentStreet(i) > 0) {
//                         rawActionList[i].amount = parseFloat(rawActionList[i].amount + maxOwnPreviousAmountOnCurrentStreet(i)).toFixed(0);
//                     }
//                 }
//             }
//
//             console.log(rawActionList);
//
//             removeActions();
//             displayActions();
//             displayAddRemoveButtons();
//             restartListener();
//             $('#waiting-progress-bar2').removeClass("appear");
//             document.getElementById('randomHandNumber').innerText = data.randomHandNumber;
//         });
//     })();
// };