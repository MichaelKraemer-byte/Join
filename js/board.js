let todos = [];
let currentElement;

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



async function deleteTaskFromDb(arr, i) {
   console.log(arr);
   console.log(i);
   // let response = await fetch(BASE_URL + path + ".json", {
   //     method: "DELETE",        
   // });
   // return responseAsJson = await response.json(); 
}



async function init() {
    
    // let taskID = document.getElementById('board_to_do');    
    let task = document.getElementById('board_to_do');
    let progress = document.getElementById('board_in_progress');
    let awaitFeedback = document.getElementById('board_await_feedback');
    let doneId = document.getElementById('board_done');


    let data = await loadTasksFromDb("/tasks");    
    
    for (let index in data) {
        let task = data[index];
        todos.push(task);          
    }

    let toDo = todos.filter(t => t['category'] == 'to_do');
    let inProgress = todos.filter(t => t['category'] == 'in_progress');
    let feedback = todos.filter(t => t['category'] == 'await');
    let done = todos.filter(t => t['category'] == 'done');

    generateToDo(toDo, task, data);
    generateToDo(inProgress, progress, data);
    generateToDo(feedback, awaitFeedback, data);
    generateToDo(done, doneId, data);  

    

    // let todos = await loadTasksFromDb("/tasks"); 
    // console.log(todos);


    // let task = document.getElementById('board_to_do');
    // let progress = document.getElementById('board_in_progress');
    // let awaitFeedback = document.getElementById('board_await_feedback');
    // let doneId = document.getElementById('board_done');


    // let toDo = todos.filter(t => t['category'] == 'to_do');
    // let inProgress = todos.filter(t => t['category'] == 'in_progress');
    // let feedback = todos.filter(t => t['category'] == 'await');
    // let done = todos.filter(t => t['category'] == 'done');


    // generateToDo(toDo, task);
    // generateToDo(inProgress, progress);
    // generateToDo(feedback, awaitFeedback);
    // generateToDo(done, doneId);  

    
}




function generateToDo(arr, categorie_id, data) {

    categorie_id.innerHTML = '';

    let keys = Object.keys(data);

    for (let i = 0; i < arr.length; i++) {
        let idkeys = keys[i];
        const element = arr[i];

        categorie_id.innerHTML += /*html*/`
        <div class="task" draggable="true" ondragstart="startDragging(${idkeys})">
        <div class="board_task_category">${element['category']}</div>
        <div class="board_task_title">${element['title']}</div>

        <!-- <div>${idkeys}</div> -->

        <div class="board_task_toDo">${element['description']}</div>
        <div class="board_task_footer">

        </div>
        <div class="board_task_footer_status">
                <img src="${element['priority']}">
            </div>
        </div>
    `; 
        
    } 
}



function startDragging(id) {
    console.log('hallo');
    currentElement = id;
}



function allowDrop(ev) {
    ev.preventDefault();
}



function moveTo(category) {
    // console.log(todos);
    // todos[currentElement]['category'] = category;
    // init();
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


