/**
 * Global variables and functions for the login and register HTML, called index.html.
 * 
 * @constant {Object} contactColor - An object mapping numerical keys to RGB color values for contacts.
 * @constant {string} BASE_URL - The base URL for accessing the Firebase real-time database.
 */
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
const BASE_URL = 'https://join-b0cbf-default-rtdb.europe-west1.firebasedatabase.app/';


/**
 * Function to set remember data for the user.
 * This function should be called to initialize user data for remembering login details.
 */
SetRememberData();


/**
 * Function to check if the user is logged in from the last session.
 * This function should be called to verify and restore user session if available.
 */
checkIsUserLoginFromLastSession();


/**
 * Global variables and functions for the general script.js file.
 * The script.js file is included in every HTML file and contains functions for initializing and general functions for the used data.
 * 
 * @constant {string} baseUrl - The base URL for accessing the Firebase real-time database.
 * @type {Array} data - An array to store data retrieved from the database.
 * @type {string} path - The path to the guest contacts in the database.
 * @type {Array<string>} contactColors - An array of color codes used for contact colors.
 * @type {number} colorIndex - An index to keep track of the current color in the contactColors array.
 * @type {boolean} popUpAction - A flag indicating whether a popup action is active.
 * @type {Object} user - An object representing the current user.
 * @property {string} user.name - The name of the user.
 * @property {string} user.email - The email of the user.
 * @property {string} user.initials - The initials of the user.
 * @property {string} user.color - The color associated with the user.
 */
let baseUrl = 'https://join-b0cbf-default-rtdb.europe-west1.firebasedatabase.app';
let data = [];
let path = '/guestContacts';
let contactColors = ['#FF7A00', '#FF5EB3', '#6E52FF', '#9327FF', '#00BEE8', '#1FD7C1', '#FF745E', '#FFA35E', '#FC71FF', '#FFC701', '#0038FF', '#C3FF2B', '#FFE62B', '#FF4646', '#FFBB2B'];
let colorIndex = 0;
let popUpAction = false;
let user = {
  name: 'Gast',
  email: 'gast@join.com',
  initials: 'G',
  color: '#FC71FF'
}
getCurrentUserFromLocalStorage();


/**
 * Global variables for the contacts.html functions.
 * 
 * @type {Array} allGuestNames - An array to store all guest names.
 * @type {Array} currentAlphabetNames - An array to store guest names filtered by the current alphabet letter.
 * @type {Object} selectedContact - An object representing the currently selected contact.
 * @type {Array<string>} alphabet - An array of alphabet letters used for filtering contacts.
 * @type {boolean} renderContactListFunctionActive - A flag indicating whether the render contact list function is active.
 * @type {boolean} deleteContactFunctionActive - A flag indicating whether the delete contact function is active.
 * @type {boolean} editContactFunctionActive - A flag indicating whether the edit contact function is active.
 */
let allGuestNames = [];
let currentAlphabetNames = [];
let selectedContact = {};
let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let renderContactListFunctionActive = false;
let deleteContactFunctionActive = false;
let editContactFunctionActive = false;


/**
 * Constants and variables used for managing guest information and task processes.
 * 
 * @constant {string} BASE_URL_GUEST - The base URL for accessing the Firebase real-time database for guest information.
 * @type {boolean} show - A flag to determine whether certain UI elements should be shown.
 * @type {Array} guesteArray - An array to store guest information.
 * @type {number|string|undefined} userPriority - The priority level of the user, used for task management.
 * @type {string|undefined} imgPriority - The image priority associated with a task or user.
 * @type {boolean} addTaskProcess - A flag indicating whether the add task process is active.
 */
const BASE_URL_GUEST = 'https://join-b0cbf-default-rtdb.europe-west1.firebasedatabase.app';
let show = true;
let guesteArray = [];
let userPriotity;
let imgPriority;
let addTaskProcess = false;


/**
 * Variables representing categories or statuses in a task management system.
 * - `to_do`: Represents tasks awaiting action or in the initial stage.
 * - `in_progress`: Represents tasks currently being worked on.
 * - `awaitt`: Represents tasks awaiting further action or approval.
 * @type {string}
 */
let to_do = 'to_do';
let in_progress = 'in_progress';
let awaitt = 'awaitt';


/**
 * Global variables for the board.js file.
 * 
 * @type {string} BASE_URL - Base URL for Firebase database.
 * @type {Set} usedIds - Set containing used IDs.
 * @type {boolean} showEdit - Flag indicating whether to show edit functionality.
 * @type {Array} todos - Array containing todo tasks.
 * @type {Object} currentElement - Current element variable (type may vary).
 * @type {Array} namelist - Array containing names list.
 * @type {Array} colorList - Array containing color list.
 * @type {Array} initials - Array containing initials.
 * @type {Array} subtasks - Array containing subtasks.
 * @type {Array} selectedSubtasks - Array containing selected subtasks.
 * @type {Array} selectedNames - Array containing selected names.
 */
const usedIds = new Set();
let showEdit = true;
let todos = [];
let currentElement;
let namelist = [];
let colorList = [];
let initials = [];
let subtasks = [];
let selectedSubtasks = [];
let selectedNames = [];


/**
 * Loads tasks from local storage.
 * This function is responsible for loading tasks from the local storage.
 * It is typically called to initialize or update the tasks displayed on the board.
 */
loadTaskFromLocalStorage();


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
 * @param {object} data the data that you want to upload
 * @returns {object} - The response from the server in JSON format.
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
 * @param {object} data 
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
 * This function checks if the provided email already appears in the given data object.
 * 
 * @param {object[]} data - An array of objects where each object represents a record containing an email.
 * @param {string} email - The email address to check within the data array.
 * @returns {boolean} - Returns `true` if the email is found, otherwise `false`.
 */
function checkEmailInDB(data, email) {
    indexOfEmail = data.findIndex(element => element['email'] == email);
    if (indexOfEmail >= 0) {
        return true
    }
}


/**
 * This function checks if the provided password matches the password for a previously found email in the given data object.
 * 
 * @param {object[]} data - An array of objects where each object represents a record containing an email and password.
 * @param {number} indexOfEmail - The index of the email in the data array to check the password for.
 * @param {string} checkPassword - The password to check against the stored password in the data array.
 * @returns {boolean} - Returns `true` if the password matches, otherwise `false`.
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
 * @param {string} email 
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
        toggleIcon.src = "./assets/img/password-show.png"; // Symbol zum Verbergen
    } else {
        passwordField.type = "password";
        toggleIcon.src = "./assets/img/password-hide.png";
    }
}


/**
 * this function is used to toggle icon in password inputfield between hide oder show icon
 * 
 * @param {integer} id document id from the password field
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
 * @param {integer} id document id from the password field
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
 * @param {integer} id document id from the password field - 'login' or 'register'
 */
function setPasswordIconToEye(id) {
    const toggleContainer = document.getElementById(id + '-password-icon-container');
    const toggleIcon = document.getElementById(id + '-password-icon');
    const passwordField = document.getElementById(id + '-password');
    toggleIcon.style.cursor = 'pointer'
    toggleContainer.setAttribute('onclick', 'togglePasswordVisibility("' + id + '")');
    if (passwordField.type === 'password') {
        toggleIcon.src = "./assets/img/password-hide.png";
    } else {
        toggleIcon.src = "./assets/img/password-show.png";
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
 * @param {string} val 'show' or 'hide' infotext
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
 * Generates a random contact color from a predefined set of colors.
 * 
 * @returns {string} The randomly selected contact color.
 */
function randomContactColor() {
    return contactColor[randomNumber(1, 14)];
}


/**
 * this function is used to generate random number
 * @param {integer} min min value 
 * @param {integer} max max value
 * @returns a random value between the min value and max value
 */
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


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
 * Uses XMLHttpRequest to include HTML content into elements based on a specified attribute value.
 * This function searches through all HTML elements for those with the attribute 'w3-include-html',
 * makes an HTTP request to fetch the specified file, and replaces the element's content with the
 * fetched HTML upon successful retrieval.
 * If the file is not found (404 status), it displays "Page not found." inside the element.
 * After including HTML content, it removes the 'w3-include-html' attribute and calls itself
 * recursively to handle any subsequent elements.
 * Finally, it invokes the `init` function to initialize the page after HTML inclusion is complete.
 * 
 * @returns {void} The function does not return any value explicitly. Once it starts including HTML
 * content for an element, it exits early using the `return` statement after initiating an HTTP
 * request and processing the response.
 */
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("w3-include-html");
      if (file) {
        /* Make an HTTP request using the attribute value as the file name: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4) {
            if (this.status == 200) { elmnt.innerHTML = this.responseText; }
            if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
            /* Remove the attribute, and call this function once more: */
            elmnt.removeAttribute("w3-include-html");
            includeHTML();
          }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        /* Exit the function: */
        return;
      }
    }
    init();
  }

  
  /**
   * The `init` function in JavaScript initializes various tasks such as fetching data, hiding navigation
   * bars for users with no active logged in account, setting initials in the header, and initializing specific tasks for the
   * current page.
   */
  async function init() {
    await getData();
    isUserOfflineHideNavBar();
    isUserOfflineHideMobileNavBar();
    setInitialsInHeader();
    initForCurrentPage();
  }
  
  
  /* The `window.addEventListener('resize', () => { isUserOfflineHideMobileNavBar(); })` code snippet is
  adding an event listener to the `resize` event on the `window` object. This event listener is
  triggering the `isUserOfflineHideMobileNavBar()` function whenever the window is resized. */
  window.addEventListener('resize', () => {
    isUserOfflineHideMobileNavBar();
  })
  
  
  /**
   * The function `displayGreyBackground` adds a grey background with increased opacity to an element
   * with the id 'greyBackground'. This is to have a grey layer background for our pop up windows.
   */
  function displayGreyBackground() {
    document.getElementById('greyBackground').classList.remove('d-none');
    greyBackground.classList.remove('removeGreyBackgroundOpacity');
    document.getElementById('greyBackground').classList.add('addGreyBackgroundOpacity');
  }
  
  
  /**
  * The function removeGreyBackground removes a gray background by adjusting its opacity and hiding it after a delay. 
  * The delay ensures that the mechanics of the pop-up windows align properly and prevents users from clicking buttons 
  * that might disrupt the mechanics while they are in motion.
  */
  function removeGreyBackground(){
    let greyBackground = document.getElementById('greyBackground');
    greyBackground.classList.remove('addGreyBackgroundOpacity');
    greyBackground.classList.add('removeGreyBackgroundOpacity');
    setTimeout(() => {
        greyBackground.classList.add('d-none');
    }, 300); 
  }
  
  
  /**
   * The function checks if the user is offline and hides the navigation bar if they are.
   */
  function isUserOfflineHideNavBar() {
    let localstorage = localStorage.getItem('currentUser');
    if (localstorage != null) {
      document.getElementById('navContainer').style.display = 'flex';
      document.getElementById('headerProfileContainer').style.display = 'flex';
      document.getElementById('navBarImg').href = 'summary.html';
      document.getElementById('a-logo-mobile').href = 'summary.html';
    }
  }
  
  
  /**
   * The function checks if the user is offline and hides the mobile navigation bar if the user is not
   * logged in.
   */
  function isUserOfflineHideMobileNavBar() {
    let localstorage = localStorage.getItem('currentUser');
    if (localstorage == null) {
      if (window.innerWidth <= 850) {
        document.getElementById('navBar').style.display = 'none';
      } else {
        document.getElementById('navBar').style.display = 'flex';
      }
    }
  }
  
  
  /**
   * The function `getCurrentUserFromLocalStorage` retrieves the current user data from local storage and
   * parses it as a JSON object globally.
   */
  function getCurrentUserFromLocalStorage() {
    let currentUserString = localStorage.getItem('currentUser');
    if (currentUserString != null || currentUserString != '') {
      user = JSON.parse(currentUserString);
    }
  }
  
  
  /**
   * The function `setInitialsInHeader` sets the initials in the header based on the user's name and
   * adjusts the font size accordingly.
   */
  function setInitialsInHeader() {
    headInnitials = document.getElementById('headInnitials');
    if (user['name'] !== 'Gast') {
      headInnitials.innerHTML = `${user['initials']}`;
    } else {
      headInnitials.innerHTML = 'G';
    }
  
    if (user['initials'].length === 2) {
      headInnitials.classList.remove('font-size-28px');
      headInnitials.classList.add('font-size-20px');
    } else if (user['initials'].length === 1) {
      headInnitials.classList.remove('font-size-20px');
      headInnitials.classList.add('font-size-28px');
    }
  }
  
  
  /**
   * The function `initForCurrentPage` initializes different functionalities based on the current page
   * URL in a web application.
   */
  function initForCurrentPage() {
    focusNavAnker();
    if (window.location.href.includes('contacts.html')) {
      setAllContactNames();
      renderContactList();
      loadColorIndex();
    } else if (window.location.href.includes('summary.html')) {
      updateGreeting();
      loginGreeting();
      getBoardNumbersInSummary();
    } else if (window.location.href.includes('add_task.html')) {
      focusNavAnker();
      initAddTask();
    } else if (window.location.href.includes('board.html')) {
      generateAddTasks();
      initBoardTasks();
    }
  }
  
  
  /**
   * This async function fetches data from a specified URL and stores it as an array of values.
   * It is mainly used to retrieve data from our Firebase database using the globally defined baseURL and path.
   * The function then assigns the global variable `data` to an array containing the values of the objects 
   * from the fetch response.
   */
  async function getData() {
    response = await fetch(baseUrl + path + ".json");
    responseAsJson = await response.json();
    data = Object.values(responseAsJson);
  }
  
  
  /**
   * The function `openHeadNav` toggles the visibility of the element with the id 'headerNav' when
   * triggered by an event.
   * @param {Event} event - The `event` parameter in the `openHeadNav` function is an event object that
   * represents the event that triggered the function. In this case, it is likely a click event since the
   * function is used to toggle the visibility of a navigation element in response to a click event.
   */
  function openHeadNav(event) {
    let nav = document.getElementById('headerNav');
    if (nav.classList.contains('d-none')) {
      nav.classList.remove('d-none')
      nav.style.animation = 'slideInNav 0.3s ease-in-out forwards';
    } else {
      closeNavOnOutsideClick(event);
    }  
    event.stopPropagation();
  }
  
  
  /**
   * The function `closeNavOnOutsideClick` hides the navigation menu if a click occurs outside of the
   * menu or a specific element.
   *
   * @param {Event} event - The `event` parameter represents the event that occurred, such as a click event. 
   * It is passed to the function automatically when the event listener triggers the function. The event 
   * object contains information about the event, such as the target element that was clicked.
   */
  function closeNavOnOutsideClick(event) {
    let nav = document.getElementById('headerNav');
    let initialCircle = document.getElementById('initialCircle');
    // Überprüfen, ob der Klick außerhalb des Nav-Menüs erfolgt
    if (nav && event.target !== nav && !nav.contains(event.target) && event.target !== initialCircle) {
      nav.style.animation = 'slideOutNav 0.3s ease-in-out forwards';
      setTimeout(() => {
        nav.classList.add('d-none')}, 300);
    }
  }
  
  
  /**
   * The function `closeMobileContactOptionsOnOutsideClick` hides mobile contact options when a click
   * occurs outside of them.
   * @param {Event} event - The `event` parameter in the `closeMobileContactOptionsOnOutsideClick` function
   * represents the event that triggered the function, such as a click event. It is used to determine the
   * target of the event and perform actions based on that information, like checking if the click
   * occurred outside a specific element.
   */
  function closeMobileContactOptionsOnOutsideClick(event) {
    let mobileContactOptions = document.getElementById('mobileContactOptions');
    let mobileViewContactButton = document.getElementById('mobileViewContactButton');
    if (mobileContactOptions &&
      mobileContactOptions.style.display === 'flex' &&
      !mobileContactOptions.contains(event.target) &&
      !mobileViewContactButton.contains(event.target)) {
        mobileContactOptions.style.animation = 'slideOutNav 0.3s ease-in-out forwards';
      setTimeout(() => {
        mobileContactOptions.style.display = 'none'}, 300);
    }
  }
  
  
  /**
   * The function `loadColorIndex` retrieves the value of `colorIndex` from localStorage and initializes
   * it to 0 if it is not already set. This is to ensure that contacts always get new colors, when they are added.
   */
  function loadColorIndex() {
    colorIndex = localStorage.getItem('colorIndex');
  
    if (colorIndex === null) {
      colorIndex = 0;
    } else {
      colorIndex = parseInt(colorIndex, 10);
    }
  }
  
  
  /**
   * The function `navigateTo` is used to redirect the user to a specified URL in JavaScript.
   * @param {String} url - The `url` parameter in the `navigateTo` function is a string that represents the URL of
   * the webpage you want to navigate to.
   */
  function navigateTo(url) {
    window.location.href = url;
  }
  
  
  /**
   * Extracts the initials from a contact's name and returns them in uppercase.
   * 
   * @param {string} name - The name of the contact from which initials will be extracted.
   * @returns {string} The initials extracted from the `name` parameter, converted to uppercase.
   * 
   * @description
   * This function takes a `name` parameter representing a contact's name and extracts the initials
   * by matching the first letter of each word in the name. It uses a regular expression to find the
   * first letter of each word and concatenates them to form the initials. The initials are then
   * converted to uppercase and returned as a string.
   */
  function getInitials(name) {
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
  
    let initials = [...name.matchAll(rgx)] || [];
  
    initials = (
      (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
    ).toUpperCase();
  
    return initials;
  }
  
  
  /**
   * The function `getInitials` extracts the initials from a contact's name and returns them in
   * uppercase.
   * @param {Object} contact - The `contact` parameter is an object that contains information about a person,
   * specifically their name.
   * @returns The function `getInitials` takes a `contact` object as input and extracts the initials from
   * the `name` property of the contact. It uses a regular expression to match the first letter of each
   * word in the name and then concatenates the first letters to form the initials. The initials are then
   * converted to uppercase and returned.
   */
  function getInitialsFromObject(contact) {
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
  
    let initials = [...contact['name'].matchAll(rgx)] || [];
  
    initials = (
      (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
    ).toUpperCase();
  
    return initials;
  }
  
  
  /**
   * The function `resetCurrentUser` removes the 'currentUser' item from the localStorage.
   * This is used for a log out function, for example.
   */
  function resetCurrentUser() {
    localStorage.removeItem('currentUser');
  }
  
  
  /**
   * The function `focusNavAnker` adds focus styling to navigation elements based on the current page
   * URL.
   */
  function focusNavAnker() {
    if (window.location.href.includes('summary.html')) {
        document.getElementById('summaryNav').classList.add('navBarFocusAnker');
        document.getElementById('navBarSummaryImg').classList.add('navBarImgFocus');
        document.getElementById('summaryNav').classList.remove('mainNavLinkTransition');
    } else if (window.location.href.includes('contacts.html')) {
        document.getElementById('contactsNav').classList.add('navBarFocusAnker');
        document.getElementById('navBarContactsImg').classList.add('navBarImgFocus');
        document.getElementById('contactsNav').classList.remove('mainNavLinkTransition');
    } else if (window.location.href.includes('board.html')) {
        document.getElementById('boardNav').classList.add('navBarFocusAnker');
        document.getElementById('navBarBoardImg').classList.add('navBarImgFocus');
        document.getElementById('boardNav').classList.remove('mainNavLinkTransition');
        document.getElementById('mobileBoardNav').classList.add('navBarFocusAnker');
        document.getElementById('mobileNavBarBoardImg').classList.add('navBarImgFocus');
        document.getElementById('mobileBoardNav').classList.remove('mainNavLinkTransition');
    } else if (window.location.href.includes('add_task.html')) {
        document.getElementById('addTaskNav').classList.add('navBarFocusAnker');
        document.getElementById('navBarAddTaskImg').classList.add('navBarImgFocus');
        document.getElementById('addTaskNav').classList.remove('mainNavLinkTransition');
    }
  }
  
  
  /**
   * The function `loginGreeting` displays a greeting screen and summary section based on the referrer
   * and window width conditions.
   */
  function loginGreeting() {
    let loginGrettingScreen = document.getElementById('loginGrettingScreen');
    let summary = document.getElementById('summary');
  
    if (document.referrer.includes('index.html') && window.innerWidth < 850) {
      loginGrettingScreen.classList.remove('d-none');
      setTimeout(() => {
        loginGrettingScreen.style.animation = 'greeting 0.8s ease-in-out forwards'
      }, 1200);
      setTimeout(() => {
        summary.style.animation = 'fadeIn 0.8s ease-in-out forwards';
        summary.style.display = 'flex'
      }, 1600);
    } else if (!document.referrer.includes('index.html')) {
      summary.style.display = 'flex';
    }
  }


  /**
 * The function `updateGreeting` dynamically updates a greeting message based on the current time and
 * also includes a personalized name.
 */
function updateGreeting() {
    let greetElement = document.querySelectorAll('.greetAtTime');
    const now = new Date();
    const hour = now.getHours();
    let greeting;
    if (hour < 6) {
        greeting = `Good night${greetName()}`;
    } else if (hour < 12) {
        greeting = `Good morning${greetName()}`;
    } else if (hour < 18) {
        greeting = `Good day${greetName()}`;
    } else if (hour < 21) {
        greeting = `Good afternoon${greetName()}`;
    } else {
        greeting = `Good evening${greetName()}`;
    }
    greetElement.forEach((element) => { element.innerHTML = greeting } );
    greetName();
}


/**
 * The `greetName` function updates the inner HTML of elements with the class 'greetName' based on the
 * value of the user's name, returning a comma if the name is not 'Gast' and an exclamation
 * mark if it is.
 * @returns The function `greetName` will return a comma (`,`) if the user's name is not 'Gast',
 * and an exclamation mark (`!`) if the user's name is 'Gast'.
 */
function greetName(){
    let greetName = document.querySelectorAll('.greetName');

    if (user['name'] !== 'Gast') {
        greetName.forEach((element) => { element.innerHTML = `${user['name']}`});
        return ',';
    } else {
        greetName.forEach((element) => { element.innerHTML = ''} );
        return `!`;
    };
}


/**
 * The function `getBoardNumbersInSummary` retrieves board data and updates the HTML elements with the
 * number of tasks in different categories of the summary.html (dashboard).
 */
async function getBoardNumbersInSummary(){
    let done = document.getElementById('done');
    let toDo = document.getElementById('toDo');
    let urgent = document.getElementById('urgent');
    let inBoard = document.getElementById('inBoard');
    let inProgress = document.getElementById('inProgress');
    let awaitFeedback = document.getElementById('awaitFeedback');
    await getBoardData();
    done.innerHTML = numberOfDoneTasks();
    toDo.innerHTML = numberOfToDoTasks();
    urgent.innerHTML = numberOfUrgentTasks();
    inBoard.innerHTML = numberOfTasksInBoard(done);
    inProgress.innerHTML = numberOfTasksInProgress();
    awaitFeedback.innerHTML = numberOfAwaitFeedbackTasks();
}


/**
 * The function `getBoardData` asynchronously fetches task data from the tasks path and stores it as
 * an array of values - globally as data.
 */
async function getBoardData() {
    path = '/tasks';
    response = await fetch(baseUrl + path + ".json");
    responseAsJson = await response.json();
    data = Object.values(responseAsJson);
  }


/**
 * The function `numberOfDoneTasks` returns the number of tasks that are marked as 'done' in the globally defined data.
 * @returns the number of tasks that have the category 'done' in the data array.
 */
function numberOfDoneTasks(){
    let done = data.filter(item => item['category'] === 'done');
    return /*html*/`
        ${done.length}
    `;
}


/**
 * Filters the `data` array to count the number of tasks with the category 'to_do'.
 * 
 * @returns {number} The number of tasks in the `data` array that have a category of 'to_do'.
 */
function numberOfToDoTasks() {
    let toDoTasks = data.filter(item => item['category'] === 'to_do');
    return /*html*/`
        ${toDoTasks.length}
    `;    
}


/**
 * The function `numberOfUrgentTasks` filters tasks with 'Urgent' priority from the data, sets up
 * upcoming deadlines for these tasks, and returns the number of urgent tasks.
 * @returns The function `numberOfUrgentTasks()` is returning the number of tasks that have a priority
 * of 'Urgent'. The number of urgent tasks is being displayed as a string within an HTML template
 * literal.
 */
function numberOfUrgentTasks() {
    let urgent = data.filter(item => item['priority'] === 'Urgent');
    setUpComingDeadline(urgent);
    return /*html*/`
        ${urgent.length}
    `;    
}


/**
 * The function setUpComingDeadline sets the upcoming deadline on a webpage based on the urgency level
 * provided or displays the number of past urgent tasks if there are no upcoming deadlines.
 * 
 * @param {Object[]} urgent - An array of objects, where each object represents an urgent task with a `date` 
 * property indicating the due date of the task.
 * @param {string} urgent[].date - The date property of each object, represented as a string in ISO format.
 */
function setUpComingDeadline(urgent) {
    let upcomingDeadline = document.getElementById('upcomingDeadline');
    let deadlinePhrase = document.getElementById('deadlinePhrase');
    let pastDatesSpan = document.getElementById('pastDatesSpan');
    let pastDatesNumber = document.getElementById('pastDatesNumber');
    let deadLine = getNextUrgentDate(urgent);
    let now = new Date();
    
    let pastDates = urgent.filter(item => new Date(item.date) < now);
    let futureDates = urgent.filter(item => new Date(item.date) >= now);

    upcomingDeadline.innerHTML = deadLine ? formatDate(deadLine) : '';

    if (deadLine === '') {
        if (pastDates.length > 0) {
            pastDatesSpan.style.display = 'block';
            deadlinePhrase.innerHTML = /*html*/`Nothing urgent in future`;
            pastDatesNumber.innerHTML = /*html*/`${pastDates.length}`;
        } else {
            deadlinePhrase.innerHTML = 'Nothing urgent right now.';
        }
    } else {
        deadlinePhrase.innerHTML = 'Upcoming deadline.';
    }
}


/**
 * Formats a date string in the format "YYYY-MM-DD" to a human-readable format.
 *
 * @param {string} dateString - The input date string in the format "YYYY-MM-DD".
 * @returns {string} The formatted date in the format "Month Day, Year".
 */
function formatDate(dateString) {
    let months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    let dateParts = dateString.split('-');
    let year = dateParts[0];
    let monthIndex = parseInt(dateParts[1]) - 1;
    let day = parseInt(dateParts[2]);

    let formattedDate = `${months[monthIndex]} ${day}, ${year}`;
    return formattedDate;
}


/**
 * The function `getNextUrgentDate` filters and sorts a list of urgent dates to return the next
 * upcoming date, or returns an empty string if there are no urgent dates.
 * 
 * @param {Object[]} urgent - An array of objects, where each object represents an urgent task with a `date` 
 * property indicating the due date of the task.
 * @param {string} urgent[].date - The date property of each object, represented as a string in ISO format.
 * @returns {string} - The next upcoming date in ISO format, or an empty string if there are no upcoming dates.
 */
function getNextUrgentDate(urgent) {
    let now = new Date();
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let futureDates = urgent.filter(item => {
        let itemDate = new Date(item.date);
        let itemDay = new Date(itemDate.getFullYear(), itemDate.getMonth(), itemDate.getDate());
        return itemDay >= today;
    });
    futureDates.sort((a, b) => new Date(a.date) - new Date(b.date));
    return futureDates.length > 0 ? futureDates[0].date : '';
}


/**
 * The function `numberOfTasksInBoard` returns the number of tasks in a board by accessing the `data`
 * array length.
 * @returns the number of tasks in the `data` array.
 */
function numberOfTasksInBoard(done){
    let tasksInBoard = data.length - done.innerHTML;
    return /*html*/`
        ${tasksInBoard}
    `;
}


/**
 * The function `numberOfTasksInProgress` returns the number of tasks that are in progress based on the
 * data provided.
 * @returns The function `numberOfTasksInProgress` is returning the number of tasks that are currently
 * in progress.
 */
function numberOfTasksInProgress(){
    let inProgress = data.filter(item => item['category'] === 'in_progress');
    return /*html*/`
    ${inProgress.length}
`;
}


/**
 * The function `numberOfAwaitFeedbackTasks` filters data items with the category 'await' and returns
 * the number of such items.
 * @returns The function `numberOfAwaitFeedbackTasks()` is returning the number of items in the `data`
 * array where the `category` property is equal to 'await'.
 */
function numberOfAwaitFeedbackTasks() {
    let awaitFeedback = data.filter(item => item['category'] === 'await');
    return /*html*/`
    ${awaitFeedback.length}
`;
}


/**
 * The function `closeContactPopUp` closes a contact pop-up by sliding it out and removing the grey
 * background. 
 */
function closeContactPopUp() {
    if (document.getElementById('greyBackground').classList.contains('d-none')) {
        return;
    }
    slideOut();
    removeGreyBackground();
}


/**
 * The function `slideOut` adds the class `slideOut` and removes the class `slideIn` from an element
 * with the id `contactPopUp`, likely triggering a sliding-out animation.
 */
function slideOut() {
    let contactPopUp = document.getElementById('contactPopUp');
    contactPopUp.classList.add('slideOut');
    contactPopUp.classList.remove('slideIn');
}


/**
 * The `slideIn` function adds a CSS class to slide in a contact pop-up element.
 */
function slideIn() {
    let contactPopUp = document.getElementById('contactPopUp');
    contactPopUp.classList.add('slideIn');
    contactPopUp.classList.remove('slideOut');
}

/**
 * The function `openAddContactPopUp` displays a pop-up window with an add contact form.
 */
function openAddContactPopUp() {
    if (!document.getElementById('greyBackground').classList.contains('d-none')) {
        return;
    }
    document.getElementById('contactPopUp').innerHTML = addContactFormHTML(); 
    slideIn();
    displayGreyBackground();            
}


/**
 * The function `addContact` handles the process of adding a new contact, including form validation,
 * checking for existing contacts, posting to Firebase, updating data, rendering the new contact, and
 * displaying a confirmation message.
 * @returns The `addContact` function is returning either nothing (undefined) or it is returning early
 * if the conditions in the `if` statements are met.
 */
async function addContact() {
    if(checkValidityForAddContactForm()){
        return;
    };
    let newContact = defineNewContact();
    let initials = getInitialsFromObject(newContact);
    if (checkIfContactAlreadyExistsForAdd(newContact, initials)) {
        return; 
    };
    await postContactInFirebase(newContact);
    await getData();
    renderNewContact(newContact);
    focusAndScrollToContact(newContact);
    slideInContact(newContact['name'], initials);
    slideInAndOutConfirmation('Contact successfully created');
    openAddContactPopUpActive = false;
}


/**
 * The function `checkIfContactAlreadyExistsForAdd` checks if a contact already exists in a data array
 * based on name or phone number and provides feedback accordingly (for the add contact function).
 * @param {Object} contactObject - The `contactObject` parameter is an object that represents a contact with
 * properties like `name` and `phone`. It is used to check if a contact already exists in the data
 * based on the provided name or phone number.
 * @param {String} initials - Initials typically refer to the first letters of a person's first, middle, and
 * last names. They are often used as a shorthand way to identify individuals. In the context of your
 * function `checkIfContactAlreadyExistsForAdd`, the `initials` parameter seems to be used as a
 * reference
 * @returns The function `checkIfContactAlreadyExistsForAdd` returns a boolean value - `true` if the
 * contact already exists either by name or phone number, and `false` if the contact does not already
 * exist.
 */
function checkIfContactAlreadyExistsForAdd(contactObject, initials) {
    let foundByName = data.find(obj => obj['name'] === contactObject['name']);
    let foundByPhone = data.find(obj => obj['phone'] === contactObject['phone']);

    if (foundByName !== undefined && foundByName['name'] === contactObject['name']) {
        focusAndScrollToContact(contactObject);
        slideInContact(contactObject['name'], initials);
        slideInAndOutConfirmation('Contact name already exists');
        return true;
    } else if (foundByPhone !== undefined && foundByPhone['phone'] === contactObject['phone']) {
        focusAndScrollToContactOfPhoneNumber(contactObject, initials);
        slideInAndOutConfirmation('Phone number already exists');
        return true;
    } else {
        return false;
    }
}


/**
 * The function `checkIfContactAlreadyExistsForEdit` checks if a contact already exists based on phone
 * number, email, and name for editing purposes.
 * @param {Object} contactObject - The `contactObject` parameter in the `checkIfContactAlreadyExistsForEdit`
 * function is an object that represents a contact. It likely contains properties such as `phone`,
 * `email`, and `name` that are used to identify and manage the contact's information.
 * @param {String} initials - The `initials` parameter is likely a string representing the initials of a
 * contact. It is used as a parameter in the `checkIfContactAlreadyExistsForEdit` function to help
 * identify a contact when checking if it already exists based on certain criteria such as phone
 * number, email, and name.
 * @returns The function `checkIfContactAlreadyExistsForEdit` is returning a boolean value - `true` if
 * the contact already exists for editing, and `false` if it does not.
 */
function checkIfContactAlreadyExistsForEdit(contactObject, initials) {
    let email = document.getElementById('emailEditContactPopUp').value;
    let name = document.getElementById('nameEditContactPopUp').value;
    let foundByPhone = data.find(obj => obj['phone'] === contactObject['phone']);
    if (foundByPhone !== undefined && selectedContact['email'] === email && selectedContact['name'] === name) {
        focusAndScrollToContactOfPhoneNumber(contactObject, initials);
        slideInAndOutConfirmation('Phone number already exists');
        return true;
    } else {
        return false;
    }
}


/**
 * The function `focusAndScrollToContact` focuses on a specific contact container element in the contact list and scrolls
 * it into view smoothly.
 * @param {Object} contactObject - The `contactObject` parameter is an object that contains information about a
 * contact. It likely has properties such as `name`, `email`, `phone`, etc. In the
 * `focusAndScrollToContact` function, we are using the `name` property of the `contactObject` to
 * identifythe specific contact container to focus on and scroll to.
 */
function focusAndScrollToContact(contactObject){
    let underscoredName = contactObject['name'].replace(/\s/g, '_');
    let toFocusContactContainer = document.getElementById(`${underscoredName}`);
    toFocusContactContainer.setAttribute("tabindex", "0");
    toFocusContactContainer.focus(); 
    toFocusContactContainer.scrollIntoView({ behavior: "smooth", block: "center" });
}


/**
 * The function `focusAndScrollToContactOfPhoneNumber` finds a contact object by phone number, focuses
 * and scrolls to that contact, and then slides in the contacts information.
 * @param {Object} contactObject - The `contactObject` parameter is an object that contains information about a
 * contact, specifically their phone number.
 * @param {String} initials - The `initials` parameter is likely a string representing the initials of the
 * contact person associated with the phone number. It is used in the `slideInContact` function to
 * display the initials of the contact along with their general information.
 */
function focusAndScrollToContactOfPhoneNumber(contactObject, initials){
    let contact = data.find(obj => obj['phone'] === contactObject['phone']);
    focusAndScrollToContact(contact);
    slideInContact(contact['name'], initials);
}


/**
 * The function `defineNewContact` creates a new contact object with color, name, email, and phone
 * properties.
 * @returns The function defineNewContact() is returning a new contact object with properties for
 * color, name, email, and phone.
 * The name will always be saved with capitalized first letter of the firstname and surname.
 */
function defineNewContact() {
    let color = getNextColor();
    let email = document.getElementById('emailAddContactPopUp').value;
    let phone = document.getElementById('phoneAddContactPopUp').value;
    let name = document.getElementById('nameAddContactPopUp').value;
    name = capitalizeFirstAndLastName(name);
    let newContact = {
        'color': color,
        'name': name,
        'email': email,
        'phone': phone
    };    
    return newContact;
}


/**
 * The function `postContactInFirebase` sends a POST request to a Firebase database with a new contact
 * object and returns the response as JSON.
 * @param {Object} newContact - `newContact` is an object representing the contact information that you want to
 * post to Firebase. It contains the necessary fields such as name, email and phone number.
 * @returns The `postContactInFirebase` function is returning the response from the POST request made
 * to the Firebase database after converting it to JSON format.
 */
async function postContactInFirebase(newContact) {
    let response = await fetch(baseUrl + path + ".json", {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(newContact)
    });
    let responseAsJson = await response.json();
    return responseAsJson;
}


/**
 * Capitalizes the first letter of the first name and the last name, converting the rest of the names to lowercase,
 * from a given full name.
 * 
 * @param {string} name - The full name to be processed.
 * @returns {string} The modified full name with the first letter of each part capitalized and the rest lowercase.
 */
function capitalizeFirstAndLastName(name) {
    let parts = name.split(' ');
    if (parts.length > 0) {
        parts[0] = parts[0].charAt(0).toUpperCase() + parts[0].slice(1).toLowerCase();
    }
    if (parts.length > 1) {
        let lastPartIndex = parts.length - 1;
        parts[lastPartIndex] = parts[lastPartIndex].charAt(0).toUpperCase() + parts[lastPartIndex].slice(1).toLowerCase();
    }
    let result = parts.join(' ');
    return result;
}


/**
 * Checks the validity of the form with the id 'addContactForm'. If valid, closes the contact pop-up.
 * 
 * @returns {boolean} Returns false if the addContactForm passes validation and the contact pop-up is closed.
 *                    Returns true if the form does not pass validation, indicating the need to show form validation notices
 *                    and prevent further actions in addContact or editContact functions.
 */
function checkValidityForAddContactForm() {
    let addContactForm = document.getElementById('addContactForm');
    if (addContactForm.checkValidity()) {
        closeContactPopUp();         
        return false;
    }  else {
        return true;
    } 
}


/**
 * The function setSelectedContact retrieves and stores information globally about a 
 * selected contact from input fields of the edit contact pop up.
 */
function setSelectedContact() {
    selectedContact = {
        color: document.getElementById('editViewContactCircle').getAttribute('fill'),
        name: document.getElementById('nameEditContactPopUp').value,
        email: document.getElementById('emailEditContactPopUp').value,
        phone: document.getElementById('phoneEditContactPopUp').value
    };
}


/**
 * Checks if the values in the edit contact form match the selected contact's details or if the form
 * passes validation before closing the contact pop-up.
 * 
 * @returns {boolean} Returns true under two conditions:
 *                    1. If the values in the edit contact form match the details of the selected contact,
 *                       indicating no changes were made and the pop-up can be closed.
 *                    2. If the editContactForm passes validation, indicating the form data is valid and
 *                       the pop-up can be closed.
 *                    Returns false if neither condition is met.
 */
function checkValidityForEditContactForm() {
    let editContactForm = document.getElementById('editContactForm');
    let nameEditContactPopUp = document.getElementById('nameEditContactPopUp').value;
    let emailEditContactPopUp = document.getElementById('emailEditContactPopUp').value;
    let phoneEditContactPopUp = document.getElementById('phoneEditContactPopUp').value;

    if (nameEditContactPopUp === selectedContact['name'] && emailEditContactPopUp === selectedContact['email'] && phoneEditContactPopUp === selectedContact['phone']) {
        closeContactPopUp();
        return true;
    } else if(editContactForm.checkValidity()) {
        closeContactPopUp();
    } else {
        return true;  
    } 
}


/**
 * Retrieves the next color value from the `contactColors` array based on the `colorIndex` variable,
 * updates the index, and stores it in local storage for future use.
 * 
 * @returns {string} The next color value from the `contactColors` array.
 */
function getNextColor() {
    let colorValue = contactColors[colorIndex];
    colorIndex++;
    if (colorIndex >= contactColors.length) {
      colorIndex = 0;
    };
    localStorage.setItem('colorIndex', colorIndex);
    return colorValue;
}


/**
 * The function `openEditPopUp` displays an edit contact form in a pop-up window with the specified
 * contact name and initials.
 * @param {String} contactName - The `contactName` parameter in the `openEditPopUp` function is a string that
 * represents the name of the contact for which the edit pop-up is being opened.
 * @param {String} initials - The `initials` parameter likely refers to the initials of the contact person. It
 * is commonly used as a shorter representation of a person's name, typically by using the first letter
 * of each word in the name. For example, for the name "John Doe", the initials would be "JD".
 */
function openEditPopUp(contactName, initials) {
    document.getElementById('contactPopUp').innerHTML = editContactFormHTML(contactName, initials); 
    setSelectedContact();
    slideIn();
    displayGreyBackground();
}


/**
 * Edits a contact in Firebase, updates the data, deletes the old contact, and renders the new contact
 * with a confirmation message.
 * 
 * @param {string} contactName - The name of the contact to be edited.
 * @returns {undefined} Returns nothing (`undefined`) if either `checkValidityForEditContactForm(contactName)`
 * or `checkIfContactAlreadyExistsForEdit(contactEdit, initials)` conditions are met.
 * This ensures appropriate user feedback regarding form validation or existing contact check during the edit process.
 */
async function editContact(contactName) {
    editContactFunctionActive = true;
    let contactEdit = defineContactEdit();
    let initials = getInitialsFromObject(contactEdit);
    if (checkValidityForEditContactForm(contactName)) {
        return;        
    } else if (checkIfContactAlreadyExistsForEdit(contactEdit, initials)) {
        return; 
    };
    let token = '/' + await getTokenFrom(contactName);
    await editContactInFirebase(contactEdit, token);
    await getData();
    deleteContact(contactName);
    renderNewContact(contactEdit);
    focusAndScrollToContact(contactEdit);
    slideInContact(contactEdit['name'], initials);
    slideInAndOutConfirmation('Contact successfully edited');
    editContactFunctionActive = false;
}


/**
 * Retrieves a token string corresponding to a contact name from a JSON response of the Firebase database.
 * 
 * @param {string} contactName - The name of the contact for which to retrieve the token.
 * @returns {string} The token string associated with the provided `contactName`.
 */
async function getTokenFrom(contactName) {
    let response = await fetch(baseUrl + path + ".json");
    let responseAsJson = await response.json();
    let tokens = Object.keys(responseAsJson);
    let index = data.findIndex(contact => contact['name'] === contactName);
    let tokenString = tokens[index];
    return tokenString;
}


/**
 * Sends a PUT request to update a contact in Firebase using the provided contact data and authentication token.
 * 
 * @param {Object} contactEdit - The updated information for the contact. This object should match the structure
 *                               of the contact data stored in Firebase.
 * @param {string} token - The authentication token used to access and modify the specific contact information
 *                         in the Firebase database. It uniquely identifies the resource being updated.
 * @returns {Promise<Object>} The JSON response from the Firebase database after updating the contact information.
 */
async function editContactInFirebase(contactEdit, token) {
    let response = await fetch(baseUrl + path + token + ".json", {
        method: "PUT",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(contactEdit)
    });
    let responseAsJson = await response.json();
    return responseAsJson;
}


/**
 * Retrieves and formats contact information for editing.
 * 
 * @returns {Object} An object representing the edited contact information with properties:
 *                   - `color`: The color of the selected contact.
 *                   - `name`: The capitalized name of the contact, formatted using `capitalizeFirstAndLastName`.
 *                   - `email`: The email address of the contact.
 *                   - `phone`: The phone number of the contact.
 * @see capitalizeFirstAndLastName
 */
function defineContactEdit() {
    let email = document.getElementById('emailEditContactPopUp').value;
    let phone = document.getElementById('phoneEditContactPopUp').value;
    let name = document.getElementById('nameEditContactPopUp').value;
    name = capitalizeFirstAndLastName(name);
    let contactEdit = {
        'color': selectedContact['color'],
        'name': name,
        'email': email,
        'phone': phone
    };    
    return contactEdit;
}


/**
 * Renders a new contact by adding it to the appropriate category in the contact list.
 * 
 * @param {Object} newContact - The new contact object to be rendered, containing properties like `name`, `email`, `phone`.
 */
function renderNewContact(newContact) {
    let AZindex = getAZindexOfName(newContact);
    let category = document.getElementById(`category${AZindex}`);
    setCurrentAlphabetNames(AZindex);
    renderCategoryContacts(AZindex, newContact); 
    category.classList.remove('d-none'); 
}


/**
 * Returns the index of the alphabet based on the first letter of the contact's name or the first letter of the provided string.
 * 
 * @param {Object} newContact - The contact's name or an object containing the contact's information.
 * @returns {number} - The index of the alphabet corresponding to the first letter of the contact's name.
 */
function getAZindexOfName(newContact) {
    if (deleteContactFunctionActive === true) {
        let firstLetterOfName = newContact.charAt(0); 
        let AZindex = alphabet.findIndex(letter => letter === firstLetterOfName);
        return AZindex;
    } else {
        let firstLetterOfName = newContact['name'].charAt(0);
        let AZindex = alphabet.findIndex(letter => letter === firstLetterOfName);
        return AZindex;
    }
}


/**
 * Renders the entire contact list by rendering each alphabet category and its contacts.
 */
function renderContactList() {
    renderContactListFunctionActive = true;
    for (let AZindex = 0; AZindex < 26; AZindex++) {
        renderAlphabetCategoryOfLetter(AZindex); 
        renderCategoryContacts(AZindex); 
        hideOrDisplayCategories(AZindex);            
        setCurrentAlphabetNames(AZindex);
    };
    renderContactListFunctionActive = false;
}


/**
 * Renders the alphabet category of a specific letter if it doesn't already exist.
 * 
 * @param {number} AZindex - The index of the alphabet corresponding to the letter for which the category is rendered.
 */
function renderAlphabetCategoryOfLetter(AZindex) {
    if (!document.getElementById(`category${AZindex}`)) {
    let contactList = document.getElementById('contactList');
    contactList.innerHTML +=  contactListCategoryHTML(AZindex);
    } else {
        return;
    }
}


/**
 * Hides or displays a category based on whether it contains any contacts.
 * 
 * @param {number} AZindex - The index of the alphabet corresponding to the category to be checked.
 */
function hideOrDisplayCategories(AZindex) {
    let category = document.getElementById(`category${AZindex}`);
    let list = document.getElementById(`list${AZindex}`);
    if (list.children.length == 0) {
    category.classList.add('d-none');      
    } else {
        category.classList.remove('d-none');
        return;
    }
}


/**
 * Sets the array of all contact names globally in the variable allGuestNames.
 */
function setAllContactNames(){
    allGuestNames = data.map(obj => obj['name']);
    setCurrentAlphabetNamesWithA();
}


/**
 * Sets the array of current contact names starting with the letter 'A' globally in the variable currentAlphabetNames.
 * This is to ensure that we start correctly with the rendering process of the contact list and its alphabet categories.
 */
function setCurrentAlphabetNamesWithA() {
    currentAlphabetNames = data.filter(obj => obj['name'].startsWith('A')).map(obj => obj['name']);
}


/**
 * Sets the array of current contact names based on the index of the alphabet.
 * 
 * @param {number} AZindex - The index of the alphabet corresponding to the category.
 */
function setCurrentAlphabetNames(AZindex) {
    if (renderContactListFunctionActive === true) {
    AZindex++;
    }
    currentAlphabetNames = data.filter(obj => obj['name'].startsWith(`${alphabet[AZindex]}`)).map(obj => obj['name']);
}


/**
 * Renders the contacts for a specific category.
 * 
 * @param {number} AZindex - The index of the alphabet corresponding to the category.
 * @param {Object} newContact - The new contact object to be rendered.
 */
function renderCategoryContacts(AZindex, newContact) {
    currentAlphabetNames.sort();
    let list = document.getElementById(`list${AZindex}`);
    for (let i = 0; i < currentAlphabetNames.length; i++) {
        let contact = data.find(obj => obj.name === currentAlphabetNames[i]);
        if (!list.innerHTML.includes(contact['name']) || contact['name'] === newContact['name']) {
        list.innerHTML += listedContactHTML(contact);
        }
    } 
}


/**
 * Opens the mobile contact options menu.
 */
function openMobileContactOptions(){
    let mobileContactOptions = document.getElementById('mobileContactOptions');
    mobileContactOptions.style.display = 'flex';
    mobileContactOptions.style.animation = 'slideInNav 0.3s ease-in-out forwards'
}


/**
 * Slides in the contact view screen for mobile devices.
 * 
 * @param {HTMLElement} contactView - The contact view element to slide in.
 */
function slideInContactViewScreenForMobile(contactView){
    contactViewSection = document.getElementById('contactViewSection');
    contactViewSection.style.animation = 'rightSlideInScreen 0.3s ease-in-out forwards';
    contactView.classList.remove('slideOutContactView');
    contactView.classList.add('slideInContactView');
}


/**
 * Slides out the contact view screen for mobile devices.
 */
function slideOutContactViewScreenForMobile(){
    contactViewSection = document.getElementById('contactViewSection');
    contactViewSection.style.animation = 'rightSlideOutScreen 0.3s ease-in-out forwards';
    let contactView = document.getElementById('contactView');
    contactView.classList.remove('slideInContact');
    contactView.classList.add('slideOutContactView');
}


/**
 * Slides out the contact view screen.
 */
function slideOutContact(){
    let contactView = document.getElementById('contactView');
    contactView.classList.remove('slideInContact');
    contactView.classList.add('slideOutContactView');
}


/**
 * Opens the delete popup for a specific contact.
 * 
 * @param {string} contactName - The name of the contact to be deleted.
 */
function openDeletePopUp(contactName) {
    let deletePopUp = document.getElementById('deletePopUp');
    deletePopUp.innerHTML = deletePopUpHTML(contactName);
    deletePopUp.classList.remove('d-none');
    deletePopUp.classList.remove('slideOut');
    deletePopUp.classList.add('slideIn');
    displayGreyBackground();
}


/**
 * Closes the delete popup.
 */
function closeDeletePopUp(){
    let deletePopUp = document.getElementById('deletePopUp');
    if(deletePopUp.innerHTML){
        deletePopUp.classList.remove('slideIn');
        deletePopUp.classList.add('slideOut');
        setTimeout(() => {
            deletePopUp.innerHTML = '';
            deletePopUp.classList.add('d-none');            
        }, 200);
        removeGreyBackground();        
    }   else {
        return;
    }
}


/**
 * Deletes a contact by its name, asynchronously sending a request to the server.
 * 
 * @param {string} contactName - The name of the contact to be deleted.
 * @returns {Promise<Object>} - A promise that resolves to the response JSON object after deleting the contact.
 */
async function deleteContact(contactName) {
    deleteContactFunctionActive = true;
    removeDeletedContact(contactName);
    if(editContactFunctionActive === false){
        let token = '/' + await getTokenFrom(contactName);
        response = await fetch(baseUrl + path + token + '.json', { 
            method: "DELETE",
        });
        responseAsJson = await response.json();
        closeDeletePopUp();
        slideOutContact();    
        slideInAndOutConfirmation('Contact successfully deleted');
        await getData();
    }
    let AZindex = getAZindexOfName(contactName);
    hideOrDisplayCategories(AZindex);
    deleteContactFunctionActive = false;            
    return responseAsJson;
}


/**
 * Slides in and out a confirmation message on the contact page.
 * 
 * @param {string} span - The text content of the confirmation message.
 */
function slideInAndOutConfirmation(span) {
    let contactPageConfirmation = document.getElementById('contactPageConfirmation');
    let contactPageConfirmationSpan = document.getElementById('contactPageConfirmationSpan');
    contactPageConfirmationSpan.innerHTML = `${span}`;
    contactPageConfirmation.classList.remove('slideOutContactView');
    contactPageConfirmation.classList.add('slideInContactView');
    setTimeout(() => {
        contactPageConfirmation.classList.remove('slideInContactView');
        contactPageConfirmation.classList.add('slideOutContactView');
    }, 2000);
}


/**
 * Removes a deleted contact from the DOM by its name.
 * 
 * @param {string} contactName - The name of the contact to be removed.
 */
function removeDeletedContact(contactName) {
    let underscoredName = contactName.replace(/\s/g, '_');
    document.getElementById(`${underscoredName}`).remove();
}


/**
 * Generates HTML markup for the add contact form.
 * 
 * @returns {string} - The HTML markup for the add contact form.
 */
function addContactFormHTML() {
    return /*html*/`
        <div class="addContactPopUpTitleContainer">
            <img class="addContactJoinLogo" src="./assets/img/joinLogoSmallWhite.svg">
            <h2 class="popUpTitle">Add contact</h2>
            <p class="subTitle mobileSubTitle whiteColor padding-left-0px">Tasks are better with a team!</p>
            <div class="blueHorizontalLine">
            </div>
        </div>

        <div class="addContactFormContainer">
            <img onclick="closeContactPopUp()" class="popUpRightCornerCloseButton" src="./assets/img/cancelX.svg">
            <div class="contactFormAndImgContainer">
                <img class="contactPopUpProfileImg" src="./assets/img/ProfileImg.svg">
                <form id="addContactForm" class="formContainer" onsubmit="return false;">
                    <div class="contactsInputContainer">
                        <input id="nameAddContactPopUp" type="text" required class="nameEmailTel" placeholder="Name">
                        <img src="./assets/img/person.svg" class="contactsInputIcon">
                    </div>
                    <div class="contactsInputContainer">
                        <input id="emailAddContactPopUp" type="email" required pattern="[a-z0-9._%+\\-]+@[a-z0-9\\-]+\\.[a-z]{2,}$" class="nameEmailTel" placeholder="Email">
                        <img src="./assets/img/mail.svg" class="contactsInputIcon">
                    </div>
                    <div class="contactsInputContainer">
                    <input id="phoneAddContactPopUp" type="tel" required pattern="\\+?[0-9\\s\\-\\(\\)]{10,}" class="nameEmailTel" placeholder="Phone">
                        <img src="./assets/img/call.svg" class="contactsInputIcon">
                    </div>
                    <div class="cancelAndCreateContainer">
                        <button onclick="closeContactPopUp()" class="contactCancelButton">Cancel <img class="addContactCancelX" src="./assets/img/cancelX.svg"></button>
                        <button class="contactCreateButton" onclick="addContact()">Create Contact <img src="./assets/img/miniCheckIcon.svg"></button>
                    </div>                  
                </form>
            </div>
        </div>
    `;
}


/**
 * Generates HTML markup for the edit contact form.
 * 
 * @param {string} contactName - The name of the contact to be edited.
 * @param {string} initials - The initials of the contact.
 * @returns {string} - The HTML markup for the edit contact form.
 */
function editContactFormHTML(contactName, initials) {
    let contact = data.find(obj => obj['name'] === contactName);
  
    return /*html*/`
        <div class="addContactPopUpTitleContainer">
            <img class="addContactJoinLogo" src="./assets/img/joinLogoSmallWhite.svg">
            <h2 class="popUpTitle">Edit contact</h2>
            <div class="blueHorizontalLine">
            </div>
        </div>

        <div class="addContactFormContainer">
            <img onclick="closeContactPopUp()" class="popUpRightCornerCloseButton" src="./assets/img/cancelX.svg">
            <div class="contactFormAndImgContainer">
                <svg class="editContactSVG mobileEditContactProfileSVG" xmlns="http://www.w3.org/2000/svg" fill="none">
                    <circle class="listedContactSVGCircle" cx="60" cy="60" r="60" id="editViewContactCircle" fill="${contact['color']}"/>
                    <text x="50%" y="54%" text-anchor="middle" dy=".3em" font-size="47" font-family="inter" fill="white">${initials}</text>
                </svg>
                <form id="editContactForm" class="formContainer" onsubmit="return false">
                    <div class="contactsInputContainer">
                        <input id="nameEditContactPopUp" type="text" required class="nameEmailTel" placeholder="Name" value="${contact['name']}">
                        <img src="./assets/img/person.svg" class="contactsInputIcon">
                    </div>
                    <div class="contactsInputContainer">
                        <input id="emailEditContactPopUp" type="email" required pattern="[a-z0-9._%+\\-]+@[a-z0-9\\-]+\\.[a-z]{2,}$" class="nameEmailTel" placeholder="Email" value="${contact['email']}">
                        <img src="./assets/img/mail.svg" class="contactsInputIcon">
                    </div>
                    <div class="contactsInputContainer">
                        <input id="phoneEditContactPopUp" type="tel" required pattern="\\+?[0-9\\s\\-\\(\\)]{10,}" class="nameEmailTel" placeholder="Phone" value="${contact['phone']}">
                        <img src="./assets/img/call.svg" class="contactsInputIcon">
                    </div>
                    <div class="cancelAndCreateContainer">
                        <button onclick="closeContactPopUp()" class="contactCancelButton">Cancel <img class="addContactCancelX" src="./assets/img/cancelX.svg"></button>
                        <button class="contactCreateButton" onclick="editContact('${contactName}')">Save <img src="./assets/img/miniCheckIcon.svg"></button>
                    </div>                  
                </form>
            </div>
        </div>
    `;    
}


/**
 * Generates HTML markup for the contact list category.
 * 
 * @param {number} AZindex - The index of the alphabet.
 * @returns {string} - The HTML markup for the contact list category.
 */
function contactListCategoryHTML(AZindex) {
    return /*html*/`
    <div id="category${AZindex}" class="">
        <div class="alphabetCategoryContainer">
            <p class="alphabetCategoryLetter">${alphabet[AZindex]}</p>
        </div>
        <div class="alphabetSplitLineContainer">
            <div class="alphabetSplitLine">
            </div> 
        </div> 
        <div id="list${AZindex}"></div>   
    </div>        
    `;    
}


/**
 * Generates HTML markup for a listed contact.
 * 
 * @param {Object} contact - The contact object.
 * @returns {string} - The HTML markup for the listed contact.
 */
function listedContactHTML(contact) {
    let initials = getInitialsFromObject(contact);
    let underscoredName = contact['name'].replace(/\s/g, '_');
    return /*html*/`
        <button onclick="slideInContact('${contact['name']}', '${initials}')" id="${underscoredName}" class="listedContactContainer">
            <div class="listedContactSVGContainer">
                <svg class="listedContactSVG" xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="${contact['color']}">
                    <circle cx="21" cy="21" r="20" stroke="white" stroke-width="2"/>
                    <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="12" font-family="Arial" fill="white">${initials}</text>
                </svg>
            </div>
            <div class="nameAndMailListContainer">
                <p class="listedName">${contact['name']}</p>
                <p class="listedEmail">${contact['email']}</p>
            </div>
        </button>
    `;
}



/**
 * Displays contact details in the contact view section.
 * 
 * @param {string} contactName - The name of the contact.
 * @param {string} initials - The initials of the contact.
 */
function slideInContact(contactName, initials) {

    let contactView = document.getElementById('contactView');

    let contact = data.find(obj => obj['name'] === contactName);

    contactView.innerHTML = /*html*/`
        <div class="viewContactHeadContainer">
            <svg class="viewContactSVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
                <circle class="listedContactSVGCircle" cx="60" cy="60" r="60" fill="${contact['color']}"/>
                <text x="50%" y="54%" text-anchor="middle" dy=".3em" font-size="47" font-family="Arial" fill="white">${initials}</text>
            </svg>

            <div class="viewContactNameContainer">
                <h3 class="viewContactName">${contact['name']}</h3>
                <div class="viewContactButtonsContainer">
                    <button onclick="openEditPopUp('${contactName}', '${initials}')" class="viewContactButton"><img class="editAndDeleteIcon" src="./assets/img/editGreyIcon.svg">Edit</button>
                    <button onclick="openDeletePopUp('${contactName}')" class="viewContactButton"><img class="editAndDeleteIcon" src="./assets/img/deleteGreyIcon.svg">Delete</button>
                </div>
            </div>
        </div>
            
        <h4 class="viewContactSubTitle">Contact Information</h4>

        <div class="emailPhoneContainer">
            <div class="emailPhoneTitleContainer">
                <p class="emailPhoneTitle">Email</p>
                <a id="email" class="email" href="mailto:antonmayer@gmail.com">${contact['email']}</a>
            </div>
            <div class="emailPhoneTitleContainer">
                <p class="emailPhoneTitle">Phone</p>
                <a id="phone" class="phone" type="tel" href="tel:+491234567890">${contact['phone']}</a>
            </div>
        </div>

        <button id="mobileViewContactButton" onclick="openMobileContactOptions(event)" class="btn mobileViewContactButton">
            <img src="./assets/img/menuDotsButton.svg">
        </button>

        <div id="mobileContactOptions" class="mobileContactOptions">
            <button onclick="openEditPopUp('${contactName}', '${initials}')" class="btn mobileEditAndDeleteButton"><img class="mobileEditAndDeleteImg" src="./assets/img/editGreyIcon.svg">Edit</button>
            <button onclick="openDeletePopUp('${contactName}')" class="btn mobileEditAndDeleteButton"><img class="mobileEditAndDeleteImg" src="./assets/img/deleteGreyIcon.svg">Delete</button>
        </div>
    `;
    if (window.innerWidth <= 660) {
        slideInContactViewScreenForMobile(contactView);
    } else { 
        contactView.classList.remove('slideOutContactView');
        contactView.classList.add('slideInContactView');
    }
}


/**
 * Generates HTML markup for the delete popup.
 * 
 * @param {string} contactName - The name of the contact to be deleted.
 * @returns {string} - The HTML markup for the delete popup.
 */
function deletePopUpHTML(contactName) {
    return /*html*/`
        <div class="deleteRequestParagraphContainer">
            <p class="deleteRequestParagraph">Are you sure you want to delete <br><span class="deleteName">${contactName}<span>?</p>
        </div>
        <div class="yesNoButtonContainer">
            <button class="contactCancelButton noButton" onclick="closeDeletePopUp()">No<img class="addContactCancelX" src="./assets/img/cancelX.svg"></button>
            <button class="contactCreateButton yesButton" onclick="deleteContact('${contactName}')" class="btn">Yes<img src="./assets/img/miniCheckIcon.svg"></button>
        </div>
    `;
}



/**
 * The function `loadGuestFromServer` asynchronously fetches guest contacts data from a server and maps
 * the response to an array.
 */
async function loadGuestFromServer() {
    try {
        const response = await fetch(`${BASE_URL_GUEST}/guestContacts.json`);
        if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok.');
        }
        const data = await response.json();
        const serverDaten = Object.keys(data).map(id => ({
            id,
            ...data[id]
        }));
        guesteArray = [user, ...serverDaten];

    } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
    }
}


/**
 * The `initAddTask` function asynchronously loads guest and tasks from the server, generates
 * checkboxes, and adds an event listener to checkboxes to get their values.
 */
async function initAddTask() {
    await loadGuestFromServer();
    generateCheckBox();
    document.querySelectorAll('input[name="optionen"]').forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            getValues('add_task_show_check');
        });
    });
}


/**
 * Sets the inner HTML of an element with the id 'boardPopUp' to render HTML for adding tasks to a specified column.
 * 
 * @param {string} column - The specific column identifier where tasks will be added.
 * 
 * This function retrieves the element with the id 'boardPopUp' from the DOM and sets its inner HTML
 * to the result of rendering HTML content for adding tasks to the specified column. The `column` parameter
 * typically represents a category, status, or any other grouping within a task management board.
 */
function generateAddTasks(column) {
    let boardPopUp = document.getElementById('boardPopUp');
    boardPopUp.innerHTML = renderHtmlAddtask(column);
}


/**
 * Adds a new task to a list of tasks, saves it to the server and local storage, and updates the user interface.
 * 
 * @param {string} column - The category or column where the task will be added.
 * @returns {Promise<void>} - A promise that resolves once the task is successfully added and saved.
 * 
 * @description
 * This asynchronous function performs the following steps:
 * 1. Checks if the `addTaskProcess` flag is set; if true, exits early.
 * 2. Disables the 'createTaskButton' element on the page to prevent duplicate submissions.
 * 3. Generates a unique name for a checkbox.
 * 4. Constructs a task object with properties like category, date, description, ID, name, initial,
 *    color, priorityImg, priority, status, title, subtasks, and selectedTask.
 * 5. Pushes the task object to the `todos` array.
 * 6. Saves the updated `todos` array to the server asynchronously.
 * 7. Saves the updated `todos` array to local storage.
 * 8. If the current page URL includes 'board.html', closes the popup window, reinitializes the board tasks,
 *    and updates the UI.
 * 9. Reinitializes the add task form and displays a confirmation slide-in.
 */
async function addTaskToTasks(column) {
    if (addTaskProcess) return;
    addTaskProcess = true;

    document.getElementById('createTaskButton').disabled = true;
    generateCheckBoxName();

    let task = {
        'category': column,
        'date': document.getElementById('task_date').value,
        'description': document.getElementById('task_description').value,
        'id': generateUniqueId(),
        'name': namelist,
        'initial': initials,
        'color': colorList,
        'priorityImg': getPriorityImage(userPriotity),
        'priority': getUserPriorityStatus(userPriotity),
        'status': document.getElementById('task_category').value,
        'title': document.getElementById('task_title').value,
        'subtasks': subtasks,
        'selectedTask': [],
    };

    todos.push(task);
    await saveTasksToServer();
    saveTaskToLocalStorage();
    if (window.location.href.includes('board.html')) {
        closeWindow();
        initBoardTasks();
    }
    initAddTask();
    slideInConfirmation();
}


/**
 * Returns an image URL based on the user's priority level.
 * 
 * @param {string} userPriotity - The priority level of the task or item. Can be 'Urgent', 'Medium', or 'Low'.
 * @returns {string} - The path to an image based on the user's priority level:
 *   - './assets/img/vector_red.svg' for 'Urgent'
 *   - './assets/img/vector_strich.svg' for 'Medium' or if priority is undefined
 *   - './assets/img/vector_green.svg' for 'Low'
 */
function getPriorityImage(userPriotity) {
    switch (userPriotity) {
        case 'Urgent':
            return './assets/img/vector_red.svg';
        case 'Medium':
            return './assets/img/vector_strich.svg';
        case 'Low':
            return './assets/img/vector_green.svg';
        default:
            return './assets/img/vector_strich.svg';
    }
}


/**
 * Returns the user priority status, defaulting to 'Medium' if not provided.
 * 
 * @param {string} userPriotity - The user priority status to check.
 * @returns {string} - The user priority status. Returns the provided `userPriority` if truthy,
 *   otherwise defaults to 'Medium'.
 * 
 * @description
 * This function takes a parameter `userPriority` and checks if it has a value. If `userPriority`
 * has a value (is truthy), it returns that value. If `userPriority` is not provided (is falsy),
 * the function returns 'Medium' as the default priority status.
 */
function getUserPriorityStatus(userPriotity) {
    if (userPriotity) {
        return userPriotity;
    } else {
        return 'Medium';
    }
}


/**
 * The `slideInConfirmation` function animates a confirmation message sliding in and then fading out
 * after a set duration.
 */
function slideInConfirmation() {
    let confirmation = document.getElementById('addedTaskConfirmation');
    confirmation.style.animation = 'slideInAddedTaskConfirmation 1.25s cubic-bezier(0, 1.19, 0, 0.96)';
    setTimeout(() => {
        addTaskProcess = false;
        createTaskButton = document.getElementById('createTaskButton');
        createTaskButton.disabled = false;
        confirmation.style.animation = 'fadeConfirmation 0.3s ease-in-out';
        if (window.location.href.includes('add_task.html')) { navigateTo('board.html') }
    }, 1250);
}


/**
 * The function `generateUniqueId` generates a unique random ID within a range and ensures it is not
 * already in use.
 * @returns The function `generateUniqueId` returns a randomly generated unique ID as a string.
 */
function generateUniqueId() {
    let id;
    do {
        id = Math.floor(Math.random() * 1000000).toString();
    } while (usedIds.has(id));
    usedIds.add(id);
    return id;
}


/**
 * Toggles the active state of a button and sets the user priority based on the button's text content.
 * 
 * @param {string} id - The ID of the task priority button that was interacted with.
 * 
 * @description
 * This function toggles the 'active' class of the button identified by the `id` parameter. If the button
 * is already active, it removes the 'active' class. If the button is not active, it removes the 'active'
 * class from all other buttons with the class '.add_button_group' and adds the 'active' class to the
 * clicked button. It then sets the global variable `userPriotity` to the trimmed text content of the
 * clicked button.
 */
function getTaskPriority(id) {
    const button = document.getElementById(id);
    if (button.classList.contains('active')) {
        button.classList.remove('active');
    } else {
        document.querySelectorAll('.add_button_group').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');

        userPriotity = button.innerText.trim();
    }
}


/**
 * Toggles the visibility of checkboxes and clears the value of an input field based on a boolean variable `show`.
 * 
 * @param {Event} event - The event object representing an event that occurs in the DOM.
 * 
 * @description
 * This function toggles the visibility of checkboxes based on the global boolean variable `show`.
 * If `show` is true, checkboxes are made visible and `show` is set to false.
 * If `show` is false, checkboxes are hidden, `show` is set to true, and the value of the input field
 * with the ID 'task_assignet_input' is cleared.
 */
function toggleCheckboxes(event) {
    event.stopPropagation();
    let idInput = document.getElementById('task_assignet_input');
    let checkboxes = document.getElementById("checkBoxes");
    if (show) {
        checkboxes.style.visibility = "initial";
        show = false;
    } else {
        checkboxes.style.visibility = "hidden";
        show = true;
        idInput.value = ''
    }
}


/**
 * The function generates a list of selected guests' names, colors, and initials based on checked
 * checkboxes.
 */
function generateCheckBoxName() {
    const selectedGuests = Array.from(document.querySelectorAll('input[name="optionen"]:checked'))
        .map(checkbox => guesteArray.find(g => g.name === checkbox.value))
        .filter(Boolean);

    selectedGuests.forEach(guest => {
        namelist.push(guest.name);
        colorList.push(guest.color);
        initials.push(getInitials(guest.name));
    });
}


/**
 * The function generates checkboxes based on elements in an array and hides the checkboxes when
 * clicking outside the select box.
 */
function generateCheckBox() {
    let id = document.getElementById('check_box_user_name');
    if (id) {
        id.innerHTML = '';
        for (let i = 0; i < guesteArray.length; i++) {
            const element = guesteArray[i];
            id.innerHTML += renderHtmlGenerateCheckBox(element, i)
        }

        let checkboxes = document.getElementById("checkBoxes");
        if (checkboxes) {
            document.addEventListener('click', function (event) {
                let selectBox = document.querySelector('.selectBox');

                if (selectBox && !selectBox.contains(event.target)) {
                    checkboxes.style.visibility = "hidden";
                    show = true;
                }
            });
        }
    }
}


/**
 * The function `searchNameFromGuestList` searches for a name from a guest list based on user input and
 * renders the results.
 */
function searchNameFromGuestList() {
    let idInput = document.getElementById('task_assignet_input').value;
    idInput = idInput.toLowerCase();

    let id = document.getElementById('check_box_user_name');

    id.innerHTML = '';
    for (let i = 0; i < guesteArray.length; i++) {
        const element = guesteArray[i];
        let initial = getInitials(element.name)
        if (element.name.toLowerCase().includes(idInput)) {
            id.innerHTML += rendersearchNameFromGuestList(element, initial)
        }
    }
}


/**
 * Retrieves the checked values of checkboxes with a specific name and calls the `checkGuestsName` function with those values.
 * 
 * @param {string} id - The ID of an HTML element where the selected values from checkboxes will be displayed.
 * 
 * @description
 * This function retrieves the checked values of checkboxes with the name 'optionen' and updates the inner HTML
 * of the element identified by the `id` parameter with these values. It then calls the `checkGuestsName` function
 * with an array of the checked values.
 */
function getValues(id) {
    let add_task_show_check = document.getElementById(id);
    const checkboxes = document.querySelectorAll('input[name="optionen"]:checked');
    add_task_show_check.innerHTML = '';

    let checkedValues = [];
    checkboxes.forEach((checkbox) => {
        checkedValues.push(checkbox.value);
    });
    checkGuestsName(checkedValues);
}


/**
 * Retrieves selected guest names and their corresponding colors from checkboxes and displays their initials with respective colors on the webpage.
 * 
 * @param {Array<string>} checkedValues - An array of strings representing the names of guests selected through checkboxes.
 * 
 * @description
 * This function checks if any checkboxes have been checked by verifying the truthiness of the `checkedValues` parameter.
 * If `checkedValues` is truthy, the function retrieves the selected checkboxes with the name 'optionen',
 * finds the corresponding guest information from `guesteArray`, and displays the initials of the selected guests
 * along with their respective colors on the webpage.
 */
function checkGuestsName(checkedValues) {
    if (checkedValues) {
        const selectedCheckboxes = document.querySelectorAll('input[name="optionen"]:checked');
        const selectedGuests = [];
        selectedCheckboxes.forEach(checkbox => {
            const guestName = checkbox.value;
            const guest = guesteArray.find(g => g.name === guestName);
            if (guest) {
                selectedGuests.push({
                    name: guest.name,
                    color: guest.color
                });
            }
        });
        add_task_show_check.innerHTML = '';
        for (let index = 0; index < selectedGuests.length; index++) {
            const element = selectedGuests[index];
            let initial = getInitials(element.name);
            add_task_show_check.innerHTML += `
                <div class="add_task_checkbox_name board_task_user_initial show_task_user_initial" style="background-color: ${element.color};">${initial}</div>
            `;
        }
    }
}

/**
 * Adds or removes classes to toggle checkbox and label colors based on checkbox state.
 * 
 * @param {Event} event - The event object representing a change event on a checkbox.
 * 
 * @description
 * This function is triggered on the change event of checkboxes with the name 'optionen'. It toggles the
 * 'checkedLabel' class on the closest '.checkBoxLabel' element based on the checked state of the checkbox.
 * Additionally, it toggles the 'whiteCheckbox' class on the closest '.checkbox' element to change checkbox
 * appearance. If the checkbox is checked, both classes are added; if unchecked, both classes are removed.
 */
function addOrRemoveCheckboxLabelColor(event) {
    let checkbox = event.target;
    let checkboxLabel = checkbox.closest('.checkbox');
    const checkboxes = document.querySelectorAll('input[name="optionen"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = checkbox.closest('.checkBoxLabel');
            if (checkbox.checked) {
                label.classList.add('checkedLabel');
                checkboxLabel.classList.add('whiteCheckbox');
            } else {
                label.classList.remove('checkedLabel');
                checkboxLabel.classList.remove('whiteCheckbox');
            }
        });
    });    
}


/**
 * The clearForm function resets the input fields in a form with the ID "meinFormular".
 */
function clearForm() {
    const addTaskShowCheckElement = document.getElementById('add_task_show_check');

    if (addTaskShowCheckElement) {
        subtasks = [];
        document.getElementById('add_task_show_check').innerHTML = '';
        document.getElementById('get_subtask').innerHTML = '';
        document.getElementById("meinFormular").reset();
        getSubTaskAddTask();        
    } else {
        return;
    }
}


/**
 * The function `showAddAndDeleteSubTask` hides the add task button, displays a check button, and
 * displays a delete subtask button.
 */
function showAddAndDeleteSubTask() {
    let add_task_button_plus = document.getElementById('add_task_button_plus');
    let deleteSubtask = document.getElementById('delete_subtask');
    let check = document.getElementById('check');

    add_task_button_plus.style.visibility = 'hidden';
    check.style.display = 'inline';
    deleteSubtask.style.display = 'inline';
}


/**
 * The function `deleteSubtask` resets and hides elements related to subtasks in a task management
 * interface.
 */
function deleteSubtask() {
    let add_task_button_plus = document.getElementById('add_task_button_plus');
    let deleteSubtask = document.getElementById('delete_subtask');
    let check = document.getElementById('check');
    let task_subtasks = document.getElementById('task_subtasks');
    task_subtasks.value = '';
    check.style.display = 'none';
    deleteSubtask.style.display = 'none';
    add_task_button_plus.style.visibility = 'initial';
}


/**
 * The function `getSubtask` retrieves subtasks from an array and displays them on a webpage.
 */
function getSubtask() {
    let get_subtask = document.getElementById('get_subtask');
    get_subtask.innerHTML = '';
    if (subtasks) {
        for (let i = 0; i < subtasks.length; i++) {
            const element = subtasks[i];
            get_subtask.innerHTML = `
                ${element}
            `;
        }
    }
}


/**
 * The function `addNewSubTask` adds a new subtask to a list and updates the display accordingly.
 */
function addNewSubTask() {
    let task_subtask = document.getElementById('task_subtasks');
    let add_task_button_plus = document.getElementById('add_task_button_plus');
    let deleteSubtask = document.getElementById('delete_subtask');
    let check = document.getElementById('check');

    if (task_subtask.value) {
        subtasks.push(task_subtask.value);
    }
    getSubTaskAddTask();
    check.style.display = 'none';
    deleteSubtask.style.display = 'none';
    add_task_button_plus.style.visibility = 'initial';
    task_subtask.value = "";
}


/**
 * The function `getSubTaskAddTask` populates a specified HTML element with subtasks data.
 */
function getSubTaskAddTask() {
    let get_subtask = document.getElementById('get_subtask');
    get_subtask.innerHTML = '';
    if (subtasks) {
        for (let i = 0; i < subtasks.length; i++) {
            const element = subtasks[i];
            get_subtask.innerHTML += renderGetSubTaskAddTask(i, element);
        }
    }
}


/**
 * Displays an edit button and input field for a specific subtask based on the index `i`.
 * 
 * @param {number} i - The index used to identify the specific subtask.
 * 
 * @description
 * This function shows the edit button and sets the value of the input field corresponding to the subtask
 * at index `i`. The HTML elements are identified using the ID suffixes `show_task_subtask_edit_btn{i}` for
 * the edit button and `show_task_subtask_edit_input{i}` for the input field.
 */
function showEditNewSubTask(i) {
    let show_task_subtask_edit_btn = document.getElementById(`show_task_subtask_edit_btn${i}`);
    show_task_subtask_edit_btn.style.display = 'flex';
    let show_task_subtask_edit_input = document.getElementById(`show_task_subtask_edit_input${i}`);
    show_task_subtask_edit_input.value = subtasks[i];
}


/**
 * Updates a specific subtask in an array and then calls another function to update the task.
 * 
 * @param {number} i - The index used to access and update a specific subtask in the `subtasks` array.
 * 
 * @description
 * This function retrieves the value from the input field identified by `show_task_subtask_edit_input{i}`,
 * updates the corresponding subtask in the `subtasks` array at index `i`, and then calls the `getSubTaskAddTask`
 * function to update the task with the modified subtask list.
 */
function addEditNewSubTask(i) {
    let show_task_subtask_edit_input = document.getElementById(`show_task_subtask_edit_input${i}`);
    subtasks[i] = show_task_subtask_edit_input.value;
    getSubTaskAddTask();
}


/**
 * Deletes a specific subtask from the `subtasks` array at the given index `i` and updates the task.
 * 
 * @param {number} i - The index of the subtask to be deleted from the `subtasks` array.
 * 
 * @description
 * This function uses the `splice` method to remove the subtask at index `i` from the `subtasks` array.
 * After removing the subtask, it calls the `getSubTaskAddTask` function to update the task with the
 * modified subtask list.
 */
function deleteNewSubTask(i) {
    subtasks.splice(i, 1);
    getSubTaskAddTask();
}


/**
 * Sets the minimum date for an input field with id 'task_date' to today's date.
 * This function is executed when the DOM content is fully loaded.
 * 
 * @param {Event} event - The DOMContentLoaded event object.
 */
document.addEventListener('DOMContentLoaded', (event) => {
    function setMinDate() {
        const input = document.getElementById('task_date');
        if (input) {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            const minDate = `${year}-${month}-${day}`;

            input.min = minDate;
        }
    }

    setMinDate();
});


/**
 * Generates and returns the current date in 'YYYY-MM-DD' format.
 * 
 * @returns {string} The current date formatted as 'YYYY-MM-DD'.
 */
function setDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const minDate = `${year}-${month}-${day}`;

    return minDate
}



/**
 * Generates HTML markup for a checkbox element with user initials and name.
 * @param {Object} element - An object representing a user with properties like `name`, `color`, etc.
 * @param {number} i - Index or identifier for the element being rendered.
 * @returns {string} HTML template string generating a checkbox element with user initials and name.
 */
function renderHtmlGenerateCheckBox(element, i) {
    let initial = element.name;
    return /*html*/`        
    <label class="checkBoxLabel" onclick="addOrRemoveCheckboxLabelColor(event)">
        <div class="board_task_check_box_name addTaskCheckBoxContainer">
            <div class="board_task_user_initial check_box_initial" style="background-color:${element.color}">${getInitials(initial)}</div>
            <p id="${i}">${element.name}</p>
        </div>
        <div class="checkbox-wrapper-27">
            <label class="checkbox">
                <input type="checkbox" name="optionen" value="${element.name}">
                <span class="checkbox__icon padding-right"></span>
            </label>
        </div>
    </label>
`;
}


/**
 * Generates HTML markup for displaying a guest's name and initial with a checkbox.
 * @param {Object} element - An object containing information about a guest, including properties like `name`, `color`, etc.
 * @param {string} initial - Initial of the guest's name, displayed inside a colored box next to the guest's full name.
 * @returns {string} HTML template string including a label element with the guest's name, initial, and a checkbox input.
 */
function rendersearchNameFromGuestList(element, initial) {
    return  /*html*/`        
        <label>
        <div class="board_task_check_box_name">
            <div class="board_task_user_initial check_box_initial" style="background-color:${element.color}">${initial}</div>
            <p>${element.name}</p>
        </div>
        <div class="checkbox-wrapper-27">
            <label class="checkbox">
                <input type="checkbox" name="optionen" value="${element.name}">
                <span class="checkbox__icon"></span>
            </label>
        </div>
    </label>
`;
}


/**
 * Generates HTML code for adding a new task to a specified column in a task management system.
 * @param {string} column - Specifies the column in which the task will be added.
 * @returns {string} HTML template string representing a form for adding a task. The form includes fields
 * for title, description, assigned to, due date, priority, category, subtasks, and buttons for creating
 * or closing the task.
 */
function renderHtmlAddtask(column) {
    return /*html*/`
    <div class="show_add_task" id="showTaskContainer">
        <img class="close_pop_add_task" src="./assets/img/close.svg" onclick="closeWindow()">
        <h1>Add Task</h1>
        <form id="meinFormular" onsubmit="event.preventDefault(); addTaskToTasks(${column});">
                <div class="add_task_form">
                    <div class="add_task_width50">
                        <div class="add_task_title add_task_form_row">
                            <label for="">Title<b>*</b></label>
                            <input id="task_title" class="add_task_input" required type="text" placeholder="Enter a title">
                        </div>
                        <div class="add_task_descripion add_task_form_row">
                            <label for="">Description</label>
                            <textarea id="task_description" class="add_task_textarea" name=""
                                placeholder="Enter a Description"></textarea>
                        </div>

                        <div class="add_task_assigned add_task_form_row">
                            <label id="assignet_to">Assignet to</label>
                            <div class="selectBox" onclick="toggleCheckboxes(event)">
                                <img src="./assets/img/arrow_drop_down.svg" alt="">
                                <input class="add_task_input" id="task_assignet_input" placeholder="Select options" onkeydown="searchNameFromGuestList()"/>
                            </div>
                            <div class="checkbox_name" id="checkBoxes" onclick="event.stopPropagation()">
                                <div class="dropdown_users_name" id="check_box_user_name"></div>
                            </div> 
                            <div class="add_task_show_check" id="add_task_show_check"></div>   
                        </div>
                    </div>

                    <div class="add_task_line"></div>
                    
                    <div class="add_task_width50">
                        <div class="add_task_date add_task_form_row">
                            <label for="">Due date<b>*</b></label>
                            <input id="task_date" class="add_task_input add_date" type="date" required min="${setDate()}">
                        </div>
                        <div class="add_task_prio add_task_form_row">
                            <p>Prio</p>
                            <div class="add_task_button_group">
                                <button id="urgent" type="button" class="add_button_group add_task_hover_button" onclick="getTaskPriority('urgent')">Urgent
                                    <div class="add_task_button_vector">
                                        <img src="./assets/img/vector_red.svg">
                                    </div>
                                </button>
                                <button id="medium" type="button" class="add_button_group add_task_button_medium add_task_hover_button active" onclick="getTaskPriority('medium')">Medium
                                    <div class="add_task_button_vector">
                                        <img src="./assets/img/vector_strich.svg">
                                    </div>
                                </button>
                                <button id="low" type="button" class="add_button_group add_task_button_low  add_task_hover_button" onclick="getTaskPriority('low')">Low
                                    <div class="add_task_button_vector">
                                        <img src="./assets/img/vector_green.svg">
                                    </div>
                                </button>
                            </div>
                        </div>                    
                        <div class="add_task_category add_task_form_row">
                            <label for="">Categoriy<b>*</b></label>
                            <select id="task_category" class="add_task_input" required>
                                <option value="" hidden>Select task categoriy</option>
                                <option value="Technical Task">Technical Task</option>
                                <option value="User Story">User Story</option>
                            </select>
                        </div>
                        <div class="add_task_subtask add_task_form_row">
                            <label>Subtasks</label>
                            <div class="add_task_button_plus" id="add_task_button_plus">
                                <img class="add_task_button_add_subtask" src="./assets/img/add.svg"  onclick="showAddAndDeleteSubTask()">
                            </div>
                            <div class="add_task_check_delete" id="add_task_check_delete">
                                <img id="delete_subtask" src="./assets/img/Vector.svg" alt="" onclick="deleteSubtask()">
                                <img id="check" src="./assets/img/check-small-svgrepo-com.svg" onclick="addNewSubTask()">
                            </div>
                            <input class="add_task_input" id="task_subtasks" placeholder="Add new subtask" type="text">
                        </div>
                        <div class="get_subtask" id="get_subtask"></div>
                    </div>
                </div>
                <div class="add_task_footer">
                        <p id="add_task_footer"><b>*</b>This field is required</p>
                        <div class="add_task_button_group_footer">
                            <button type="button" class="add_task_button_clear add_task_hover_button" onclick="clearForm()">Clear
                                <img class="addContactCancelX" src="./assets/img/cancelX.svg">
                            </button>
                            <button id="createTaskButton" type="submit" class="add_task_button_create add_task_hover_button">Create Task
                                <img src="./assets/img/vector_check.svg">
                            </button>
                        </div>
                    </div>
            </form>
        </div>
        `;
}


/**
 * Generates HTML elements for displaying and editing subtasks within a task.
 * @param {number} i - Index or identifier for the subtask being rendered. Used to generate unique IDs
 * for elements within the rendered HTML template.
 * @param {string} element - Content of the subtask to be displayed in the rendered HTML. Used to
 * dynamically generate a section of HTML code for displaying and editing subtasks within a task.
 * @returns {string} String containing HTML elements for displaying a subtask with options to edit
 * and delete.
 */
function renderGetSubTaskAddTask(i, element) {
    return `
        <div class="add_task_subtask_edit_btn" id="show_task_subtask_edit_btn${i}">
            <input style="background: #F6F7F8; font-size: 13px;" type="text" id="show_task_subtask_edit_input${i}">
            <div class="show_task_subtask_edit_btn_delete_add">
            <img class="img_hover_btn" src="./assets/img/delete.svg" onclick="deleteNewSubTask(${i})">
            <img class="img_hover_btn" id="check" src="./assets/img/check-small-svgrepo-com.svg" onclick="addEditNewSubTask(${i})" >
        </div>
        </div>
        <div class="add_task_edit_subtasks_del_edit">
            <div class="get_show_task"><li>${element}</li></div>
            <div class="show_task_edit_subtasks_del_edit_button">
                <img class="img_hover_btn" src="./assets/img/edit.svg" onclick="showEditNewSubTask(${i})">
                <div class="cross_line"></div>
                <img class="img_hover_btn" src="./assets/img/delete.svg"  onclick="deleteNewSubTask(${i})">
            </div>
        </div>         
    `;
}


/**
 * The function `saveTasksToServer` asynchronously saves tasks to a server using a PUT request with
 * error handling.
 */
async function saveTasksToServer() {
    try {
        const response = await fetch(`${BASE_URL}/tasks.json`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todos)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Failed to save tasks to server:', error);
    }
}


/**
 * The function `loadTasksFromServer` asynchronously fetches tasks data from a server and maps the
 * response to an array of todos.
 */
async function loadTasksFromServer() {
    try {
        const response = await fetch(`${BASE_URL}/tasks.json`);
        if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok.');
        }
        const data = await response.json();
        todos = Object.keys(data).map(id => ({
            id,
            ...data[id]
        }));

    } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
    }
}


/**
 * Deletes a task with a specific ID from local storage, updates the task list,
 * saves the updated tasks to the server, and initializes the board tasks.
 * @param {string} id - The unique identifier of the task to be deleted from local storage.
 */
async function deleteTaskFromLocalStorage(id) {
    let arr = [];
    for (let i = 0; i < todos.length; i++) {
        arr = (todos.filter(todo => todo.id != id));
    }
    todos = arr;
    await saveTasksToServer();
    saveTaskToLocalStorage();
    initBoardTasks();
    closeShowTask();
}


/**
 * The function `saveTaskToLocalStorage` converts a JavaScript array `todos` to a JSON string and saves
 * it to the browser's local storage under the key 'todosToServer'.
 */
function saveTaskToLocalStorage() {
    let todosAsText = JSON.stringify(todos);
    localStorage.setItem('todosToServer', todosAsText)
}


/**
 * The function `loadTaskFromLocalStorage` retrieves and parses todos stored in the local storage.
 */
function loadTaskFromLocalStorage() {
    let todosAsText = localStorage.getItem('todosToServer');
    if (todosAsText) {
        todos = JSON.parse(todosAsText);
    }
}


/**
 * The function `initBoardTasks` loads tasks from the server and categorizes them into different
 * sections on a board based on their status.
 */
async function initBoardTasks() {
    await loadTasksFromServer();
    await loadGuestFromServer();

    let task = document.getElementById('board_to_do');
    let progress = document.getElementById('board_in_progress');
    let awaitFeedback = document.getElementById('board_await_feedback');
    let doneId = document.getElementById('board_done');

    let toDo = todos.filter(t => t['category'] == 'to_do');
    let inProgress = todos.filter(t => t['category'] == 'in_progress');
    let feedback = todos.filter(t => t['category'] == 'awaitt');
    let done = todos.filter(t => t['category'] == 'done');

    generateToDo(toDo, task, 'to do');
    generateToDo(inProgress, progress, 'in progress');
    generateToDo(feedback, awaitFeedback, 'await feedback');
    generateToDo(done, doneId, 'done');
}


/**
 * Populates a specified HTML element with to-do items from an array, including rendering subtasks
 * and progress bars.
 * @param {Array} arr - An array containing task objects to be displayed in a to-do list.
 * Each task object should have properties like `id`, `subtasks`, `selectedTask`, etc.
 * @param {HTMLElement} categorie_id - The DOM element where the generated to-do items will be displayed.
 * @param {string} category - Specifies the category of the to-do items being generated.
 * This parameter is used for rendering the to-do items in the appropriate category section.
 */
async function generateToDo(arr, categorie_id, category) {
    categorie_id.innerHTML = '';
    if (arr.length) {
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            categorie_id.innerHTML += renderHtmlToDo(element);
            let idSUb = document.getElementById(`idSUb${element.id}`);

            if (element.subtasks) {
                idSUb.innerHTML = '';
                idSUb.innerHTML = renderHtmlProgressBarEmpty(element)
                if (element.selectedTask) {
                    idSUb.innerHTML = '';
                    idSUb.innerHTML += renderHtmlProgressBar(element);
                }
            }
            getInitialsArray(element);
            getCategorieBackGroundColor(element);
        }
    } else {
        generateNoTask(categorie_id, category);
    }
}


/**
 * Adds a new task to a specified column in a task management system.
 * @param {string} column - Specifies the column or section where the task will be added.
 * This parameter is used to indicate the location within the task management system
 * where the new task will be created.
 */
function addTask(column) {
    generateAddTasks(column);
    displayGreyBackground();
    slideInTask();
    initAddTask();
}


/**
 * Populates a popup with information about a specific task, including subtasks and user details.
 * @param {string} id - The identifier of the specific task or contact to be displayed in the popup on the board.
 * This parameter is used to find the corresponding task object in the `todos` array and render its details in the popup.
 */
async function generateShowTask(id) {
    let boardPopUp = document.getElementById('boardPopUp');
    let contact = todos.find(obj => obj['id'] == id);
    boardPopUp.innerHTML = renderGenerateShowTaskHtml(contact, id);

    generateCheckBoxSubTask(contact, id)
    getshowTaskUserName(contact);
    getCategorieBackGroundColorShowTask(contact, id);
}


/**
 * Updates the status of a subtask for a given contact by adding or removing it from the selected tasks list,
 * saving the changes to local storage, sending the updated tasks to the server, and initializing the board tasks.
 * @param {Object} contact - An object representing a user or a person. It contains information such as name,
 * email, phone number, and other details.
 * @param {string} subtask - The specific subtask that you want to update the status for within the `contact` object.
 * @param {boolean} isChecked - A boolean value indicating whether the subtask is checked (true) or not checked (false).
 * If `isChecked` is true, the subtask will be added to the `selectedTask` array of the `contact`; if false, it will be removed.
 */
async function updateSubtaskStatus(currentTask, subtask, isChecked) {
    if (currentTask) {
        if (!currentTask.selectedTask) {
            currentTask.selectedTask = [];
        }
        if (isChecked) {
            if (!currentTask.selectedTask.includes(subtask)) {
                currentTask.selectedTask.push(subtask);
            }
        } else {
            currentTask.selectedTask = currentTask.selectedTask.filter(task => task !== subtask);
        }
        saveTaskToLocalStorage();
        await saveTasksToServer();
        initBoardTasks();
    }
}


/**
 * Populates the `show_task_user_name` element with user names and initials from a given contact object.
 * @param {Object} contact - An object containing information about a contact, likely including properties
 * such as `name`, `color`, and `initial` for each user.
 */
function getshowTaskUserName(contact) {
    let showTaskUserName = document.getElementById('show_task_user_name');
    showTaskUserName.innerHTML = "";
    if (contact.name) {
        for (let i = 0; i < contact['name'].length; i++) {
            const element = contact['name'][i];
            showTaskUserName.innerHTML += /*html*/`
                <div class="show_task_assigned_to_users">                
                    <div class="board_task_user_initial show_task_user_initial" style="background-color: ${contact.color[i]};">${contact.initial[i]}</div>
                    <div>${element}</div>
                </div>
            `;
        }
    }
}


/**
 * Retrieves a task by its ID, hides the task container, and populates a popup with the task details for editing.
 * @param {number} id - The unique identifier of the task to be edited. This ID is used to locate the task within
 * the `todos` array and retrieve its details.
 */
function editTask(id) {
    let contact = todos.find(obj => obj['id'] == id);
    let boardPopUp = document.getElementById('boardPopUp');
    let showTaskContainer = document.getElementById('showTaskContainer');

    showTaskContainer.style.display = 'none';
    boardPopUp.innerHTML += renderEditTaskHtml(contact);/** */

    getcheckBoxesEdit(id);
    getContactPriorityEdit(contact);
    getContactInitialEdit(contact);
    getSubtaskEdit(contact);
    getCurrentTaskCategoryEdit(contact);
}


/**
 * Sets the active class on the corresponding HTML element based on the priority of a contact.
 * @param {Object} contact - The contact object containing the priority property.
 * @param {string} contact.priority - The priority level of the contact ('Urgent', 'Medium', or 'Low').
 */
function getContactPriorityEdit(contact) {
    let urgent_edit = document.getElementById('urgent_edit');
    let medium_edit = document.getElementById('medium_edit');
    let low_edit = document.getElementById('low_edit');

    switch (contact.priority) {
        case 'Urgent':
            urgent_edit.classList.add('active');
            break;
        case 'Medium':
            medium_edit.classList.add('active');
            break
        case 'Low':
            low_edit.classList.add('active');
            break
    }
}


/**
 * Populates input fields with contact information and calls another function to generate selected names.
 * @param {Object} contact - The contact object containing information such as title, description, and date.
 * @param {string} contact.title - The title of the contact task to be edited.
 * @param {string} contact.description - The description of the contact task to be edited.
 * @param {string} contact.date - The date associated with the contact task to be edited.
 */
function getContactInitialEdit(contact) {
    let task_title_edit = document.getElementById('task_title_edit');
    let task_description_edit = document.getElementById('task_description_edit');
    let task_date_edit = document.getElementById('task_date_edit');

    task_title_edit.value = contact.title;
    task_description_edit.value = contact.description;
    task_date_edit.value = contact.date;

    generateSelectedNames(contact);
}


/**
 * Populates a specified HTML element with user initials and background colors based on the provided contact data.
 * @param {Object} contact - The contact object containing information such as color and initial.
 * @param {string[]} contact.color - An array of background colors corresponding to each user.
 * @param {string[]} contact.initial - An array of initials representing each user.
 */
function generateSelectedNames(contact) {
    let task_edit_initial = document.getElementById('task_edit_initial');
    task_edit_initial.innerHTML = '';
    if (selectedNames) {
        for (let i = 0; i < selectedNames.length; i++) {
            task_edit_initial.innerHTML += `
                <div class="board_task_user_initial show_task_user_initial" style="background-color: ${contact.color[i]};">${contact.initial[i]}</div>
                `;
        }
    } else {
        task_edit_initial.innerHTML = '';
    }
}


/**
 * Populates a specified HTML element with subtask information based on the given contact object.
 * @param {Object} contact - The contact object containing subtask information.
 * @param {Object[]} contact.subtasks - An array of subtasks belonging to the contact.
 * @param {string} contact.subtasks[].title - The title of the subtask.
 * @param {string} contact.subtasks[].description - The description of the subtask.
 * @param {string} contact.subtasks[].date - The date associated with the subtask.
 */
function getSubtaskEdit(contact) {
    let task_subtasks_edit = document.getElementById('show_task_subtask_edit');
    task_subtasks_edit.innerHTML = '';

    if (contact.subtasks) {
        for (let i = 0; i < contact.subtasks.length; i++) {
            const element = contact.subtasks[i];
            task_subtasks_edit.innerHTML += rendergetSubtaskEditHtml(element, contact, i);
        }
    } else {
        task_subtasks_edit.innerHTML = '';
    }
}


/**
 * Sets the selected option in a dropdown menu based on the current task category of a contact.
 * @param {Object} contact - The contact object containing information about the task category.
 * @param {string} contact.category - The current category of the task associated with the contact.
 */
function getCurrentTaskCategoryEdit(contact) {
    let task_taskCategory_edit = document.getElementById('task_category_edit');
    let currentTaskCategory = contact.category;
    let options = task_taskCategory_edit.options
    for (let i = 0; i < options.length; i++) {
        if (options[i].value === currentTaskCategory) {
            options[i].selected = true;
        } else {
            options[i].selected = false;
        }
    }
}


/**
 * Displays a specific subtask for editing within a task.
 * @param {number} i - The index of the subtask within the `subtasks` array of the `currentTask` object.
 * @param {string} id - The unique identifier of the task to be edited, used to locate the task in the `todos` array.
 */
function showTaskEditSubtask(i, id) {
    let currentTask = todos.find(obj => obj['id'] == id);
    let show_task_subtask_edit_btn = document.getElementById(`show_task_subtask_edit_btn${i}`);
    show_task_subtask_edit_btn.style.display = 'flex';
    let show_task_subtask_edit_input = document.getElementById(`show_task_subtask_edit_input${i}`);

    show_task_subtask_edit_input.value = currentTask.subtasks[i];
}


/**
 * Updates a subtask for a specific task and saves the changes to local storage and the server.
 * @param {number} i - The index of the subtask within the `currentTask` object's subtasks array to add or edit.
 * @param {string} id - The unique identifier of the task to be updated, used to locate the task in the `todos` array.
 * @returns {Promise<void>} A Promise that resolves once the subtask is updated and changes are saved.
 */
async function addEditSubtask(i, id) {
    let currentTask = todos.find(obj => obj['id'] == id);
    let show_task_subtask_edit_input = document.getElementById(`show_task_subtask_edit_input${i}`);
    if (show_task_subtask_edit_input.value !== '') {
        currentTask.subtasks[i] = show_task_subtask_edit_input.value;
    } else {
        currentTask.subtasks.splice(i, 1)
        
    }
    saveTaskToLocalStorage();
    await saveTasksToServer();
    getSubtaskEdit(currentTask);
    initBoardTasks();
}


/**
 * Deletes a subtask from a task, saves the updated task to local storage, sends the updated tasks to
 * the server, and retrieves the edited subtask for display.
 * @param {number} i - The index of the subtask to be deleted from the `subtasks` array of a task.
 * @param {string} id - The unique identifier of the task from which the subtask needs to be deleted,
 * used to locate the task in the `todos` array.
 * @returns {Promise<void>} A Promise that resolves once the subtask is deleted and changes are saved.
 */
async function showTaskDeleteSubtask(i, id) {
    let contact = todos.find(obj => obj['id'] == id);
    contact.subtasks.splice(i, 1);
    saveTaskToLocalStorage();
    await saveTasksToServer();
    getSubtaskEdit(contact);
    initBoardTasks();
}


/**
 * Adds a new subtask to a task, saves it to local storage, sends it to the server, and updates the UI.
 * @param {string} id - The unique identifier of the task in the `todos` array that needs to be updated
 * with a new subtask.
 * @returns {Promise<void>} A Promise that resolves once the new subtask is added and changes are saved.
 */
async function addNewSubTaskEdit(id) {
    let contact = todos.find(obj => obj['id'] == id);
    let task_subtasks = document.getElementById('task_subtasks_edit');
    let task_subtasks_edit = task_subtasks.value
    if (!contact.subtasks) {
        contact.subtasks = [];
    }
    if (task_subtasks_edit) {
        contact.subtasks.push(task_subtasks_edit);
    }
    task_subtasks.value = '';
    saveTaskToLocalStorage();
    await saveTasksToServer();
    getSubtaskEdit(contact);
    initBoardTasks();
}


/**
 * Updates a specific todo item by finding it in the `todos` array, updating its details, guest
 * information, priority, saving the updates, and then reloading the user interface.
 * @param {string} id - The unique identifier of the todo item in the `todos` array that needs to be
 * upgraded.
 * @returns {Promise<void>} A Promise that resolves once the todo item is upgraded and changes are
 * saved.
 */
async function upgradeTodos(id) {
    let contact = todos.find(obj => obj['id'] == id);
    updateContactDetails(contact);
    updateGuestInfo(contact);
    updatePriority(contact);
    updateTaskCategory(contact);
    await saveTaskUpdates();
    reloadUI();
    showTask(id);
}


/**
 * Updates contact details based on input values from specific elements in a form.
 * @param {Object} contact - The contact object to be updated. It contains the following properties:
 * @param {string} contact.title - The title of the contact or task.
 * @param {string} contact.description - The description or details of the contact or task.
 * @param {string} contact.date - The date associated with the contact or task.
 * @param {string} contact.assignedTo - The person assigned to the contact or task.
 * @param {Array<string>} contact.name - An array of names or initials associated with the contact or task.
 */
function updateContactDetails(contact) {
    contact.title = document.getElementById('task_title_edit').value;
    contact.description = document.getElementById('task_description_edit').value;
    contact.date = document.getElementById('task_date_edit').value;
    contact.assignedTo = document.getElementById('task_assignet_input_edit').value;
    contact.name = selectedNames;
}


/**
 * Updates the color and initials of a contact based on selected guest names.
 * @param {Object} contact - The contact object to be updated. It contains information about a guest,
 * including their name, color, and initials.
 * @param {Array<string>} selectedNames - An array of selected guest names whose colors and initials
 * will be updated in the contact object.
 */
function updateGuestInfo(contact) {
    let guestColor = [];
    let initials = [];
    selectedNames.forEach(element => {
        let guest = guesteArray.find(guest => guest.name === element);
        guestColor.push(guest.color);
        initials.push(getInitials(guest.name));
    });
    contact.color = guestColor;
    contact.initial = initials;
}


/**
 * Updates the priority and priority image of a contact based on a user-defined priority value.
 * @param {Object} contact - The contact object to be updated. It represents a contact and contains
 * properties like `priority` and `priorityImg` that will be updated based on the user-defined priority.
 * @param {string} userPriority - The user-defined priority value to update in the contact object.
 * This value will be assigned to the `priority` property of the contact object if truthy.
 */
function updatePriority(contact) {
    if (userPriotity) {
        contact.priority = userPriotity;
        contact.priorityImg = getPriorityUpdateTodos(userPriotity);
    }
}


/**
 * Updates the category of a task contact based on user input from a specific HTML element.
 * @param {Object} contact - The contact object representing a task. It contains properties
 * such as `category` that will be updated based on user input.
 */
function updateTaskCategory(contact) {
    contact.category = document.getElementById('task_category_edit').value;
}


/**
 * The function `saveTaskUpdates` saves task updates to both local storage and the server
 * asynchronously.
 */
async function saveTaskUpdates() {
    saveTaskToLocalStorage();
    await saveTasksToServer();
}


/**
 * The `reloadUI` function initializes adding tasks, initializes board tasks, and closes the task
 * display.
 */
function reloadUI() {
    initAddTask();
    initBoardTasks();
}


/**
 * The function searches for a task on a board based on user input and updates the board accordingly.
 */
function searchTaskFromBoard() {
    let input_find_task = document.getElementById('input_find_task');
    input_find_task = input_find_task.value.toLowerCase();

    if (input_find_task) {
        const ids = ['board_to_do', 'board_in_progress', 'board_await_feedback', 'board_done'];
        const elements = ids.map(id => document.getElementById(id));
        elements.forEach(element => element.innerHTML = '');

        for (let i = 0; i < todos.length; i++) {
            const element = todos[i];
            if (element.title.toLowerCase().includes(input_find_task)) {
                let category = element.category;
                searchSwithId(category);
                let searchResult = document.getElementById(searchId);
                searchResult.innerHTML = renderHtmlToDo(element);
                getInitialsArray(element);
                getCategorieBackGroundColor(element);
            }
        }
    } else {
        initBoardTasks();
    }
}


/**
 * Populates a board with initials and colors, displaying a limited number of initials with circles
 * and showing the rest as a count.
 * @param {Object} element - The object containing properties like `initial`, `color`, and `id`.
 * It represents the element for which initials and colors are to be populated on the board.
 */
function getInitialsArray(element) {
    let initialsArray = element.initial;
    let colorsArray = element.color;
    let showCircleWithInitials = 3;
    if (initialsArray) {
        let showCircleWithRestOfPersons = initialsArray.length - showCircleWithInitials;
        let boardTaskInitial = document.getElementById(`board_task_initial${element.id}`);
        boardTaskInitial.innerHTML = '';
        for (let j = 0; j < initialsArray.length; j++) {
            let initial = initialsArray[j];
            let color = colorsArray[j];
            if (j < showCircleWithInitials) {
                boardTaskInitial.innerHTML += createInitialBlock(initial, color);
            } else {
                boardTaskInitial.innerHTML += createRemainingPersonsBlock(showCircleWithRestOfPersons);
                break;
            }
        }
    }
}


/**
 * The function `renderHtmlToDo` generates HTML code for displaying a to-do task element.
 * @param {Object} element - An object containing properties related to a task.
 * @param {number} element.id - The unique identifier of the task.
 * @param {string} element.status - The status of the task.
 * @param {string} element.title - The title of the task.
 * @param {string} element.description - The description of the task.
 * @param {string} element.priorityImg - The URL of the priority image associated with the task.
 * @returns {string} Returns an HTML template string representing a task element.
 * The template includes elements for task category, title, description, priority image,
 * and task-related information. Event handlers for drag-and-drop and task click events
 * are also included.
 */
function renderHtmlToDo(element) {
    
    return /*html*/`
    <div class="task" draggable="true" ondragstart=" startDragging(${element.id})" onclick="showTask(${element.id})">
        <div class="board_task_category" id="board_task_category${element.id}">${element.status}</div>
        <div class="board_task_title">${element.title}</div>  

        <div class="board_task_descripton board_task_toDo">${element.description}</div>          
        <div id="idSUb${element.id}"></div>
        <div class="board_task_footer_status">  
            <div class="board_task_initial" id="board_task_initial${element.id}"></div>
            <img src="${element.priorityImg}">           
        </div>
    </div>
    `;
}


/**
 * The function `renderHtmlProgressBar` generates an HTML progress bar based on the number of selected
 * subtasks compared to all subtasks within a given element.
 * @param {Object} element - An object containing information about a task.
 * @param {Array} element.subtasks - An array representing all subtasks associated with the task.
 * @param {Array} element.selectedTask - An array representing selected subtasks.
 * @returns {string} Returns an HTML string representing a progress bar for the task. The progress bar
 * displays the current progress of selected subtasks out of all subtasks, shown as a percentage width,
 * along with the count of selected subtasks and total subtasks.
 */
function renderHtmlProgressBar(element) {
    let currentAllSubtask = element.subtasks.length;
    let currentSelectedSubtask = element.selectedTask.length;

    let width = (currentSelectedSubtask / currentAllSubtask * 100).toFixed(0);
    return `
        <div class="board_task_progress_line">
            <div class="board_task_progressbar">
                <div id="progressBar${element.id}" class="progress-bar" style="width: ${width}%"></div>
            </div>  
            <div class="board_task_progress_subcount">
                <div>${currentSelectedSubtask}</div>
                <div>/</div>
                <div>${currentAllSubtask}</div>
                <div style="margin-left: 2px">Subtasks</div>
            </div>            
        </div>
    `;
}


/**
 * The function `renderHtmlProgressBarEmpty` generates an empty HTML progress bar for a task element.
 * @param {Object} element - An object representing a task with properties like `id` and `subtasks`.
 * @param {number} element.id - The unique identifier of the task.
 * @param {Array} element.subtasks - An array representing all subtasks associated with the task.
 * @returns {string} Returns an HTML string that represents an empty progress bar for the task.
 * The HTML structure includes a progress bar element with a specific ID based on `element.id`, a
 * subtask count initialized to 0, and the total number of subtasks for the task.
 */
function renderHtmlProgressBarEmpty(element) {
    return `
            <div class="board_task_progress_line">
        <div class="board_task_progressbar">
            <div id="progressBar${element.id}" class="progress-bar"></div>
        </div>  
        <div class="board_task_progress_subcount">
            <div>0</div>
            <div>/</div>
            <div>${element.subtasks.length}</div>
            <div style="margin-left: 2px">Subtasks</div>
        </div>            
        </div>
        `;
}


/**
 * The function `renderGenerateShowTaskHtml` generates HTML content for displaying a task with details
 * like title, description, date, priority, assigned user, and options to delete or edit the task.
 * @param {Object} contact - An object containing information about a task.
 * @param {string} contact.status - The status of the task.
 * @param {string} contact.title - The title of the task.
 * @param {string} contact.description - The description of the task.
 * @param {string} contact.date - The due date of the task.
 * @param {string} contact.priority - The priority of the task.
 * @param {string} contact.priorityImg - The URL of the priority image associated with the task.
 * @param {number} contact.id - The unique identifier of the task.
 * @param {number} id - A parameter used to dynamically generate unique IDs for elements in the rendered HTML.
 * @returns {string} Returns an HTML template string representing the structure of a task display container.
 * The template includes elements such as task title, description, due date, priority, assigned user,
 * subtasks, and options to delete or edit the task.
 */
function renderGenerateShowTaskHtml(contact, id) {
    return `
    <div class="show_task" id="showTaskContainer">
        <div class="show_task_content">
            <div class="show_task_header">
                <div class="show_task_category" id="show_task_category${id}">${contact.status}</div> 
                <img class="show_task_close_button" onclick="closeShowTask()" src="./assets/img/close.svg">
            </div> 

            <div class="show_task_title">${contact.title}</div>    
            
            <div class="showTaskFirstInfoSection">
                <div class="show_task_description">${contact.description}</div> 

                <div class="show_task_date">
                    <span>Due date:</span>
                    <div>${contact.date}</div>    
                </div>

                <div class="show_task_priory show_task_date">
                    <span>Priority:</span>
                    <div class="show_task_priority">
                        <span>${contact.priority}</span>
                        <img src="${contact.priorityImg}">
                    </div>
                </div> 
            </div>

            <div class="show_task_user_daten">
                <span class="taskAssignedToSpan">Assigned to:</span>
                <div class="div_show_task_user_initial" id="show_task_user_initial"></div>
                <div class="show_task_user_name " id="show_task_user_name"></div>
                <div class="show_task_show_subtasks">
                    <span>Subtasks:</span>
                    <div class="show_task_subtask" id="show_task_subtask"></div>
                </div>
            </div>            
        </div>

        <div class="show_task_footer">
            <div class="show_task_footer_delete">
                <div onclick="deleteTaskFromLocalStorage(${contact.id})" class="show_task_delete_button">
                    <img src="./assets/img/delete.svg" alt="">    
                    <p>Delete</p>
                </div>
            </div>
            <div class="show_task_footer_delete">                
                <div onclick="editTask(${contact.id})" class="show_task_delete_button">
                    <img src="./assets/img/edit.svg" alt="">    
                    <p>Edit</p>
                </div>
            </div>
        </div>    
    </div>
`;
}


/**
 * The function `rendergetcheckBoxesEdit` generates HTML markup for a checkbox input with guest
 * information and initial values.
 * @param {Object} guest - An object containing information about a guest.
 * @param {number} guest.id - The unique identifier of the guest.
 * @param {string} guest.name - The name of the guest.
 * @param {string} guest.color - The color associated with the guest, used for styling purposes.
 * @param {string} initial - The initials of the guest, displayed in a colored circle next to their name.
 * @param {boolean} isChecked - A boolean value indicating whether the checkbox should be initially checked.
 * @returns {string} Returns an HTML template string that includes a checkbox element with the specified
 * guest information (name, initial, color) and whether it is checked based on the `isChecked` parameter.
 */
function rendergetcheckBoxesEdit(guest, initial, isChecked) {
    return `        
        <div class="board_task_check_box_name editTaskCheckBoxGreyHover">
            <div class="show_task_checkbox_edit_name_input">
                <div class="board_task_user_initial check_box_initial" style="background-color:${guest.color}">${initial}</div>
                <label class="checkBoxLabelEditTask" for="${guest.id}">${guest.name}</label>
            </div>
            <div class="checkbox-wrapper-27">
                <label class="checkbox">
                    <input type="checkbox" id="${guest.id}" name="guest" value="${guest.name}" ${isChecked ? 'checked' : ''}>
                    <span class="checkbox__icon"></span>
                </label>
            </div>
        </div>
    `;
}


/**
 * The function `renderEditTaskHtml` returns HTML code for editing a task with various input fields and
 * buttons.
 * @param {Object} contact - An object containing information about a task.
 * @param {number} contact.id - The unique identifier of the task.
 * @returns {string} Returns an HTML template string representing a form for editing a task. The form
 * includes input fields for title, description, due date, task priority buttons (urgent, medium, low),
 * task category dropdown, assigned to dropdown, subtasks, and a submit button.
 */
function renderEditTaskHtml(contact) {
    return /* html */` 
    <div class="show_task" id="editContainer">
        <form class="show_task_edit_form" onsubmit="event.preventDefault(); upgradeTodos(${contact.id});">
            <div class="show_task__edit_header">
                <img class="show_task_close_button" onclick="closeWindow()" src="./assets/img/close.svg">
            </div>
            <div class="show_task__edit_content">
                <div class="task_title_edit add_task_form_row">
                    <span>Title</span>
                    <input id="task_title_edit" class="show_task_edit_input"  type="text" placeholder="Enter a title">
                </div>
                <div class="task_descripion_edit add_task_form_row">
                        <span>Description</span>
                        <textarea id="task_description_edit" class="add_task_textarea" name=""
                            placeholder="Enter a Description"></textarea>
                </div>
                <div class="task_date_edit add_task_form_row">
                        <span>Due date</span>
                        <input id="task_date_edit" class="show_task_edit_input" type="date" min="${setDate()}">
                </div>
                <div class="task_assignet_edit add_task_form_row">
                    <span><b style="color:black;">Priority</b></span>
                    <div class="add_task_button_group">
                        <button id="urgent_edit" type="button" class="add_button_group add_task_hover_button" onclick="getTaskPriority('urgent_edit')">Urgent
                            <div class="add_task_button_vector">
                                <img src="./assets/img/vector_red.svg">
                            </div>
                        </button>
                        <button id="medium_edit" type="button" class="add_button_group add_task_button_medium add_task_hover_button" onclick="getTaskPriority('medium_edit')">Medium
                            <div class="add_task_button_vector">
                                <img src="./assets/img/vector_strich.svg">
                            </div>
                        </button>
                        <button id="low_edit" type="button" class="add_button_group add_task_button_low  add_task_hover_button" onclick="getTaskPriority('low_edit')">Low
                            <div class="add_task_button_vector">
                                <img src="./assets/img/vector_green.svg">
                            </div>
                        </button>
                    </div>
                </div>
                <div class="task_date_edit add_task_form_row">
                <span>Task category</span>
                    <select name="task_category" id="task_category_edit" class="show_task_edit_input">
                        <option value="to_do">To do</option>
                        <option value="in_progress">In progress</option>
                        <option value="awaitt">Await feedback</option>
                        <option value="done" selected>Done</option>
                    </select>
                </div>
                <div class="task_date_edit add_task_form_row">
                    <span id="assignet_to">Assigned to</span>
                    <div class="selectBox" onclick="showCheckboxesEdit()">
                        <img src="./assets/img/arrow_drop_down.svg" alt="">
                        <input class="add_task_input" id="task_assignet_input_edit" placeholder="Select options" /> 
                    </div>
                    <div class="checkBoxesEdit" id="checkBoxesEdit"></div> 
                    <div class="task_edit_initial" id="task_edit_initial"></div>
                </div>
                <div class="task_subtask_edit add_task_form_row">
                    <span>Subtasks</span>
                    <img class="add_task_button_add_subtask" src="./assets/img/add.svg" alt="" onclick="addNewSubTaskEdit(${contact.id})">
                    <input class="show_task_edit_input" id="task_subtasks_edit" placeholder="Add new subtask" type="text">
                </div>   
                            
                <div class="show_task_subtask_edit" id="show_task_subtask_edit"></div>
            </div>
            <div class="show_task_edit_footer">
                <button type="submit">Ok 
                    <img src="./assets/img/vector_check.svg" alt="">
                </button>
            </div>
        </form>
    </div>
    `;
}


/**
 * The function `rendergenerateCheckBoxSubTaskHtml` generates HTML for a checkbox element with a label
 * and optional checked state based on the provided parameters.
 * @param {Object} contact - An object containing information related to a contact or task.
 * @param {any} element - The individual subtask element that needs to be rendered as a checkbox.
 * @param {string} id - A string used to generate unique IDs for the checkboxes in the HTML output.
 * @param {number} i - An index or counter variable used within the function to track the position of
 * the current element being processed.
 * @returns {string} Returns an HTML string representing a checkbox element with a label and a span
 * containing the subtask `element`. The checkbox is checked if `contact.selectedTask` includes the
 * `element`, otherwise it is unchecked.
 */
function rendergenerateCheckBoxSubTaskHtml(contact, element, id, i) {
    const isChecked = contact.selectedTask ? contact.selectedTask.includes(element) : false;
    return `
        <div class="checkbox-wrapper-27 show_task_subtask_content">
            <label class="checkbox" for="${id}_${i}">
                <input type="checkbox" id="${id}_${i}" name="subtask" data-value="${element}" ${isChecked ? 'checked' : ''}>
                <span class="checkbox__icon"><span class="checkboxSubject">${element}</span></span>
            </label>
        </div>
    `;
}


/**
 * The function `rendergetSubtaskEditHtml` generates HTML elements for displaying and editing subtasks
 * within a task.
 * @param {string} element - The subtask element to be displayed and edited in the HTML.
 * @param {Object} contact - An object containing properties related to a task, including an `id` used
 * in various places within the HTML template.
 * @param {number} i - The index or position of the subtask element being rendered, used to generate
 * unique IDs for elements within the HTML template.
 * @returns {string} Returns an HTML template string that includes input fields, buttons, and images for
 * editing and deleting subtasks within a task.
 */
function rendergetSubtaskEditHtml(element, contact, i) {
    return `
        <div class="show_task_subtask_edit_btn" id="show_task_subtask_edit_btn${i}">
            <input type="text" id="show_task_subtask_edit_input${i}">
            <div class="show_task_subtask_edit_btn_delete_add">
                <img class="img_hover_btn" src="./assets/img/delete.svg" onclick="showTaskDeleteSubtask(${i}, ${contact.id})">
                <img class="img_hover_btn" id="check" src="./assets/img/check-small-svgrepo-com.svg" onclick="addEditSubtask(${i}, ${contact.id})">
            </div>
        </div>
        <div class="show_task_edit_subtasks_del_edit">
            <div class="get_show_task"><li>${element}</li></div>
            <div class="show_task_edit_subtasks_del_edit_button">
                <img class="img_hover_btn" src="./assets/img/edit.svg" onclick="showTaskEditSubtask(${i}, ${contact.id})">
                <div class="cross_line"></div>
                <img class="img_hover_btn" src="./assets/img/delete.svg" onclick="showTaskDeleteSubtask(${i}, ${contact.id})">
            </div>
        </div>    
    `;
}


/**
 * The function `checkBoxClickNone` hides a set of checkboxes when a click event occurs outside of the
 * checkboxes or a specific select box.
 */
function checkBoxClickNone() {
    document.addEventListener('click', function (event) {
        let checkboxes = document.getElementById("checkBoxesEdit");
        let selectBox = document.querySelector('.selectBox');

        if (checkboxes && selectBox) {
            if (!selectBox.contains(event.target) && !checkboxes.contains(event.target)) {
                checkboxes.style.display = "none";
                showEdit = true;
            }
        }
    });
}


/**
 * The function `getcheckBoxesEdit` populates a list of checkboxes based on a selected contact's name
 * and updates the displayed names accordingly.
 * @param {number} id - The ID of the contact in the `todos` array that is selected to populate checkboxes.
 * This ID is used to find and retrieve the contact's information from `todos`.
 */
function getcheckBoxesEdit(id) {
    let contact = todos.find(obj => obj['id'] == id);
    let checkBoxesEdit = document.getElementById('checkBoxesEdit');
    checkBoxesEdit.innerHTML = '';
    selectedNames = contact.name ? [...contact.name] : [];

    checkBoxesEdit.innerHTML = guesteArray.map(guest => {
        let isChecked = contact.name ? contact.name.includes(guest.name) : false;
        let initial = getInitials(guest.name);
        return rendergetcheckBoxesEdit(guest, initial, isChecked);
    }).join('');

    document.querySelectorAll('#checkBoxesEdit .board_task_check_box_name').forEach(box => {
        let checkbox = box.querySelector('input[type="checkbox"]');
        if (checkbox.checked) {
            box.classList.add('checked-checkbox');
        }
    });

    document.querySelectorAll('#checkBoxesEdit input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', updateSelectedNames);
    });

    checkBoxClickNone();
    updateDisplayedNames();
}



/**
 * The function `updateSelectedNames` updates an array of selected names based on checkbox input and
 * then calls another function to update the displayed names.
 * @param {Event} event - The `event` parameter in the `updateSelectedNames` function is an object that
 * represents the event that occurred, such as a click event on a checkbox. It contains information
 * about the event, including the target element that triggered the event (in this case, a checkbox).
 */
function updateSelectedNames(event) {
    let checkbox = event.target;
    let name = checkbox.value;
    let checkBoxParent = checkbox.closest('.board_task_check_box_name');
    let checkboxLabel = checkbox.closest('.checkbox');


    if (checkbox.checked) {
        checkBoxParent.classList.add('checked-checkbox');
        checkboxLabel.classList.add('whiteCheckbox');
        if (!selectedNames.includes(name)) {
            selectedNames.push(name);
        }
    } else {
        checkBoxParent.classList.remove('checked-checkbox');
        checkboxLabel.classList.remove('whiteCheckbox');
        let index = selectedNames.indexOf(name);
        if (index > -1) {
            selectedNames.splice(index, 1);
        }
    }

    updateDisplayedNames();
}


/**
 * The function `updateDisplayedNames` updates the displayed names on a task board based on the
 * selected names and their corresponding colors.
 */
function updateDisplayedNames() {

    let task_edit_initial = document.getElementById('task_edit_initial');
    task_edit_initial.innerHTML = '';
    if (selectedNames.length > 0) {
        selectedNames.forEach((element, i) => {
            let name = element;
            let guest = guesteArray.find(guest => guest.name === name);
            task_edit_initial.innerHTML += `
                <div class="board_task_user_initial show_task_user_initial" style="background-color: ${guest.color};">${getInitials(element)}</div>
            `;
        });
    }
}


/**
 * The function `getPriorityUpdateTodos` returns an image path based on the priority level provided as
 * input.
 * @param {string} userPriority - The `userPriority` parameter in the `getPriorityUpdateTodos` function
 * represents the priority level of a task, which can be 'Urgent', 'Medium', or 'Low'.
 * @returns {string} The function `getPriorityUpdateTodos` returns the path to an image corresponding
 * to the input priority level. If the priority is 'Urgent', it returns './assets/img/vector_red.svg'.
 * If the priority is 'Medium', it returns './assets/img/vector_strich.svg'. If the priority is 'Low',
 * it returns './assets/img/vector_green.svg'. If the input priority does not match any of these, an
 * empty string is returned.
 */
function getPriorityUpdateTodos(userPriotity) {
    switch (userPriotity) {
        case 'Urgent':
            return './assets/img/vector_red.svg';
        case 'Medium':
            return './assets/img/vector_strich.svg';
        case 'Low':
            return './assets/img/vector_green.svg';
        default:
            return '';
    }
}


/**
 * The function `showSubtask` returns the subtasks of an element if they exist, or an empty string if
 * they do not.
 * @param {object} element - The `element` parameter in the `showSubtask` function is expected to be
 * an object that may contain a property `subtasks`. If the `subtasks` property exists in the `element`
 * object, the function will return the value of `element.subtasks`. Otherwise, it will return an empty string.
 * @returns {string} The function `showSubtask` returns the subtasks of the given element if they exist,
 * otherwise it returns an empty string.
 */
function schowSubtask(element) {
    if (element.subtasks) {
        return element.subtasks
    } else {
        return " "
    }
}


/**
 * The function `searchSwithId` uses a switch statement to assign different board IDs based on the
 * input category.
 * @param {string} category - The `category` parameter specifies the category for which the board ID
 * is assigned. Possible values are 'to_do', 'in_progress', 'awaitt', and 'done'.
 * @returns {string} The function returns a board ID based on the `category`. If `category` is one of
 * the specified values, the corresponding board ID is returned. If `category` is not recognized,
 * returns an empty string.
 */
function searchSwithId(category) {
    switch (category) {
        case 'to_do':
            searchId = 'board_to_do';
            break;
        case 'in_progress':
            searchId = 'board_in_progress';
            break;
        case 'awaitt':
            searchId = 'board_await_feedback';
            break;
        case 'done':
            searchId = 'board_done';
            break;
    }
}


/**
 * The function `getCategorieBackGroundColor` changes the background color of a specified element
 * based on its status.
 * @param {Object} element - The `element` parameter represents an object that has a `status`
 * property. This status property is used to determine the background color for a specific element
 * on the page.
 */
function getCategorieBackGroundColor(element) {
    let borderCategory = document.getElementById(`board_task_category${element.id}`);
    if (element.status == 'Technical Task') {
        borderCategory.style.backgroundColor = '#1FD7C1';
    } else {
        borderCategory.style.backgroundColor = '#0038FF';
    }
}


/**
 * The function `getCategorieBackGroundColorShowTask` changes the background color of a specified
 * element based on the status of a contact.
 * @param {Object} contact - An object representing task or contact information, likely containing
 * a `status` property. This property determines the background color for a specific element on the
 * page.
 * @param {string} id - The `id` parameter is used to identify a specific element on the webpage,
 * typically with the format `show_task_category${id}`. It helps target and update the background
 * color of this specific element based on the `status` of the contact.
 */
function getCategorieBackGroundColorShowTask(contact, id) {
    let borderCategory = document.getElementById(`show_task_category${id}`);
    if (contact['status'] == 'Technical Task') {
        borderCategory.style.backgroundColor = '#1FD7C1';
    } else {
        borderCategory.style.backgroundColor = '#0038FF';
    }
}


/**
 * The function `generateNoTask` appends a message indicating no tasks for a specific category to the
 * specified HTML element.
 * @param {HTMLElement} categorie_id - The `categorie_id` parameter is an HTML element where the
 * message indicating no tasks for a specific category will be appended. It should be a valid
 * reference to an HTML element that can accept inner HTML content.
 * @param {string} category - The `category` parameter is a string representing the category for
 * which no tasks are available. It is used to dynamically generate the message indicating the lack
 * of tasks within that category.
 */
function generateNoTask(categorie_id, category) {
    categorie_id.innerHTML += `<div class="no_task">No tasks ${category}</div>`
}


/**
 * The function `startDragging` sets the `currentElement` variable to the provided ID, indicating
 * that this element is currently being dragged.
 * @param {string} id - The ID of the element that is being dragged. This ID is used to specify
 * the element that will be tracked as it is dragged across the interface.
 */
function startDragging(id) {
    currentElement = id;
}


/**
 * The function `allowDrop` prevents the default behavior for a drop event, allowing the drop to occur.
 * @param {Event} ev - The `ev` parameter is an event object that represents the drag-and-drop event
 * being handled.
 */
function allowDrop(ev) {
    ev.preventDefault();
}


/**
 * The `moveTo` function updates the category of a task, saves the changes to the server and local
 * storage, and initializes the board tasks.
 * @param {string} category - The new category to which the task will be moved.
 */
async function moveTo(category) {
    let contact = todos.find(obj => obj['id'] == currentElement);
    contact['category'] = category;
    await saveTasksToServer();
    saveTaskToLocalStorage();
    removeHighlightTaskCategory('board_' + category);
    initBoardTasks();
}


/**
 * The function `highlightTaskCategory` adds a CSS class to highlight a specific element on the webpage.
 * @param {string} id - The ID of the HTML element to highlight. The function adds the `drag-area-highlight`
 * class to the element with the specified ID.
 */
function highlightTaskCategory(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}


/**
 * The function `removeHighlightTaskCategory` removes a CSS class that highlights a specific element on the webpage.
 * @param {string} id - The ID of the HTML element from which to remove the highlight. The function removes the
 * `drag-area-highlight` class from the element with the specified ID.
 */
function removeHighlightTaskCategory(id) {
    let ID = id
    if(ID === 'board_awaitt'){
        ID = 'board_await_feedback';
    }
    document.getElementById(ID).classList.remove('drag-area-highlight');
}


/**
 * The `slideOutTask` function removes the 'slideIn' class and adds the 'slideOut' class to an element
 * with the id 'boardPopUp', then hides the element after a delay.
 */
function slideOutTask() {
    let boardPopUp = document.getElementById('boardPopUp');
    if (boardPopUp) {
        boardPopUp.classList.remove('slideIn');
        boardPopUp.classList.add('slideOut');
        setTimeout(() => {
            boardPopUp.style.display = 'none';
        }, 300);
    }
}


/**
 * The `slideInTask` function displays a board pop-up element with a sliding animation effect.
 */
function slideInTask() {
    let boardPopUp = document.getElementById('boardPopUp');
    if (boardPopUp) {
        boardPopUp.style.display = 'flex';
        boardPopUp.classList.remove('slideOut');
        boardPopUp.classList.add('slideIn');
    }
}


/**
 * The function `closeWindow` slides out a task and removes a grey background.
 */
function closeWindow() {
    slideOutTask();
    removeGreyBackground();
}


/**
 * The function `generateCheckBoxSubTask` dynamically generates checkboxes for subtasks associated with
 * a contact and updates their status based on user interaction.
 * @param {object} contact - The `contact` parameter represents an object containing information about
 * a task, including its subtasks. The function uses this information to generate HTML checkboxes for
 * each subtask associated with the task.
 * @param {string} id - The `id` parameter is used to identify the specific task for which the subtasks
 * are being generated. It helps differentiate between different tasks and their corresponding subtasks.
 */
function generateCheckBoxSubTask(contact, id) {
    let show_task_subtask = document.getElementById('show_task_subtask');
    show_task_subtask.innerHTML = '';
    if (contact && contact.subtasks) {
        for (let i = 0; i < contact.subtasks.length; i++) {
            const element = contact.subtasks[i];

            show_task_subtask.innerHTML += rendergenerateCheckBoxSubTaskHtml(contact, element, id, i);
        }
        document.querySelectorAll(`#show_task_subtask input[type="checkbox"]`).forEach(checkbox => {
            checkbox.addEventListener('change', function () {
                updateSubtaskStatus(contact, this.dataset.value, this.checked);
            });
        });
    } else {
        show_task_subtask.innerHTML = 'No subtasks here.';
    }
}


/**
 * The function `showCheckboxesEdit` toggles the display of checkboxes based on the current state.
 */
function showCheckboxesEdit() {
    let checkboxes = document.getElementById("checkBoxesEdit");
    if (showEdit) {
        checkboxes.style.display = "block";
        showEdit = false;
    } else {
        checkboxes.style.display = "none";
        showEdit = true;
    }
}


/**
 * The function `createInitialBlock` generates a styled HTML div element displaying initials with a
 * specified background color.
 * @param {string} initial - The `initial` parameter represents the initials of a user or a task.
 * @param {string} color - The `color` parameter specifies the background color of the block created.
 * @returns {string} A string containing an HTML div element with the class "board_task_user_initial",
 * a background color set to the provided `color`, and text content set to the provided `initial`.
 */
function createInitialBlock(initial, color) {
    return `
        <div class="board_task_user_initial" style="background-color: ${color};">${initial}</div>
    `;
}


/**
 * The function `createRemainingPersonsBlock` generates a block displaying the count of remaining
 * persons with a specified background color.
 * @param {number} remainingPersonsCount - The `remainingPersonsCount` parameter represents the number
 * of remaining persons for a task or a board.
 * @returns {string} A string containing an HTML block with a div element having the class
 * "board_task_user_initial", a gray background color, and displaying the `remainingPersonsCount`
 * preceded by a plus sign.
 */
function createRemainingPersonsBlock(remainingPersonsCount) {
    return `
        <div class="board_task_user_initial" style="background-color: #a3a3a3;">+${remainingPersonsCount}</div>
    `;
}


/**
 * The function `showTask` displays a task popup on a webpage and generates content based on the
 * provided task ID.
 * @param {string} id - The `id` parameter in the `showTask` function is used to identify the specific
 * task that needs to be displayed. It is passed to the function to determine which task information
 * should be shown on the `boardPopUp` element.
 */
function showTask(id) {
    let boardPopUp = document.getElementById('boardPopUp');
    boardPopUp.style.display = 'flex';
    slideInTask();
    displayGreyBackground();
    generateShowTask(id);
}


/**
 * The function `closeShowTask` resets input field, hides task display, removes grey background, and
 * initializes board tasks.
 */
function closeShowTask() {
    let input_find_task = document.getElementById('input_find_task');
    input_find_task.value = '';
    clearForm(); 
    slideOutTask();
    removeGreyBackground();
    initBoardTasks();
}