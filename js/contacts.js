function displayGreyBackground() {
    document.getElementById('greyBackground').classList.remove('d-none');
    // document.getElementById('greyBackground').classList.add('d-block');
}


function removeGreyBackground(){
    // document.getElementById('greyBackground').classList.remove('d-block');
    document.getElementById('greyBackground').classList.add('d-none'); 
}


function closeAddContactPopUp() {
    removeGreyBackground();
    slideOut();
}


function slideOut() {
    let popUp = document.getElementById('popUp');
    popUp.classList.add('slideOut');
    popUp.classList.remove('slideIn');
}


function slideIn() {
    let popUp = document.getElementById('popUp');
    popUp.classList.add('slideIn');
    popUp.classList.remove('slideOut');
}


function openAddContactPopUp() {
    document.getElementById('popUp').innerHTML = addContactFormHTML(); 
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