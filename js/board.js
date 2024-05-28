let todos = [];
let currentElement;
loadTaskFromLocalStorage();


const BASE_URL = "https://tasks-6f30e-default-rtdb.europe-west1.firebasedatabase.app/";

async function loadTasksFromDb(path="") {
    let response = await fetch(BASE_URL + path + ".json");
    return responseAsJson = await response.json();
}


async function postTasksToDb(path="", data={}) {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return responseAsJson = await response.json();
}


async function putTasksToDb(path="", data={}) {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return responseAsJson = await response.json();
}



async function deleteTaskFromDb(arr, i) {
   console.log(arr);
   console.log(i);
   let response = await fetch(BASE_URL + path + ".json", {
       method: "DELETE",        
   });
   return responseAsJson = await response.json(); 
}
           
    
async function init() {
    
    // let data = await loadTasksFromDb("/tasks");

    let task = document.getElementById('board_to_do');
    let progress = document.getElementById('board_in_progress');    
    let awaitFeedback = document.getElementById('board_await_feedback');
    let doneId = document.getElementById('board_done');


    
    // for (let index in data) {
    //     let task = data[index];
    //     todos.push(task);          
    // }

    let toDo = todos.filter(t => t['category'] == 'to_do');
    let inProgress = todos.filter(t => t['category'] == 'in_progress');
    let feedback = todos.filter(t => t['category'] == 'await');
    let done = todos.filter(t => t['category'] == 'done');

    // generateToDo(toDo, task, data);
    // generateToDo(inProgress, progress, data);
    // generateToDo(feedback, awaitFeedback, data);
    // generateToDo(done, doneId, data); 

    generateToDo(toDo, task);
    generateToDo(inProgress, progress);
    generateToDo(feedback, awaitFeedback);
    generateToDo(done, doneId); 
}






async function generateToDo(arr, categorie_id) { //data

    categorie_id.innerHTML = '';

    // let keys = Object.keys(data);
    
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        // let index = keys[i];

        categorie_id.innerHTML += /*html*/`
        <div class="task" draggable="true" ondragstart=" startDragging(${element['id']})">
        <div class="board_task_category">${element['category']}</div>
        <div class="board_task_title">${element['title']}</div>

        <div>${element['id']}</div>

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


function addTaskToTasks() { //async

    // let data = await loadTasksFromDb("/tasks");    
    
    // for (let index in data) {
    //     let task = data[index];
    //     todos.push(task);          
    // }

    let task_title = document.getElementById('task_title').value;
    let task_description = document.getElementById('task_description').value;
    let task_assignet = document.getElementById('task_assignet').value;
    let task_date = document.getElementById('task_date').value;
    let task_category = 'to_do';
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
    // initAddTask();
    init();
    postTasksToDb("/tasks/", task);
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
    console.log(todos[currentElement]['category']);
    todos[currentElement]['category'] = category;
    // let task = todos[currentElement];
    // putTasksToDb("/tasks/", todos);
    // putTasksToDb("/tasks/", todos);
    // init()
    // location.reload();
    // console.log(task)

    
    // // deleteTaskFromDb("/tasks");
    // for (let i = 0; i < todos.length; i++) {
    //     let task = todos[i];

    //     console.log(task);
    //     postTasksToDb("/tasks", task);
    // }

    
    console.log(todos);


    // // postTasksToDb("/tasks", todos[i]);
    init();    
    saveTaskToLocalStorage();
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


