//заполняет информацией окно с вероятностями
function createProbabilitiesInfo() {
    document.getElementById("h4-probabilities").innerHTML = "Probab";
    return;
}

//заполняет информацией окно с вероятностями
function createEVinfo() {
    document.getElementById("h4-probabilities").innerHTML = "EV";
    return;
}

function removeHillInfo() {
    $("#draggable").removeClass("appear-fast");
    $("#draggable").hide();
    let matrix = document.getElementById("matrix");
    while (matrix.firstChild) {
        matrix.removeChild(matrix.firstChild);
    }

    removeActions();
    displayActions();
    displayAddRemoveButtons();
    restartListener();
}

function removeProbabInfo() {
    $(".probabilities-info").removeClass("appear-fast");
    removeActions();
    displayActions();
    displayAddRemoveButtons();
    restartListener();
}