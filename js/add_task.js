const BASE_URL_GUEST = 'https://join-b0cbf-default-rtdb.europe-west1.firebasedatabase.app';
let show = true;
let guestArray = [];
let guesteArr = [];



async function loadGuestFromServer() {
    try {
        const response = await fetch(`${BASE_URL_GUEST}/guestContacts.json`);
        if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok.');
        }
        const data = await response.json();
        guesteArr = Object.keys(data).map(id => ({
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
}


function showCheckboxes() {
    let checkboxes = document.getElementById("checkBoxes");
    let add_task_footer = document.getElementById("add_task_footer");

    if (show) {
        checkboxes.style.display = "block";
        add_task_footer.style.visibility = "hidden";

        show = false;
    } else {
        checkboxes.style.display = "none";
        add_task_footer.style.visibility = "initial";
        show = true;
    }
}



function generateCheckBox() {
    let id = document.getElementById('check_box_user_name');

    id.innerHTML = '';
    for (let i = 0; i < guesteArr.length; i++) {
        const element = guesteArr[i];
        id.innerHTML += /*html*/`        
             <label for="first">
                 <option value="${element.name}">${element.name}</option>
                <input type="checkbox" id="first" />
             </label>
        `;
    }
}



function generateAddTasks() {

    let add_task_form = document.getElementById('add_task_form');

    add_task_form.innerHTML = /*html*/`
    <h1>Add Task</h1>
            <div class="add_task_form">
                <div class="add_task_width50">
                    <div class="add_task_title add_task_form_row">
                        <label for="">Title<b>*</b></label>
                        <!-- required -->
                        <input id="task_title" class="add_task_input" type="text" placeholder="Enter a title">
                    </div>
                    <div class="add_task_descripion add_task_form_row">
                        <label for="">Description</label>
                        <textarea id="task_description" class="add_task_textarea" name=""
                            placeholder="Enter a Description"></textarea>
                    </div>

                    <div class="add_task_assignet add_task_form_row">
                        <label for="" id="assignet_to">Assignet to</label>
                        <div class="selectBox" onclick="showCheckboxes()">

                        <!-- select in Script -->
                            <select class="add_task_input" id="task_assignet">
                                <option value="" hidden>Select options</option>
                            </select>
                            <div class="overSelect"></div>
                        </div>
                        <div class="checkbox_name" id="checkBoxes">
                            <div class="dropdown_users_name" id='check_box_user_name'></div>
                        </div>                       
                    </div>
                </div>

                <div class="add_task_line"></div>

                <div class="add_task_width50">
                    <div class="add_task_date add_task_form_row">
                        <label for="">Due date<b>*</b></label>
                        <!--  required-->
                        <input id="task_date" class="add_task_input" type="date">
                    </div>
                    <div class="add_task_prio add_task_form_row">
                        <p>Prio</p>
                        <div class="add_task_button_group">
                            <button class="add_task_button_urgent add_task_hover_button">Urgent
                                <div class="add_task_button_vector">
                                    <img src="./assets/img/vector_red.svg">
                                </div>
                            </button>
                            <button class="add_task_button_medium add_task_button_urgent add_task_hover_button">Medium
                                <div class="add_task_button_vector">
                                    <img src="./assets/img/vector_strich.svg">
                                </div>
                            </button>
                            <button class="add_task_button_low add_task_button_urgent add_task_hover_button">Low
                                <div class="add_task_button_vector">
                                    <img src="./assets/img/vector_green.svg">
                                </div>
                            </button>
                        </div>
                    </div>
                    
                    <div class="add_task_category add_task_form_row">
                        <label for="">Categoriy<b>*</b></label>
                        <!--required  -->
                        <select id="task_category" class="add_task_input">
                            <option value="" hidden>Select task categoriy</option>
                            <option value="Technical Task">Technical Task</option>
                            <option value="User Story">User Story</option>
                        </select>
                    </div>
                    <div class="add_task_subtask add_task_form_row">
                        <label for="">Subtasks</label>
                        <select id="task_subtasks" class="add_task_input"></select>
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
    `;


}