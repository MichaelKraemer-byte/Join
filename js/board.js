const BASE_URL = "https://tasks-6f30e-default-rtdb.europe-west1.firebasedatabase.app/";
const usedIds = new Set();

let todos = [];
let currentElement;
let token = [];

loadTaskFromLocalStorage();

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
            throw new Error('Netzwerkantwort war nicht ok.');
        }
        const data = await response.json();
        todos = Object.keys(data).map(id => ({
            id,
            ...data[id]
        }));

    } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
    }
}



async function initBoardTasks() {
    await loadTasksFromServer();
    loadTaskFromLocalStorage();

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


async function generateToDo(arr, categorie_id) {

    categorie_id.innerHTML = '';

    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        categorie_id.innerHTML += /*html*/`
        <div class="task" draggable="true" ondragstart=" startDragging(${element['id']})" onclick="showTask(${element['id']})">
            <div class="board_task_category" id="board_task_category${element['id']}">${element['status']}</div>
            <div class="board_task_title">${element['title']}</div>            
            <div class="board_task_descripton board_task_toDo">${element.description}</div>          
            <div class="board_task_footer_status">
                <div>name</div>
                <img src="${element['priority']}">
            </div>
        </div>
        `;

        let borderCategory = document.getElementById(`board_task_category${element['id']}`);
        if (arr[i]['status'] == 'Technical Task') {
            borderCategory.style.backgroundColor = '#1FD7C1';
        } else {
            borderCategory.style.backgroundColor = '#0038FF';
        }

    }
}



function generateUniqueId() {
    let id;
    do {
        id = Math.floor(Math.random() * 1000000).toString();
    } while (usedIds.has(id));
    usedIds.add(id);
    return id;
}


function addTaskToTasks() {   
    
    const checkboxes = document.querySelectorAll('input[name="optionen"]:checked');    
    let task_assignet = [];  
    checkboxes.forEach((checkbox) => {
        task_assignet.push(checkbox.value);
    });
    
    let task_description = document.getElementById('task_description').value;
    let task_title = document.getElementById('task_title').value;
    let task_date = document.getElementById('task_date').value;
    let task_category = 'to_do';
    let task_status = document.getElementById('task_category').value;
    let task_subtasks = document.getElementById('task_subtasks').value;
    let id = generateUniqueId();

    let task = {
        'category': task_category,
        'date': task_date,
        'description': task_description,
        'id': id,
        'name': task_assignet,
        'priority': './assets/img/vector_red.svg',
        'status': task_status,
        'subtask': task_subtasks,
        'title': task_title,
        'subtasks': []
    };

    todos.push(task)
    saveTaskToLocalStorage();
    saveTasksToServer();
    closeWindow();
    initAddTask();
    initBoardTasks();
}


function saveTaskToLocalStorage() {
    let todosAsText = JSON.stringify(todos);
    localStorage.setItem('tasksFromLocal', todosAsText)
}


function loadTaskFromLocalStorage() {
    let todosAsText = localStorage.getItem('tasksFromLocal');
    if (todosAsText) {
        todos = JSON.parse(todosAsText);
    }
}



function deleteTaskFromLocalStorage(id) {
    let arr = [];
    for (let i = 0; i < todos.length; i++) {
        arr = (todos.filter(todo => todo.id != id));
    }
    todos = arr;
    saveTaskToLocalStorage();
    saveTasksToServer();
    initBoardTasks();
    closeShowTask();
}


function startDragging(id) {
    currentElement = id;
}


function allowDrop(ev) {
    ev.preventDefault();
}


async function moveTo(category) {
    let contact = todos.find(obj => obj['id'] == currentElement);
    contact['category'] = category;
    saveTaskToLocalStorage();
    saveTasksToServer();
    initBoardTasks();

}


function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}


function addTask() {
    let idAddTask = document.getElementById('pop_add_task');
    idAddTask.style.visibility = 'initial';
    slideIn();
    initAddTask();
}


function slideOut() {
    let idAddTask = document.getElementById('show_add_task');
    idAddTask.classList.add('slideOut');
    idAddTask.classList.remove('slideIn');
}


function slideIn() {
    let idAddTask = document.getElementById('show_add_task');
    idAddTask.classList.add('slideIn');
    idAddTask.classList.remove('slideOut');
}

function closeWindow() {
    slideOut();
    setTimeout(() => {
        hiddenPopWindow()
    }, 300);
}


function hiddenPopWindow() {
    let idPopTask = document.getElementById('pop_add_task');
    idPopTask.style.visibility = 'hidden';
}


function showTask(id) {
    let idAddTask = document.getElementById('pop_show_task');
    idAddTask.style.visibility = 'initial';
    generateShowTask(id);
}


function closeShowTask() {
    let idAddTask = document.getElementById('pop_show_task');
    idAddTask.style.visibility = 'hidden';
}


function generateShowTask(id) {
    let showTask = document.getElementById('show_task');
    let contact = todos.find(obj => obj['id'] == id);
    
    showTask.innerHTML = '';
    showTask.innerHTML += /*html*/`
        <div class="show_task_header">
            <div class="show_task_category" id="show_task_category${id}">${contact.status}</div> 
            <button class="show_task_close_button" onclick="closeShowTask()"><img src="./assets/img/close.svg" alt=""></button>
        </div>   
        <div class="show_task_title">${contact.title}</div>    
        <div class="show_task_description">${contact.description}</div> 
        <div class="show_task_date">
            <span>Due date:</span>
            <div>${contact.date}</div>    
        </div>
        <div class="show_task_priory show_task_date">
            <span>Priority:</span>
            <div class="show_task_priority_image">
                <div></div>    
                <img src= "${contact.priority}">
            </div>
        </div>   
        <div>${contact.name}</div>    
        <div>${contact.subtask}</div>    
        <div class="board_task_footer">
            <button onclick="deleteTaskFromLocalStorage(${contact.id})"><img src="./assets/img/delete.svg" alt=""></button>
        </div>    
    `;

    let borderCategory = document.getElementById(`show_task_category${id}`);
    if (contact['status'] == 'Technical Task') {
        borderCategory.style.backgroundColor = '#1FD7C1';
    } else {
        borderCategory.style.backgroundColor = '#0038FF';
    }


}