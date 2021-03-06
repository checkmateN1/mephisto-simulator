let uploadWindow = document.getElementById("upload-window");
let uploadTextArea = document.getElementById('upload-text-area');

const saveWindow = document.getElementById("save-window");
const saveFileName = document.getElementById("save-file-name");
const saveFileDescription = document.getElementById("save-file-description");

const openSetupsWindow = document.getElementById("open-setups-window");

function displayUploadWindow() {
    if (!uploadWindow.classList.contains("appear-fast")) {
        uploadTextArea.value = '';
        uploadWindow.classList.add("appear-fast");
    }
}

function removeUpload() {
    if (uploadWindow.classList.contains("appear-fast")) {
        uploadWindow.classList.remove("appear-fast");
    }
    return false;
}

function saveSetupWindow() {
    if (!saveWindow.classList.contains("appear-fast")) {
        saveFileName.value = '';
        saveFileDescription.value = '';
        saveWindow.classList.add("appear-fast");
    }
}

function saveSetup() {
    const fileName = saveFileName.value;
    const fileDescription = saveFileDescription.value;
    const data = {
        fileName,
        fileDescription,
        board: {
            c1: getCardName(checkedCards[3]),
            c2: getCardName(checkedCards[4]),
            c3: getCardName(checkedCards[5]),
            c4: getCardName(checkedCards[6]),
            c5: getCardName(checkedCards[7]),
        },
        hole1: getCardName(checkedCards[1]),
        hole2: getCardName(checkedCards[2]),
        checkedCards,
        rawActionList,
    };
    ioClient.emit('saveSetup', data);

    ioClient.on('saveSetupSuccess', data => {
        saveWindow.classList.remove("appear-fast");
    });

    ioClient.on('saveSetupError', data => {
        alert(`Error! Setup did't save!`);
    });

}

function cancelSaveSetup() {
    saveWindow.classList.remove("appear-fast");
    saveFileName.value = '';
    saveFileDescription.value = '';
}

function openSetup() {
    if (!openSetupsWindow.classList.contains("appear-fast")) {
        openSetupsWindow.classList.add("appear-fast");
    }

    ioClient.off('setupsList');
    ioClient.off('openSetupSuccess');

    ioClient.emit('openSetups');

    ioClient.on('setupsList', data => {
        console.log(data);
        if (data.length) {
            const tableData = data.map(file => {
                return {
                    fileName: file.match(/.+(?=_____)/)[0],
                    date: file.match(/(?<=_____).+(?=\.txt)/)[0],
                }
            });

            const table = document.getElementById('open-setups-list');
            while (table.getElementsByTagName('tr').length > 1) {
                table.deleteRow(1);
            }
            // tableData.sort((a,b) => moment(a.date).format('DD-MM-YYYY-HH-mm') - new Moment(b.date).format('DD-MM-YYYY-HH-mm'));
            tableData.sort((a,b) => moment(b.date, 'DD-MM-YYYY-HH-mm') - moment(a.date, 'DD-MM-YYYY-HH-mm'));
            tableData.forEach(data => {
                const tr = document.createElement("tr");  // создали строку

                const tdFileName = document.createElement("td");
                tdFileName.innerHTML = data.fileName;
                tr.appendChild(tdFileName);

                const tdFileDate = document.createElement("td");
                tdFileDate.innerHTML = data.date;
                tr.appendChild(tdFileDate);

                table.appendChild(tr);
            });

            $('#open-setups-list tr:not(:first-child)').on('click', (e) => {
                const td = e.target;
                const tr = td.parentNode;

                $('#open-setups-list tr:not(:first-child)').removeClass('active');
                tr.classList.add('active');
            });

            $('#open-setups-list tr:not(:first-child)').on('mouseover', (e) => {
                const td = e.target;
                const tr = td.parentNode;

                const downloadTimeout = setTimeout(() => {
                    ioClient.off('preOpenSetupSuccess');

                    const fileName = tr.querySelector('td:first-child').innerHTML;
                    const fileDate = tr.querySelector('td:last-child').innerHTML;

                    ioClient.emit('preOpenSetup', `${fileName}_____${fileDate}.txt`);

                    ioClient.on('preOpenSetupSuccess', fileDescription => {
                        console.log(fileDescription);

                        if (fileDescription && !tr.querySelector('div')) {
                            const div = document.createElement('div');
                            div.innerText = fileDescription;
                            tr.appendChild(div);
                        }
                    });

                }, 500);

                tr.addEventListener('mouseout', () => {
                    clearTimeout(downloadTimeout);
                    const div = tr.querySelector('div');

                    if (div) {
                        div.remove();
                    }
                });
            });

        }
    });
}

function openSelectedSetup() {
    const tr = document.querySelector('#open-setups-list tr.active');
    ioClient.off('openSetupSuccess');

    if (tr) {
        const fileName = tr.querySelector('td:first-child').innerHTML;
        const fileDate = tr.querySelector('td:last-child').innerHTML;

        ioClient.emit('openSetup', `${fileName}_____${fileDate}.txt`);

        ioClient.on('openSetupSuccess', data => {
            if (data) {
                openSetupsWindow.classList.remove("appear-fast");

                checkedCards = data.checkedCards;
                testBoard = checkedCards.slice();

                loadCardsState(testBoard);
                rawActionList = data.rawActionList;

                removeActions();
                displayActions();
                displayAddRemoveButtons();
                restartListener();
            } else {
                alert(`Error: data from server is empty!`);
            }
        })
    }
}

function cancelOpenSetups() {
    openSetupsWindow.classList.remove("appear-fast");
}

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

const sendHandHistoryRequest = () => {
    uploadWindow.classList.remove("appear-fast");
    $("#waiting-progress-bar2").addClass("appear");
    let obj = {
        hand: uploadTextArea.value,
    };
    (async () => {
        const rawResponse = await fetch(url + '/upload', {
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
            if (data.success === false) {
                alert('Hand number does not exist!');
                getRandomHand();
                return;
            }
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

restartListener();

