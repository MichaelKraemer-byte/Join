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
let user = {
  name: 'Maike Muster',
  email: 'maikemuster@gmail.com',
  initials: 'G',
  color: '#FC71FF'
}
getCurrentUserFromLocalStorage();


async function init() {
  await getData();
  isUserOnlineHideNavBar();
  isUserOnlineHideMobileNavBar();
  setInitialsInHeader();
  initForCurrentPage();
}

window.addEventListener('resize', () => {
  isUserOnlineHideMobileNavBar();
})

function isUserOnlineHideNavBar() {
  let localstorage = localStorage.getItem('currentUser');
  if (localstorage == null) {
    document.getElementById('navContainer').style.display = 'none';
    document.getElementById('userCircle').style.display = 'none';
    document.getElementById('navBarImg').href = 'index.html';
    document.getElementById('a-logo-mobile').href = 'index.html';
  }
}

function isUserOnlineHideMobileNavBar() {
  let localstorage = localStorage.getItem('currentUser');
  if (localstorage == null) {
    if (window.innerWidth <= 850) {
      document.getElementById('navBar').style.display = 'none';
    } else {
      document.getElementById('navBar').style.display = 'flex';
    }
  }

}


function getCurrentUserFromLocalStorage() {
  let currentUserString = localStorage.getItem('currentUser');
  if (currentUserString != null || currentUserString != '') {
    user = JSON.parse(currentUserString);
  }
}


function setInitialsInHeader() {
  headInnitials = document.getElementById('headInnitials');
  if (user['name'] !== 'Maike Muster') {
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


function initForCurrentPage() {
  if (window.location.href.includes('contacts.html')) {
    setAllContactNames();
    focusNavAnker();
    renderContactList();
    loadColorIndex();
  } else if (window.location.href.includes('summary.html')) {
    updateGreeting();
    loginGreeting();
    focusNavAnker();
  } else if (window.location.href.includes('add_task.html')) {
    focusNavAnker();
    initAddTask();
  } else if (window.location.href.includes('board.html')) {
    focusNavAnker();
    initBoardTasks();
  }
}


async function getData() {
  response = await fetch(baseUrl + path + ".json");
  responseAsJson = await response.json();
  data = Object.values(responseAsJson);
}


function openHeadNav(event) {
  let nav = document.getElementById('headerNav');
  nav.classList.contains('d-none') ? nav.classList.remove('d-none') : nav.classList.add('d-none');
  event.stopPropagation();
}


function closeNavOnOutsideClick(event) {
  let nav = document.getElementById('headerNav');
  let initialCircle = document.getElementById('initialCircle');
  // Überprüfen, ob der Klick außerhalb des Nav-Menüs erfolgt
  if (nav && event.target !== nav && !nav.contains(event.target) && event.target !== initialCircle) {
    nav.classList.add('d-none');
  }
}


function closeMobileContactOptionsOnOutsideClick(event) {
  let mobileContactOptions = document.getElementById('mobileContactOptions');
  let mobileViewContactButton = document.getElementById('mobileViewContactButton');
  // Überprüfen, ob der Klick außerhalb der mobilen Kontaktoptionen erfolgt
  if (mobileContactOptions &&
    mobileContactOptions.style.display === 'flex' &&
    !mobileContactOptions.contains(event.target) &&
    !mobileViewContactButton.contains(event.target)) {
    mobileContactOptions.style.display = 'none';
  }
}


function loadColorIndex() {
  colorIndex = localStorage.getItem('colorIndex');

  if (colorIndex === null) {
    colorIndex = 0;
  } else {
    colorIndex = parseInt(colorIndex, 10);
  }
}


function navigateTo(url) {
  window.location.href = url;
}


function getInitials(contact) {
  let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

  let initials = [...contact['name'].matchAll(rgx)] || [];

  initials = (
    (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
  ).toUpperCase();

  return initials;
}


function resetCurrentUser() {
  localStorage.removeItem('currentUser');
}


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