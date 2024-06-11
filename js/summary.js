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


async function getBoardNumbersInSummary(){
    let done = document.getElementById('done');
    let toDo = document.getElementById('toDo');
    let urgent = document.getElementById('urgent');
    let inBoard = document.getElementById('inBoard');
    let inProgress = document.getElementById('inProgress');
    let awaitFeedback = document.getElementById('awaitFeedback');
    await getBoardData();
    done.innerHTML = numberOfDoneTasks();
    toDo.innerHTML = numberOfToDoTasks();
    urgent.innerHTML = numberOfUrgentTasks();
    inBoard.innerHTML = numberOfTasksInBoard();
    inProgress.innerHTML = numberOfTasksInProgress();
    awaitFeedback.innerHTML = numberOfAwaitFeedbackTasks();
}


async function getBoardData() {
    path = '/tasks';
    response = await fetch(baseUrl + path + ".json");
    responseAsJson = await response.json();
    data = Object.values(responseAsJson);
  }


function numberOfDoneTasks(){
    let done = data.filter(item => item['category'] === 'done');
    return /*html*/`
        ${done.length}
    `;
}


function numberOfToDoTasks() {
    let toDoTasks = data.filter(item => item['category'] === 'to_do');
    return /*html*/`
        ${toDoTasks.length}
    `;    
}


function numberOfUrgentTasks() {
    let urgent = data.filter(item => item['priority'] === 'Urgent');
    console.log(urgent);
    setUpComingDeadline(urgent);

    return /*html*/`
        ${urgent.length}
    `;    
}


function setUpComingDeadline(urgent){
    let upcomingDeadline = document.getElementById('upcomingDeadline');    

    let deadLine = getNextUrgentDate(urgent);
    upcomingDeadline.innerHTML = /*html*/`
        ${deadLine}
    `;    
}


function getNextUrgentDate(urgent) {
    // Aktuelles Datum und Zeit
    let now = new Date();

    // Filtern der Daten, die in der Zukunft liegen
    let futureDates = urgent.filter(item => new Date(item.date) > now);

    // Sortieren der zukünftigen Daten nach dem Datum
    futureDates.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Rückgabe des nächsten Datums
    return futureDates.length > 0 ? futureDates[0].date : console.log('No urgent dates in board.');
}


function numberOfTasksInBoard(){
    return /*html*/`
        ${data.length}
    `;
}


function numberOfTasksInProgress(){
    let inProgress = data.filter(item => item['category'] === 'in_progress');
    return /*html*/`
    ${inProgress.length}
`;
}


function numberOfAwaitFeedbackTasks() {
    let awaitFeedback = data.filter(item => item['category'] === 'await');
    return /*html*/`
    ${awaitFeedback.length}
`;
}

