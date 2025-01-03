/**
 * Variables representing categories or statuses in a task management system.
 * - `to_do`: Represents tasks awaiting action or in the initial stage.
 * - `in_progress`: Represents tasks currently being worked on.
 * - `awaitt`: Represents tasks awaiting further action or approval.
 * @type {string}
 */
let to_do = 'to_do';
let in_progress = 'in_progress';
let awaitt = 'awaitt';


/**
 * Generates HTML markup for a checkbox element with user initials and name.
 * @param {Object} element - An object representing a user with properties like `name`, `color`, etc.
 * @param {number} i - Index or identifier for the element being rendered.
 * @returns {string} HTML template string generating a checkbox element with user initials and name.
 */
function renderHtmlGenerateCheckBox(element, i) {
    let initial = element.name;
    return /*html*/`        
    <label class="checkBoxLabel" onclick="addOrRemoveCheckboxLabelColor(event)">
        <div class="board_task_check_box_name addTaskCheckBoxContainer">
            <div class="board_task_user_initial check_box_initial" style="background-color:${element.color}">${getInitials(initial)}</div>
            <p id="${i}">${element.name}</p>
        </div>
        <div class="checkbox-wrapper-27">
            <label class="checkbox">
                <input type="checkbox" name="optionen" value="${element.name}">
                <span class="checkbox__icon padding-right"></span>
            </label>
        </div>
    </label>
`;
}


/**
 * Generates HTML markup for displaying a guest's name and initial with a checkbox.
 * @param {Object} element - An object containing information about a guest, including properties like `name`, `color`, etc.
 * @param {string} initial - Initial of the guest's name, displayed inside a colored box next to the guest's full name.
 * @returns {string} HTML template string including a label element with the guest's name, initial, and a checkbox input.
 */
function rendersearchNameFromGuestList(element, initial) {
    return  /*html*/`        
        <label>
        <div class="board_task_check_box_name">
            <div class="board_task_user_initial check_box_initial" style="background-color:${element.color}">${initial}</div>
            <p>${element.name}</p>
        </div>
        <div class="checkbox-wrapper-27">
            <label class="checkbox">
                <input type="checkbox" name="optionen" value="${element.name}">
                <span class="checkbox__icon"></span>
            </label>
        </div>
    </label>
`;
}


/**
 * Generates HTML code for adding a new task to a specified column in a task management system.
 * @param {string} column - Specifies the column in which the task will be added.
 * @returns {string} HTML template string representing a form for adding a task. The form includes fields
 * for title, description, assigned to, due date, priority, category, subtasks, and buttons for creating
 * or closing the task.
 */
function renderHtmlAddtask(column) {
    return /*html*/`
    <div class="show_add_task" id="showTaskContainer">
        <img class="close_pop_add_task" src="./assets/img/close.svg" onclick="closeWindow()">
        <h1>Add Task</h1>
        <form id="meinFormular" onsubmit="event.preventDefault(); addTaskToTasks(${column}); clearFormForBoard();">
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

                        <div class="add_task_assigned add_task_form_row">
                            <label id="assignet_to">Assignet to</label>
                            <div class="selectBox" onclick="toggleCheckboxes(event)">
                                <img src="./assets/img/arrow_drop_down.svg" alt="">
                                <input class="add_task_input" id="task_assignet_input" placeholder="Select options" onkeydown="searchNameFromGuestList()"/>
                            </div>
                            <div class="checkbox_name" id="checkBoxes" onclick="event.stopPropagation()">
                                <div class="dropdown_users_name" id="check_box_user_name"></div>
                            </div> 
                            <div class="add_task_show_check" id="add_task_show_check"></div>   
                        </div>
                    </div>

                    <div class="add_task_line"></div>
                    
                    <div class="add_task_width50">
                        <div class="add_task_date add_task_form_row">
                            <label for="">Due date<b>*</b></label>
                            <input id="task_date" class="add_task_input add_date" type="date" required min="${setDate()}">
                        </div>
                        <div class="add_task_prio add_task_form_row">
                            <p>Prio</p>
                            <div class="add_task_button_group">
                                <button id="urgent" type="button" class="add_button_group add_task_hover_button" onclick="getTaskPriority('urgent')">Urgent
                                    <div class="add_task_button_vector">
                                        <img src="./assets/img/vector_red.svg">
                                    </div>
                                </button>
                                <button id="medium" type="button" class="add_button_group add_task_button_medium add_task_hover_button active" onclick="getTaskPriority('medium')">Medium
                                    <div class="add_task_button_vector">
                                        <img src="./assets/img/vector_strich.svg">
                                    </div>
                                </button>
                                <button id="low" type="button" class="add_button_group add_task_button_low  add_task_hover_button" onclick="getTaskPriority('low')">Low
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
                            <div class="add_task_button_plus" id="add_task_button_plus">
                                <img class="add_task_button_add_subtask" src="./assets/img/add.svg"  onclick="addNewSubTask()">
                            </div>
                            <input   onkeydown="checkIfKeyisEnterThenAddNewSubTask(event)" class="add_task_input" id="task_subtasks" placeholder="Add new subtask" type="text">
                        </div>
                        <div class="get_subtask" id="get_subtask"></div>
                    </div>
                </div>
                <div class="add_task_footer">
                        <p id="add_task_footer"><b>*</b>This field is required</p>
                        <div class="add_task_button_group_footer">
                            <button type="button" class="add_task_button_clear add_task_hover_button" onclick="clearFormForBoard()">Clear
                                <img class="addContactCancelX" src="./assets/img/cancelX.svg">
                            </button>
                            <button id="createTaskButton" type="submit" class="add_task_button_create add_task_hover_button">Create Task
                                <img src="./assets/img/vector_check.svg">
                            </button>
                        </div>
                    </div>
            </form>
        </div>
        `;
}


/**
 * Generates HTML elements for displaying and editing subtasks within a task.
 * @param {number} i - Index or identifier for the subtask being rendered. Used to generate unique IDs
 * for elements within the rendered HTML template.
 * @param {string} element - Content of the subtask to be displayed in the rendered HTML. Used to
 * dynamically generate a section of HTML code for displaying and editing subtasks within a task.
 * @returns {string} String containing HTML elements for displaying a subtask with options to edit
 * and delete.
 */
function renderGetSubTaskAddTask(i, element) {
    return `
        <div class="add_task_subtask_edit_btn" id="show_task_subtask_edit_btn${i}">
            <input style="background: #F6F7F8; font-size: 13px;" type="text" id="show_task_subtask_edit_input${i}">
            <div class="show_task_subtask_edit_btn_delete_add">
            <img class="img_hover_btn" src="./assets/img/delete.svg" onclick="deleteNewSubTask(${i})">
            <img class="img_hover_btn" id="check" src="./assets/img/check-small-svgrepo-com.svg" onclick="addEditNewSubTask(${i})" >
        </div>
        </div>
        <div class="add_task_edit_subtasks_del_edit">
            <div class="get_show_task"><li>${element}</li></div>
            <div class="show_task_edit_subtasks_del_edit_button">
                <img class="img_hover_btn" src="./assets/img/edit.svg" onclick="showEditNewSubTask(${i})">
                <div class="cross_line"></div>
                <img class="img_hover_btn" src="./assets/img/delete.svg"  onclick="deleteNewSubTask(${i})">
            </div>
        </div>         
    `;
}


/**
 * The clearForm function resets the input fields in a form with the ID "meinFormular".
 */
function clearFormForBoard() {
    const addTaskShowCheckElement = document.getElementById('add_task_show_check');

    if (addTaskShowCheckElement) {
        subtasks = [];
        namelist = [];
        colorList = [];
        initials = [];
        document.getElementById('add_task_show_check').innerHTML = '';
        document.getElementById('get_subtask').innerHTML = '';
        document.getElementById("meinFormular").reset();
        getSubTaskAddTask();        
    } else {
        return;
    }
}