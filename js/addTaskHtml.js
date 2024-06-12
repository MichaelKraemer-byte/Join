function renderHtmlGenerateCheckBox(element, i) {
    let initial = element.name;
    return /*html*/`        
    <label>
        <div class="board_task_check_box_name">
            <div class="board_task_user_initial check_box_initial" style="background-color:${element.color}">${getInitials(initial)}</div>
            <p id="${i}">${element.name}<p>
        </div>
        <input type="checkbox" name="optionen" value="${element.name}"/>
    </label>
`;
}


function rendersearchNameFromGuestList() {
    return  /*html*/`        
        <label>
        <p>${element.name}<p>
        <input type="checkbox" name="optionen" value="${element.name}"/>
        </label>
`;
}

function renderHtmlAddtask() {
    return /*html*/`
    <h1>Add Task</h1>
    <form id="meinFormular" onsubmit="event.preventDefault(); addTaskToTasks();">
    <!-- onsubmit="event.preventDefault(); addTaskToTasks();"  -->
        <div>           
            <div class="add_task_form">
                <div class="add_task_width50">
                    <div class="add_task_title add_task_form_row">
                        <label for="">Title<b>*</b></label>
                        <input id="task_title" class="add_task_input" required type="text" placeholder="Enter a title">
                        <!-- <p id="errorMessage" style="color:red; display:none;">Die Felder sollen ausgefüllt werden</p> -->
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
                        <div class="add_task_show_check" id="add_task_show_check"></div>   
                    </div>
                </div>
            <div class="add_task_line"></div>
                <div class="add_task_width50">
                    <div class="add_task_date add_task_form_row">
                        <label for="">Due date<b>*</b></label>
                        <input id="task_date" class="add_task_input add_date" type="date" required>
                        <!-- <p id="errorMessage" style="color:red; display:none;">Die Felder sollen ausgefüllt werden</p> -->
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
                        <!-- <p id="errorMessage" style="color:red; display:none;">Die Felder sollen ausgefüllt werden</p> -->
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
            </div>
        </div>
    </form>
    `;
}