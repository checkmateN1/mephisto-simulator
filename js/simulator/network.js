
function actionToJson(rawActionListIndex, request) {

    var myJSON = {
        board: {
            lm: Math.max(rawActionList[0].amount, rawActionList[1].amount),
            c1: getCardName(checkedCards[3]),
            c2: getCardName(checkedCards[4]),
            c3: getCardName(checkedCards[5]),
            c4: getCardName(checkedCards[6]),
            c5: getCardName(checkedCards[7]),
        },
        players: [],
        actions: createStreets(),
        request: createRequest()
    };

    function createStreets() {
        if (rawActionList[rawActionList.length - 1].street === 3) {
            var objRiver = {
                preflop: [],
                flop: [],
                turn: [],
                river: []
            };
            return objRiver;

        } else if (rawActionList[rawActionList.length - 1].street === 2) {
            var objTurn = {
                preflop: [],
                flop: [],
                turn: []
            };
            return objTurn;
        } else if (rawActionList[rawActionList.length - 1].street === 1) {
            var objFlop = {
                preflop: [],
                flop: []
            };
            return objFlop;
        } else {
            var objPreflop = {
                preflop: []
            };
            return objPreflop;
        }
    }

    function createRequest() {
        console.log(`createRequest from network.js`);
        console.log(`rawActionListIndex: ${rawActionListIndex}`);
        console.log(`rawActionList[rawActionListIndex].street: ${rawActionList[rawActionListIndex].street}`);
        var obj = {
            street: rawActionList[rawActionListIndex].street,
            act_num: rawActionListIndex
        };

        function actNumberAtStreet() {
            var count = 1;
            for (let i = rawActionListIndex - 1; i >= 0; i--) {
                if (rawActionList[i].street === rawActionList[rawActionListIndex].street && i > 1) {
                    count++;
                } else {return count;}
            }
        }
        return obj;
    }

    playersForJson();
    function playersForJson() {
        var allPlayersIndexes = initPreflopPlayersIndexes();
        for (let i = 0; i < allPlayersIndexes.length; i++) {
            myJSON.players.push({name: rawActionList[allPlayersIndexes[i]].player,
                position: rawActionList[allPlayersIndexes[i]].position,
                stack: rawActionList[allPlayersIndexes[i]].balance,
                bet: rawActionList[allPlayersIndexes[i]].amount,
                hole1: getHeroHole(1),
                hole2: getHeroHole(2)
            });

            function getHeroHole(index) {
                if (rawActionList[i].isHero) {
                    return cardsName[checkedCards[index]];
                }
            }
        }
    }

    ActionForJson();
    function ActionForJson() {
        //var streetNames = ["preflop", "flop", "turn", "river"];
        for (let i = 0; i < rawActionList.length; i++) {
            if (rawActionList[i].street === 0) {
                myJSON.actions.preflop.push({act_num: i + 1,
                    position: rawActionList[i].position,
                    balance: rawActionList[i].balance,
                    //action: getActionText(rawActionList[i].action),
                    action: rawActionList[i].action,
                    pot: rawActionList[i].pot,
                    amount: rawActionList[i].amount
                })
            }
            if (rawActionList[i].street === 1) {
                myJSON.actions.flop.push({act_num: i + 1,
                    position: rawActionList[i].position,
                    balance: rawActionList[i].balance,
                    //action: getActionText(rawActionList[i].action),
                    action: rawActionList[i].action,
                    pot: rawActionList[i].pot,
                    amount: rawActionList[i].amount
                })
            }
            if (rawActionList[i].street === 2) {
                myJSON.actions.turn.push({act_num: i + 1,
                    position: rawActionList[i].position,
                    balance: rawActionList[i].balance,
                    //action: getActionText(rawActionList[i].action),
                    action: rawActionList[i].action,
                    pot: rawActionList[i].pot,
                    amount: rawActionList[i].amount
                })
            }
            if (rawActionList[i].street === 3) {
                myJSON.actions.river.push({act_num: i + 1,
                    position: rawActionList[i].position,
                    balance: rawActionList[i].balance,
                    //action: getActionText(rawActionList[i].action),
                    action: rawActionList[i].action,
                    pot: rawActionList[i].pot,
                    amount: rawActionList[i].amount
                })
            }
        }
    }
    console.log('myJSON');
    console.log(myJSON);
    getStrategyFromServer(myJSON, rawActionListIndex);

    // var jsonObj = JSON.stringify(myJSON, "", 3);
    // console.log(jsonObj);
    
}


/* result JSON to server
{
   "hand": {
      "lm": 0.25,
      "c1": "Ac",
      "c2": "6h",
      "c3": "Kd",
      "c4": "Js"
   },
   "players": [
      {
         "name": "mammoth",
         "position": "SB",
         "stack": 25.15,
         "bet": 0.1,
         "hole1": "Ah",
         "hole2": "Kc"
      },
      {
         "name": "checkmateN1",
         "position": "BB",
         "stack": 37.25,
         "bet": 0.25
      },
      {
         "name": "gulyaka",
         "position": "MP2",
         "stack": 27,
         "bet": 0
      },
      {
         "name": "zlo-Mishka",
         "position": "MP3",
         "stack": 32,
         "bet": 0
      },
      {
         "name": "3D action",
         "position": "CO",
         "stack": 45.37,
         "bet": 0
      },
      {
         "name": "joooe84",
         "position": "BTN",
         "stack": 60,
         "bet": 0.75
      }
   ],
   "actions": {
      "preflop": [
         {
            "act_num": 1,
            "player": "gulyaka",
            "balance": 27,
            "action": "fold",
            "pot": 0.35
         },
         {
            "act_num": 2,
            "player": "zlo-Mishka",
            "balance": 32,
            "action": "fold",
            "pot": 0.35
         },
         {
            "act_num": 3,
            "player": "3D action",
            "balance": 45.37,
            "action": "fold",
            "pot": 0.35
         },
         {
            "act_num": 4,
            "player": "joooe84",
            "balance": 60,
            "action": "raise",
            "pot": 0.35,
            "amount": 0.75
         },
         {
            "act_num": 5,
            "player": "mammoth",
            "balance": 25.05,
            "action": "call",
            "pot": 1.1,
            "amount": 0.75
         },
         {
            "act_num": 6,
            "player": "checkmateN1",
            "balance": 37,
            "action": "call",
            "pot": 1.75,
            "amount": 0.75
         }
      ],
      "flop": [
         {
            "act_num": 7,
            "player": "mammoth",
            "balance": 24.4,
            "action": "check",
            "pot": 2.25
         },
         {
            "act_num": 8,
            "player": "checkmateN1",
            "balance": 36.5,
            "action": "check",
            "pot": 2.25
         },
         {
            "act_num": 9,
            "player": "joooe84",
            "balance": 59.25,
            "action": "bet",
            "pot": 2.25,
            "amount": 1.6
         },
         {
            "act_num": 10,
            "player": "mammoth",
            "balance": 24.4,
            "action": "call",
            "pot": 3.85,
            "amount": 1.6
         },
         {
            "act_num": 11,
            "player": "checkmateN1",
            "balance": 36.5,
            "action": "call",
            "pot": 5.45,
            "amount": 1.6
         }
      ],
      "turn": [
         {
            "act_num": 12,
            "player": "mammoth",
            "balance": 22.8,
            "action": "bet",
            "pot": 7.05,
            "amount": 4
         },
         {
            "act_num": 13,
            "player": "checkmateN1",
            "balance": 34.9,
            "action": "raise",
            "pot": 11.05,
            "amount": 34.9
         },
         {
            "act_num": 14,
            "player": "joooe84",
            "balance": 57.65,
            "action": "raise",
            "pot": 45.95,
            "amount": 57.65
         }
      ]
   },
   "request": {
      "type": "strategy",
      "street": "turn",
      "act_num": 1
   }
}

 */