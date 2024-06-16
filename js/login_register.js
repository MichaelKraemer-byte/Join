const BASE_URL = 'https://join-b0cbf-default-rtdb.europe-west1.firebasedatabase.app/';
SetRememberData();
checkIsUserLoginFromLastSession();

/**
 * this function is used to show the signUp and to hide the login
 */
function showSignUpBox() {
    document.getElementById('login-section').classList.replace('d-center', 'd-none');
    document.getElementById('register-section').classList.replace('d-none', 'd-center');
    document.getElementById('signup-button-area').classList.replace('signUp', 'd-none');
    document.getElementById('signUp-mobile-section').classList.replace('signUp-mobile', 'd-none');
}

/**
 * this function is used to show the login and to hide the signup
 */

function showLoginBox() {
    document.getElementById('login-section').classList.replace('d-none', 'd-center');
    document.getElementById('register-section').classList.replace('d-center', 'd-none');
    document.getElementById('signup-button-area').classList.replace('d-none', 'signUp');
    document.getElementById('signUp-mobile-section').classList.replace('d-none','signUp-mobile');
    document.getElementById('login-section').classList.remove('fade-in');
    document.getElementById('register-section').classList.remove('fade-in');
    document.getElementById('signup-button-area').classList.remove('fade-in');
    document.getElementById('signup-button-area-mobile').classList.remove('fade-in');
}

/**
 * This function is used to check if the user has logged out in the last session and then redirect him to the login page or to the summery
 */

function checkIsUserLoginFromLastSession() {
    let localstorage = localStorage.getItem('currentUser');
    if (localstorage != null) {
        window.location.href = './summary.html';
    }
}

/**
 * this function is used to load data from the databank
 * 
 * @param {string} path this is the path from the BASE_URL
 * @returns the JSON from download
 */

async function loadData(path = '') {
    let response = await fetch(BASE_URL + path + '.json');
    let responseToJson = await response.json();
    return responseToJson;
}

/**
 * this function is used to upload data to the databank
 * 
 * @param {string} path this is the path from the BASE_URL
 * @param {*} data the data that you want to upload
 * @returns 
 */

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

/**
 * this function is used for the login
 */

async function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const rememberMe = document.getElementById('login-rememberme').checked;
    const data = await loadData('/users');
    let indexOfEmail;

    if (checkEmailInDB(data, email) && checkPasswortInDB(data, password)) {
        setCurrentUserInLocalStorage(data);
        window.location.href = './summary.html';
        if (rememberMe) {
            setEmailToLocalstorage(email);
        } else { removeEmailFromLocalstorage() }
    } else { wrongPassword('show') }
}

/**
 * this function is used to login with the guest user
 */

function guestLogin() {
    setDefaultUser();
    window.location.href = '/summary.html';
}

/**
 * this function is used to set a default user for the guestlogin
 */
function setDefaultUser() {
    let defaultUser = {
        name: 'Gast',
        email: 'gast@join.com',
        password: '0123456789',
        color: '#FC71FF',
        initials: 'G'
    }
    localStorage.setItem('currentUser', JSON.stringify(defaultUser));
}

/**
 * this function is used to set the current user in localstorage
 * 
 * @param {*} data 
 */

function setCurrentUserInLocalStorage(data) {
    let user = {
        name: data[indexOfEmail].name,
        email: data[indexOfEmail].email,
        color: data[indexOfEmail].color,
        initials: getInitials(data[indexOfEmail]),
    }
    localStorage.setItem('currentUser', JSON.stringify(user));
}

/**
 * this function is used to check if the email already appears in the string
 * 
 * @param {*} data
 * @param {*} email
 * @returns 
 */

function checkEmailInDB(data, email) {
    indexOfEmail = data.findIndex(element => element['email'] == email);
    if (indexOfEmail >= 0) {
        return true
    }
}

/**
 * this function is used to check if the password right
 * 
 * @param {*} data 
 * @param {*} checkPassword 
 * @returns 
 */

function checkPasswortInDB(data, checkPassword) {
    if (indexOfEmail >= 0) {
        if (data[indexOfEmail]['password'] == checkPassword) {
            return true;
        }
    }
}

/**
 * this function is used to set the email to localstorage
 * 
 * @param {*} email 
 */

function setEmailToLocalstorage(email) {
    localStorage.setItem('login-name', email);
}

/**
 * this function is used to delete the email from localstorage
 */

function removeEmailFromLocalstorage() {
    localStorage.removeItem('login-name');
}

/**
 * this functios is used to get and set data from databank in the inputs from login if has the client check the remember box at last session
 */

async function SetRememberData() {
    const email = localStorage.getItem('login-name');
    if (email !== null) {
        const data = await loadData('/users');
        const indexOfEmail = data.findIndex(element => element['email'] == email);
        const password = data[indexOfEmail]['password'];
        document.getElementById('login-email').value = email;
        document.getElementById('login-password').value = password;
        document.getElementById('login-rememberme').checked = true;
        setPasswordIconToEye('login');
    }
}

/**
 * this function is used to upload the data from registration formular to the databank
 */

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

/**
 * this function is used to show or hide the password from input field
 * 
 * @param {string} id document id from the password field
 */

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

/**
 * this function is used to toggle icon in password inputfield between hide oder show icon
 * 
 * @param {*} id document id from the password field
 */

function togglePasswordIcon(id) {
    const passwordField = document.getElementById(id + '-password')
    if (passwordField.value.length == 0) {
        setPasswordIconToLock(id);
    } else {
        setPasswordIconToEye(id);
    }
}


/**
 * this function is used to set the icon from password inputfield to lock icon
 * 
 * @param {*} id document id from the password field
 */

function setPasswordIconToLock(id) {
    const toggleContainer = document.getElementById(id + '-password-icon-container');
    const toggleIcon = document.getElementById(id + '-password-icon');
    toggleIcon.src = '/assets/img/lock.svg'
    toggleIcon.style.cursor = 'default';
    toggleContainer.onclick = null;
    toggleContainer.removeAttribute('onclick');
}

/**
 * this function is used to set the icon from password inputfield to eye icon
 * 
 * @param {*} id document id from the password field - 'login' or 'register'
 */

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

/**
 * this function is used to delete a user from databank
 * 
 * @param {string} username 
 */

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

/**
 * this function is used to show the password is wrong
 * 
 * @param {string} val 'show' or 'hide' infotext
 */

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

/**
 * this function is used to show the password no matching with the first password from inputfiel
 * 
 * @param {*} val 'show' or 'hide' infotext
 */

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

/**
 * this function is used to show a box that has the info the client registration is successfull
 * 
 * @param {string} val 'show' or 'hide' the infobox
 */

function signUpSuccesfullyInfoBox(val) {
    if (val == 'show') {
        document.getElementById('signup-succesfully-infobutton').style.display = 'flex'
    } else {
        document.getElementById('signup-succesfully-infobutton').style.display = 'none'
    }
}

/**
 * this function is used to generate a random color for the new user
 * 
 * @returns the contact color
 */

function randomContactColor() {
    return contactColor[randomNumber(1, 14)];
}

/**
 * this function is used to generate a random number for the randomContactColor function
 * 
 * @param {integer} min the min value
 * @param {integer} max the max value
 * @returns a random number between min and max value
 */

/**
 * this function is used to generate random number
 * @param {integer} min min value 
 * @param {integer} max max value
 * @returns a random value between the min value and max value
 */
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

/**
 * this function is used to generate the initials from name.
 * 
 * @param {*} contact 
 * @returns the first letter from first name and first letter from last name
 */

function getInitials(contact) {
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

    let initials = [...contact['name'].matchAll(rgx)] || [];

    initials = (
        (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
    ).toUpperCase();

    return initials;
}
