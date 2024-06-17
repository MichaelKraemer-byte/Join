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