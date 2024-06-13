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
    let feedback = todos.filter(t => t['category'] == 'await');
    let done = todos.filter(t => t['category'] == 'done');
    console.log(todos);

    generateNoTask(toDo)   
    generateToDo(toDo, task);
    generateToDo(inProgress, progress);
    generateToDo(feedback, awaitFeedback);
    generateToDo(done, doneId);   

}


async function generateToDo(arr, categorie_id) {
    categorie_id.innerHTML = '';
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        categorie_id.innerHTML += renderHtmlToDo(element);
        
        getInitialsArray(element);
        getCategorieBackGroundColor(element);
    }
}


function generateNoTask(toDo) {
    let no_task_todo = document.getElementById('no_task_todo');
    if (toDo.length) {
        no_task_todo.style.visibility = 'hidden';
    }else{
        no_task_todo.style.visibility = 'initial';
    } 
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
    let idAddTask = document.getElementById('pop_add_task');
    idAddTask.style.visibility = 'initial';
    slideInTask();
    initAddTask();
}


function slideOutTask() {
    let idAddTask = document.getElementById('show_add_task');
    if (idAddTask) {
        idAddTask.classList.add('slideOut');
        idAddTask.classList.remove('slideIn');
    }
}


function slideInTask() {
    let idAddTask = document.getElementById('show_add_task');
    if (idAddTask) {
        idAddTask.classList.add('slideIn');
        idAddTask.classList.remove('slideOut');
    }
}


function closeWindow() {
    slideOutTask();
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
    initBoardTasks();
}


async function generateShowTask(id) {
    let showTask = document.getElementById('show_task');
    let contact = todos.find(obj => obj['id'] == id);


    // document.querySelectorAll('input[name="subtask"]').forEach((checkbox) => {
    //     checkbox.addEventListener('change', () => {
    //         werteAbrufen();
    //     });
    // });


    showTask.innerHTML = '';
    showTask.innerHTML += /*html*/`
        <div class="show_task_header">
            <div class="show_task_category" id="show_task_category${id}">${contact.status}</div> 
            <img class="show_task_close_button" onclick="closeShowTask()" src="./assets/img/close.svg">
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
                <div class="show_task_show_subtasks">
                    <span>Subtasks</span>
                <div class="show_task_subtask" id="show_task_subtask"></div>
            </div>
        </div>
            
        </div>

        <div class="show_task_footer">
            <div class="show_task_footer_delete">
                <button onclick="deleteTaskFromLocalStorage(${contact.id})"><img src="./assets/img/delete.svg" alt=""></button>
                <span>Delete</span>    
            </div>
            <div class="show_task_footer_delete">
                <button onclick="editTask(${contact.id})"><img src="./assets/img/edit.svg" alt=""></button>
                <span>Edit</span>    
            </div>
        </div>    
    `;
    ///////////////////////check-box

    let show_task_subtask = document.getElementById('show_task_subtask');
    show_task_subtask.innerHTML = '';

    let selectedSubtasks = [];

    // console.log();

    // if (contact.subtasks) {
    //     for (let k = 0; k < contact.subtasks.length; k++) {
    //         const element = contact.subtasks[k];
    //         const subtaskId = `subtask-${k}`;
    //         const isChecked = selectedSubtasks.includes(element) ? 'checked' : '';

    //         show_task_subtask.innerHTML += `
    //         <div class="show_task_subtask_content">
    //             <input type="checkbox" id="${subtaskId}" name="subtask" data-value="${element}" ${isChecked}/>
    //             <label for="${subtaskId}">${element}</label>                
    //         </div>
    //         `;

    //     }}
    //     const checkboxes = document.querySelectorAll('input[name="subtask"]');
    //     checkboxes.forEach(checkbox => {
    //         checkbox.addEventListener('change', (event) => {
    //             const value = event.target.getAttribute('data-value');
    //             if (event.target.checked) {
    //                 if (!selectedSubtasks.includes(value)) {
    //                     selectedSubtasks.push(value);
    //                 }
    //             } else {
    //                 const index = selectedSubtasks.indexOf(value);
    //                 if (index > -1) {
    //                     selectedSubtasks.splice(index, 1);
    //                 }
    //             }




    //             // let progressBar = document.getElementById(`progressBar${contact.id}`);
    //             // let procent100 = contact.subtasks.length;
    //             // let currentProcent = selectedSubtasks.length;
    //             // let width = (currentProcent / procent100 * 100).toFixed(0);
    //             // let ras = width + '%'
    //             // // console.log(ras);
    //             // progressBar.style.width = width + '%';


    //             contact.selectedTask = selectedSubtasks;

    //             console.log(selectedSubtasks);
    //             saveTaskToLocalStorage();
            
    //         });
    //     });

        
    // }
    getshowTaskUserName(contact);
    getCategorieBackGroundColorShowTask(contact, id);
}


function getshowTaskUserName(contact) {
    let showTaskUserName = document.getElementById('show_task_user_name');
    showTaskUserName.innerHTML = "";
    if (contact.name) {
        for (let i = 0; i < contact['name'].length; i++) {
            const element = contact['name'][i];
            showTaskUserName.innerHTML += /*html*/`
                    <div class="show_task_assing_to_users">                
                        <div class="board_task_user_initial show_task_user_initial" style="background-color: ${contact.color[i]};">${contact.initial[i]}</div>
                        <div>${element}</div>
                    </div>
                `;
        }

    }
}



function editTask(id) {
    let contact = todos.find(obj => obj['id'] == id);

    let idAddTask = document.getElementById('show_task');
    let showTaskEdit = document.getElementById('show_task_edit');
    idAddTask.style.display = 'none';
    showTaskEdit.style.display = 'inline';


    showTaskEdit.innerHTML = '';
    showTaskEdit.innerHTML = /*html*/` 
        <form class="show_task_edit_form" onsubmit="event.preventDefault(); upgradeTodos(${contact.id});">
            <div class="show_task__edit_header">
                <img class="show_task_close_button" onclick="closeShowTask()" src="./assets/img/close.svg">
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
                <div id="show_task_subtask_edit"></div>            
                
            </div>
            <div class="show_task_edit_footer">
            <button type="submit">ok</button>
            </div>
        </form>
    `;

    ///////////////////////

    let checkBoxesEdit = document.getElementById('checkBoxesEdit');
    checkBoxesEdit.innerHTML = '';

    for (let k = 0; k < guesteArray.length; k++) {
        const element = guesteArray[k];
        let initial = element.name;
        checkBoxesEdit.innerHTML += `
            <label class="check_boxes_edit_label">
                <div class="board_task_check_box_name">
                        <div class="board_task_user_initial check_box_initial" style="background-color:${element.color}">${getInitials(initial)}</div>
                        <p id="${k}">${element.name}<p>
                </div>
                <input type="checkbox" name="optionen" value="${element.name}"/>
            <label>
        `;
    }

    ///////////////////////

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

    //////////////////////

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

    //////////////////////////

    let task_subtasks_edit = document.getElementById('show_task_subtask_edit');
    task_subtasks_edit.innerHTML = '';

    if (contact.subtasks) {
        for (let i = 0; i < contact.subtasks.length; i++) {
            const element = contact.subtasks[i];
            task_subtasks_edit.innerHTML += `
                <div>${element}<div>
            `;
        }
    } else {
        task_subtasks_edit.innerHTML = '';
    }

}


async function upgradeTodos(id) {
    let contact = todos.find(obj => obj['id'] == id);

    contact.title = document.getElementById('task_title_edit').value;
    contact.description = document.getElementById('task_description_edit').value;
    contact.dueDate = document.getElementById('task_date_edit').value;
    contact.assignedTo = document.getElementById('task_assignet_input_edit').value;

    let priorityImgEdit;
    switch (userPriotity) {
        case 'Urgent':
            console.log(userPriotity);
            priorityImgEdit = './assets/img/vector_red.svg';
            break;
        case 'Medium':
            priorityImgEdit = './assets/img/vector_strich.svg';
            break;
        case 'Low':
            priorityImgEdit = './assets/img/vector_green.svg';
            break;
    }
    contact.priority = userPriotity;
    contact.priorityImg = priorityImgEdit;

    saveTaskToLocalStorage();
    await saveTasksToServer();
    initAddTask();
    initBoardTasks();
    // closeShowTask();    
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
    if (subtasks) {
        subtasks.push(task_subtask.value);
    }
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
        case 'await':
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

            board_task_initial.innerHTML += /*html*/`
                <div class="board_task_user_initial" style="background-color: ${color};">${initial}</div>
            `;
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