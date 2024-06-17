
let allGuestNames = [];
let currentAlphabetNames = [];
let selectedContact = {};
let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let renderContactListFunctionActive = false;
let deleteContactFunctionActive = false;
let editContactFunctionActive = false;


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
 * @param contactObject - The `contactObject` parameter in the `checkIfContactAlreadyExistsForEdit`
 * function is an object that represents a contact. It likely contains properties such as `phone`,
 * `email`, and `name` that are used to identify and manage the contact's information.
 * @param initials - The `initials` parameter is likely a string representing the initials of a
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