let show = true;
const BASE_URL_GUEST = 'https://join-b0cbf-default-rtdb.europe-west1.firebasedatabase.app';
let guest = [];


async function loadGuestFromServer() {
    try {
        const response = await fetch(`${BASE_URL_GUEST}/guestContacts.json`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();  
        console.log(data);      
        if (data) {
            guest = data;
        }
        console.log('Tasks loaded from server');
    } catch (error) {
        console.error('Failed to load tasks from server:', error);
    }
}
 


async function generateGuestsToTask() {    
    let response = await fetch(BASE_URL_GUEST + "/guestContacts" + ".json");
    let responseToJson = await response.json();  
    const valuesGuest = Object.values(responseToJson);
    for (let i = 0; i < valuesGuest.length; i++) {
        const element = valuesGuest[i];
        let contactName = element['name'];
        
        guest.push(contactName)
    }
    return guest.toString
}




async function initAddTask() {
    generateGuestsToTask()
    console.log(guest);  

}


function showCheckboxes() {
    let checkboxes = document.getElementById("checkBoxes");

    if (show) {
        checkboxes.style.display = "block";
        show = false;
    } else {
        checkboxes.style.display = "none";
        show = true;
    }
}
