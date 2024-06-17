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

    generateToDo(toDo, task);
    generateToDo(inProgress, progress);
    generateToDo(feedback, awaitFeedback);
    generateToDo(done, doneId);
}


async function generateToDo(arr, categorie_id) {
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
        generateNoTask(categorie_id);
    }
}

function generateNoTask(categorie_id) {
    categorie_id.innerHTML += `<div class="no_task">No tasks</div>`
}


function getInitials(fullName) {
    const ignoredWords = ['von', 'van', 'de', 'la', 'der', 'die', 'das', 'zu', 'zum', 'zur'];
    const nameArray = fullName.split(' ');
    const filteredNameArray = nameArray.filter(name => !ignoredWords.includes(name.toLowerCase()));
    const initials = filteredNameArray.map(name => name.charAt(0).toUpperCase()).join('');
    return initials;
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


function startDragging(id) {
    currentElement = id;
}


function allowDrop(ev) {
    ev.preventDefault();
}


async function moveTo(category) {
    let contact = todos.find(obj => obj['id'] == currentElement);
    contact['category'] = category;
    await saveTasksToServer();
    saveTaskToLocalStorage();
    initBoardTasks();
}


function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}


function addTask() {
    displayGreyBackground();
    slideInTask();
    initAddTask();
}


function slideOutTask() {
    let boardPopUp = document.getElementById('boardPopUp');
    if (boardPopUp) {
        boardPopUp.classList.remove('slideIn');
        boardPopUp.classList.add('slideOut');
        setTimeout(()=> {
            boardPopUp.style.display = 'none';}, 500);
    }
}


function slideInTask() {
    let boardPopUp = document.getElementById('boardPopUp');
    if (boardPopUp) {
        boardPopUp.style.display = 'flex';
        boardPopUp.classList.remove('slideOut');
        boardPopUp.classList.add('slideIn');
    }
}


function closeWindow() {
    slideOutTask();
    removeGreyBackground();
    // setTimeout(() => {
    //     hiddenPopWindow()
    // }, 300);
}


// function hiddenPopWindow() {
//     let idPopTask = document.getElementById('pop_add_task');
//     idPopTask.style.visibility = 'hidden';
// }


function showTask(id) {
    let boardPopUp = document.getElementById('boardPopUp');
    boardPopUp.style.display = 'flex';
    slideInTask();
    displayGreyBackground();
    generateShowTask(id);
}


function closeShowTask() {
    let boardPopUp = document.getElementById('boardPopUp');
    let input_find_task = document.getElementById('input_find_task');
    input_find_task.value = '';
    slideOutTask();
    removeGreyBackground();
    setTimeout(()=> {
        boardPopUp.style.display = 'none';}, 500);
    initBoardTasks();
}


async function generateShowTask(id) {
    let boardPopUp = document.getElementById('boardPopUp');
    let contact = todos.find(obj => obj['id'] == id);


    boardPopUp.innerHTML = renderGenerateShowTaskHtml(contact, id);
    ///////////////////////check-box


    let show_task_subtask = document.getElementById('show_task_subtask');
    show_task_subtask.innerHTML = '';

    if (contact && contact.subtasks) {
        for (let i = 0; i < contact.subtasks.length; i++) {
            const element = contact.subtasks[i];
            const isChecked = contact.selectedTask ? contact.selectedTask.includes(element) : false;
            show_task_subtask.innerHTML += `
                <div class="show_task_subtask_content">
                    <input type="checkbox" id="${id}_${i}" name="subtask" data-value="${element}" ${isChecked ? 'checked' : ''}/>
                    <label for="${id}_${i}">${element}</label>
                </div>
            `;
        }

        document.querySelectorAll(`#show_task_subtask input[type="checkbox"]`).forEach(checkbox => {
            checkbox.addEventListener('change', function () {
                updateSubtaskStatus(contact, this.dataset.value, this.checked);
            });
        });
    } else {
        show_task_subtask.innerHTML = 'No subtasks here.';
    }

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
    boardPopUp.innerHTML += /*html*/` 
    <div class="show_task" id="editContainer">
        <form class="show_task_edit_form" onsubmit="event.preventDefault(); upgradeTodos(${contact.id});">
            <div class="show_task__edit_header">
                <img class="show_task_close_button" onclick="closeWindow()" src="./assets/img/close.svg">
            </div>
            <div class="show_task__edit_content">

                <div class="task_title_edit add_task_form_row">
                    <span>Title</span>
                    <input id="task_title_edit" class="show_task_edit_input"  type="text" placeholder="Enter a title">
                </div>

                <div class="task_descripion_edit add_task_form_row">
                        <span>Description</span>
                        <textarea id="task_description_edit" class="add_task_textarea" name=""
                            placeholder="Enter a Description"></textarea>
                </div>

                <div class="task_date_edit add_task_form_row">
                        <span>Due date</span>
                        <input id="task_date_edit" class="show_task_edit_input" type="date">
                </div>

                <div class="add_task_button_group">
                    <button id="urgent_edit" type="button" class="add_button_group add_task_hover_button" onclick="getTaskPriority('urgent_edit')">Urgent
                        <div class="add_task_button_vector">
                            <img src="./assets/img/vector_red.svg">
                        </div>
                    </button>
                    <button id="medium_edit" type="button" class="add_button_group add_task_button_medium add_task_hover_button" onclick="getTaskPriority('medium_edit')">Medium
                        <div class="add_task_button_vector">
                            <img src="./assets/img/vector_strich.svg">
                        </div>
                    </button>
                    <button id="low_edit" type="button" class="add_button_group add_task_button_low  add_task_hover_button" onclick="getTaskPriority('low_edit')">Low
                        <div class="add_task_button_vector">
                            <img src="./assets/img/vector_green.svg">
                        </div>
                    </button>
                </div>


                <div class="task_assignet_edit add_task_form_row">

                    <span id="assignet_to">Assignet to</span>
                    <div class="selectBox" onclick="showCheckboxesEdit()">
                        <img src="./assets/img/arrow_drop_down.svg" alt="">
                        <input class="add_task_input" id="task_assignet_input_edit" placeholder="Select options" /> 
                    </div>
                    <div class="checkBoxesEdit" id="checkBoxesEdit"></div>  

                    <div class="task_edit_initial" id="task_edit_initial"></div>
                </div>

                <div class="task_subtask_edit add_task_form_row">
                    <span>Subtasks</span>
                    <img class="add_task_button_add_subtask" src="./assets/img/add.svg" alt="" onclick="addNewSubTask()">
                    <input class="show_task_edit_input" id="task_subtasks_edit" placeholder="Add new subtask" type="text">
                </div>   
                <div class="show_task_subtask_edit" id="show_task_subtask_edit"></div>            
                
            </div>
            <div class="show_task_edit_footer">
                <button type="submit">Ok 
                    <img src="./assets/img/vector_check.svg" alt="">
                </button>
            </div>
        </form>
    </div>
    `;
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
            task_subtasks_edit.innerHTML += `
                <div class="show_task_edit_subtasks_del_edit">
                    <div class="get_show_task"><li>${element}</li></div>
                    <div class="show_task_edit_subtasks_del_edit_button">
                        <img src="./assets/img/edit.svg" alt="">
                        <div class="cross_line"></div>
                        <img src="./assets/img/delete.svg" alt="">
                    </div>
                </div>    
            `;
        }
    } else {
        task_subtasks_edit.innerHTML = '';
    }
}


function getcheckBoxesEdit(contact) {
    let checkBoxesEdit = document.getElementById('checkBoxesEdit');
    checkBoxesEdit.innerHTML = '';
    let contactNames = contact.name;
    let checkBoxesHTML = '';   
    guesteArray.forEach(guest => {
        let isChecked = contactNames ? contactNames.includes(guest.name) : false;
        let initial = getInitials(guest.name)
        checkBoxesHTML += `        
            <div class="board_task_check_box_name">
                <div class="show_task_checkbox_edit_name_input">
                    <div class="board_task_user_initial check_box_initial" style="background-color:${guest.color}">${initial}</div>
                    <label for="${guest.id}">${guest.name}</label>
                </div>
                <input type="checkbox" id="${guest.id}" name="guest" value="${guest.name}" ${isChecked ? 'checked' : ''}>
            </div>
        `;
    });
    checkBoxesEdit.innerHTML = checkBoxesHTML;
}


async function upgradeTodos(id) {
    let contact = todos.find(obj => obj['id'] == id);
    contact.title = document.getElementById('task_title_edit').value;
    contact.description = document.getElementById('task_description_edit').value;
    contact.dueDate = document.getElementById('task_date_edit').value;
    contact.assignedTo = document.getElementById('task_assignet_input_edit').value;

    getPriorityUpdateTodos(userPriotity)
    contact.priority = userPriotity;
    contact.priorityImg = priorityImgEdit;

    saveTaskToLocalStorage();
    await saveTasksToServer();
    initAddTask();
    initBoardTasks();
    closeShowTask();
}


function getPriorityUpdateTodos(userPriotity) {
    switch (userPriotity) {
        case 'Urgent':
            priorityImgEdit = './assets/img/vector_red.svg';
            break;
        case 'Medium':
            priorityImgEdit = './assets/img/vector_strich.svg';
            break;
        case 'Low':
            priorityImgEdit = './assets/img/vector_green.svg';
            break;
    }
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


function schowSubtask(element) {
    if (element.subtasks) {
        return element.subtasks
    } else {
        return " "
    }
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

function searchSwithId(category) {
    switch (category) {
        case 'to_do':
            searchId = 'board_to_do';
            break;
        case 'in_progress':
            searchId = 'board_in_progress';
            break;
        case 'awaitt':
            searchId = 'board_await_feedback';
            break;
        case 'done':
            searchId = 'board_done';
            break;
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


function getCategorieBackGroundColor(element) {
    let borderCategory = document.getElementById(`board_task_category${element.id}`);
    if (element.status == 'Technical Task') {
        borderCategory.style.backgroundColor = '#1FD7C1';
    } else {
        borderCategory.style.backgroundColor = '#0038FF';
    }
}

function getCategorieBackGroundColorShowTask(contact, id) {
    let borderCategory = document.getElementById(`show_task_category${id}`);
    if (contact['status'] == 'Technical Task') {
        borderCategory.style.backgroundColor = '#1FD7C1';
    } else {
        borderCategory.style.backgroundColor = '#0038FF';
    }
} 