const doFor = (count, callback) => { var i = 0; while (i < count && callback(i++) !== true ); };
const suitNames = "HSDC";
const rankNames = "23456789TJQKA";
//const allPerms = "01234,01235,01236,01245,01246,01256,01345,01346,01356,01456,02345,02346,02356,02456,03456,12345,12346,12356,12456,13456,23456".split(",");
const allPerms = "01234,01235,01245,01345,02345,12345,01236,01246,01256,01346,01356,01456,02346,02356,02456,03456,12346,12356,12456,13456,23456".split(",");
const cardToString = (card) => rankNames[card & 15] + suitNames[card >> 4];
const rankingNames = "Royal flush,Straight flush,Four of a kind,Full house,Flush,Straight,Three of a kind,Two pair,Pair,Flash draw,HighCard".split(",");
const flushes       = /00000|11111|22222|33333/;
const flashDraw       = /0000|1111|2222|3333/;
const straights     = /01234|12345|23456|34567|45678|56789|6789a|789ab|89abc|0123c/;
const fourOfKind    = /0000|1111|2222|3333|4444|5555|6666|7777|8888|9999|aaaa|bbbb|cccc/;
const threeOfKind   = /000|111|222|333|444|555|666|777|888|999|aaa|bbb|ccc/;
const Pair     = /00|11|22|33|44|55|66|77|88|99|aa|bb|cc/;
const fullHouse     = /(000|111|222|333|444|555|666|777|888|999|aaa|bbb|ccc)(00|11|22|33|44|55|66|77|88|99|aa|bb|cc)|(00|11|22|33|44|55|66|77|88|99|aa|bb|cc)(000|111|222|333|444|555|666|777|888|999|aaa|bbb|ccc)/;
const twoPair       = /(00|11|22|33|44|55|66|77|88|99|aa|bb|cc).*(00|11|22|33|44|55|66|77|88|99|aa|bb|cc)/;
let countPerms;

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
            flashDraw     : () => flashDraw.test(suited),
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
                console.log(`ranked = ${ranked}`);
                ranked += (card & 15).toString(16);
                console.log(`ranked = ${ranked}`);
                console.log(`suited = ${suited}`);
                suited += (card >> 4).toString(16);
                console.log(`suited = ${suited}`);
                console.log(`hand = ${hand}`);
                hand += " " + cardToString(card);
                console.log(`hand = ${hand}`);
            });
            hand = hand.substr(1);
            //console.log(hand);
        };
        // Rank the current hand with best score 0
        function rankHand(permutation) {
            getPermutation(permutation); // get permutation
            //console.log('countPerms = '+ countPerms);
            doFor(ranking.length, (i) => {  // test all hands from best comb to worst
                if (ranking[i]()) {  // if test ok
                    console.log(`ranking[i]() = ${ranking[i]()}`);
                    console.log(`rankingNames[i] = ${rankingNames[i]}`);
                    allHandsRanked.push({
                        name : rankingNames[i],
                        hand : hand,
                        score : i * 13 + (12-parseInt(ranked[4],16)),
                    });
                    return true;
                }
            });
        }
        doFor(countPerms, rankHand);

        return allHandsRanked
            .sort((a,b) => a.score - b.score)
            .filter((hand,i,arr)=> i === 0 ? true : hand.score === arr[i-1].score)[0]
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
// console.log(handEvaluator.evaluate(handEvaluator.parseString('2C JC 6C 4C 3C'))); //FLOP Flash
// console.log(handEvaluator.evaluate(handEvaluator.parseString('JC JD JH JS 3C'))); //FLOP quad
console.log(handEvaluator.evaluate(handEvaluator.parseString('2C 3C 4D 5C AC'))); //FLOP quad
//console.log(handEvaluator.evaluate(handEvaluator.parseString('5D JC 2H 4S 3S')));
//console.log(handEvaluator.parseString('2H 3S 4S 5D JC AS KC'));
