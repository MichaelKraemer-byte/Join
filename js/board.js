const BASE_URL = "https://tasks-6f30e-default-rtdb.europe-west1.firebasedatabase.app/";
const BASE_URL_GUEST = 'https://join-b0cbf-default-rtdb.europe-west1.firebasedatabase.app';

let todos = [];
let currentElement;
let guest = [];
let token = [];

loadTaskFromLocalStorage();
loadTasksFromServer();
// loadGuestFromServer(); 


async function deleteTaskFromDb(arr, i) {
   let response = await fetch(BASE_URL + path + ".json", {
       method: "DELETE",        
   });
   return responseAsJson = await response.json(); 
}
           

async function saveTasksToServer() {
    try {
        const response = await fetch(`${BASE_URL}/tasks.json`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todos)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log('Tasks saved to server');
    } catch (error) {
        console.error('Failed to save tasks to server:', error);
    }
}
    

async function loadTasksFromServer() {
    try {
        const response = await fetch(`${BASE_URL}/tasks.json`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();        
        if (data) {
            todos = data;
            const keysTasks = Object.keys(data);
            // token.push(keysTasks);
            saveTaskToLocalStorage();
        }
        console.log('Tasks loaded from server');
    } catch (error) {
        console.error('Failed to load tasks from server:', error);
    }
}

async function loadGuestFromServer(path) {
    let response = await fetch(BASE_URL_GUEST + path + ".json");
    return responseToJson = await response.json();
}


async function init() {     
    // console.log(token);
    let task = document.getElementById('board_to_do');
    let progress = document.getElementById('board_in_progress');    
    let awaitFeedback = document.getElementById('board_await_feedback');
    let doneId = document.getElementById('board_done');
    
    let toDo = todos.filter(t => t['category'] == 'to_do');
    let inProgress = todos.filter(t => t['category'] == 'in_progress');
    let feedback = todos.filter(t => t['category'] == 'await');
    let done = todos.filter(t => t['category'] == 'done');
    
    generateToDo(toDo, task);
    generateToDo(inProgress, progress);
    generateToDo(feedback, awaitFeedback);
    generateToDo(done, doneId); 
}


async function generateGuestsToTask() {

    
     
    let response = await fetch(BASE_URL_GUEST + "/guestContacts" + ".json");
    let responseToJson = await response.json();

    let names = [];
    const keysGuest = Object.keys(responseToJson);
    const valuesGuest = Object.values(responseToJson);

    for (let i = 0; i < valuesGuest.length; i++) {
        const element = valuesGuest[i];
        let contactName = element['name'];

        // let contactName = element['name'];
        console.log(contactName);
        names.push(contactName);
        // let colorContact = element['color'];
        // console.log(colorContact);
    }
    return names.toString
}



async function generateToDo(arr, categorie_id) {
    // console.log(token);

    categorie_id.innerHTML = '';
    
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        categorie_id.innerHTML += /*html*/`
        <div class="task" draggable="true" ondragstart=" startDragging(${element['id']})">
        <div class="board_task_category">${element['category']}</div>
        <div class="board_task_title">${element['title']}</div>

        <div>${token[i]}</div>
        <div></div>

        <div class="board_task_toDo">${element['description']}</div>
        <div class="board_task_footer">
            <button onclick="deleteTaskFromLocalStorage(${i})">delete</button>
        </div>
        <div class="board_task_footer_status">
                <img src="${element['priority']}">
            </div>
        </div>
    `; 
        
    } 
}


function addTaskToTasks(category) {
    let task_title = document.getElementById('task_title').value;
    let task_description = document.getElementById('task_description').value;
    let task_assignet = document.getElementById('task_assignet').value;
    let task_date = document.getElementById('task_date').value;
    let task_category = category;
    let task_status = document.getElementById('task_category').value;
    let task_subtasks = document.getElementById('task_subtasks').value;
    let id = todos.length;
    
    let task = {
        'category': task_category,
        'date': task_date,
        'description': task_description,
        'id': id,
        'name': task_assignet,
        'priority': './assets/img/vector_check.svg',
        'status': task_status,
        'subtask': task_subtasks,
        'title': task_title    
    };

    todos.push(task)
    saveTaskToLocalStorage();
    init();
    initAddTask();
    saveTasksToServer();
}



function saveTaskToLocalStorage() {
    let todosAsText = JSON.stringify(todos); 
    localStorage.setItem('tasks', todosAsText)
}



function loadTaskFromLocalStorage() {
    let todosAsText = localStorage.getItem('tasks');
    if (todosAsText) {
        todos = JSON.parse(todosAsText);
    }
}



function deleteTaskFromLocalStorage(i) {
    todos.splice(i, 1);
    saveTaskToLocalStorage();
    init();
}



function startDragging(i) {
    currentElement = i;
}



function allowDrop(ev) {
    ev.preventDefault();
}



async function moveTo(category) {
    todos[currentElement]['category'] = category;
    init();    
    saveTaskToLocalStorage();
    saveTasksToServer();
}



function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}



function addTask() {
    let idAddTask = document.getElementById('pop_add_task');
    idAddTask.style.visibility = 'initial';  
    initAddTask();
}



function closeWindow() {
    let idAddTask = document.getElementById('pop_add_task');
    idAddTask.style.visibility = 'hidden';
}


