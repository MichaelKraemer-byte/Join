let todos = [{
    'id': 0,
    'title': 'Kochwelt Page & Recipe',
    'description': 'Build start page with recipe recommendation...',
    'priority': './assets/img/vector_strich.svg',
    'status': 'User Story',
    'category': 'to_do',
}, {
    'id': 1,
    'title': 'Kochen',
    'description': 'Build start page with recipe recommendation...',
    'priority': './assets/img/vector_strich.svg',
    'status': 'User Story',
    'category': 'to_do'
}, {
    'id': 2,
    'title': 'Einkaufen',
    'description': 'Build start page with recipe recommendation...',
    'priority': './assets/img/vector_strich.svg',
    'status': 'Technical Task',
    'category': 'in_progress'
},
{
    'id': 3,
    'title': 'Await',
    'description': 'Build start page with recipe recommendation...',
    'priority': './assets/img/vector_strich.svg',
    'status': 'Technical Task',
    'category': 'await'
},
{
    'id': 4,
    'title': 'Done',
    'description': 'Build start page with recipe recommendation...',
    'priority': './assets/img/vector_strich.svg',
    'status': 'User Story',
    'category': 'done'
}];

let currentElement;



function init() {

    let task = document.getElementById('board_to_do');
    let progress = document.getElementById('board_in_progress');
    let awaitFeedback = document.getElementById('board_await_feedback');
    let doneId = document.getElementById('board_done');

    let toDo = todos.filter(t => t['category'] == 'to_do');
    let inProgress = todos.filter(t => t['category'] == 'in_progress');
    let await = todos.filter(t => t['category'] == 'await');
    let done = todos.filter(t => t['category'] == 'done');

    generateToDo(toDo, task);
    generateToDo(inProgress, progress);
    generateToDo(await, awaitFeedback);
    generateToDo(done, doneId);
}

function generateToDo(arr, id) {
    
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        
        id.innerHTML += /*html*/`
        <div class="task" draggable="true" ondragstart="startDragging(${element['id']})">
            <div class="board_task_category">
                ${element['status']}
                
            </div>
            <div class="board_task_title">
                ${element['title']}
            </div>
            <div class="board_task_toDo">
                ${element['description']}
            </div>
            <div class="board_task_footer">
                <div class="board_task_footer_names"></div>
                <div class="board_task_footer_status">
                    <img src="${element['priority']}">
                </div>
            </div>
        </div>`       
    
    }
}


function startDragging(id) {

}



function addTask() {
    let idAddTask = document.getElementById('pop_add_task');
    idAddTask.style.visibility = 'initial';
}

function closeWindow() {
    let idAddTask = document.getElementById('pop_add_task');
    idAddTask.style.visibility = 'hidden';
}


