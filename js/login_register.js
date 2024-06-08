const BASE_URL = 'https://join-b0cbf-default-rtdb.europe-west1.firebasedatabase.app/';
SetRememberData();

function showSignUpBox() {
    document.getElementById('login-section').classList.replace('d-center', 'd-none');
    document.getElementById('register-section').classList.replace('d-none', 'd-center');
    document.getElementById('signup-button-area').classList.replace('signUp', 'd-none');
}

function showLoginBox() {
    document.getElementById('login-section').classList.replace('d-none', 'd-center');
    document.getElementById('register-section').classList.replace('d-center', 'd-none');
    document.getElementById('signup-button-area').classList.replace('d-none', 'signUp');
    document.getElementById('login-section').classList.remove('fade-in');
    document.getElementById('register-section').classList.remove('fade-in');
    document.getElementById('signup-button-area').classList.remove('fade-in');

}

async function loadData(path = '') {
    let response = await fetch(BASE_URL + path + '.json');
    let responseToJson = await response.json();
    return responseToJson;
}

async function postData(path = '', data = {}) {
    let response = await fetch(BASE_URL + path + '.json', {
        method: 'PUT',
        header: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    return responseToJson = await response.json();
}

async function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const rememberMe = document.getElementById('login-rememberme').checked;
    const data = await loadData('/users');
    let indexOfEmail;

    if (checkEmailInDB(data, email) && checkPasswortInDB(data, password)) {
        setCurrentUserInSessionstorage(data);
        window.location.href = './summary.html';
        if (rememberMe) {
            setEmailToLocalstorage(email);
        } else { removeEmailFromLocalstorage() }
    } else { wrongPassword('show') }
}

function guestLogin() {
    setDefaultUser();
    window.location.href = '/summary.html';
}

function setDefaultUser() {
    let defaultUser = {
        name: 'Maike Muster',
        email: 'maikemuster@gmail.com',
        password: '0123456789',
        color: '#FC71FF',
        initials: 'MM'
    }
    sessionStorage.setItem('currentUser', JSON.stringify(defaultUser));
}

function setCurrentUserInSessionstorage(data) {
    let user = {
        name: data[indexOfEmail].name,
        email: data[indexOfEmail].email,
        color: data[indexOfEmail].color,
        initials: getInitials(data[indexOfEmail]),
    }
    sessionStorage.setItem('currentUser', JSON.stringify(user));
}

function checkEmailInDB(data, email) {
    indexOfEmail = data.findIndex(element => element['email'] == email);
    if (indexOfEmail >= 0) {
        return true
    }
}

function checkPasswortInDB(data, checkPassword) {
    if (indexOfEmail >= 0) {
        if (data[indexOfEmail]['password'] == checkPassword) {
            return true;
        }
    }
}

function setEmailToLocalstorage(email, password) {
    localStorage.setItem('login-name', email);
}

function removeEmailFromLocalstorage() {
    localStorage.removeItem('login-name');
}

async function SetRememberData() {
    const email = localStorage.getItem('login-name');
    if (email !== null) {
        const data = await loadData('/users');
        const indexOfEmail = data.findIndex(element => element['email'] == email);
        const password = data[indexOfEmail]['password'];

        document.getElementById('login-email').value = email;
        document.getElementById('login-password').value = password;
        document.getElementById('login-rememberme').checked = true;
    }
}

async function register() {
    const name = document.getElementById('register-name').value
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register1-password').value;
    const passwordCheck = document.getElementById('register2-password').value;
    const listOfUser = await loadData('/users');

    if (password == passwordCheck && !checkEmailInDB(listOfUser, email)) {
        listOfUser.push(
            {
                'name': name,
                'email': email,
                'password': password,
                'color': randomContactColor(),
            }
        );
        postData('/users', listOfUser);
        signUpSuccesfullyInfoBox('show');
        setTimeout(() => { showLoginBox() }, 2000);
        setTimeout(() => { signUpSuccesfullyInfoBox('hide') }, 2000);
    } else {
        noMatchingPassword('show');
    }
}

function togglePasswordVisibility(id) {
    const passwordField = document.getElementById(id + '-password');
    const toggleIcon = document.getElementById(id + '-password-icon');
    if (passwordField.type === "password") {
        passwordField.type = "text";
        toggleIcon.src = "/assets/img/password-show.png"; // Symbol zum Verbergen
    } else {
        passwordField.type = "password";
        toggleIcon.src = "/assets/img/password-hide.png";
    }
}

function togglePasswordIcon(id) {
    const passwordField = document.getElementById(id + '-password')
    if (passwordField.value.length == 0) {
        setPasswordIconToLock(id);
    } else {
        setPasswordIconToEye(id);
    }
}

function setPasswordIconToLock(id) {
    const toggleContainer = document.getElementById(id + '-password-icon-container');
    const toggleIcon = document.getElementById(id + '-password-icon');
    toggleIcon.src = '/assets/img/lock.svg'
    toggleIcon.style.cursor = 'default';
    toggleContainer.onclick = null;
    toggleContainer.removeAttribute('onclick');
}

function setPasswordIconToEye(id) {
    const toggleContainer = document.getElementById(id + '-password-icon-container');
    const toggleIcon = document.getElementById(id + '-password-icon');
    const passwordField = document.getElementById(id + '-password');
    toggleIcon.style.cursor = 'pointer'
    toggleContainer.setAttribute('onclick', 'togglePasswordVisibility("' + id + '")');
    if (passwordField.type === 'password') {
        toggleIcon.src = "/assets/img/password-hide.png";
    } else {
        toggleIcon.src = "/assets/img/password-show.png";
    }
}

async function deleteUser(username) {
    const users = await loadData('/users');
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (user['email'] == username) {
            users.splice(i, 1);
        };
    }
    postData('/users', users);
}

function wrongPassword(val) {
    const wrongPassword = document.getElementById('wrong-password');
    const inputField = document.getElementById('login-password');
    if (val == 'show') {
        wrongPassword.style.display = 'block';
        inputField.style.borderColor = 'red';
    } else {
        wrongPassword.style.display = 'none';
        inputField.style.borderColor = '#d1d1d1';
    }
}

function noMatchingPassword(val) {
    const wrongPassword = document.getElementById('match-password');
    const inputField = document.getElementById('register2-password');
    if (val == 'show') {
        wrongPassword.style.display = 'block';
        inputField.style.borderColor = 'red';
    } else {
        wrongPassword.style.display = 'none';
        inputField.style.borderColor = '#d1d1d1';
    }
}

function signUpSuccesfullyInfoBox(val) {
    if (val == 'show') {
        document.getElementById('signup-succesfully-infobutton').style.display = 'flex'
    } else {
        document.getElementById('signup-succesfully-infobutton').style.display = 'none'
    }
}

function randomContactColor() {
    return contactColor[randomNumber(1, 14)];
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

const contactColor = {
    1: "rgb(255, 187, 44)",
    2: "rgb(255, 70, 70)",
    3: "rgb(255, 230, 44)",
    4: "rgb(195, 255, 43)",
    5: "rgb(0, 56, 255)",
    6: "rgb(255, 199, 3)",
    7: "rgb(252, 113, 255)",
    8: "rgb(255, 163, 94)",
    9: "rgb(32, 215, 194)",
    10: "rgb(6, 190, 232)",
    11: "rgb(147, 39, 255)",
    12: "rgb(110, 82, 255)",
    13: "rgb(255, 94, 179)",
    14: "rgb(255, 122, 1)",
};

function postTestData() {
    const users = [
        {
            'email': 'test1@example.de',
            'name': 'user1',
            'password': '123',
            'color': 'rgb(255, 187, 44)'
        },
        {
            'email': 'test2@example.de',
            'name': 'user2',
            'password': '123',
            'color': 'rgb(255, 70, 70)'
        },
        {
            'email': 'test3@example.de',
            'name': 'user3',
            'password': '123',
            'color': 'rgb(255, 230, 44)'
        }
    ];

    postData('/users', users);
}

function getInitials(contact) {
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

    let initials = [...contact['name'].matchAll(rgx)] || [];

    initials = (
        (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
    ).toUpperCase();

    return initials;
}
