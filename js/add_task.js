const BASE_URL_GUEST = 'https://join-b0cbf-default-rtdb.europe-west1.firebasedatabase.app';
let show = true;
let guesteArray = [];


// loadTaskFromLocalStorage();

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
    generateAddTasks();
    generateCheckBox();

    document.querySelectorAll('input[name="optionen"]').forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            werteAbrufen();
        });
    });
}


function showCheckboxes() {
    let checkboxes = document.getElementById("checkBoxes");
    if (show) {
        checkboxes.style.display = "block";

        show = false;
    } else {
        checkboxes.style.display = "none";
        show = true;
    }
}



function generateCheckBox() {
    let id = document.getElementById('check_box_user_name');

    id.innerHTML = '';
    for (let i = 0; i < guesteArray.length; i++) {
        const element = guesteArray[i];
        id.innerHTML += /*html*/`        
            <label>
            <p>${element.name}<p>
            <input type="checkbox" name="optionen" value="${element.name}"/>
            </label>
        `;
    }
}



function generateAddTasks() {

    let add_task_form = document.getElementById('add_task_form');

    add_task_form.innerHTML = /*html*/`
    <h1>Add Task</h1>
    <form>
        <div>
            <div class="add_task_form">
                <div class="add_task_width50">
                    <div class="add_task_title add_task_form_row">
                        <label for="">Title<b>*</b></label>
                        <input id="task_title" class="add_task_input" required type="text" placeholder="Enter a title">
                    </div>
                    <div class="add_task_descripion add_task_form_row">
                        <label for="">Description</label>
                        <textarea id="task_description" class="add_task_textarea" name=""
                            placeholder="Enter a Description"></textarea>
                    </div>

                    <div class="add_task_assignet add_task_form_row">
                        <label id="assignet_to">Assignet to</label>
                        <div class="selectBox" onclick="showCheckboxes()">
                            <img src="./assets/img/arrow_drop_down.svg" alt="">
                            <input class="add_task_input" id="task_assignet_input" placeholder="Select options" onkeydown="searchNameFromGuestList()"/>
                        </div>
                        <form action="">
                        <div class="checkbox_name" id="checkBoxes">
                            <div class="dropdown_users_name" id='check_box_user_name'></div>
                        </div>                                               
                        </form>                      
                    </div>
                </div>
            <div class="add_task_line"></div>
                <div class="add_task_width50">
                    <div class="add_task_date add_task_form_row">
                        <label for="">Due date<b>*</b></label>
                        <input id="task_date" class="add_task_input" type="date" required>
                    </div>
                    <div class="add_task_prio add_task_form_row">
                        <p>Prio</p>
                        <div class="add_task_button_group">
                            <div class="add_button_group add_task_button_urgent add_task_hover_button" onclick="getPriority('Urgent')">Urgent
                                <div class="add_task_button_vector">
                                    <img src="./assets/img/vector_red.svg">
                                </div>
                            </div>
                            <div class="add_button_group add_task_button_medium add_task_button_urgent add_task_hover_button" onclick="getPriority('Medium')">Medium
                                <div class="add_task_button_vector">
                                    <img src="./assets/img/vector_strich.svg">
                                </div>
                            </div>
                            <div class="add_button_group add_task_button_low add_task_button_urgent add_task_hover_button" onclick="getPriority('Low')">Low
                                <div class="add_task_button_vector">
                                    <img src="./assets/img/vector_green.svg">
                                </div>
                            </div>
                        </div>
                    </div>                    
                    <div class="add_task_category add_task_form_row">
                        <label for="">Categoriy<b>*</b></label>
                        <select id="task_category" class="add_task_input" required>
                            <option value="" hidden>Select task categoriy</option>
                            <option value="Technical Task">Technical Task</option>
                            <option value="User Story">User Story</option>
                        </select>
                    </div>
                    <div class="add_task_subtask add_task_form_row">
                        <label>Subtasks</label>
                        <img class="add_task_button_add_subtask" src="./assets/img/add.svg" alt="" onclick="addNewSubTask()">
                        <input class="add_task_input" id="task_subtasks" placeholder="Add new subtask" type="text">
                    </div>
                </div>
            </div>
            <div class="add_task_footer">
                <p id="add_task_footer"><b>*</b>This field is required</p>
                <div class="add_task_button_group_footer">
                    <button class="add_task_button_clear add_task_hover_button">Clear X</button>
                    <button class="add_task_button_create add_task_hover_button" onclick="addTaskToTasks()">Create Task
                        <img src="./assets/img/vector_check.svg">
                    </button>
                </div>
            </div>
        </div>
    </form>
    `;

}


function searchNameFromGuestList() {
    let idInput = document.getElementById('task_assignet_input').value;
    idInput = idInput.toLowerCase();

    let id = document.getElementById('check_box_user_name');

    id.innerHTML = '';
    for (let i = 0; i < guesteArray.length; i++) {
        const element = guesteArray[i];
        if (element.name.toLowerCase().includes(idInput)) {
            id.innerHTML += /*html*/`        
                <label>
                <p>${element.name}<p>
                <input type="checkbox" name="optionen" value="${element.name}"/>
                </label>
            `;
        }
    }
}


function werteAbrufen() {
    const checkboxes = document.querySelectorAll('input[name="optionen"]:checked');
    let checkedValues = [];
    checkboxes.forEach((checkbox) => {
        checkedValues.push(checkbox.value);
    });
}


function addNewSubTask() {

}


function getPriority(prio) {
    let imgSrc;
    let name;
    // console.log(prio);
    
    switch (prio) {
        case 'Urgent':
            imgSrc = './assets/img/vector_red.svg';
            name = prio;
            break;
        case 'Medium':
            imgSrc = './assets/img/vector_strich.svg';
            name = prio;
            break;
        case 'Low':
            imgSrc = './assets/img/vector_strich.svg"';
            name = prio;
            break;
    }
}