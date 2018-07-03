var loginNavigationButton = document.getElementById("login-form");
function displayLoginForm() {
    loginNavigationButton.classList.add("visually");
    $('#bg_layer').addClass("visually");
}

var loginForm = document.getElementById("login-form");
function loginFormClose() {
    loginForm.classList.remove("visually");
    $('#bg_layer').removeClass("visually");
}