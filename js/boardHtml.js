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
                <div>Subtasks</div>
            </div>            
        </div>

    `;
}