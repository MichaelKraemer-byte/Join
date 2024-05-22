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
  }



  let baseUrl = 'https://join-b0cbf-default-rtdb.europe-west1.firebasedatabase.app';

  let guestData = [];
  
  let user = 'guest';
  
  
  let contactColors = [ '#FF7A00', '#FF5EB3', '#6E52FF', '#9327FF', '#00BEE8', '#1FD7C1', '#FF745E', '#FFA35E', '#FC71FF', '#FFC701', '#0038FF', '#C3FF2B', '#FFE62B', '#FF4646', '#FFBB2B'];


async function init(path) {
  await getData(path);
  setAllGuestNames();
  renderContactList();
}


async function getData(path) {
  let response = await fetch(baseUrl + path + ".json");
  let responseAsJson = await response.json();
  if(path == '/guestContacts') {
  guestData = Object.values(responseAsJson);
  } else {
    // hier kommt folgende Gleichung hin: accountData = responseAsJson; Sobald wir richtige accounts erstellen koennen... //
    console.log('missmatch - accountData = responseAsJson; kommt erst noch');
  }

}