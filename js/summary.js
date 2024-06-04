function updateGreeting() {
    let greetElement = document.querySelectorAll('.greetAtTime');
    const now = new Date();
    const hour = now.getHours();

    let greeting;
    if (hour < 6) {
        greeting = `Good night${greetName()}`;
    } else if (hour < 12) {
        greeting = `Good morning${greetName()}`;
    } else if (hour < 18) {
        greeting = `Good day${greetName()}`;
    } else if (hour < 21) {
        greeting = `Good afternoon${greetName()}`;
    } else {
        greeting = `Good evening${greetName()}`;
    }

    greetElement.forEach((element) => { element.innerHTML = greeting } );
    greetName();
}

function greetName(){
    let greetName = document.querySelectorAll('.greetName');

    if (user['name'] !== 'Maike Muster') {
        greetName.forEach((element) => { element.innerHTML = `${user['name']}`});
        return ',';
    } else {
        greetName.forEach((element) => { element.innerHTML = ''} );
        return `!`;
    };
}
