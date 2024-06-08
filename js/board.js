const BASE_URL = "https://join-b0cbf-default-rtdb.europe-west1.firebasedatabase.app";
const usedIds = new Set();

let todos = [];
let currentElement;
let namelist = [];
let colorList = [];
let initials = [];
let subtasks = [];

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
    // console.log(toDo.length);
    let inProgress = todos.filter(t => t['category'] == 'in_progress');
    // console.log(inProgress.length);
    let feedback = todos.filter(t => t['category'] == 'await');
    // console.log(feedback.length);
    let done = todos.filter(t => t['category'] == 'done');
    // console.log(done.length);

    generateToDo(toDo, task);
    generateToDo(inProgress, progress);
    generateToDo(feedback, awaitFeedback);
    generateToDo(done, doneId);
}



async function generateToDo(arr, categorie_id) {

    categorie_id.innerHTML = '';

    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        // console.log(element);
        let initialsArray = element.initial;
        let colorsArray = element.color;

        categorie_id.innerHTML += /*html*/`
        <div class="task" draggable="true" ondragstart=" startDragging(${element.id})" onclick="showTask(${element.id})">
            <div class="board_task_category" id="board_task_category${element.id}">${element.status}</div>
            <div class="board_task_title">${element.title}</div>  
            <div class="board_task_progressbar">
                <div id="progressBar" class="progress-bar">0%</div>
                <div>${schowSubtask(element)}</div>
            </div>          
            <div class="board_task_descripton board_task_toDo">${element.description}</div>          
            <div class="board_task_footer_status">  
                <div class="board_task_initial" id="board_task_initial${element.id}"></div>
                <img src="${element.priorityImg}">
               
            </div>
        </div>
        `;
        let board_task_initial = document.getElementById(`board_task_initial${element.id}`);

        board_task_initial.innerHTML = '';

        for (let j = 0; j < initialsArray.length; j++) {
            let initial = initialsArray[j];
            let color = colorsArray[j];

            board_task_initial.innerHTML += /*html*/`
                <div class="board_task_user_initial" style="background-color: ${color};">${initial}</div>
            `;
        }


        let borderCategory = document.getElementById(`board_task_category${element.id}`);
        if (arr[i]['status'] == 'Technical Task') {
            borderCategory.style.backgroundColor = '#1FD7C1';
        } else {
            borderCategory.style.backgroundColor = '#0038FF';
        }

    }
}


function getInitials(fullName) {
    const ignoredWords = ['von', 'van', 'de', 'la', 'der', 'die', 'das', 'zu', 'zum', 'zur'];
    const nameArray = fullName.split(' ');
    const filteredNameArray = nameArray.filter(name => !ignoredWords.includes(name.toLowerCase()));
    const initials = filteredNameArray.map(name => name.charAt(0).toUpperCase()).join('');
    return initials;
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

    const selectedCheckboxes = document.querySelectorAll('input[name="optionen"]:checked');
    const selectedGuests = [];
    selectedCheckboxes.forEach(checkbox => {
        const guestName = checkbox.value;
        const guest = guesteArray.find(g => g.name === guestName);
        if (guest) {
            selectedGuests.push({
                name: guest.name,
                color: guest.color
            });
        }
    });

    for (let index = 0; index < selectedGuests.length; index++) {
        const element = selectedGuests[index];
        let name = element.name
        namelist.push(name);
        colorList.push(element.color);
        initials.push(getInitials(name));
    }


    let task_description = document.getElementById('task_description').value;
    let task_title = document.getElementById('task_title').value;
    let task_date = document.getElementById('task_date').value;
    let task_category = 'to_do';
    let priorityImg;    
    switch (userPriotity) {
        case 'Urgent':
            priorityImg = './assets/img/vector_red.svg';
            break;
        case 'Medium':
            priorityImg = './assets/img/vector_strich.svg';
            break;
        case 'Low':
            priorityImg = './assets/img/vector_green.svg';
            break;
    }
    let priority = userPriotity;

    let task_status = document.getElementById('task_category').value;
    
    let id = generateUniqueId();

    let task = {
        'category': task_category,
        'date': task_date,
        'description': task_description,
        'id': id,
        'name': namelist,
        'initial': initials,
        'color': colorList,
        'priorityImg': priorityImg,
        'priority': priority,
        'status': task_status,
        'title': task_title,
        'subtasks': subtasks
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
    localStorage.setItem('todosTasks', todosAsText)
}


function loadTaskFromLocalStorage() {
    let todosAsText = localStorage.getItem('todosTasks');
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
            <div class="show_task_priority">
                <span>${contact.priority}</span>
                <img src="${contact.priorityImg}">
            </div>
        </div>   
        <div class="show_task_user_daten">
            <span>Assing to:</span>
            <div class="div_show_task_user_initial" id="show_task_user_initial"></div>
            <div class="show_task_user_name " id="show_task_user_name"></div>
        </div>
        <div>${schowSubtask(contact)}</div>    
        <div class="show_task_footer">
            <button onclick="deleteTaskFromLocalStorage(${contact.id})"><img src="./assets/img/delete.svg" alt=""></button>
        </div>    
    `;

        let showTaskUserName = document.getElementById('show_task_user_name');
        showTaskUserName.innerHTML = ""; 
        
        for (let i = 0; i < contact['name'].length; i++) {
            const element = contact['name'][i];
            console.log(element);
            showTaskUserName.innerHTML += /*html*/`
                <div class="show_task_assing_to_users">                
                    <div class="board_task_user_initial show_task_user_initial" style="background-color: ${contact.color[i]};">${contact.initial[i]}</div>
                    <div>${element}</div>
                </div>
            `;         
        }

    let borderCategory = document.getElementById(`show_task_category${id}`);
    if (contact['status'] == 'Technical Task') {
        borderCategory.style.backgroundColor = '#1FD7C1';
    } else {
        borderCategory.style.backgroundColor = '#0038FF';
    }


}

function addNewSubTask() {        
    let task_subtask = document.getElementById('task_subtasks');
    if(subtasks) {
        subtasks.push(task_subtask.value);    
    }    
    task_subtask.value = "";  
}


function schowSubtask(element) {
    if (element.subtasks) {
        return element.subtasks
    }else {
        return " "
    }
}