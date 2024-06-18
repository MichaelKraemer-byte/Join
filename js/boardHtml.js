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

function rendergetcheckBoxesEdit(guest, initial, isChecked) {
    return `        
        <div class="board_task_check_box_name">
            <div class="show_task_checkbox_edit_name_input">
                <div class="board_task_user_initial check_box_initial" style="background-color:${guest.color}">${initial}</div>
                <label for="${guest.id}">${guest.name}</label>
            </div>
            <input type="checkbox" id="${guest.id}" name="guest" value="${guest.name}" ${isChecked ? 'checked' : ''}>
        </div>
    `;
}


function renderEditTaskHtml(contact) {
    return /*html*/` 
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


function rendergenerateCheckBoxSubTaskHtml(contact, element, id, i) {
    const isChecked = contact.selectedTask ? contact.selectedTask.includes(element) : false;
    return `
        <div class="show_task_subtask_content">
            <input type="checkbox" id="${id}_${i}" name="subtask" data-value="${element}" ${isChecked ? 'checked' : ''}/>
            <label for="${id}_${i}">${element}</label>
        </div>
    `;
}


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