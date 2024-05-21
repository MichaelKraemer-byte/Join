

function displayGreyBackground() {
    document.getElementById('greyBackground').classList.remove('d-none');
    greyBackground.classList.remove('removeGreyBackgroundOpacity');
    document.getElementById('greyBackground').classList.add('addGreyBackgroundOpacity');
}


function removeGreyBackground(){
    let greyBackground = document.getElementById('greyBackground');
    greyBackground.classList.remove('addGreyBackgroundOpacity');
    greyBackground.classList.add('removeGreyBackgroundOpacity');
    setTimeout(() => {
        greyBackground.classList.add('d-none');
    }, 300); 
}


function closeAddContactPopUp() {
    slideOut();
    removeGreyBackground();
}


function slideOut() {
    let contactPopUp = document.getElementById('contactPopUp');
    contactPopUp.classList.add('slideOut');
    contactPopUp.classList.remove('slideIn');
}


function slideIn() {
    let contactPopUp = document.getElementById('contactPopUp');
    contactPopUp.classList.add('slideIn');
    contactPopUp.classList.remove('slideOut');
}


function openAddContactPopUp() {
    document.getElementById('contactPopUp').innerHTML = addContactFormHTML(); 
    slideIn();
    displayGreyBackground();
}


function addContactFormHTML() {
    return /*html*/`
        <div class="addContactPopUpTitleContainer">
            <img class="addContactJoinLogo" src="./assets/img/joinLogoSmallWhite.svg">
            <h2 class="popUpTitle">Add contact</h2>
            <p class="subTitle whiteColor padding-left-0px">Tasks are better with a team!</p>
            <div class="blueHorizontalLine">
            </div>
        </div>

        <div class="addContactFormContainer">
            <img onclick="closeAddContactPopUp()" class="popUpRightCornerCloseButton" src="./assets/img/cancelX.svg">
            <div class="contactFormAndImgContainer">
                <img class="contactPopUpProfileImg" src="./assets/img/ProfileImg.svg">
                <form class="formContainer" action="onsubmit">
                    <div class="contactsInputContainer">
                        <input type="text" required class="nameEmailTel" placeholder="Name">
                        <img src="./assets/img/person.svg" class="contactsInputIcon">
                    </div>
                    <div class="contactsInputContainer">
                        <input type="email" required class="nameEmailTel" placeholder="Email">
                        <img src="./assets/img/mail.svg" class="contactsInputIcon">
                    </div>
                    <div class="contactsInputContainer">
                        <input type="tel" required pattern="[0-9]{10}" class="nameEmailTel" placeholder="Phone">
                        <img src="./assets/img/call.svg" class="contactsInputIcon">
                    </div>
                    <div class="cancelAndCreateContainer">
                        <button onclick="closeAddContactPopUp()" class="contactCancelButton">Cancel <img class="addContactCancelX" src="./assets/img/cancelX.svg"></button>
                        <button class="contactCreateButton">Create Contact <img src="./assets/img/miniCheckIcon.svg"></button>
                    </div>                  
                </form>
            </div>
        </div>
    `;
}


function openEditPopUp() {
    document.getElementById('contactPopUp').innerHTML = editContactFormHTML(); 
    slideIn();
    displayGreyBackground();
}


function editContactFormHTML() {
    return /*html*/`
        <div class="addContactPopUpTitleContainer">
            <img class="addContactJoinLogo" src="./assets/img/joinLogoSmallWhite.svg">
            <h2 class="popUpTitle">Edit contact</h2>
            <div class="blueHorizontalLine">
            </div>
        </div>

        <div class="addContactFormContainer">
            <img onclick="closeAddContactPopUp()" class="popUpRightCornerCloseButton" src="./assets/img/cancelX.svg">
            <div class="contactFormAndImgContainer">
                <img class="contactPopUpProfileImg" src="./assets/img/ProfileImg.svg">
                <form class="formContainer" action="onsubmit">
                    <div class="contactsInputContainer">
                        <input type="text" required class="nameEmailTel" placeholder="Name">
                        <img src="./assets/img/person.svg" class="contactsInputIcon">
                    </div>
                    <div class="contactsInputContainer">
                        <input type="email" required class="nameEmailTel" placeholder="Email">
                        <img src="./assets/img/mail.svg" class="contactsInputIcon">
                    </div>
                    <div class="contactsInputContainer">
                        <input type="tel" required pattern="[0-9]{10}" class="nameEmailTel" placeholder="Phone">
                        <img src="./assets/img/call.svg" class="contactsInputIcon">
                    </div>
                    <div class="cancelAndCreateContainer">
                        <button onclick="closeAddContactPopUp()" class="contactCancelButton">Cancel <img class="addContactCancelX" src="./assets/img/cancelX.svg"></button>
                        <button class="contactCreateButton">Save <img src="./assets/img/miniCheckIcon.svg"></button>
                    </div>                  
                </form>
            </div>
        </div>
    `;
}

let allGuestNames = [];
let currentAlphabetNames = [];
let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


function renderContactList() {

    if (user === 'guest') {        

        for (let AZindex = 0; AZindex < 26; AZindex++) { //
            let list = document.getElementById(`list${AZindex}`);
            list.innerHTML = guestContactListHTML(); // alle jeweiligen conacts der Alphabets-Kategorie
            setCurrentAlphabetNames(AZindex);
        }
    } else {
        // contactList.innerHTML = contactListHTML();
    }
}

function setAllGuestNames(){
    allGuestNames = guestData.map(obj => obj['name']);
}


function setCurrentAlphabetNamesWithA() {
    currentAlphabetNames = guestData.filter(obj => obj['name'].startsWith('A')).map(obj => obj['name']);
}


function setCurrentAlphabetNames(AZindex) {
    AZindex++;
    currentAlphabetNames = guestData.filter(obj => obj['name'].startsWith(`${alphabet[AZindex]}`)).map(obj => obj['name']);
}



// function alphabetLoop() {
//     for (let i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {
//         let letter = String.fromCharCode(i);

//     }
// }





function guestContactListHTML() {

    let container = document.createElement('div');
    currentAlphabetNames.sort();

    for (let i = 0; i < currentAlphabetNames.length; i++) {

        let contact = guestData.find(obj => obj.name === currentAlphabetNames[i]);
        
        let listedContact = createContactForList(contact);
        container.appendChild(listedContact);
    }

    return container.innerHTML; 

}


function createContactForList(contact) {
    let initials = getInitials(contact);

    let container = document.createElement('div');

    container.innerHTML = /*html*/`
        <button id="${contact['name']}" class="listedContactContainer">
            <div class="listedContactSVGContainer">
                <svg class="listedContactSVG" xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="${contact['color']}">
                    <circle cx="21" cy="21" r="20" stroke="white" stroke-width="2"/>
                    <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="12" font-family="Arial" fill="white">${initials}</text>
                </svg>
            </div>
            <div>
                <p class="listedName">${contact['name']}</p>
                <p class="listedEmail">${contact['email']}</p>
            </div>
        </button>
    `;

    return container;
}


function getInitials(contact) {
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

    let initials = [...contact['name'].matchAll(rgx)] || [];

    initials = (
    (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
    ).toUpperCase();

    return initials;
}