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