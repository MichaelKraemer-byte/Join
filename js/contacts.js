
let allGuestNames = [];
let currentAlphabetNames = [];
let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let renderContactListFunctionActive = false;
let deleteContactFunctionActive = false;





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


function closeContactPopUp() {
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
            <img onclick="closeContactPopUp()" class="popUpRightCornerCloseButton" src="./assets/img/cancelX.svg">
            <div class="contactFormAndImgContainer">
                <img class="contactPopUpProfileImg" src="./assets/img/ProfileImg.svg">
                <form id="addContactForm" class="formContainer" onsubmit="onsubmit; return false;">
                    <div class="contactsInputContainer">
                        <input id="nameAddContactPopUp" type="text" required class="nameEmailTel" placeholder="Name">
                        <img src="./assets/img/person.svg" class="contactsInputIcon">
                    </div>
                    <div class="contactsInputContainer">
                        <input id="emailAddContactPopUp" type="email" required class="nameEmailTel" placeholder="Email">
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


async function addContact() {
    checkValidity();
    let newContact = defineNewContact();
    await postContactInFirebase(newContact);
    await getData();
    renderNewContact(newContact);
    let underscoredName = newContact['name'].replace(/\s/g, '_');
    let newContactContainer = document.getElementById(`${underscoredName}`);
    newContactContainer.focus();
    newContactContainer.scrollIntoView({behavior: "smooth", block: "center" });
    let initials = getInitials(newContact);
    slideInContact(newContact['name'], initials);
}


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


function capitalizeFirstAndLastName(name) {
    // Den String in Teile aufteilen
    let parts = name.split(' ');
    // Den ersten und den letzten Namen großschreiben
    if (parts.length > 0) {
        parts[0] = parts[0].charAt(0).toUpperCase() + parts[0].slice(1).toLowerCase();
    }
    if (parts.length > 1) {
        let lastPartIndex = parts.length - 1;
        parts[lastPartIndex] = parts[lastPartIndex].charAt(0).toUpperCase() + parts[lastPartIndex].slice(1).toLowerCase();
    }
    // Alle anderen Teile klein lassen
    for (let i = 1; i < parts.length - 1; i++) {
        parts[i] = parts[i].toLowerCase();
    }
    // Den String wieder zusammenfügen
    let result = parts.join(' ');
    return result;
}


function checkValidity() {
    let addContactForm = document.getElementById('addContactForm');

    if (addContactForm.checkValidity()) {
        closeContactPopUp();
    } else {
        return;
    }    
}


function getNextColor() {
    let colorValue = contactColors[colorIndex];

    colorIndex++;
    if (colorIndex >= contactColors.length) {
      colorIndex = 0;
    }
    localStorage.setItem('colorIndex', colorIndex);
    
    return colorValue;
}


function loadColorIndex() {
    colorIndex = localStorage.getItem('colorIndex');

    if (colorIndex === null) {
    colorIndex = 0;
    } else {
    colorIndex = parseInt(colorIndex, 10);
    }
}


function openEditPopUp(contactName, initials) {
    document.getElementById('contactPopUp').innerHTML = editContactFormHTML(contactName, initials); 
    slideIn();
    displayGreyBackground();
}


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
                <svg class="viewContactSVG" xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none">
                    <circle class="listedContactSVGCircle" cx="60" cy="60" r="60" fill="${contact['color']}"/>
                    <text x="50%" y="54%" text-anchor="middle" dy=".3em" font-size="47" font-family="Arial" fill="white">${initials}</text>
                </svg>
                <form class="formContainer" action="onsubmit">
                    <div class="contactsInputContainer">
                        <input type="text" required class="nameEmailTel" placeholder="Name" value="${contact['name']}">
                        <img src="./assets/img/person.svg" class="contactsInputIcon">
                    </div>
                    <div class="contactsInputContainer">
                        <input type="email" required class="nameEmailTel" placeholder="Email" value="${contact['email']}">
                        <img src="./assets/img/mail.svg" class="contactsInputIcon">
                    </div>
                    <div class="contactsInputContainer">
                        <input type="tel" required pattern="[0-9]{10}" class="nameEmailTel" placeholder="Phone" value="${contact['phone']}">
                        <img src="./assets/img/call.svg" class="contactsInputIcon">
                    </div>
                    <div class="cancelAndCreateContainer">
                        <button onclick="closeContactPopUp()" class="contactCancelButton">Cancel <img class="addContactCancelX" src="./assets/img/cancelX.svg"></button>
                        <button class="contactCreateButton">Save <img src="./assets/img/miniCheckIcon.svg"></button>
                    </div>                  
                </form>
            </div>
        </div>
    `;
}


function renderNewContact(newContact) {
    let AZindex = getAZindexOfName(newContact);
    let list = document.getElementById(`list${AZindex}`);
    setCurrentAlphabetNames(AZindex);
    list.innerHTML = guestContactListHTML(); 

    if (!list.innerHTML === '') {
        list.classList.remove('d-none'); 
    }
}


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


function renderContactList() {
    renderContactListFunctionActive = true;

    if (user === 'guest') {        

        for (let AZindex = 0; AZindex < 26; AZindex++) {
            renderAlphabetCategoryOfLetter(AZindex); 
            let list = document.getElementById(`list${AZindex}`);
            list.innerHTML = guestContactListHTML(); 
            hideOrDisplayCategories(AZindex);            
            setCurrentAlphabetNames(AZindex);
        }
    } else {
        // contactList.innerHTML = contactListHTML();
    }
    renderContactListFunctionActive = false;
}


function renderAlphabetCategoryOfLetter(AZindex) {
    if (!document.getElementById(`category${AZindex}`)) {
    let contactList = document.getElementById('contactList');
    contactList.innerHTML +=  contactListCategoryHTML(AZindex);
    } else {
        return;
    }
}


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
        <div id="list${AZindex}">
        </div>   
    </div>        
    `;    
}


function hideOrDisplayCategories(AZindex) {
    let category = document.getElementById(`category${AZindex}`);
    let list = document.getElementById(`list${AZindex}`);
    if (list.innerHTML == '') {
    category.classList.add('d-none');      
    } else {
        category.classList.remove('d-none');
        return;
    }
}


function setAllGuestNames(){
    allGuestNames = data.map(obj => obj['name']);
    setCurrentAlphabetNamesWithA();
}


function setCurrentAlphabetNamesWithA() {
    currentAlphabetNames = data.filter(obj => obj['name'].startsWith('A')).map(obj => obj['name']);
}


function setCurrentAlphabetNames(AZindex) {
    if (renderContactListFunctionActive === true) {
    AZindex++;
    }
    currentAlphabetNames = data.filter(obj => obj['name'].startsWith(`${alphabet[AZindex]}`)).map(obj => obj['name']);
}


function guestContactListHTML() {
    let container = document.createElement('div');
    currentAlphabetNames.sort();

    for (let i = 0; i < currentAlphabetNames.length; i++) {

        let contact = data.find(obj => obj.name === currentAlphabetNames[i]);
        
        let listedContact = createContactForList(contact);
        container.appendChild(listedContact);
    }
    return container.innerHTML; 
}


function createContactForList(contact) {
    let initials = getInitials(contact);
    let underscoredName = contact['name'].replace(/\s/g, '_');

    let container = document.createElement('div');
    container.id = `${underscoredName}`; 
    container.innerHTML = /*html*/`
        <button onclick="slideInContact('${contact['name']}', '${initials}')" class="listedContactContainer">
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
    return container;
}


function slideInContact(contactName, initials) {

    let contactView = document.getElementById('contactView');

    let contact = data.find(obj => obj['name'] === contactName);

    contactView.innerHTML = /*html*/`
        <div class="viewContactHeadContainer">
            <svg class="viewContactSVG" xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none">
                <circle class="listedContactSVGCircle" cx="60" cy="60" r="60" fill="${contact['color']}"/>
                <text x="50%" y="54%" text-anchor="middle" dy=".3em" font-size="47" font-family="Arial" fill="white">${initials}</text>
            </svg>

            <div class="viewContactNameContainer">
                <h3 class="viewContactName">${contact['name']}</h3>
                <div class="viewContactButtonsContainer">
                    <button onclick="openEditPopUp('${contactName}', '${initials}')" class="viewContactButton"><img class="editAndDeleteIcon" src="./assets/img/editGreyIcon.svg">Edit</button>
                    <button onclick="openDeletePopUp('${contactName}')" class="viewContactButton"><img class="editAndDeleteIcon" src="./assets/img/deleteGreyIcon.svg">Delete</button>
                </div>
                <div id="deletePopUp" class="deletePopUp d-none">
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
    contactView.classList.remove('slideOutContactView');
    contactView.classList.add('slideInContactView');
}


function slideOutContact(){
    let contactView = document.getElementById('contactView');
    contactView.classList.remove('slideInContact');
    contactView.classList.add('slideOutContactView');
}


function openDeletePopUp(contactName) {
    let deletePopUp = document.getElementById('deletePopUp');
    deletePopUp.innerHTML = deletePopUpHTML(contactName);
    deletePopUp.classList.remove('d-none');
    displayGreyBackground();
}


function closeDeletePopUp(){
    let deletePopUp = document.getElementById('deletePopUp');

    if(deletePopUp.innerHTML){
        deletePopUp.innerHTML = '';
        deletePopUp.classList.add('d-none');
        removeGreyBackground();        
    }   else {
        return;
    }
}


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


async function deleteContact(contactName) {
    deleteContactFunctionActive = true;

    let response = await fetch(baseUrl + path + ".json");
    let responseAsJson = await response.json();

    let tokens = Object.keys(responseAsJson);
    let index = data.findIndex(obj => obj['name'] === contactName);

    const token = '/' + tokens[index];

    response = await fetch(baseUrl + path + token + '.json', { 
        method: "DELETE",
    });
    responseAsJson = await response.json();
    closeDeletePopUp();
    removeDeletedContact(contactName);
    slideOutContact();
    let AZindex = getAZindexOfName(contactName);
    hideOrDisplayCategories(AZindex);
    deleteContactFunctionActive = false;            
    return responseAsJson;
}


function removeDeletedContact(contactName) {
    let underscoredName = contactName.replace(/\s/g, '_');
    document.getElementById(`${underscoredName}`).remove();
}


function getInitials(contact) {
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

    let initials = [...contact['name'].matchAll(rgx)] || [];

    initials = (
    (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
    ).toUpperCase();

    return initials;
}