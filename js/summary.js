/**
 * The function `updateGreeting` dynamically updates a greeting message based on the current time and
 * also includes a personalized name.
 */
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


/**
 * The `greetName` function updates the inner HTML of elements with the class 'greetName' based on the
 * value of the user's name, returning a comma if the name is not 'Gast' and an exclamation
 * mark if it is.
 * @returns The function `greetName` will return a comma (`,`) if the user's name is not 'Gast',
 * and an exclamation mark (`!`) if the user's name is 'Gast'.
 */
function greetName(){
    let greetName = document.querySelectorAll('.greetName');

    if (user['name'] !== 'Gast') {
        greetName.forEach((element) => { element.innerHTML = `${user['name']}`});
        return ',';
    } else {
        greetName.forEach((element) => { element.innerHTML = ''} );
        return `!`;
    };
}


/**
 * The function `getBoardNumbersInSummary` retrieves board data and updates the HTML elements with the
 * number of tasks in different categories of the summary.html (dashboard).
 */
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
    inBoard.innerHTML = numberOfTasksInBoard(done);
    inProgress.innerHTML = numberOfTasksInProgress();
    awaitFeedback.innerHTML = numberOfAwaitFeedbackTasks();
}


/**
 * The function `getBoardData` asynchronously fetches task data from the tasks path and stores it as
 * an array of values - globally as data.
 */
async function getBoardData() {
    path = '/tasks';
    response = await fetch(baseUrl + path + ".json");
    responseAsJson = await response.json();
    data = Object.values(responseAsJson);
  }


/**
 * The function `numberOfDoneTasks` returns the number of tasks that are marked as 'done' in the globally defined data.
 * @returns the number of tasks that have the category 'done' in the data array.
 */
function numberOfDoneTasks(){
    let done = data.filter(item => item['category'] === 'done');
    return /*html*/`
        ${done.length}
    `;
}


/**
 * The function `numberOfToDoTasks` filters data items by category 'to_do' and returns the number of
 * to-do tasks.
 * @returns the number of tasks in the `data` array that have a category of 'to_do'.
 */
function numberOfToDoTasks() {
    let toDoTasks = data.filter(item => item['category'] === 'to_do');
    return /*html*/`
        ${toDoTasks.length}
    `;    
}


/**
 * The function `numberOfUrgentTasks` filters tasks with 'Urgent' priority from the data, sets up
 * upcoming deadlines for these tasks, and returns the number of urgent tasks.
 * @returns The function `numberOfUrgentTasks()` is returning the number of tasks that have a priority
 * of 'Urgent'. The number of urgent tasks is being displayed as a string within an HTML template
 * literal.
 */
function numberOfUrgentTasks() {
    let urgent = data.filter(item => item['priority'] === 'Urgent');
    setUpComingDeadline(urgent);
    return /*html*/`
        ${urgent.length}
    `;    
}


/**
 * The function setUpComingDeadline sets the upcoming deadline on a webpage based on the urgency level
 * provided or displays the number of past urgent tasks if there are no upcoming deadlines.
 * 
 * @param {Object[]} urgent - An array of objects, where each object represents an urgent task with a `date` 
 * property indicating the due date of the task.
 * @param {string} urgent[].date - The date property of each object, represented as a string in ISO format.
 */
function setUpComingDeadline(urgent) {
    let upcomingDeadline = document.getElementById('upcomingDeadline');
    let deadlinePhrase = document.getElementById('deadlinePhrase');
    let pastDatesSpan = document.getElementById('pastDatesSpan');
    let pastDatesNumber = document.getElementById('pastDatesNumber');
    let deadLine = getNextUrgentDate(urgent);
    let now = new Date();
    
    let pastDates = urgent.filter(item => new Date(item.date) < now);
    let futureDates = urgent.filter(item => new Date(item.date) >= now);

    upcomingDeadline.innerHTML = deadLine ? formatDate(deadLine) : '';

    if (deadLine === '') {
        if (pastDates.length > 0) {
            pastDatesSpan.style.display = 'block';
            deadlinePhrase.innerHTML = /*html*/`Nothing urgent in future`;
            pastDatesNumber.innerHTML = /*html*/`${pastDates.length}`;
        } else {
            deadlinePhrase.innerHTML = 'Nothing urgent right now.';
        }
    } else {
        deadlinePhrase.innerHTML = 'Upcoming deadline.';
    }
}


/**
 * Formats a date string in the format "YYYY-MM-DD" to a human-readable format.
 *
 * @param {string} dateString - The input date string in the format "YYYY-MM-DD".
 * @returns {string} The formatted date in the format "Month Day, Year".
 */
function formatDate(dateString) {
    let months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    let dateParts = dateString.split('-');
    let year = dateParts[0];
    let monthIndex = parseInt(dateParts[1]) - 1;
    let day = parseInt(dateParts[2]);

    let formattedDate = `${months[monthIndex]} ${day}, ${year}`;
    return formattedDate;
}


/**
 * The function `getNextUrgentDate` filters and sorts a list of urgent dates to return the next
 * upcoming date, or returns an empty string if there are no urgent dates.
 * 
 * @param {Object[]} urgent - An array of objects, where each object represents an urgent task with a `date` 
 * property indicating the due date of the task.
 * @param {string} urgent[].date - The date property of each object, represented as a string in ISO format.
 * @returns {string} - The next upcoming date in ISO format, or an empty string if there are no upcoming dates.
 */
function getNextUrgentDate(urgent) {
    let now = new Date();
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let futureDates = urgent.filter(item => {
        let itemDate = new Date(item.date);
        let itemDay = new Date(itemDate.getFullYear(), itemDate.getMonth(), itemDate.getDate());
        return itemDay >= today;
    });
    futureDates.sort((a, b) => new Date(a.date) - new Date(b.date));
    return futureDates.length > 0 ? futureDates[0].date : '';
}


/**
 * The function `numberOfTasksInBoard` returns the number of tasks in a board by accessing the `data`
 * array length.
 * @returns the number of tasks in the `data` array.
 */
function numberOfTasksInBoard(done){
    let tasksInBoard = data.length - done.innerHTML;
    return /*html*/`
        ${tasksInBoard}
    `;
}


/**
 * The function `numberOfTasksInProgress` returns the number of tasks that are in progress based on the
 * data provided.
 * @returns The function `numberOfTasksInProgress` is returning the number of tasks that are currently
 * in progress.
 */
function numberOfTasksInProgress(){
    let inProgress = data.filter(item => item['category'] === 'in_progress');
    return /*html*/`
    ${inProgress.length}
`;
}


/**
 * The function `numberOfAwaitFeedbackTasks` filters data items with the category 'await' and returns
 * the number of such items.
 * @returns The function `numberOfAwaitFeedbackTasks()` is returning the number of items in the `data`
 * array where the `category` property is equal to 'await'.
 */
function numberOfAwaitFeedbackTasks() {
    let awaitFeedback = data.filter(item => item['category'] === 'await');
    return /*html*/`
    ${awaitFeedback.length}
`;
}

