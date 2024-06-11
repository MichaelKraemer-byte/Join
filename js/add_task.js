const BASE_URL_GUEST = 'https://join-b0cbf-default-rtdb.europe-west1.firebasedatabase.app';
let show = true;
let guesteArray = [];
let userPriotity;
let imgPriority;

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


function generateAddTasks() {

    let add_task_form = document.getElementById('add_task_form');

    add_task_form.innerHTML = /*html*/`
    <h1>Add Task</h1>
    <form id="meinFormular" onsubmit="event.preventDefault(); addTaskToTasks();" >
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
                        <div class="selectBox" onclick="toggleCheckboxes(event)">
                            <img src="./assets/img/arrow_drop_down.svg" alt="">
                            <input class="add_task_input" id="task_assignet_input" placeholder="Select options" onkeydown="searchNameFromGuestList()"/>
                        </div>
                        <div class="checkbox_name" id="checkBoxes" onclick="event.stopPropagation()">
                            <div class="dropdown_users_name" id='check_box_user_name'></div>
                        </div> 
                        <!--  -->
                        <div class="add_task_show_check" id="add_task_show_check"></div>   
                    </div>
                </div>
            <div class="add_task_line"></div>
                <div class="add_task_width50">
                    <div class="add_task_date add_task_form_row">
                        <label for="">Due date<b>*</b></label>
                        <input id="task_date" class="add_task_input add_date" type="date" required>
                    </div>
                    <div class="add_task_prio add_task_form_row">
                        <p>Prio</p>
                        <div class="add_task_button_group">
                            <button id="urgent" type="button" class="add_button_group add_task_hover_button" value="1" onclick="getTaskPriority('urgent')">Urgent
                                <div class="add_task_button_vector">
                                    <img src="./assets/img/vector_red.svg">
                                </div>
                            </button>
                            <button id="medium" type="button" class="add_button_group add_task_button_medium add_task_hover_button" value="1" onclick="getTaskPriority('medium')">Medium
                                <div class="add_task_button_vector">
                                    <img src="./assets/img/vector_strich.svg">
                                </div>
                            </button>
                            <button id="low" type="button" class="add_button_group add_task_button_low  add_task_hover_button" value="1" onclick="getTaskPriority('low')">Low
                                <div class="add_task_button_vector">
                                    <img src="./assets/img/vector_green.svg">
                                </div>
                            </button>
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
                    <button id="createTaskButton" type="submit" class="add_task_button_create add_task_hover_button">Create Task
                        <img src="./assets/img/vector_check.svg">
                    </button>
                </div>
                <p id="errorMessage" style="color:red; display:none;">Die Felder sollen ausgefüllt werden</p>
            </div>
        </div>
    </form>
    `;
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


function generateCheckBox() {
    let id = document.getElementById('check_box_user_name');
    id.innerHTML = '';
    for (let i = 0; i < guesteArray.length; i++) {
        const element = guesteArray[i];
        let initial = element.name;
        id.innerHTML += /*html*/`        
            <label>
                <div class="board_task_check_box_name">
                    <div class="board_task_user_initial check_box_initial" style="background-color:${element.color}">${getInitials(initial)}</div>
                    <p id="${i}">${element.name}<p>
                </div>
                <input type="checkbox" name="optionen" value="${element.name}"/>
            </label>
        `;
    }
}


document.addEventListener('click', function(event) {
    let checkboxes = document.getElementById("checkBoxes");
    let selectBox = document.querySelector('.selectBox');
    if (!selectBox.contains(event.target)) {
        checkboxes.style.visibility = "hidden";
        show = true;
    }
});


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
    let add_task_show_check = document.getElementById('add_task_show_check');
    const checkboxes = document.querySelectorAll('input[name="optionen"]:checked');
    add_task_show_check.innerHTML = '';
    let checkedValues = [];
    checkboxes.forEach((checkbox) => {
        checkedValues.push(checkbox.value);        
    });
    // console.log(checkedValues);
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
            add_task_show_check.innerHTML += `
                <div class="board_task_user_initial show_task_user_initial" style="background-color: ${colorList[index]};">${initials[index]}</div>
            `;
    }

}


