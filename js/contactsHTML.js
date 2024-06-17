/**
 * Generates HTML markup for the add contact form.
 * 
 * @returns {string} - The HTML markup for the add contact form.
 */
function addContactFormHTML() {
    return /*html*/`
        <div class="addContactPopUpTitleContainer">
            <img class="addContactJoinLogo" src="./assets/img/joinLogoSmallWhite.svg">
            <h2 class="popUpTitle">Add contact</h2>
            <p class="subTitle mobileSubTitle whiteColor padding-left-0px">Tasks are better with a team!</p>
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


/**
 * Generates HTML markup for the edit contact form.
 * 
 * @param {string} contactName - The name of the contact to be edited.
 * @param {string} initials - The initials of the contact.
 * @returns {string} - The HTML markup for the edit contact form.
 */
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
                <svg class="editContactSVG mobileEditContactProfileSVG" xmlns="http://www.w3.org/2000/svg" fill="none">
                    <circle class="listedContactSVGCircle" cx="60" cy="60" r="60" id="editViewContactCircle" fill="${contact['color']}"/>
                    <text x="50%" y="54%" text-anchor="middle" dy=".3em" font-size="47" font-family="inter" fill="white">${initials}</text>
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


/**
 * Generates HTML markup for the contact list category.
 * 
 * @param {number} AZindex - The index of the alphabet.
 * @returns {string} - The HTML markup for the contact list category.
 */
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


/**
 * Generates HTML markup for a listed contact.
 * 
 * @param {Object} contact - The contact object.
 * @returns {string} - The HTML markup for the listed contact.
 */
function listedContactHTML(contact) {
    let initials = getInitialsFromObject(contact);
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



/**
 * Displays contact details in the contact view section.
 * 
 * @param {string} contactName - The name of the contact.
 * @param {string} initials - The initials of the contact.
 */
function slideInContact(contactName, initials) {

    let contactView = document.getElementById('contactView');

    let contact = data.find(obj => obj['name'] === contactName);

    contactView.innerHTML = /*html*/`
        <div class="viewContactHeadContainer">
            <svg class="viewContactSVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
                <circle class="listedContactSVGCircle" cx="60" cy="60" r="60" fill="${contact['color']}"/>
                <text x="50%" y="54%" text-anchor="middle" dy=".3em" font-size="47" font-family="Arial" fill="white">${initials}</text>
            </svg>

            <div class="viewContactNameContainer">
                <h3 class="viewContactName">${contact['name']}</h3>
                <div class="viewContactButtonsContainer">
                    <button onclick="openEditPopUp('${contactName}', '${initials}')" class="viewContactButton"><img class="editAndDeleteIcon" src="./assets/img/editGreyIcon.svg">Edit</button>
                    <button onclick="openDeletePopUp('${contactName}')" class="viewContactButton"><img class="editAndDeleteIcon" src="./assets/img/deleteGreyIcon.svg">Delete</button>
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

        <button id="mobileViewContactButton" onclick="openMobileContactOptions(event)" class="btn mobileViewContactButton">
            <img src="./assets/img/menuDotsButton.svg">
        </button>

        <div id="mobileContactOptions" class="mobileContactOptions">
            <button onclick="openEditPopUp('${contactName}', '${initials}')" class="btn mobileEditAndDeleteButton"><img class="mobileEditAndDeleteImg" src="./assets/img/editGreyIcon.svg">Edit</button>
            <button onclick="openDeletePopUp('${contactName}')" class="btn mobileEditAndDeleteButton"><img class="mobileEditAndDeleteImg" src="./assets/img/deleteGreyIcon.svg">Delete</button>
        </div>
    `;
    if (window.innerWidth <= 660) {
        slideInContactViewScreenForMobile(contactView);
    } else { 
        contactView.classList.remove('slideOutContactView');
        contactView.classList.add('slideInContactView');
    }
}


/**
 * Generates HTML markup for the delete popup.
 * 
 * @param {string} contactName - The name of the contact to be deleted.
 * @returns {string} - The HTML markup for the delete popup.
 */
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