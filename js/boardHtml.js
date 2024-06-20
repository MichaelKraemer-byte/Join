/**
 * The function `renderHtmlToDo` generates HTML code for displaying a to-do task element.
 * @param element - The `element` parameter in the `renderHtmlToDo` function represents an object
 * containing properties related to a task. These properties include `id`, `status`, `title`,
 * `description`, and `priorityImg`. The function generates HTML markup for displaying this task on a
 * web page.
 * @returns The function `renderHtmlToDo` is returning an HTML template string that represents a task
 * element. The template includes various elements such as task category, title, description, priority
 * image, and other task-related information. The template also includes event handlers for
 * drag-and-drop functionality and task click events.
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
 * @param element - The `element` parameter in the `renderHtmlProgressBar` function represents an
 * object that contains information about a task. It has the following properties:
 * @returns The function `renderHtmlProgressBar` returns an HTML string that represents a progress bar
 * for a task. The progress bar includes the current progress of selected subtasks out of all subtasks,
 * displayed as a percentage width of the progress bar, along with the count of selected subtasks and
 * total subtasks.
 */
function renderHtmlProgressBar(element) {
    let currentAllSubtask = element.subtasks.length;
    let currentSelectedSubtask = element.selectedTask.length;

    let width = (currentSelectedSubtask / currentAllSubtask * 100).toFixed(0);
    return `
        <div class="board_task_progress_line">
            <div class="board_task_progressbar">
                <div id="progressBar${element.id}" class="progress-bar" style="width: ${width}%"></div>
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
 * @param element - The `element` parameter in the `renderHtmlProgressBarEmpty` function seems to be an
 * object representing a task with properties like `id` and `subtasks`. The function generates an HTML
 * progress bar for this task with the number of completed subtasks shown as 0 out of the total number
 * of
 * @returns The `renderHtmlProgressBarEmpty` function returns an HTML string that represents an empty
 * progress bar for a task. The HTML structure includes a progress bar element with a specific ID based
 * on the `element.id`, a subtask count, and the total number of subtasks for the task.
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
 * @param contact - The `contact` parameter in the `renderGenerateShowTaskHtml` function seems to
 * represent an object containing information about a task. It includes properties such as `status`,
 * `title`, `description`, `date`, `priority`, `priorityImg`, and `id`.
 * @param id - The `id` parameter in the `renderGenerateShowTaskHtml` function is used to dynamically
 * generate unique IDs for elements in the rendered HTML based on the task's ID. This helps in
 * identifying and manipulating specific elements related to a particular task when rendering the task
 * details on the webpage.
 * @returns The function `renderGenerateShowTaskHtml` returns an HTML template string that represents
 * the structure of a task display container. It includes various elements such as task title,
 * description, due date, priority, assigned user, subtasks, and options to delete or edit the task.
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
                <span>Assigned to:</span>
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
 * @param guest - The `guest` parameter in the `rendergetcheckBoxesEdit` function represents an object
 * containing information about a guest. It likely has properties such as `id`, `name`, and `color`
 * that are used to render a checkbox element for the guest.
 * @param initial - The `initial` parameter in the `rendergetcheckBoxesEdit` function represents the
 * initials of a guest. It is used to display the guest's initials in a colored circle next to their
 * name in the rendered HTML output.
 * @param isChecked - The `isChecked` parameter in the `rendergetcheckBoxesEdit` function is a boolean
 * value that determines whether a checkbox should be initially checked or not. If `isChecked` is
 * `true`, the checkbox will be checked by default when the component is rendered. If `isChecked` is
 * `false`,
 * @returns The function `rendergetcheckBoxesEdit` returns an HTML template string that includes a
 * checkbox element with the specified guest information (name, initial, color) and whether it is
 * checked based on the `isChecked` parameter.
 */
function rendergetcheckBoxesEdit(guest, initial, isChecked) {
    return `        
        <div class="board_task_check_box_name">
            <div class="show_task_checkbox_edit_name_input">
                <div class="board_task_user_initial check_box_initial" style="background-color:${guest.color}">${initial}</div>
                <label for="${guest.id}">${guest.name}</label>
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
 * @param contact - The `renderEditTaskHtml` function generates HTML for editing a task based on the
 * `contact` object passed as a parameter. The HTML structure includes form elements for editing task
 * details such as title, description, due date, priority, assignee, subtasks, and a submit button.
 * @returns The function `renderEditTaskHtml(contact)` returns an HTML template string that represents
 * a form for editing a task. The form includes input fields for title, description, due date, task
 * priority buttons (urgent, medium, low), assigned to dropdown, subtasks, and a submit button.
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
 * @param contact - The `contact` parameter seems to be an object containing information related to a
 * contact or a task. It likely includes details such as the selected task and other relevant data.
 * @param element - The `element` parameter in the `rendergenerateCheckBoxSubTaskHtml` function
 * represents the individual subtask element that needs to be rendered as a checkbox in the HTML
 * output.
 * @param id - The `id` parameter in the `rendergenerateCheckBoxSubTaskHtml` function is used to
 * generate unique IDs for the checkboxes created in the HTML output. These IDs are constructed by
 * combining the `id` parameter with the index `i` to ensure each checkbox has a distinct identifier.
 * @param i - The parameter `i` in the `rendergenerateCheckBoxSubTaskHtml` function is used as an index
 * or counter variable within the function. It is typically used to keep track of the position of the
 * current element being processed in a loop or iteration.
 * @returns The function `rendergenerateCheckBoxSubTaskHtml` returns an HTML string representing a
 * checkbox element with a label and a span containing the `element` value. The checkbox is checked if
 * `contact.selectedTask` includes the `element`, otherwise it is unchecked.
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
 * @param element - The `element` parameter in the `rendergetSubtaskEditHtml` function represents the
 * subtask element that will be displayed in the HTML. It is used to dynamically generate the HTML
 * structure for displaying and editing subtasks within a task.
 * @param contact - The `contact` parameter seems to represent an object with an `id` property. In the
 * provided function `rendergetSubtaskEditHtml`, this `id` property of the `contact` object is used in
 * various places as part of the HTML element attributes or in function calls.
 * @param i - The parameter `i` in the `rendergetSubtaskEditHtml` function represents the index or
 * position of the subtask element being rendered. It is used to dynamically generate unique IDs for
 * elements within the HTML template based on the index value.
 * @returns The `rendergetSubtaskEditHtml` function returns an HTML template string that includes input
 * fields, buttons, and images for editing and deleting subtasks within a task.
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