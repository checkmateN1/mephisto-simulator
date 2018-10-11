// возвращает наибольший Amount на текущей улице
function maxAmountAtCurrentStreet() {
    let currentStreet = rawActionList[rawActionList.length - 1].street;
    for (let i = rawActionList.length - 2; i > 0; i--) {
        if (rawActionList[i].street === currentStreet) {
            if (rawActionList[i].action < 3) {
                return parseFloat(rawActionList[i].amount);
            }
        } else {return parseFloat(0);}
    }
}

function maxAmountAtCurrentIndex(rawActionIndex) {
    let currentStreet = rawActionList[rawActionIndex].street;

    for (let i = rawActionIndex - 1; i >= 0; i--) {
        if (rawActionList[i].street === currentStreet) {
            if (rawActionList[i].action < 3) {
                return parseFloat(rawActionList[i].amount);
            }
        } else {return parseFloat(0);}
    }
}

//возвращает превышение над максимальной ставкой на улице
function excessSmartOverMaximum(rawActionIndex) {
    if (maxAmountAtCurrentIndex(rawActionIndex) == 0) {
        return rawActionList[rawActionIndex].amount;
    } else if (rawActionList[rawActionIndex].action < 3) {

    }
}

// возвращает минимальную возможную ставку для игрока в последней строке
function minAmount() {
    let lastAgroAmount = parseFloat(0);
    let indexLastAgro = 1000;
    let currentStreet = rawActionList[rawActionList.length - 1].street;
    for (let i = rawActionList.length - 2; i >= 0; i--) {
        if (rawActionList[i].street === currentStreet) {
            if (rawActionList[i].action < 3) { // агромув
                if (indexLastAgro > 999) {
                    lastAgroAmount = rawActionList[i].amount;
                    indexLastAgro = i;
                    continue;
                } else {return (2 * lastAgroAmount - rawActionList[i].amount);}
            }
        } else {return (2 * lastAgroAmount);}
    }
}

// был ли бет на улице с последним ходом?
function wasBet(oldActionListLength) {
    let currentStreet = rawActionList[oldActionListLength].street;
    for (let i = oldActionListLength - 1; i > 0; i--) {
        if (rawActionList[i].street === currentStreet) {
            if (rawActionList[i].action < 3) {
                return true;
            }
        } else {
            return false;
        }
    }
}