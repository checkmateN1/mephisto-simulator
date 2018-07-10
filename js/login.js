let loginNavigationButton = document.getElementById("login-form");
let login = document.querySelector('#login-form input[type="email"]');
let pass = document.querySelector('#login-form input[type="password"]');
let submit = document.querySelector('#login-form input[type="submit"]');
let navigationLogin = document.querySelector('#user-login');

let userName = null;
let password = null;

function displayLoginForm() {
    loginNavigationButton.classList.add("visually");
    $('#bg_layer').addClass("visually");
}

if (localStorage.getItem('userName')) {
    navigationLogin.classList.add('no-after');
    navigationLogin.innerHTML = localStorage.getItem('userName');
    userName = localStorage.getItem('userName');
    password = localStorage.getItem('password');
}

let loginForm = document.getElementById("login-form");
function loginFormClose() {
    loginForm.classList.remove("visually");
    $('#bg_layer').removeClass("visually");
}

submit.addEventListener("click", function () {
    //event.preventDefault();
    if (login.value && pass.value && login.value !== 'Email Address') {
        userName = login.value;
        password = pass.value;
        localStorage.setItem('userName', userName);
        localStorage.setItem('password', password);

        navigationLogin.classList.add('no-after');
        navigationLogin.innerHTML = userName;
        loginNavigationButton.classList.remove("visually");
        $('#bg_layer').removeClass("visually");
    } else {
        alert('Введите пожалуйста адрес своей электронной почты и пароль');
    }
});





