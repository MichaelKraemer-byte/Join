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
}

function addContact() {
    displayGreyBackground();
}