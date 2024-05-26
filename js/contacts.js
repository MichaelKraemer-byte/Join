

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
            renderAlphabetCategoryOfLetter(AZindex);
            let list = document.getElementById(`list${AZindex}`);
            list.innerHTML = guestContactListHTML(); // alle jeweiligen conacts der Alphabets-Kategorie
            hideOrDisplayCategories(AZindex);            
            setCurrentAlphabetNames(AZindex);
        }
    } else {
        // contactList.innerHTML = contactListHTML();
    }
}


function renderAlphabetCategoryOfLetter(AZindex) {
    let contactList = document.getElementById('contactList');
    contactList.innerHTML += /*html*/`

    <div id="category${AZindex}" class="">
        <div class="alphabetCategoryContainer">
            <p class="alphabetCategoryLetter">${alphabet[AZindex]}</p>
        </div>
        <div class="alphabetSplitLineContainer">
            <div class="alphabetSplitLine">
            </div> 
        </div> 
        <div id="list${AZindex}">
        </div>   
    </div>        
    `;
}


function hideOrDisplayCategories(AZindex) {
    let category = document.getElementById(`category${AZindex}`);
    let list = document.getElementById(`list${AZindex}`);
    if (list.innerHTML === '') {
    category.classList.add('d-none');      
    } else {
        category.classList.remove('d-none');
        return;
    }
}


function setAllGuestNames(){
    allGuestNames = guestData.map(obj => obj['name']);
    setCurrentAlphabetNamesWithA();
}


function setCurrentAlphabetNamesWithA() {
    currentAlphabetNames = guestData.filter(obj => obj['name'].startsWith('A')).map(obj => obj['name']);
}


function setCurrentAlphabetNames(AZindex) {
    AZindex++;
    currentAlphabetNames = guestData.filter(obj => obj['name'].startsWith(`${alphabet[AZindex]}`)).map(obj => obj['name']);
}


// function getAlphabetLetter() {
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
        <button onclick="slideInContact('${contact['name']}', '${initials}')" id="${contact['name']}" class="listedContactContainer">
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


function slideInContact(contactName, initials) {

    let contactView = document.getElementById('contactView');

    let contact = guestData.find(obj => obj['name'] === contactName);

    contactView.innerHTML = /*html*/`
        <div class="viewContactHeadContainer">
            <svg class="viewContactSVG" xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none">
                <circle class="listedContactSVGCircle" cx="60" cy="60" r="60" fill="${contact['color']}"/>
                <text x="50%" y="54%" text-anchor="middle" dy=".3em" font-size="47" font-family="Arial" fill="white">${initials}</text>
            </svg>

            <div class="viewContactNameContainer">
                <h3 class="viewContactName">${contact['name']}</h3>
                <div class="viewContactButtonsContainer">
                    <button onclick="openEditPopUp()" class="viewContactButton"><img class="editAndDeleteIcon" src="./assets/img/editGreyIcon.svg">Edit</button>
                    <button onclick="openDeletePopUp()" class="viewContactButton"><img class="editAndDeleteIcon" src="./assets/img/deleteGreyIcon.svg">Delete</button>
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
    `;

    contactView.classList.add('slideInContactView');
}


function getInitials(contact) {
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

    let initials = [...contact['name'].matchAll(rgx)] || [];

    initials = (
    (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
    ).toUpperCase();

    return initials;
}