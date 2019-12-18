// функция перезагружающая listener
function restartListener() {
    tdAmount.off();
    tdAmount = $(".all-info-table.postflop td:nth-child(5), .all-info-table.preflop td:nth-child(6)");
    tdAmount.on('click', amountClick);

    tdAction.off();
    tdAction = $(".all-info-table.postflop td:nth-child(3), .all-info-table.preflop td:nth-child(4)");
    tdAction.on('click', actionClick);

    tdPlayerStats.off();
    tdPlayerStats = $(".all-info-table td:nth-child(1)");
    tdPlayerStats.on('contextmenu', displayStats);

    PlayerStatsInStrategy.off();
    PlayerStatsInStrategy = $("#h4id");
    PlayerStatsInStrategy.on('contextmenu', displayStats);

    tdActionMenu.off();
    tdActionMenu = $(".all-info-table.postflop td:nth-child(3), .all-info-table.preflop td:nth-child(4)");
    tdActionMenu.on('contextmenu', actionMenu);

    tdPlayer2.off();
    tdPlayer2 = $(".all-info-table td:nth-child(1)");
    tdPlayer2.on('click', selectPlayer);


    $('#nickname-input').off();
    $('#nickname-input').on('keyup', playerSearch);
    $('#list').off('change');
    $('#list').change(playerSearchSelectedList);
    $('#list option').off();
    $('#list option').on('dblclick', setNewPlayer);
}