/* Used for password verification when registering for an account */

function registerOpenModal() {

    var myInput = document.getElementById("registerpsw");
    var confirmMyInput = document.getElementById("cpsw");
    var letter = document.getElementById("letter");
    var capital = document.getElementById("capital");
    var number = document.getElementById("number");
    var length = document.getElementById("length");
    var match = document.getElementById("match");

    // When the user starts to type something inside the password field
    myInput.onkeyup = function () {

        var lowerCaseLetters = /[a-z]/g; // : Fill in the regular experssion for lowerCaseLetters
        var upperCaseLetters = /[A-Z]/g; // : Fill in the regular experssion for upperCaseLetters
        var numbers = /[0-9]/g; // : Fill in the regular experssion for digits
        var minLength = 8; // : Change the minimum length to what what it needs to be in the question 

        // Validate lowercase letters
        if (myInput.value.match(lowerCaseLetters)) {
            letter.classList.remove("invalid");
            letter.classList.add("valid");
        } else {
            letter.classList.remove("valid");
            letter.classList.add("invalid");
        }

        // Validate capital letters        
        if (myInput.value.match(upperCaseLetters)) {
            capital.classList.remove("invalid");
            capital.classList.add("valid");
        } else {
            capital.classList.remove("valid");
            capital.classList.add("invalid");
        }

        // Validate numbers        
        if (myInput.value.match(numbers)) {
            number.classList.remove("invalid");
            number.classList.add("valid");
        } else {
            number.classList.remove("valid");
            number.classList.add("invalid");
        }

        // Validate length
        if (myInput.value.length >= minLength) {
            length.classList.remove("invalid");
            length.classList.add("valid");
        } else {
            length.classList.remove("valid");
            length.classList.add("invalid");
        }
    }

    // Check if the values in the password and confirm password fields match
    confirmMyInput.onkeyup = function () {
        // Validate password and confirmPassword
        var passEqualsConfPass = (myInput.value == confirmMyInput.value);
        if (passEqualsConfPass) {
            match.classList.remove("invalid");
            match.classList.add("valid");
        } else {
            match.classList.remove("valid");
            match.classList.add("invalid");
        }

        // Disable or Enable the button based on the elements in classList
        enableRegisterButton(letter, capital, number, length, match);
    }
}

function enableRegisterButton(letter, capital, number, length, match) {
    var button = document.getElementById('register_submit_button');

    // condition=true when all requirements are met
    var condition = (letter.classList.contains("valid") && capital.classList.contains("valid") && number.classList.contains("valid") && length.classList.contains("valid") && match.classList.contains("valid"));
    if (condition) {
        button.disabled = false;
    }
}

function loginOpenModal() {
    const emailField = document.getElementById("login-email");
    const passwordField = document.getElementById("login-psw");
    const loginButton = document.getElementById("login_submit_button");

    emailField.onkeyup = function () {
        if (emailField.value.length > 0 && passwordField.value.length > 0) {
            loginButton.disabled = false;
        } else {
            loginButton.disabled = true;
        }
    }

    passwordField.onkeyup = function () {
        if (emailField.value.length > 0 && passwordField.value.length > 0) {
            loginButton.disabled = false;
        } else {
            loginButton.disabled = true;
        }
    }
}