const BASE_URL_GUEST = 'https://join-b0cbf-default-rtdb.europe-west1.firebasedatabase.app';
let show = true;
let guesteArray = [];
let userPriotity;
let imgPriority;
let addTaskProcess = false;


async function loadGuestFromServer() {
    try {
        const response = await fetch(`${BASE_URL_GUEST}/guestContacts.json`);
        if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok.');
        }
        const data = await response.json();
        guesteArray = Object.keys(data).map(id => ({
            id,
            ...data[id]
        }));

    } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
    }
}


async function initAddTask() {
    await loadGuestFromServer();
    await loadTasksFromServer();
    generateCheckBox();
    document.querySelectorAll('input[name="optionen"]').forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            getValues('add_task_show_check');
        });
    });
}


function generateAddTasks(column) {
    let boardPopUp = document.getElementById('boardPopUp');
    boardPopUp.innerHTML = renderHtmlAddtask(column);
}


async function addTaskToTasks(column) {
    if (addTaskProcess) return;
    addTaskProcess = true;

    document.getElementById('createTaskButton').disabled = true;
    generateCheckBoxName();

    let task = {
        'category': column,
        'date': document.getElementById('task_date').value,
        'description': document.getElementById('task_description').value,
        'id': generateUniqueId(),
        'name': namelist,
        'initial': initials,
        'color': colorList,
        'priorityImg': getPriorityImage(userPriotity),
        'priority': getUserPriorityStatus(userPriotity),
        'status': document.getElementById('task_category').value,
        'title': document.getElementById('task_title').value,
        'subtasks': subtasks,
        'selectedTask': [],
    };

    todos.push(task);
    await saveTasksToServer();
    saveTaskToLocalStorage();
    if (window.location.href.includes('board.html')) {
        closeWindow();
        initBoardTasks();
    }    
    initAddTask();
    slideInConfirmation();
}



function getPriorityImage(userPriotity) {
    switch (userPriotity) {
        case 'Urgent':
            return './assets/img/vector_red.svg';
        case 'Medium':
            return './assets/img/vector_strich.svg';
        case 'Low':
            return './assets/img/vector_green.svg';
        default:
            return './assets/img/vector_strich.svg';
    }
}


function getUserPriorityStatus(userPriotity) {
    if(userPriotity) {
        return userPriotity;
    }else {
        return 'Medium';
    }
}


function slideInConfirmation() {
    let confirmation = document.getElementById('addedTaskConfirmation');
    confirmation.style.animation = 'slideInAddedTaskConfirmation 1.25s cubic-bezier(0, 1.19, 0, 0.96)';
    setTimeout(() => { 
        addTaskProcess = false;
        createTaskButton = document.getElementById('createTaskButton');
        createTaskButton.disabled = false;
        confirmation.style.animation = 'fadeConfirmation 0.3s ease-in-out';
        if(window.location.href.includes('add_task.html')){navigateTo('board.html')}
    }, 1250);
}


function generateUniqueId() {
    let id;
    do {
        id = Math.floor(Math.random() * 1000000).toString();
    } while (usedIds.has(id));
    usedIds.add(id);
    return id;
}


function getTaskPriority(id) {
    const button = document.getElementById(id);
    if (button.classList.contains('active')) {
        button.classList.remove('active');
    } else {
        document.querySelectorAll('.add_button_group').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');

        userPriotity = button.innerText.trim();
    }
}


function toggleCheckboxes(event) {
    event.stopPropagation();
    let idInput = document.getElementById('task_assignet_input');
    let checkboxes = document.getElementById("checkBoxes");
    if (show) {
        checkboxes.style.visibility = "initial";
        show = false;
    } else {
        checkboxes.style.visibility = "hidden";
        show = true;
        idInput.value = ''
    }
}


function generateCheckBoxName() {
    const selectedGuests = Array.from(document.querySelectorAll('input[name="optionen"]:checked'))
        .map(checkbox => guesteArray.find(g => g.name === checkbox.value))
        .filter(Boolean);

    selectedGuests.forEach(guest => {
        namelist.push(guest.name);
        colorList.push(guest.color);
        initials.push(getInitials(guest.name));
    });
}


function generateCheckBox() {
    let id = document.getElementById('check_box_user_name');
    if (id) {
        id.innerHTML = '';
        for (let i = 0; i < guesteArray.length; i++) {
            const element = guesteArray[i];
            id.innerHTML += renderHtmlGenerateCheckBox(element, i)
        }
        document.addEventListener('click', function (event) {
            let checkboxes = document.getElementById("checkBoxes");
            let selectBox = document.querySelector('.selectBox');
            
            if (selectBox && !selectBox.contains(event.target)) {
                checkboxes.style.visibility = "hidden";
                show = true;
            }
        });
    }
}


function searchNameFromGuestList() {
    let idInput = document.getElementById('task_assignet_input').value;
    idInput = idInput.toLowerCase();

    let id = document.getElementById('check_box_user_name');

    id.innerHTML = '';
    for (let i = 0; i < guesteArray.length; i++) {
        const element = guesteArray[i];
        let initial = getInitials(element.name)
        if (element.name.toLowerCase().includes(idInput)) {
            id.innerHTML += rendersearchNameFromGuestList(element, initial)
        }
    }
}


function getValues(id) {
    let add_task_show_check = document.getElementById(id);
    const checkboxes = document.querySelectorAll('input[name="optionen"]:checked');
    add_task_show_check.innerHTML = '';

    let checkedValues = [];
    checkboxes.forEach((checkbox) => {
        checkedValues.push(checkbox.value);
    });
    checkGuestsName(checkedValues);
}


function checkGuestsName(checkedValues) {
    if (checkedValues) {
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
        add_task_show_check.innerHTML = '';
        for (let index = 0; index < selectedGuests.length; index++) {
            const element = selectedGuests[index];
            let initial = getInitials(element.name);
            add_task_show_check.innerHTML += `
                    <div class="add_task_checkbox_name board_task_user_initial show_task_user_initial" style="background-color: ${element.color};">${initial}</div>
                `;
        }
    }
}


function clearForm() {
    document.getElementById("meinFormular").reset();
}


function showAddAndDeleteSubTask() {
    let add_task_button_plus = document.getElementById('add_task_button_plus');
    let deleteSubtask = document.getElementById('delete_subtask');
    let check = document.getElementById('check');

    add_task_button_plus.style.visibility = 'hidden';
    check.style.display = 'inline';
    deleteSubtask.style.display = 'inline';
}


function deleteSubtask() {
    let add_task_button_plus = document.getElementById('add_task_button_plus');
    let deleteSubtask = document.getElementById('delete_subtask');
    let check = document.getElementById('check');
    let task_subtasks = document.getElementById('task_subtasks');
    task_subtasks.value = '';
    check.style.display = 'none';
    deleteSubtask.style.display = 'none';
    add_task_button_plus.style.visibility = 'initial';
}


function getSubtask() {
    let get_subtask = document.getElementById('get_subtask');
    get_subtask.innerHTML = '';
    console.log(subtasks);
    if(subtasks) {
        for (let i = 0; i < subtasks.length; i++) {
            const element = subtasks[i];
            get_subtask.innerHTML = `
                ${element}
            `;
        }
    }
}


function addNewSubTask() {
    let task_subtask = document.getElementById('task_subtasks');
    let add_task_button_plus = document.getElementById('add_task_button_plus');
    let deleteSubtask = document.getElementById('delete_subtask');
    let check = document.getElementById('check');

    if(task_subtask.value) {
        subtasks.push(task_subtask.value);    

    }
    getSubTaskAddTask();
    check.style.display = 'none';
    deleteSubtask.style.display = 'none';
    add_task_button_plus.style.visibility = 'initial';
    task_subtask.value = "";
}


function getSubTaskAddTask() {
    let get_subtask = document.getElementById('get_subtask');
    get_subtask.innerHTML = '';
    if (subtasks) {
        for (let i = 0; i < subtasks.length; i++) {
            const element = subtasks[i];
            get_subtask.innerHTML += renderGetSubTaskAddTask(i, element);
        }
    }
}


function showEditNewSubTask(i) {
    let show_task_subtask_edit_btn = document.getElementById(`show_task_subtask_edit_btn${i}`);
    show_task_subtask_edit_btn.style.display = 'flex';
    let show_task_subtask_edit_input = document.getElementById(`show_task_subtask_edit_input${i}`);
    show_task_subtask_edit_input.value = subtasks[i];
}


function addEditNewSubTask(i) {
    let show_task_subtask_edit_input = document.getElementById(`show_task_subtask_edit_input${i}`);
    subtasks[i] = show_task_subtask_edit_input.value;
    getSubTaskAddTask();
}


function deleteNewSubTask(i) {
    subtasks.splice(i, 1);    
    getSubTaskAddTask();
}