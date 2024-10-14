/**
 * The function `renderHtmlToDo` generates HTML code for displaying a to-do task element.
 * @param {Object} element - An object containing properties related to a task.
 * @param {number} element.id - The unique identifier of the task.
 * @param {string} element.status - The status of the task.
 * @param {string} element.title - The title of the task.
 * @param {string} element.description - The description of the task.
 * @param {string} element.priorityImg - The URL of the priority image associated with the task.
 * @returns {string} Returns an HTML template string representing a task element.
 * The template includes elements for task category, title, description, priority image,
 * and task-related information. Event handlers for drag-and-drop and task click events
 * are also included.
 */
function renderHtmlToDo(element) {
    
    return /*html*/`
    <div class="task" draggable="true" ondragstart=" startDragging(${element.id})" onclick="showTask(${element.id})">
        <div class="board_task_category" id="board_task_category${element.id}">${element.status}</div>
        <div class="board_task_title">${element.title}</div>  

        <div class="board_task_descripton board_task_toDo">${element.description}</div>          
        <div id="idSUb${element.id}"></div>
        <div class="board_task_footer_status">  
            <div class="board_task_initial" id="board_task_initial${element.id}"></div>
            <img src="${element.priorityImg}">           
        </div>
    </div>
    `;
}


/**
 * The function `renderHtmlProgressBar` generates an HTML progress bar based on the number of selected
 * subtasks compared to all subtasks within a given element.
 * @param {Object} element - An object containing information about a task.
 * @param {Array} element.subtasks - An array representing all subtasks associated with the task.
 * @param {Array} element.selectedTask - An array representing selected subtasks.
 * @returns {string} Returns an HTML string representing a progress bar for the task. The progress bar
 * displays the current progress of selected subtasks out of all subtasks, shown as a percentage width,
 * along with the count of selected subtasks and total subtasks.
 */
function renderHtmlProgressBar(currentTask) {
    let currentAllSubtask = currentTask.subtasks.length;
    let currentSelectedSubtask = currentTask.selectedTask.length;

    let width = (currentSelectedSubtask / currentAllSubtask * 100).toFixed(0);
    return `
        <div class="board_task_progress_line">
            <div class="board_task_progressbar">
                <div id="progressBar${currentTask.id}" class="progress-bar" style="width: ${width}%"></div>
            </div>  
            <div class="board_task_progress_subcount">
                <div>${currentSelectedSubtask}</div>
                <div>/</div>
                <div>${currentAllSubtask}</div>
                <div style="margin-left: 2px">Subtasks</div>
            </div>            
        </div>
    `;
}


/**
 * The function `renderHtmlProgressBarEmpty` generates an empty HTML progress bar for a task element.
 * @param {Object} element - An object representing a task with properties like `id` and `subtasks`.
 * @param {number} element.id - The unique identifier of the task.
 * @param {Array} element.subtasks - An array representing all subtasks associated with the task.
 * @returns {string} Returns an HTML string that represents an empty progress bar for the task.
 * The HTML structure includes a progress bar element with a specific ID based on `element.id`, a
 * subtask count initialized to 0, and the total number of subtasks for the task.
 */
function renderHtmlProgressBarEmpty(element) {
    return `
            <div class="board_task_progress_line">
        <div class="board_task_progressbar">
            <div id="progressBar${element.id}" class="progress-bar"></div>
        </div>  
        <div class="board_task_progress_subcount">
            <div>0</div>
            <div>/</div>
            <div>${element.subtasks.length}</div>
            <div style="margin-left: 2px">Subtasks</div>
        </div>            
        </div>
        `;
}


/**
 * The function `renderGenerateShowTaskHtml` generates HTML content for displaying a task with details
 * like title, description, date, priority, assigned user, and options to delete or edit the task.
 * @param {Object} contact - An object containing information about a task.
 * @param {string} contact.status - The status of the task.
 * @param {string} contact.title - The title of the task.
 * @param {string} contact.description - The description of the task.
 * @param {string} contact.date - The due date of the task.
 * @param {string} contact.priority - The priority of the task.
 * @param {string} contact.priorityImg - The URL of the priority image associated with the task.
 * @param {number} contact.id - The unique identifier of the task.
 * @param {number} id - A parameter used to dynamically generate unique IDs for elements in the rendered HTML.
 * @returns {string} Returns an HTML template string representing the structure of a task display container.
 * The template includes elements such as task title, description, due date, priority, assigned user,
 * subtasks, and options to delete or edit the task.
 */
function renderGenerateShowTaskHtml(contact, id) {
    return `
    <div class="show_task" id="showTaskContainer">
        <div class="show_task_content">
            <div class="show_task_header">
                <div class="show_task_category" id="show_task_category${id}">${contact.status}</div> 
                <img class="show_task_close_button" onclick="closeShowTask()" src="./assets/img/close.svg">
            </div> 

            <div class="show_task_title">${contact.title}</div>    
            
            <div class="showTaskFirstInfoSection">
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
            </div>

            <div class="show_task_user_daten">
                <span class="taskAssignedToSpan">Assigned to:</span>
                <div class="div_show_task_user_initial" id="show_task_user_initial"></div>
                <div class="show_task_user_name " id="show_task_user_name"></div>
                <div class="show_task_show_subtasks">
                    <span>Subtasks:</span>
                    <div class="show_task_subtask" id="show_task_subtask"></div>
                </div>
            </div>            
        </div>

        <div class="show_task_footer">
            <div class="show_task_footer_delete">
                <div onclick="deleteTaskFromLocalStorage(${contact.id})" class="show_task_delete_button">
                    <img src="./assets/img/delete.svg" alt="">    
                    <p>Delete</p>
                </div>
            </div>
            <div class="show_task_footer_delete">                
                <div onclick="editTask(${contact.id})" class="show_task_delete_button">
                    <img src="./assets/img/edit.svg" alt="">    
                    <p>Edit</p>
                </div>
            </div>
        </div>    
    </div>
`;
}


/**
 * The function `rendergetcheckBoxesEdit` generates HTML markup for a checkbox input with guest
 * information and initial values.
 * @param {Object} guest - An object containing information about a guest.
 * @param {number} guest.id - The unique identifier of the guest.
 * @param {string} guest.name - The name of the guest.
 * @param {string} guest.color - The color associated with the guest, used for styling purposes.
 * @param {string} initial - The initials of the guest, displayed in a colored circle next to their name.
 * @param {boolean} isChecked - A boolean value indicating whether the checkbox should be initially checked.
 * @returns {string} Returns an HTML template string that includes a checkbox element with the specified
 * guest information (name, initial, color) and whether it is checked based on the `isChecked` parameter.
 */
function rendergetcheckBoxesEdit(guest, initial, isChecked) {
    return `        
        <div class="board_task_check_box_name editTaskCheckBoxGreyHover">
            <div class="show_task_checkbox_edit_name_input">
                <div class="board_task_user_initial check_box_initial" style="background-color:${guest.color}">${initial}</div>
                <label class="checkBoxLabelEditTask" for="${guest.id}">${guest.name}</label>
            </div>
            <div class="checkbox-wrapper-27">
                <label class="checkbox">
                    <input type="checkbox" id="${guest.id}" name="guest" value="${guest.name}" ${isChecked ? 'checked' : ''}>
                    <span class="checkbox__icon"></span>
                </label>
            </div>
        </div>
    `;
}


/**
 * The function `renderEditTaskHtml` returns HTML code for editing a task with various input fields and
 * buttons.
 * @param {Object} contact - An object containing information about a task.
 * @param {number} contact.id - The unique identifier of the task.
 * @returns {string} Returns an HTML template string representing a form for editing a task. The form
 * includes input fields for title, description, due date, task priority buttons (urgent, medium, low),
 * task category dropdown, assigned to dropdown, subtasks, and a submit button.
 */
function renderEditTaskHtml(contact) {
    return /* html */` 
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
                        <input id="task_date_edit" class="show_task_edit_input" type="date" min="${setDate()}">
                </div>
                <div class="task_assignet_edit add_task_form_row">
                    <span><b style="color:black;">Priority</b></span>
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
                </div>
                <div class="task_date_edit add_task_form_row">
                <span>Task category</span>
                    <select name="task_category" id="task_category_edit" class="show_task_edit_input">
                        <option value="to_do">To do</option>
                        <option value="in_progress">In progress</option>
                        <option value="awaitt">Await feedback</option>
                        <option value="done" selected>Done</option>
                    </select>
                </div>
                <div class="task_date_edit add_task_form_row">
                    <span id="assignet_to">Assigned to</span>
                    <div class="selectBox" onclick="showCheckboxesEdit()">
                        <img src="./assets/img/arrow_drop_down.svg" alt="">
                        <input class="add_task_input" id="task_assignet_input_edit" placeholder="Select options" /> 
                    </div>
                    <div class="checkBoxesEdit" id="checkBoxesEdit"></div> 
                    <div class="task_edit_initial" id="task_edit_initial"></div>
                </div>
                <div class="task_subtask_edit add_task_form_row">
                    <span>Subtasks</span>
                    <img class="add_task_button_add_subtask" src="./assets/img/add.svg" alt="" onclick="addNewSubTaskEdit(${contact.id})">
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
}


/**
 * The function `rendergenerateCheckBoxSubTaskHtml` generates HTML for a checkbox element with a label
 * and optional checked state based on the provided parameters.
 * @param {Object} contact - An object containing information related to a contact or task.
 * @param {any} element - The individual subtask element that needs to be rendered as a checkbox.
 * @param {string} id - A string used to generate unique IDs for the checkboxes in the HTML output.
 * @param {number} i - An index or counter variable used within the function to track the position of
 * the current element being processed.
 * @returns {string} Returns an HTML string representing a checkbox element with a label and a span
 * containing the subtask `element`. The checkbox is checked if `contact.selectedTask` includes the
 * `element`, otherwise it is unchecked.
 */
function rendergenerateCheckBoxSubTaskHtml(contact, element, id, i) {
    const isChecked = contact.selectedTask ? contact.selectedTask.includes(element) : false;
    return `
        <div class="checkbox-wrapper-27 show_task_subtask_content">
            <label class="checkbox" for="${id}_${i}">
                <input type="checkbox" id="${id}_${i}" name="subtask" data-value="${element}" ${isChecked ? 'checked' : ''}>
                <span class="checkbox__icon"><span class="checkboxSubject">${element}</span></span>
            </label>
        </div>
    `;
}


/**
 * The function `rendergetSubtaskEditHtml` generates HTML elements for displaying and editing subtasks
 * within a task.
 * @param {string} element - The subtask element to be displayed and edited in the HTML.
 * @param {Object} contact - An object containing properties related to a task, including an `id` used
 * in various places within the HTML template.
 * @param {number} i - The index or position of the subtask element being rendered, used to generate
 * unique IDs for elements within the HTML template.
 * @returns {string} Returns an HTML template string that includes input fields, buttons, and images for
 * editing and deleting subtasks within a task.
 */
function rendergetSubtaskEditHtml(element, contact, i) {
    return `
        <div class="show_task_subtask_edit_btn" id="show_task_subtask_edit_btn${i}">
            <input type="text" id="show_task_subtask_edit_input${i}">
            <div class="show_task_subtask_edit_btn_delete_add">
                <img class="img_hover_btn" src="./assets/img/delete.svg" onclick="showTaskDeleteSubtask(${i}, ${contact.id})">
                <img class="img_hover_btn" id="check" src="./assets/img/check-small-svgrepo-com.svg" onclick="addEditSubtask(${i}, ${contact.id})">
            </div>
        </div>
        <div class="show_task_edit_subtasks_del_edit">
            <div class="get_show_task"><li>${element}</li></div>
            <div class="show_task_edit_subtasks_del_edit_button">
                <img class="img_hover_btn" src="./assets/img/edit.svg" onclick="showTaskEditSubtask(${i}, ${contact.id})">
                <div class="cross_line"></div>
                <img class="img_hover_btn" src="./assets/img/delete.svg" onclick="showTaskDeleteSubtask(${i}, ${contact.id})">
            </div>
        </div>    
    `;
}