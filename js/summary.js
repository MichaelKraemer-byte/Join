function updateGreeting() {
    let greetElement = document.getElementById("greetAtTime");
    const now = new Date();
    const hour = now.getHours();

    let greeting;
    if (hour < 6) {
        greeting = "Good night";
    } else if (hour < 12) {
        greeting = "Good morning";
    } else if (hour < 18) {
        greeting = "Good day";
    } else if (hour < 21) {
        greeting = "Good afternoon";
    } else {
        greeting = "Good evening";
    }

    greetElement.innerHTML = greeting;
    greetName();
}

function greetName(){
    let greetName = document.getElementById('greetName');
    let greetingSign = document.getElementById('greetingSign');

    if (user['name'] !== 'Maike Muster') {
        greetingSign.innerHTML = ',';
        greetName.innerHTML = `${user['name']}`;
    } else {
        greetName.innerHTML = '';
        greetingSign.innerHTML = `!`;
    };
}
