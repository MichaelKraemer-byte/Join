
let allGuestNames = [];
let currentAlphabetNames = [];
let selectedContact = {};
let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let renderContactListFunctionActive = false;
let deleteContactFunctionActive = false;
let editContactFunctionActive = false;


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


async function addContact() {
    if(checkValidityForAddContactForm()){
        return;
    };
    let newContact = defineNewContact();
    let initials = getInitials(newContact);
    if (checkIfContactAlreadyExistsForAdd(newContact, initials)) {
        return; 
    };
    await postContactInFirebase(newContact);
    await getData();
    renderNewContact(newContact);
    focusAndScrollToContact(newContact);
    slideInContact(newContact['name'], initials);
    slideInAndOutConfirmation('Contact successfully created');
}


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


function focusAndScrollToContact(contactObject){
    let underscoredName = contactObject['name'].replace(/\s/g, '_');
    let toFocusContactContainer = document.getElementById(`${underscoredName}`);
        
    toFocusContactContainer.setAttribute("tabindex", "0");
    toFocusContactContainer.focus(); 
    toFocusContactContainer.scrollIntoView({ behavior: "smooth", block: "center" });
}


function focusAndScrollToContactOfPhoneNumber(contactObject, initials){
    let contact = data.find(obj => obj['phone'] === contactObject['phone']);
    
    focusAndScrollToContact(contact);
    slideInContact(contact['name'], initials);
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


function checkValidityForAddContactForm() {
    let addContactForm = document.getElementById('addContactForm');
    if (addContactForm.checkValidity()) {
        closeContactPopUp();         
        return false;
    }  else {
        return true;
    } 
}


function setSelectedContact() {
    selectedContact = {
        color: document.getElementById('editViewContactCircle').getAttribute('fill'),
        name: document.getElementById('nameEditContactPopUp').value,
        email: document.getElementById('emailEditContactPopUp').value,
        phone: document.getElementById('phoneEditContactPopUp').value
    };
}


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


function getNextColor() {
    let colorValue = contactColors[colorIndex];
    colorIndex++;
    if (colorIndex >= contactColors.length) {
      colorIndex = 0;
    }
    localStorage.setItem('colorIndex', colorIndex);
    return colorValue;
}


function openEditPopUp(contactName, initials) {
    document.getElementById('contactPopUp').innerHTML = editContactFormHTML(contactName, initials); 
    setSelectedContact();
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
                    <circle class="listedContactSVGCircle" cx="60" cy="60" r="60" id="editViewContactCircle" fill="${contact['color']}"/>
                    <text x="50%" y="54%" text-anchor="middle" dy=".3em" font-size="47" font-family="Arial" fill="white">${initials}</text>
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


async function editContact(contactName) {
    editContactFunctionActive = true;
    let contactEdit = defineContactEdit();
    let initials = getInitials(contactEdit);
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


async function getTokenFrom(contactName) {
    let response = await fetch(baseUrl + path + ".json");
    let responseAsJson = await response.json();
    let tokens = Object.keys(responseAsJson);
    let index = data.findIndex(contact => contact['name'] === contactName);

    let tokenString = tokens[index];
    return tokenString;
}


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


function renderNewContact(newContact) {
    let AZindex = getAZindexOfName(newContact);
    let category = document.getElementById(`category${AZindex}`);
    setCurrentAlphabetNames(AZindex);
    renderCategoryContacts(AZindex, newContact); 
    category.classList.remove('d-none'); 
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

    for (let AZindex = 0; AZindex < 26; AZindex++) {
        renderAlphabetCategoryOfLetter(AZindex); 
        renderCategoryContacts(AZindex); 
        hideOrDisplayCategories(AZindex);            
        setCurrentAlphabetNames(AZindex);
    };

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
        <div id="list${AZindex}"></div>   
    </div>        
    `;    
}


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


function listedContactHTML(contact) {
    let initials = getInitials(contact);
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


function removeDeletedContact(contactName) {
    let underscoredName = contactName.replace(/\s/g, '_');
    document.getElementById(`${underscoredName}`).remove();
}

