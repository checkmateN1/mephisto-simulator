function getValidXCoordinates(x) {
    //alert("x = " + x);
    let width = 447;
    let xOffset = 55;
    let needWidth = x + width + xOffset;
    if ($(window).width() - needWidth > 0) {
        return xOffset;
    } else {
        return ($(window).width() - x - width - 10);
    }
}

function getValidYCoordinates(y) {
    //alert("x = " + x);
    let height = 315;
    let yOffset = 13;
    let needHeight = y + height + yOffset;
    if ($(window).height() - needHeight > 0) {
        return yOffset;
    } else {
        return ($(window).height() - y - height -15);
    }
}