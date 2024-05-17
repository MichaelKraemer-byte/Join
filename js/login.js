function showSignUpBox() {
    document.getElementById('login-section').classList.replace('d-center','d-none');
    document.getElementById('register-section').classList.replace('d-none','d-center');
    document.getElementById('signup-button-area').classList.replace('signUp','d-none');
}

function showLoginBox() {
    document.getElementById('login-section').classList.replace('d-none','d-center');
    document.getElementById('register-section').classList.replace('d-center','d-none');
    document.getElementById('signup-button-area').classList.replace('d-none','signUp');
}

// const urlParams = new URLSearchParams(window.location.search);
// const msg = urlParams.get('msg');

// let msgBox = document.getElementById('msgBox');

// if(msg){
//     msgBox.innerHTML = msg;
// }

// function login() {
//     let email = document.getElementById('email');
//     let password = document.getElementById('password');
//     let user = users.find( u => u.email == email.value && u.password == password.value)
//     console.log(user);
//     if(user) {
//         console.log('User found')
//     } else {
//         console.log('User not found')
//     }
// }