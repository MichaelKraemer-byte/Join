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
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
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
  let contactColors = [ '#FF7A00', '#FF5EB3', '#6E52FF', '#9327FF', '#00BEE8', '#1FD7C1', '#FF745E', '#FFA35E', '#FC71FF', '#FFC701', '#0038FF', '#C3FF2B', '#FFE62B', '#FF4646', '#FFBB2B'];
  let colorIndex = 0;
  let user = {
    name:'Maike Muster',
    email: 'maikemuster@gmail.com',
    password: '0123456789',
    color: '#FC71FF'
}

  
async function init() {
  await getData();
  initForCurrentPage();
}


function initForCurrentPage(){
  if (window.location.href.includes('contacts.html')) {
    setAllGuestNames();
    renderContactList();
    loadColorIndex();
  } else if (window.location.href.includes('summary.html')) {
    updateGreeting();
  }  else if(window.location.href.includes('add_task.html')){
    initAddTask(); 
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

  if (event.target !== nav && !nav.contains(event.target) && event.target !== initialCircle) {
    nav.classList.add('d-none');
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