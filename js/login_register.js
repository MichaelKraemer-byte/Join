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
        alert('Login succesfull');
        setCurrentUser(data);
        window.location.href = 'board.html';
        if (rememberMe) {
            setEmailToLocalstorage(email);
        } else { removeEmailFromLocalstorage() }
    } else { alert('Login failed!') }
}

function setCurrentUser(data){
    user = {
        name: data[indexOfEmail].name,
        email: data[indexOfEmail].email,
        color: data[indexOfEmail].color,
    }
}

function checkEmailInDB(data, email) {
    indexOfEmail = data.findIndex(element => element['email'] == email);
    return true
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
        const password = data[indexOfEmail]['passwort'];

        document.getElementById('login-email').value = email;
        document.getElementById('login-password').value = password;
        document.getElementById('login-rememberme').checked = true;
    }
}

async function register() {
    const name = document.getElementById('register-name').value
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const passwordCheck = document.getElementById('register-password-check').value;

    if (password == passwordCheck) {
        postData('/users',
            {
                'name': name,
                'email': email,
                'password': password,
                'color': randomContactColor(),
            }
        );
        showLoginBox();
    } else {
        alert('Passwort stimmt nicht überein!');
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