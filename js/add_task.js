const BASE_URL_GUEST = 'https://join-b0cbf-default-rtdb.europe-west1.firebasedatabase.app';
let show = true;
let guesteArray = [];
let userPriotity;
let imgPriority;

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
            getValues();
        });
    });
}


function generateAddTasks(column) {
    let boardPopUp = document.getElementById('boardPopUp');
    boardPopUp.innerHTML = renderHtmlAddtask(column);
}


async function addTaskToTasks() {
    let category;
    if (to_do) {
        category = 'to_do'
    } 
    if (in_progress) {
        category = 'in_progress'
    }
    if (awaitt) {
        category = 'awaitt'
    }
   
    generateCheckBoxName();
    let task_description = document.getElementById('task_description').value;
    let task_title = document.getElementById('task_title').value;
    let task_date = document.getElementById('task_date').value;
    let task_status = document.getElementById('task_category').value;
    let id = generateUniqueId();
    let priorityImg;
    let selectedTask = [];
    let userSubtask = subtasks;

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
        default:
            userPriotity = 'Medium'
            priorityImg = './assets/img/vector_strich.svg';
            break;
    }

    let priority = userPriotity;

    let task = {
        'category': category,
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
        'subtasks': userSubtask,
        'selectedTask': selectedTask,
    };

    todos.push(task)
    await saveTasksToServer();
    saveTaskToLocalStorage();
    closeWindow();
    initAddTask();
    initBoardTasks();
}

function generateUniqueId() {
    let id;
    do {
        id = Math.floor(Math.random() * 1000000).toString();
    } while (usedIds.has(id));
    usedIds.add(id);
    return id;
}


function checkColumnName(column) {
    if(column) {
        if (column == 'to_do') {
            awaitt = false;
            in_progress = false;
        }

        if (column == 'in_progress') {
            awaitt = false;
            to_do = false;
        }

        if (column == 'awaitt') {
            in_progress = false;
            to_do = false;
        }

    }
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
    let checkboxes = document.getElementById("checkBoxes");
    if (show) {
        checkboxes.style.visibility = "initial";
        show = false;
    } else {
        checkboxes.style.visibility = "hidden";
        show = true;
    }
}


function generateCheckBoxName() {
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
            if (!selectBox.contains(event.target)) {
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
        if (element.name.toLowerCase().includes(idInput)) {
            id.innerHTML += rendersearchNameFromGuestList(element)
        }
    }
}


function getValues() {
    let add_task_show_check = document.getElementById('add_task_show_check');
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