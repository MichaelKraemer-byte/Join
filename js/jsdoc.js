/**
 * Global variables and functions for the login and register html, called index.html
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
SetRememberData();
checkIsUserLoginFromLastSession();

/**
 * Global variables and functions for the general script.js file. 
 * The script.js file is in every html file included and contains functions for initialyzing and general functions for the used data.
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
 * Global variables for the contacts.html functions
 */
let allGuestNames = [];
let currentAlphabetNames = [];
let selectedContact = {};
let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let renderContactListFunctionActive = false;
let deleteContactFunctionActive = false;
let editContactFunctionActive = false;



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
 * this function is used to check if the email already appears in the string
 * 
 * @param {object} data
 * @param {string} email
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
 * @param {object} data 
 * @param {string} checkPassword 
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
        toggleIcon.src = "/assets/img/password-show.png"; // Symbol zum Verbergen
    } else {
        passwordField.type = "password";
        toggleIcon.src = "/assets/img/password-hide.png";
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
 * this function is used to generate a random color for the new user
 * 
 * @returns the contact color
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
 * this function is used to generate the initials from name.
 * 
 * @param {string} contact 
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

/**
 * The function `includeHTML` uses XMLHttpRequest to include HTML content into elements based on a
 * specified attribute value.
 * @returns In the `includeHTML` function, the `return` statement is used to exit the function after
 * making an HTTP request for including HTML content.
 * The function continues with the init function, after it returned the HTML content.
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
   * The function `getInitials` extracts the initials from a contact's name and returns them in
   * uppercase.
   * @param {String} name - The `contact` parameter is a string that contains a name of our contact.
   * @returns The function `getInitials` takes a `contact` object as input and extracts the initials from
   * the `name` property of the contact. It uses a regular expression to match the first letter of each
   * word in the name and then concatenates the first letters to form the initials. The initials are then
   * converted to uppercase and returned.
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
 * The function `numberOfToDoTasks` filters data items by category 'to_do' and returns the number of
 * to-do tasks.
 * @returns the number of tasks in the `data` array that have a category of 'to_do'.
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
 * The function `capitalizeFirstAndLastName` takes a full name as input, capitalizes the first letter
 * of the first name and last name, and converts the rest of the names to lowercase before returning
 * the modified full name.
 * @param {String} name - The function `capitalizeFirstAndLastName` takes a full name as input and capitalizes
 * the first letter of the first name and the first letter of the last name. It also converts the rest letters
 * of the names to lowercase.
 * @returns The function `capitalizeFirstAndLastName` takes a full name as input, capitalizes the first
 * letter of the first name and the first letter of the last name, and converts the rest letters of the name to
 * lowercase. It then returns the modified full name.
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
 * The function `checkValidityForAddContactForm` checks the validity of a form with the id
 * 'addContactForm' and closes a popup if the form is valid.
 * @returns If the addContactForm passes validation, the function will close the contact pop-up and
 * return false. If the form does not pass validation, the function will return true - 
 * this will show the form validation notice while the addContact or editContact function will stop.
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
 * The function `checkValidityForEditContactForm` checks if the values in an edit contact form match
 * the selected contact's details or if the form is valid before closing the contact pop-up.
 * @returns The function `checkValidityForEditContactForm` will return `true` if the conditions in the
 * `if` statement are met, or if the `editContactForm` passes validation. Otherwise, it will return
 * `false`.
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
 * The function `getNextColor` retrieves the next color value from an array and updates the color index
 * for future use.
 * @returns The function `getNextColor()` returns the next color value from the `contactColors` array
 * based on the `colorIndex` variable.
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
 * The function `editContact` edits a contact in Firebase, updates the data, deletes the old contact,
 * and renders the new contact with a confirmation message.
 * @param {String} contactName - The `contactName` parameter in the `editContact` function represents the name
 * of the contact that you want to edit. This function is responsible for editing a contact in a
 * contact list.
 * @returns The `editContact` function returns nothing (`undefined`) if either
 * `checkValidityForEditContactForm(contactName)` or `checkIfContactAlreadyExistsForEdit(contactEdit,
 * initials)` conditions are met. This ensures that the user sees the right process or form validation notice of the edit.
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
 * The function `getTokenFrom` retrieves a token string based on a contact name 
 * from a JSON response of the Firebase database.
 * @param {String} contactName - contactName is a string representing the name of a contact.
 * @returns The function `getTokenFrom` is returning the token string corresponding to the
 * `contactName` provided as a parameter.
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
 * The function `editContactInFirebase` sends a PUT request to update a contact in Firebase using the
 * provided contact data and authentication token.
 * @param {Object} contactEdit - The `contactEdit` parameter is an object that contains the updated information
 * for a contact. This object should have the same structure as the contact data stored in your
 * Firebase database. When this function is called, the contact information in the Firebase database
 * will be updated with the data provided in the `contactEdit
 * @param {String} token - The `token` parameter in the `editContactInFirebase` function is a unique identifier
 * used to authenticate the user and access the specific contact information in the Firebase database.
 * It is a string that is appended to the base URL and path to uniquely identify the resource
 * being accessed or modified.
 * @returns The `editContactInFirebase` function is returning the JSON response from the Firebase
 * database after updating the contact information.
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
 * The function defineContactEdit retrieves and formats contact information for editing.
 * @returns The `defineContactEdit` function is returning an object `contactEdit` with the properties
 * `color`, `name`, `email`, and `phone`. The `name` property is capitalized using the
 * `capitalizeFirstAndLastName` function before being assigned to the `name` property of the
 * `contactEdit` object.
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