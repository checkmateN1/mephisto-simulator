const doFor = (count, callback) => { var i = 0; while (i < count && callback(i++) !== true ); };
//const suitNames = "HSDC";
const suitNames = "hsdc";
const rankNames = "23456789TJQKA";
//const allPerms = "01234,01235,01236,01245,01246,01256,01345,01346,01356,01456,02345,02346,02356,02456,03456,12345,12346,12356,12456,13456,23456".split(",");
const allPerms = "01234,01235,01245,01345,02345,12345,01236,01246,01256,01346,01356,01456,02346,02356,02456,03456,12346,12356,12456,13456,23456".split(",");
const cardToString = (card) => rankNames[card & 15] + suitNames[card >> 4];
const rankingNames = "Royal flush,Straight flush,Four of a kind,Full house,Flush,Straight,Three of a kind,Two pair,Pair,Flush draw,Straight draw,HighCard".split(",");
const flushes       = /00000|11111|22222|33333/;
const flushDraw       = /0000|1111|2222|3333/;
const straights     = /01234|12345|23456|34567|45678|56789|6789a|789ab|89abc|0123c/;
const straightsDraw     = /0123|1234|2345|3456|4567|5678|6789|789a|89ab|1235c|02346|13457|24568|35679|4678a|5789b|689ac/;
const fourOfKind    = /0000|1111|2222|3333|4444|5555|6666|7777|8888|9999|aaaa|bbbb|cccc/;
const threeOfKind   = /000|111|222|333|444|555|666|777|888|999|aaa|bbb|ccc/;
const Pair     = /00|11|22|33|44|55|66|77|88|99|aa|bb|cc/;
const fullHouse     = /(000|111|222|333|444|555|666|777|888|999|aaa|bbb|ccc)(00|11|22|33|44|55|66|77|88|99|aa|bb|cc)|(00|11|22|33|44|55|66|77|88|99|aa|bb|cc)(000|111|222|333|444|555|666|777|888|999|aaa|bbb|ccc)/;
const twoPair       = /(00|11|22|33|44|55|66|77|88|99|aa|bb|cc).*(00|11|22|33|44|55|66|77|88|99|aa|bb|cc)/;
let countPerms;

//console.log(`rankingNames.indexOf('flush') = ${rankingNames.indexOf('Flush')}`);

const handEvaluator = {
    parseString(input){
        const cards = input.split(" ");
        if (cards.length === 7) {countPerms = 21} else if (cards.length === 6) {countPerms = 6} else {countPerms = 1}

        var parsedCards;
        //if (cards.length !== 7) { return "Bad input card count not 7" }
        try {
            parsedCards = cards.map(card => {
                var rank = rankNames.indexOf(card[0]); //определяем ранк
                if (rank === -1) { throw new Error(card) }
                var suit = suitNames.indexOf(card[1]); //определяем масть
                // if (suit === -1) { throw new Error(card) }
                // console.log(card)
                // console.log(rank);
                // console.log(suit);
                // console.log((suit << 4));
                // console.log(rank + (suit << 4));
                return  rank + (suit << 4);
            });
        } catch(e) { return "Bad input invalid card " + e.message }
        //console.log(parsedCards);
        try {
            parsedCards.sort((a, b) => { //сортируем карты по рангу
                // console.log(a);
                // console.log(b);
                if (a === b) { throw new Error() }
                const dif = (a & 15) - (b & 15);
                if (dif === 0) { return a - b }
                return dif;
            });
        } catch(e) {  return "Bad input duplicated card"  }
        //console.log(parsedCards);
        return parsedCards
    },
    evaluate(cardsArray){
        var suited, ranked, hand;  // holds the hex encoded 5 cards of suit only, rank only and the hand
                                   // in the original format
        var allHandsRanked = []; // to hold all combinations of 5 cards an the scores
        const tests = {  // a set of named tests that test a hand and return true if the hand matches
            royalFlush    : () => tests.flush() && tests.straight() && tests.royal(),
            straightFlush : () => tests.flush() && tests.straight(),
            kind4         : () => fourOfKind.test(ranked),
            fullHouse     : () => fullHouse.test(ranked),
            flush         : () => flushes.test(suited),
            straight      : () => straights.test(ranked),
            kind3         : () => threeOfKind.test(ranked),
            twoPair       : () => twoPair.test(ranked),
            kind2         : () => Pair.test(ranked),
            flashDraw     : () => countPerms < 21 ? flushDraw.test(suited) : false,
            straightsDraw : () => countPerms < 21 ? straightsDraw.test(ranked) : false,
            highCard      : () => true,  // always true last type checked
            royal         : () => ranked[4] === "c",  // extra test used for royal flush
        };
        const ranking = Object.values(tests); // above tests as a indexed array
        // gets index that represents one of the 21 permutations and sets
        // ranked, suited and hand to that combination
        function getPermutation(index) {
            ranked = suited = hand = "";
            doFor(5, (i) => {
                //console.log(cardsArray[allPerms[index][i]]);
                //console.log(i);
                //console.log(cardsArray[i]);
                //console.log(allPerms[index]);
                const card = cardsArray[allPerms[index][i]];
                //console.log(`ranked = ${ranked}`);
                ranked += (card & 15).toString(16);
                //console.log(`ranked = ${ranked}`);
                //console.log(`suited = ${suited}`);
                suited += (card >> 4).toString(16);
                //console.log(`suited = ${suited}`);
                //console.log(`hand = ${hand}`);
                hand += " " + cardToString(card);
                //console.log(`hand = ${hand}`);
            });
            hand = hand.substr(1);
            //console.log(suited);
            //console.log(hand);
            //console.log(typeof suited);
            suited = suited.split('').sort().join('');
            //console.log(suited);
        };
        // Rank the current hand with best score 0
        function rankHand(permutation) {
            getPermutation(permutation); // get permutation
            //console.log('countPerms = '+ countPerms);
            doFor(ranking.length, (i) => {  // test all hands from best comb to worst
                if (ranking[i]()) {  // if test ok
                    // console.log(`ranking[i]() = ${ranking[i]()}`);
                    // console.log(`rankingNames[i] = ${rankingNames[i]}`);
                    allHandsRanked.push({
                        //name : rankingNames[i], //combination name
                        name : i,  //combination index
                        //hand : hand,
                        score : i * 13 + (12-parseInt(ranked[4],16)),
                    });
                    return true;
                }
            });
        }
        doFor(countPerms, rankHand);

        return allHandsRanked
            .sort((a,b) => a.score - b.score)
            .filter((hand,i,arr)=> i === 0 ? true : hand.score === arr[i-1].score)[0].name
    }
};

//console.log(handEvaluator.evaluate(handEvaluator.parseString('2H 3H 4H 5H 6H 7H 8H'))); //Straight flash
//console.log(handEvaluator.evaluate(handEvaluator.parseString('AH TH 4S 5S 6H 7C 2H'))); //High card
//console.log(handEvaluator.evaluate(handEvaluator.parseString('2H 2S 5S 2D 7C TH 2C'))); //quad
//console.log(handEvaluator.evaluate(handEvaluator.parseString('2H 3S 4S 5D 7C TH AC')));
//console.log(handEvaluator.evaluate(handEvaluator.parseString('7H 8S 9S TD JC 2H AC')));
//console.log(handEvaluator.evaluate(handEvaluator.parseString('7H 8S 9S TD JC 2H AC'))); //Straight
//console.log(handEvaluator.evaluate(handEvaluator.parseString('2H 3S 4S 5D JC 2S KC'))); //Pair
//console.log(handEvaluator.evaluate(handEvaluator.parseString('2H 3S 4S 5D JC 2S AS'))); //Straight
//console.log(handEvaluator.evaluate(handEvaluator.parseString('2H 3S 4S 5D JC AC KS')));
//console.log(handEvaluator.evaluate(handEvaluator.parseString('5D JC 2H 4S 3S')));
// console.log(handEvaluator.evaluate(handEvaluator.parseString('2D JC 2H 4S 3S AS KH'))); //RIVER Pair
// console.log(handEvaluator.evaluate(handEvaluator.parseString('2D JC 2H 4S 3S AS'))); //TURN Pair
// console.log(handEvaluator.evaluate(handEvaluator.parseString('2D JC 2H 4S 2S AS'))); //TURN SET
// console.log(handEvaluator.evaluate(handEvaluator.parseString('2D JC 2H 4S 3S'))); //FLOP Pair
//console.log(handEvaluator.evaluate(handEvaluator.parseString('2C JC 6C 4C 3C'))); //FLOP Flash
// console.log(handEvaluator.evaluate(handEvaluator.parseString('JC JD JH JS 3C'))); //FLOP quad
//console.log(handEvaluator.evaluate(handEvaluator.parseString('2C 3C 4D 5C KC'))); //FLOP flush draw
//console.log(handEvaluator.evaluate(handEvaluator.parseString('2s 3s 4s 5c Ks'))); //FLOP flush draw
//console.log(handEvaluator.evaluate(handEvaluator.parseString('2S 3S 4D 5C KS'))); //FLOP Straight draw
//console.log(handEvaluator.evaluate(handEvaluator.parseString('3S 5S 6D 7C 9S'))); //FLOP Straight draw - double gutshot
//console.log(handEvaluator.evaluate(handEvaluator.parseString('5D JC 2H 4S 3S')));
//console.log(handEvaluator.parseString('2H 3S 4S 5D JC AS KC'));

const getCombination = (cardsArr) => handEvaluator.evaluate(handEvaluator.parseString(cardsArr));
//console.log(getCombination('2h 3h Ac 6h Kd Js'));

const cardsNames = ["2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "Th", "Jh", "Qh", "Kh", "Ah", "2c", "3c", "4c", "5c", "6c", "7c", "8c", "9c", "Tc", "Jc", "Qc", "Kc", "Ac", "2d", "3d", "4d", "5d", "6d", "7d", "8d", "9d", "Td", "Jd", "Qd", "Kd", "Ad", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "Ts", "Js", "Qs", "Ks", "As"];
var allHandsCombination = {};

//console.log(getCombination('2h 2c 3d 3s Ah Ks'));
const setCombNameToAllHands = (board) => { // board === checkedCards = [null, "12", "24", "25", "4", "37", "48", null];   ///from cards.js
    allHandsCombination = {};
    let arrWithoutBoard = cardsNames.slice();
    let boardSymbols = '';
    for (let i = 3; i < board.length; i++) {
        if (board[i] !== null) {
            boardSymbols += cardsNames[board[i]] + ' ';
            arrWithoutBoard.splice(arrWithoutBoard.indexOf(cardsNames[board[i]]), 1);
        }
    }
    //console.log(boardSymbols);
    for (let i = 0; i < arrWithoutBoard.length - 1; i++) {
        for (let j = i+1; j < arrWithoutBoard.length; j++) {
            let key;
            let hand = arrWithoutBoard[i] + ' ' + arrWithoutBoard[j];

            if (rankNames.indexOf(arrWithoutBoard[i].substr(0,1)) > rankNames.indexOf(arrWithoutBoard[j].substr(0,1))) {
                key = (arrWithoutBoard[i] + arrWithoutBoard[j]);
            } else if (rankNames.indexOf(arrWithoutBoard[i].substr(0,1)) === rankNames.indexOf(arrWithoutBoard[j].substr(0,1))) {
                key = (arrWithoutBoard[i] + arrWithoutBoard[j]);
                keyReverse = (arrWithoutBoard[j] + arrWithoutBoard[i]);
                allHandsCombination[keyReverse] = getCombination(boardSymbols + hand);
            } else {key = (arrWithoutBoard[j] + arrWithoutBoard[i]);}

            //console.log(getCombination(boardSymbols + hand));
            allHandsCombination[key] = getCombination(boardSymbols + hand);
        }
    }
    //console.log(`allHandsCombination = ${allHandsCombination}`);
    //console.log(`allHandsCombination['AhKs'] = ${allHandsCombination['AhKs']}`);
};

var testStrategy = {
    allHands: [
        {
            hand: 'AhKh',
            moves: {
                "1.3": {strategy: 0.24, ev: 0.8},
                "1": {strategy: 0.26, ev: 1},
                "0.5": {strategy: 0.1, ev: 0.55},
                "0": {strategy: 0.25, ev: 0.3},
                "-1": {strategy: 0.15}
            },
            weight: 0.67,
            preflopWeight: 0.97,
            combination: "A high"
        },
        {
            hand: 'AcKc',
            moves: {
                "1.3": {strategy: 0, ev: 0.8},
                "1": {strategy: 0, ev: 1},
                "0.5": {strategy: 0, ev: 0.55},
                "0": {strategy: 0, ev: 0.3},
                "-1": {strategy: 1}
            },
            weight: 0.77,
            preflopWeight: 0.97,
            combination: "A high"
        },
        {
            hand: 'AsKs',
            moves: {
                "1.3": {strategy: 0, ev: 0.8},
                "1": {strategy: 0.2, ev: 1},
                "0.5": {strategy: 0.05, ev: 0.55},
                "0": {strategy: 0.75, ev: 1.52},
                "-1": {strategy: 0}
            },
            weight: 0.55,
            preflopWeight: 0.97,
            combination: "A high"
        },
        {
            hand: 'AdKd',
            moves: {
                "1.3": {strategy: 0, ev: 0.8},
                "1": {strategy: 0.2, ev: 1},
                "0.5": {strategy: 0.05, ev: 0.55},
                "0": {strategy: 0.75, ev: 0.55},
                "-1": {strategy: 0}
            },
            weight: 0.2,
            preflopWeight: 0.97,
            combination: "A high"
        },
        {
            hand: 'AdAh',
            moves: {
                "1.3": {strategy: 0.33, ev: 1.8},
                "1": {strategy: 0.5, ev: 20.13},
                "0.5": {strategy: 0.17, ev: 1.55},
                "0": {strategy: 0, ev: 1.33},
                "-1": {strategy: 0}
            },
            weight: 1,
            preflopWeight: 0.88,
            combination: "tptk"
        },
        {
            hand: 'KsKc',
            moves: {
                "1.3": {strategy: 0.03, ev: 1.3},
                "1": {strategy: 0.1, ev: 1.66},
                "0.5": {strategy: 0.35, ev: 1.1},
                "0": {strategy: 0.52, ev: -0.27},
                "-1": {strategy: 0}
            },
            weight: 0.77,
            preflopWeight: 0.92,
            combination: "tptk"
        },
        {
            hand: 'KcKh',
            moves: {
                "1.3": {strategy: 0, ev: 1.3},
                "1": {strategy: 0, ev: 1.66},
                "0.5": {strategy: 0, ev: 1.1},
                "0": {strategy: 1, ev: 0.3},
                "-1": {strategy: 0}
            },
            weight: 0.55,
            preflopWeight: 0.92,
            combination: "tptk"
        },
        {
            hand: 'QsQc',
            moves: {
                "1.3": {strategy: 0, ev: -0.37},
                "1": {strategy: 0, ev: 1.66},
                "0.5": {strategy: 0.25, ev: 1.1},
                "0": {strategy: 0.1, ev: 0.3},
                "-1": {strategy: 0.65}
            },
            weight: 0.68,
            preflopWeight: 0.83,
            combination: "2d pair"
        },
        {
            hand: 'AsKc',
            moves: {
                "1.3": {strategy: 0.2, ev: 1.3},
                "1": {strategy: 0, ev: 1.66},
                "0.5": {strategy: 0.03, ev: 1.1},
                "0": {strategy: 0.77, ev: 0.3},
                "-1": {strategy: 0}
            },
            weight: 0.88,
            preflopWeight: 0.92,
            combination: "tptk"
        },
        {
            hand: 'AhKs',
            moves: {
                "1.3": {strategy: 0.1, ev: 1.3},
                "1": {strategy: 0, ev: 1.66},
                "0.5": {strategy: 0, ev: 1.1},
                "0": {strategy: 0.9, ev: 0.3},
                "-1": {strategy: 0}
            },
            weight: 0.88,
            preflopWeight: 0.92,
            combination: "tptk"
        },
        {
            hand: '2d2s',
            moves: {
                "1.3": {strategy: 0.1, ev: 1.3},
                "1": {strategy: 0, ev: 1.66},
                "0.5": {strategy: 0, ev: 1.1},
                "0": {strategy: 0.9, ev: 0.3},
                "-1": {strategy: 0}
            },
            weight: 0.88,
            preflopWeight: 0.92,
            combination: "tptk"
        }
    ]
};

//const cardsNames = ["2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "Th", "Jh", "Qh", "Kh", "Ah", "2c", "3c", "4c", "5c", "6c", "7c", "8c", "9c", "Tc", "Jc", "Qc", "Kc", "Ac", "2d", "3d", "4d", "5d", "6d", "7d", "8d", "9d", "Td", "Jd", "Qd", "Kd", "Ad", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "Ts", "Js", "Qs", "Ks", "As"];
//setCombNameToAllHands([null, "12", "24", "0", "13", "27", "40", null]);

const setWeightToAllCombinations = (strategy, strategyORrange) => {    //strategyORrange == 'strategy' || 0.5, 0,66, 1, etc
    //all combinations with summary weight
    let allCombinationSummaryWeight = [];

    rankingNames.forEach(() => allCombinationSummaryWeight.push(0));
    //console.log(allCombinationSummaryWeight);
    //console.log(allCombinationSummaryWeight.length);

    if (strategyORrange !== 'strategy') {
        strategy.allHands.forEach(object => {
            allCombinationSummaryWeight[allHandsCombination[object.hand]] += object.moves[strategyORrange].strategy * object.weight;
        });
    } else {
        strategy.allHands.forEach(object => {
            allCombinationSummaryWeight[allHandsCombination[object.hand]] += object.weight;
            // console.log(allCombinationSummaryWeight);
            // console.log(allHandsCombination[object.hand]);
            // console.log(object.hand);
        });
        //console.log(allHandsCombination);
    }
    //console.log(allCombinationSummaryWeight);
    //console.log(allCombinationSummaryWeight.length);
    //console.log(allCombinationSummaryWeight[12]);
    let sumWeight = 0;
    allCombinationSummaryWeight.forEach(combWeight => {sumWeight += combWeight});
    //console.log(sumWeight);
    let allCombinationsWeigth = [];
    for (let i = 0; i < rankingNames.length; i++) {
        if (allCombinationSummaryWeight[i] > 0){
            let obj = {};
            obj[rankingNames[i]] = ((allCombinationSummaryWeight[i] * 100 / sumWeight).toFixed(2) + "%");
            obj.combNumber = i;
            allCombinationsWeigth.push(obj);
        }
    }
    console.log(allCombinationsWeigth);
    return allCombinationsWeigth;
    //return allCombinationSummaryWeight;
    //console.log(`allHandsCombination = ${allHandsCombination}`);
};

    const isHandCombEqual = (hand, combIndex) => {

};

setWeightToAllCombinations(testStrategy, 'strategy');

//console.log(getCombination('2S 3S 4D 5C KS'));

