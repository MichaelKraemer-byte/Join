function updateGreeting() {
    let greetElement = document.getElementById("greetAtTime");
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

    greetElement.innerHTML = greeting;
    greetName();
}

function greetName(){
    let greetName = document.getElementById('greetName');

    if (user['name'] !== 'Maike Muster') {
        greetName.innerHTML = `${user['name']}`;
        return ',';
    } else {
        greetName.innerHTML = '';
        return `!`;
    };
}
