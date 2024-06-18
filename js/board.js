const BASE_URL = "https://join-b0cbf-default-rtdb.europe-west1.firebasedatabase.app";
const usedIds = new Set();

let showEdit = true;
let todos = [];
let currentElement;
let namelist = [];
let colorList = [];
let initials = [];
let subtasks = [];
let selectedSubtasks = [];

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


async function deleteTaskFromLocalStorage(id) {
    let arr = [];
    for (let i = 0; i < todos.length; i++) {
        arr = (todos.filter(todo => todo.id != id));
    }
    todos = arr;
    await saveTasksToServer();
    saveTaskToLocalStorage();
    initBoardTasks();
    closeShowTask();
}


function saveTaskToLocalStorage() {
    let todosAsText = JSON.stringify(todos);
    localStorage.setItem('todosToServer', todosAsText)
}


function loadTaskFromLocalStorage() {
    let todosAsText = localStorage.getItem('todosToServer');
    if (todosAsText) {
        todos = JSON.parse(todosAsText);
    }
}


async function initBoardTasks() {
    await loadTasksFromServer();
    await loadGuestFromServer();

    let task = document.getElementById('board_to_do');
    let progress = document.getElementById('board_in_progress');
    let awaitFeedback = document.getElementById('board_await_feedback');
    let doneId = document.getElementById('board_done');

    let toDo = todos.filter(t => t['category'] == 'to_do');
    let inProgress = todos.filter(t => t['category'] == 'in_progress');
    let feedback = todos.filter(t => t['category'] == 'awaitt');
    let done = todos.filter(t => t['category'] == 'done');

    generateToDo(toDo, task, 'to do');
    generateToDo(inProgress, progress, 'in progress');
    generateToDo(feedback, awaitFeedback, 'await feedback');
    generateToDo(done, doneId, 'done');
}


async function generateToDo(arr, categorie_id, category) {
    categorie_id.innerHTML = '';
    if (arr.length) {
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            categorie_id.innerHTML += renderHtmlToDo(element);
            let idSUb = document.getElementById(`idSUb${element.id}`);

            if (element.subtasks) {
                idSUb.innerHTML = '';
                idSUb.innerHTML = renderHtmlProgressBarEmpty(element)
                if (element.selectedTask) {
                    idSUb.innerHTML = '';
                    idSUb.innerHTML += renderHtmlProgressBar(element);
                }
            }
            getInitialsArray(element);
            getCategorieBackGroundColor(element);
        }
    } else {
        generateNoTask(categorie_id, category);
    }
}


function addTask() {
    generateAddTasks();
    displayGreyBackground();
    slideInTask();
    initAddTask();
}


function showTask(id) {
    let boardPopUp = document.getElementById('boardPopUp');
    boardPopUp.style.display = 'flex';
    slideInTask();
    displayGreyBackground();
    generateShowTask(id);
}


function closeShowTask() {
    let input_find_task = document.getElementById('input_find_task');
    input_find_task.value = '';
    slideOutTask();
    removeGreyBackground();
    initBoardTasks();
}


async function generateShowTask(id) {
    let boardPopUp = document.getElementById('boardPopUp');
    let contact = todos.find(obj => obj['id'] == id);
    boardPopUp.innerHTML = renderGenerateShowTaskHtml(contact, id);

    generateCheckBoxSubTask(contact, id)
    getshowTaskUserName(contact);
    getCategorieBackGroundColorShowTask(contact, id);
}


async function updateSubtaskStatus(contact, subtask, isChecked) {
    if (contact) {
        if (!contact.selectedTask) {
            contact.selectedTask = [];
        }

        if (isChecked) {
            if (!contact.selectedTask.includes(subtask)) {
                contact.selectedTask.push(subtask);
            }
        } else {
            contact.selectedTask = contact.selectedTask.filter(task => task !== subtask);
        }
        saveTaskToLocalStorage();
        await saveTasksToServer();
        initBoardTasks();
    }
}


function getshowTaskUserName(contact) {
    let showTaskUserName = document.getElementById('show_task_user_name');
    showTaskUserName.innerHTML = "";
    if (contact.name) {
        for (let i = 0; i < contact['name'].length; i++) {
            const element = contact['name'][i];
            showTaskUserName.innerHTML += /*html*/`
                <div class="show_task_assigned_to_users">                
                    <div class="board_task_user_initial show_task_user_initial" style="background-color: ${contact.color[i]};">${contact.initial[i]}</div>
                    <div>${element}</div>
                </div>
            `;
        }
    }
}


function editTask(id) {
    let contact = todos.find(obj => obj['id'] == id);

    let boardPopUp = document.getElementById('boardPopUp');
    let showTaskContainer = document.getElementById('showTaskContainer');

    showTaskContainer.style.display = 'none';
    boardPopUp.innerHTML += renderEditTaskHtml(contact);
    let editContainer = document.getElementById('editContainer');
    editContainer.style.display = ('flex');


    getcheckBoxesEdit(contact);
    getContactPriorityEdit(contact);
    getContactInitialEdit(contact);
    getSubtaskEdit(contact);
}


function getContactPriorityEdit(contact) {
    let urgent_edit = document.getElementById('urgent_edit');
    let medium_edit = document.getElementById('medium_edit');
    let low_edit = document.getElementById('low_edit');

    switch (contact.priority) {
        case 'Urgent':
            urgent_edit.classList.add('active');
            break;
        case 'Medium':
            medium_edit.classList.add('active');
            break
        case 'Low':
            low_edit.classList.add('active');
            break
    }
}


function getContactInitialEdit(contact) {
    let task_title_edit = document.getElementById('task_title_edit');
    let task_description_edit = document.getElementById('task_description_edit');
    let task_date_edit = document.getElementById('task_date_edit');

    task_title_edit.value = contact.title;
    task_description_edit.value = contact.description;
    task_date_edit.value = contact.date;

    let task_edit_initial = document.getElementById('task_edit_initial');
    task_edit_initial.innerHTML = '';

    if (contact.initial) {
        for (let j = 0; j < contact.initial.length; j++) {
            task_edit_initial.innerHTML += `
            <div class="board_task_user_initial show_task_user_initial" style="background-color: ${contact.color[j]};">${contact.initial[j]}</div>
            `;
        }
    } else {
        task_edit_initial.innerHTML = '';
    }
}


function getSubtaskEdit(contact) {
    let task_subtasks_edit = document.getElementById('show_task_subtask_edit');
    task_subtasks_edit.innerHTML = '';

    if (contact.subtasks) {
        for (let i = 0; i < contact.subtasks.length; i++) {
            const element = contact.subtasks[i];
            task_subtasks_edit.innerHTML += rendergetSubtaskEditHtml(element, contact, i);
        }
    } else {
        task_subtasks_edit.innerHTML = '';
    }       
}


function showTaskEditSubtask(i, id) {
    let contact = todos.find(obj => obj['id'] == id);
    let show_task_subtask_edit_btn = document.getElementById(`show_task_subtask_edit_btn${i}`);
    show_task_subtask_edit_btn.style.display = 'flex';
    let show_task_subtask_edit_input = document.getElementById(`show_task_subtask_edit_input${i}`);

    show_task_subtask_edit_input.value = contact.subtasks[i];  
}


async function addEditSubtask(i, id) {
    let contact = todos.find(obj => obj['id'] == id);
    let show_task_subtask_edit_input = document.getElementById(`show_task_subtask_edit_input${i}`);
    contact.subtasks[i] = show_task_subtask_edit_input.value;

    saveTaskToLocalStorage();
    await saveTasksToServer();
    getSubtaskEdit(contact);
    initBoardTasks();
}


async function showTaskDeleteSubtask(i, id) {
    let contact = todos.find(obj => obj['id'] == id);
    contact.subtasks.splice(i, 1);
    saveTaskToLocalStorage();
    await saveTasksToServer();
    getSubtaskEdit(contact);
    initBoardTasks(); 
}


async function addNewSubTaskEdit(id) {
    let contact = todos.find(obj => obj['id'] == id);
    let task_subtasks_edit = document.getElementById('task_subtasks_edit').value;
    if (!contact.subtasks) {
        contact.subtasks = [];
    }
    if (task_subtasks_edit) {
        contact.subtasks.push(task_subtasks_edit);
    }
    saveTaskToLocalStorage();
    await saveTasksToServer();
    getSubtaskEdit(contact);
    initBoardTasks();    
}


async function upgradeTodos(id) {
    let contact = todos.find(obj => obj['id'] == id);
    contact.title = document.getElementById('task_title_edit').value;
    contact.description = document.getElementById('task_description_edit').value;
    contact.dueDate = document.getElementById('task_date_edit').value;
    contact.assignedTo = document.getElementById('task_assignet_input_edit').value;

    if(userPriotity) {
        contact.priority = userPriotity;
        contact.priorityImg = getPriorityUpdateTodos(userPriotity);
    }else {
        contact.priority = contact.priority;
        contact.priorityImg = contact.priorityImg;
    }

    saveTaskToLocalStorage();
    await saveTasksToServer();
    initAddTask();
    initBoardTasks();
    closeShowTask();
}


function showCheckboxesEdit() {
    let checkboxes = document.getElementById("checkBoxesEdit");
    if (showEdit) {
        checkboxes.style.display = "block";
        showEdit = false;
    } else {
        checkboxes.style.display = "none";
        showEdit = true;
    }
}


function addNewSubTask() {
    let task_subtask = document.getElementById('task_subtasks');
    let add_task_button_plus = document.getElementById('add_task_button_plus');
    let deleteSubtask = document.getElementById('delete_subtask');
    let check = document.getElementById('check');

    if (subtasks) {
        subtasks.push(task_subtask.value);
    }

    check.style.display = 'none';
    deleteSubtask.style.display = 'none';
    add_task_button_plus.style.visibility = 'initial';
    task_subtask.value = "";
}


function searchTaskFromBoard() {
    let input_find_task = document.getElementById('input_find_task');
    input_find_task = input_find_task.value.toLowerCase();

    for (let i = 0; i < todos.length; i++) {
        const element = todos[i];
        if (element.title.toLowerCase().includes(input_find_task)) {
            let category = element.category;
            let task = document.getElementById('board_to_do');
            let progress = document.getElementById('board_in_progress');
            let awaitFeedback = document.getElementById('board_await_feedback');
            let doneId = document.getElementById('board_done');
            task.innerHTML = '';
            progress.innerHTML = '';
            awaitFeedback.innerHTML = '';
            doneId.innerHTML = '';
            searchSwithId(category);

            let searchResult = document.getElementById(searchId);
            searchResult.innerHTML = renderHtmlToDo(element)
            getInitialsArray(element);
            getCategorieBackGroundColor(element);
        }
    }

}


function getInitialsArray(element) {
    let initialsArray = element.initial;
    let colorsArray = element.color;

    if (initialsArray) {
        let board_task_initial = document.getElementById(`board_task_initial${element.id}`);
        board_task_initial.innerHTML = '';
        for (let j = 0; j < initialsArray.length; j++) {
            let initial = initialsArray[j];
            let color = colorsArray[j];
            if (j <= 5) {
                board_task_initial.innerHTML += /*html*/`
                <div class="board_task_user_initial" style="background-color: ${color};">${initial}</div>
            `;
            } else {
                board_task_initial.innerHTML +=
                `<div class="board_task_user_initial" style="background-color: #a3a3a3;">+${JSON.stringify((initialsArray.length-6))}</div>`
                break
            }
        }
    }
}


