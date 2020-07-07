//обработка событий главного меню навигации
var mephisto_links = $(".navigation-menu li:not(:last-child) a");
var pages = $(".pages");
var left_navigation = $(".left-navigation");
var navigationMenu = $("#nav-3 li");

const descWidth = 1260;
const mobWidth = 720;

navigationListener();
function navigationListener() {
    mephisto_links.on("click", function (e) {
        let width = $(window).width();
        let height = $(window).height();

        let elNode= e.target; // nodeType == 1
        let selectedPage = $("#" + elNode.textContent + "-html");


        if (width < descWidth && elNode.textContent === 'simulator') {
            let width_modal = width/2 - 100 + 'px';
            $('#modal-simulator-warning').css({left: width_modal});
            $('#modal-simulator-warning').removeClass('hidden');
            setTimeout(function () {
                $('#modal-simulator-warning').addClass('hidden');
            }, 5000);
            if (width <= mobWidth) {
                $("#main-navigation").addClass('hidden');
                $("#main-navigation").removeClass("mobile");
                $("#main-navigation").removeClass("appear-navigation");
                $(".user-login").removeClass("hidden");
                $(".link-void").removeClass("hidden");
            }
            return false;
        }

        if (width <= mobWidth) {
            pages.css({left: 0, top: '60px'});
        } else {pages.css({left: '340px', top: 0});}
        pages.addClass("hidden");
        pages.removeClass("text-pages-appear");
        left_navigation.addClass("hidden");
        left_navigation.removeClass("left-navigation-appear");
        if (width > mobWidth) {left_navigation.addClass("left-navigation-appear");}
        left_navigation.empty();
        navigationMenu.removeClass("nav-active");
        selectedPage.removeClass("hidden");
        if (width > mobWidth && elNode.textContent !== 'simulator') {selectedPage.addClass("text-pages-appear");}
        if (elNode.textContent !== 'simulator') {
            if (elNode.textContent === 'mephisto') {
                left_navigation.css("background-color", "#3578d0");
                let text = $("<h2>Особенности ИИ Mephisto:</h2>\n" +
                    "                <ul>\n" +
                    "                    <li>- Высокая скорость симуляций</li>\n" +
                    "                    <li>- Точность модели оппонента в любой ситуации</li>\n" +
                    "                    <li>- Рассчет EV в реальном времени на любой улице</li>\n" +
                    "                    <li>- Любое количество игроков за столом</li>\n" +
                    "                    <li>- Любые сайзинги ставок</li>\n" +
                    "                    <li>- Расчет равновесия Нэша с флопа в реальном времени</li>\n" +
                    "                </ul>");
                left_navigation.append(text);
            } else if (elNode.textContent === 'neuromodeling') {
                left_navigation.css("background-color", "#8c2eac");
                let text = $("<h2>Средства разработки:</h2>\n" +
                    "                <ul>\n" +
                    "                    <li>- C++</li>\n" +
                    "                    <li>- Oracle</li>\n" +
                    "                    <li>- Python</li>\n" +
                    "                    <li>- CNTK</li>\n" +
                    "                    <li>- Sparse autoencoder</li>\n" +
                    "                    <li>- Deep belief networks</li>\n" +
                    "                    <li>- Hopfield network</li>\n" +
                    "                </ul>");
                left_navigation.append(text);
            } else if (elNode.textContent === 'manual') {
                left_navigation.css("background-color", "#47ac1b");
                let text = $("<h2>Основные возможности:</h2>\n" +
                    "                <p>- Загрузка истории раздач</p>\n" +
                    "                <p>- Вычисление EV</p>\n" +
                    "                <p>- Отображение стратегии</p>\n" +
                    "                <p>- Отображение спектров</p>\n" +
                    "                <p>- Отображение вероятности действий</p>\n" +
                    "                <p>- Режим обучения</p>\n" +
                    "                <p>- Тестирование</p>\n" +
                    "                <p>- Расчет равновесия Нэша</p>\n" +
                    "                <p>- Обработка 100 000 сыгранных игроком рук с выводом ошибочных ходов</p>");
                left_navigation.append(text);
            } else if (elNode.textContent === 'buy') {
                left_navigation.css("background-color", "#492cac"); //#ac3935
                let text = $("<h2>Особенности тренировок:</h2>\n" +
                    "                <ul>\n" +
                    "                    <li>- Опыт тренировки с реальными оппонентами из покер румов</li>\n" +
                    "                    <li>- Тренировка по реальным раздачам</li>\n" +
                    "                    <li>- Работа над слабыми местами в вашей игре</li>\n" +
                    "                    <li>- Глубокое понимание адаптации после тренировок</li>\n" +
                    "                    <li>- Ощутимая практическая польза, в отличие от чисто равновесных программ</li>\n" +
                    "                    <li>- Образцовая player-ориентированная игра от ИИ Mephisto</li>\n" +
                    "                    <li>- Загрузка вашей раздачи в один клик</li>\n" +
                    "                    <li>- Получение результатов анализа за 15секунд</li>\n" +
                    "                </ul>");
                left_navigation.append(text);
            } else if (elNode.textContent === 'contacts') {
                left_navigation.css("background-color", "#319fcb");
                let text = $("<h2>Будем рады:</h2>\n" +
                    "                <ul>\n" +
                    "                    <li>- Услышать отзывы</li>\n" +
                    "                    <li>- Прочитать пожелания</li>\n" +
                    "                    <li>- Рассмотреть предложения по сотрудничеству</li>\n" +
                    "                </ul>");
                left_navigation.append(text);
            }
            if (width > mobWidth) {
                left_navigation.removeClass("hidden");
                left_navigation.addClass("left-navigation-appear");
            } else {
                $("#main-navigation").addClass('hidden');
                $("#main-navigation").removeClass("mobile");
                $("#main-navigation").removeClass("appear-navigation");
                $(".user-login").removeClass("hidden");
                $(".link-void").removeClass("hidden");
            }
        } else if (width >= descWidth) {
            pages.css({left: 0, top: 0});
        }
        elNode.parentNode.classList.add("nav-active");
    });
}

var scriptsDesctopLoaded = false;
var scriptsTabletLoaded = false;

function addScript(src){
    var script = document.createElement('script');
    script.src = src;
    script.async = false;
    document.head.appendChild(script);
}


function loadScriptsDesctop() {
    if (scriptsDesctopLoaded === true) {return false;}
    addScript('js/d3.min.js');
    addScript('js/moment.min.js');
    addScript('js/config/server.js');
    addScript('js/simulator/socket.js');
    addScript('js/simulator/createAllCombinationsArr.js');
    addScript('js/simulator/cards.js');
    addScript('js/simulator/playersValidation.js');
    addScript('js/simulator/rulesValidation.js');
    addScript('js/simulator/moves.js');
    addScript('js/simulator/actions.js');
    addScript('js/simulator/windowValidation.js');
    addScript('js/simulator/probabEVinfo.js');
    addScript('js/simulator/network.js');
    addScript('js/simulator/restartListener.js');
    addScript('js/simulator/uploadWindow.js');
    addScript('js/simulator/getCombination.js');
    addScript('js/simulator/randomButtonClick.js');
    addScript('js/simulator/selectGeneration.js');
    addScript('js/simulator/getStrategyFromNetwork.js');
    addScript('js/login.js');

    scriptsDesctopLoaded = true;
}

function loadScriptTablet() {
    if (scriptsTabletLoaded === true) {return false;}
    addScript('js/jquery.mCustomScrollbar.concat.min.js');

    $(window).on("load",function(){
        $("#content-m").mCustomScrollbar({theme:"minimal"});
        $(".pages.not-simulator").mCustomScrollbar({theme:"minimal"});
    });

    scriptsTabletLoaded = true;

}

function setMephistoPageActive() {
    pages.addClass("hidden");
    pages.removeClass("text-pages-appear");
    left_navigation.addClass("hidden");
    left_navigation.removeClass("left-navigation-appear");
    left_navigation.addClass("left-navigation-appear");
    left_navigation.empty();
    navigationMenu.removeClass("nav-active");
    let selectedPage = $("#mephisto-html");
    selectedPage.removeClass("hidden");
    let width = $(window).width();

    if (width > mobWidth) {
        selectedPage.addClass("text-pages-appear");
    }


    left_navigation.css("background-color", "#3578d0");
    let text = $("<h2>Особенности ИИ Mephisto:</h2>\n" +
        "                <ul>\n" +
        "                    <li>- Высокая скорость симуляций</li>\n" +
        "                    <li>- Точность модели оппонента в любой ситуации</li>\n" +
        "                    <li>- Рассчет EV в реальном времени на любой улице</li>\n" +
        "                    <li>- Любое количество игроков за столом</li>\n" +
        "                    <li>- Любые сайзинги ставок</li>\n" +
        "                    <li>- Расчет равновесия Нэша с флопа в реальном времени</li>\n" +
        "                </ul>");
    left_navigation.append(text);
    left_navigation.removeClass("hidden");
    left_navigation.addClass("left-navigation-appear");
    document.getElementById('mephisto-link').parentNode.classList.add("nav-active");
}

if ($(window).width() >= descWidth) {
    $('#simulator-html').removeClass('hidden');
    let width = $(window).width();
    let height = $(window).height();

    loadScriptsDesctop();
    loadScriptTablet();
    $(".mmenu").addClass('hidden');
    $(".pages.not-simulator").height(height - 100 + "px");
    $("body").height(height + "px");
    // ("footer h4").css({top: - 0.1 * height + 'px'});
} else if ($(window).width() >= mobWidth && $(window).height() > 460) {
    loadScriptTablet();
    setMephistoPageActive();
    let width = $(window).width();
    let height = $(window).height();
    $(".pages.not-simulator").width(width - 390 < 900 ? width - 400 + "px" : 900 + "px");
    $(".pages.not-simulator").height(height - 100 + "px");
    $("body").height(height + "px");
} else if ($(window).width() >= mobWidth) {
    setMephistoPageActive();
    let width = $(window).width();
    let height = $(window).height();
    left_navigation.addClass("hidden");
    left_navigation.removeClass("left-navigation-appear");
    $(".pages.not-simulator").width((width - 60) + "px");
    $(".pages.not-simulator").height(height - 100 + "px");
    pages.css({left: 0, top: '60px'});
    $("body").height(height + "px");
} else {
    $("body").css({position: 'fixed'});
    let width = $(window).width();
    let height = $(window).height();
    setMephistoPageActive();
    left_navigation.addClass("hidden");
    left_navigation.removeClass("left-navigation-appear");
    $(".pages.not-simulator").width((width - 60) + "px");
    $(".pages.not-simulator").height(height - 100 + "px");
    $(".pages.not-simulator").css({'padding-right': 0, 'margin-left': '10px'});
    $("body").height(height + "px");
    pages.css({left: 0, top: '60px'});
    $(".navigation-menu").addClass('hidden');
    $(".mmenu").removeClass('hidden');
    pages.addClass("hidden");
    pages.removeClass("text-pages-appear");
    setTimeout(function () {
        $("#mephisto-html").removeClass("hidden");
    }, 1000);
    $(".price-wrapper").addClass("space-around");
    $(".futures-wrapper").addClass("space-around");
}

var onresize = function(e) {
    var width = $(window).width();
    var height = $(window).height();

    $(".price-wrapper").removeClass("space-around");
    $(".futures-wrapper").removeClass("space-around");

    if (width >= descWidth) {
        $("body").css({position: 'relative'});
        $(".pages.not-simulator").css({'padding-right': '20px', 'margin-left': '30px'});
        $("#main-navigation").removeClass("mobile");
        $("#main-navigation").removeClass("hidden");
        $(".user-login").removeClass("hidden");
        $(".link-void").removeClass("hidden");
        $(".mmenu").addClass('hidden');
        loadScriptsDesctop();
        loadScriptTablet();
        if (scriptsTabletLoaded) {
            $("#content-m").mCustomScrollbar({theme:"minimal"});
            $(".pages.not-simulator").mCustomScrollbar({theme:"minimal"});
        }
        pages.addClass("hidden");
        pages.removeClass("text-pages-appear");
        left_navigation.addClass("hidden");
        left_navigation.removeClass("left-navigation-appear");
        left_navigation.addClass("left-navigation-appear");
        left_navigation.empty();
        navigationMenu.removeClass("nav-active");
        $("#simulator-html").removeClass("hidden");
        document.getElementById('simulator-link').parentNode.classList.add("nav-active");
        $(".pages.not-simulator").width(width - 390 < 900 ? width - 400 + "px" : 900 + "px");
        $(".pages.not-simulator").height(height - 100 + "px");
        pages.css({left: 0, top: 0});
        return false;
    } else if (!document.getElementById('simulator-html').classList.contains("hidden")) {
        setMephistoPageActive();
        $(".pages.not-simulator").width(width - 390 < 900 ? width - 400 + "px" : 900 + "px");
        $(".pages.not-simulator").height(height - 100 + "px");
        $("body").height(height + "px");
    }

    if (width >= mobWidth && $(window).height() > 460) {
        $("body").css({position: 'relative'});
        $(".pages.not-simulator").css({'padding-right': '20px', 'margin-left': '30px'});
        loadScriptTablet();
        if (scriptsTabletLoaded) {
            $("#content-m").mCustomScrollbar({theme:"minimal"});
            $(".pages.not-simulator").mCustomScrollbar({theme:"minimal"});
        }
        $("#main-navigation").removeClass("mobile");
        $(".user-login").removeClass("hidden");
        $(".link-void").removeClass("hidden");
        pages.css({left: '340px', top: '0px'});
        $(".pages.not-simulator").width(width - 390 < 900 ? width - 400 + "px" : 900 + "px");
        $(".pages.not-simulator").height(height - 100 + "px");
        $("body").height(height + "px");
        left_navigation.addClass("left-navigation-appear");
        left_navigation.removeClass("hidden");
        left_navigation.addClass("left-navigation-appear");
        $(".navigation-menu").removeClass("hidden");
        $(".mmenu").addClass('hidden');
        return false;
    } else {
        $("#content-m").mCustomScrollbar("destroy");
        $(".pages.not-simulator").mCustomScrollbar("destroy");
    }

    if (width < mobWidth) {
        $("body").css({position: 'fixed'});
        $(".pages.not-simulator").css({'padding-right': 0, 'margin-left': '10px'});
        left_navigation.addClass("hidden");
        left_navigation.removeClass("left-navigation-appear");
        $(".pages.not-simulator").width((width - 60) + "px");
        $(".pages.not-simulator").height(height - 100 + "px");
        $("body").height(height + "px");
        pages.css({left: 0, top: '60px'});
        $(".navigation-menu").addClass('hidden');
        $(".mmenu").removeClass('hidden');
    } else {
        $(".pages.not-simulator").css({'padding-right': '20px', 'margin-left': '30px'});
        $("#main-navigation").removeClass("mobile");
        //$(".user-login").removeClass("hidden");
        //$(".link-void").removeClass("hidden");
        pages.css({left: '340px', top: '0px'});
        $(".pages.not-simulator").width(width - 390 < 900 ? width - 400 + "px" : 900 + "px");
        $(".pages.not-simulator").height(height - 100 + "px");
        $("body").height(height + "px");
        left_navigation.removeClass("hidden");
        left_navigation.addClass("left-navigation-appear");
        $(".navigation-menu").removeClass("hidden");
        $(".mmenu").addClass('hidden');
    }

    if (width < mobWidth ) {
        $(".price-wrapper").addClass("space-around");
        $(".futures-wrapper").addClass("space-around");
    }
};
window.addEventListener("resize", onresize);

var mql = window.matchMedia("(orientation: portrait)");

// Прослушка события изменения ориентации
mql.addListener(function(m) {
    var width = $(window).width();
    var height = $(window).height();

    if(m.matches) {
        // Изменено на портретный режим
        left_navigation.addClass("hidden");
        left_navigation.removeClass("left-navigation-appear");
        $(".pages.not-simulator").width(width + "px");
        $(".pages.not-simulator").height(height - 100 + "px");
        $("body").height(height + "px");
        pages.css({left: 0, top: '60px'});
        $(".navigation-menu").addClass('hidden');
        $(".mmenu").removeClass('hidden');
        $("body").css({position: 'fixed'});
    }
    else {
        // Изменено на горизонтальный режим
        $("#main-navigation").removeClass("mobile");
        $(".user-login").removeClass("hidden");
        $(".link-void").removeClass("hidden");
        pages.css({left: '340px', top: '0px'});
        $(".pages.not-simulator").width(width - 390 < 900 ? width - 440 + "px" : 900 + "px");
        $(".pages.not-simulator").height(height + "px");
        $("body").height(height + "px");
        $("body").css({position: 'relative'});
        left_navigation.removeClass("left-navigation-appear");
        left_navigation.removeClass("hidden");
        left_navigation.addClass("left-navigation-appear");
        $(".navigation-menu").removeClass("hidden");
        $(".mmenu").addClass('hidden');
    }
});

$('.mmenu').on("click", function (e) {
    if (document.getElementById('main-navigation').classList.contains("hidden")) {
        $("#main-navigation").removeClass("hidden");
        $(".user-login").addClass("hidden");
        $(".link-void").addClass("hidden");
        $("#main-navigation").addClass("mobile");
        $("#main-navigation").addClass("appear-navigation");
    } else {
        $("#main-navigation").addClass('hidden');
        $("#main-navigation").removeClass("mobile");
        $("#main-navigation").removeClass("appear-navigation");
        $(".user-login").removeClass("hidden");
        $(".link-void").removeClass("hidden");
    }
});

document.addEventListener('click', (e) => {
    let target = e.target;
    if (target === document.getElementById('randomHandNumber')) {return}
    let el = document.getElementById('randomHandNumber');
    let tmp = el.innerText;
    el.innerText = '';
    el.innerText = tmp;
});

var ball = document.getElementById('draggable');

ball.onmousedown = function(e) {

    // if (e.target.id === 'remove-hill-info') {
    //     removeHillInfo();
    //     return false;
    // }
    if (e.target.id !== 'draggable') {
        return false;
    }


    var coords = getCoords(ball);
    var shiftX = e.pageX - coords.left;
    var shiftY = e.pageY - coords.top;

    document.body.appendChild(ball);
    moveAt(e);

    ball.style.zIndex = 1000; // над другими элементами

    function moveAt(e) {
        ball.style.left = e.pageX - shiftX + 'px';
        ball.style.top = e.pageY - shiftY + 'px';
    }

    document.onmousemove = function(e) {
        moveAt(e);
    };

    ball.onmouseup = function() {
        //alert('mouseup');
        document.onmousemove = null;
        ball.onmouseup = null;
        restartListener();
        //return false;
    };
    document.onkeydown = function(e) {
        if(e.which == 27){
            // Close my modal window
            document.onmousemove = null;
            ball.onmouseup = null;
            //removeHillInfo();
            restartListener();
            return false;
        }
    }

};

ball.ondragstart = function() {
    return false;
};

function getCoords(elem) {   // кроме IE8-
    var box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}
