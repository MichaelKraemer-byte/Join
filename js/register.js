let users = [
    {
        'email': 'micha@gmail.com', 
        'password': '12345'
    }
];


function addUser() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    users.push(
        {
            email: email.value, 
            password: password.value
        }
    )
    window.location.href = 'login.html?msg=The registration was successfull.'
}