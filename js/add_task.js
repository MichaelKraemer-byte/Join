let show = true;

 




async function initAddTask() {

    // let a = await loadGuestFromServer("/guestContacts/");
    // console.log(a);



    let add_task_form = document.getElementById('add_task_form');


    add_task_form.innerHTML = /*html*/`
    <h1>Add Task</h1>
        <div class="add_task_form">
            <div class="add_task_width50">
                <div class="add_task_title add_task_form_row">
                    <label for="">Title<b>*</b></label>
                    <!-- required -->
                    <input id="task_title" class="add_task_input" type="text" placeholder="Enter a title" >
                </div>
                <div class="add_task_descripion add_task_form_row">
                    <label for="">Description</label>
                    <textarea id="task_description" class="add_task_textarea" name="" id="" placeholder="Enter a Description"></textarea>
                </div>
                <div class="add_task_assignet add_task_form_row">
                    <label for="" id="assignet_to">Assignet to</label>
                    <div class="selectBox" onclick="showCheckboxes()">
                        <select class="add_task_input">
                            <option>Select options</option>
                        </select>
                        <div class="overSelect"></div>
                    </div>
        
                    <div class="checkbox_name" id="checkBoxes">
                        <label for="first">
                            <p>checkBox1</p>
                            <input type="checkbox" id="first" />
                        </label>
        
                        <label for="second">
                            <p>checkBox2</p>
                            <input type="checkbox" id="second" />
                        </label>
                        <label for="third">
                            <p>checkBox3</p>
                            <input type="checkbox" id="third" />
                        </label>
                        <label for="fourth">
                            <p>checkBox4</p>
                            <input type="checkbox" id="fourth" />
                        </label>
                       
                    </div>
                </div>
            </div>

            <div class="add_task_line"></div>

            <div class="add_task_width50">
                <div class="add_task_date add_task_form_row">
                    <label for="">Due date<b>*</b></label>
                    <!--  required-->
                    <input id="task_date" class="add_task_input" type="date" >
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
                    <select id="task_category" class="add_task_input" name="" id="" >
                        <option value="" hidden>Select task categoriy</option>
                        <option value="">Technical Task</option>
                        <option value="">User Story</option>
                    </select>
                </div>
                <div class="add_task_subtask add_task_form_row">
                    <label for="">Subtasks</label>
                    <select id="task_subtasks" class="add_task_input" name="" id=""></select>
                </div>
            </div>

        </div>
        <div class="add_task_footer">
            <p><b>*</b>This field is required</p>
            <div class="add_task_button_group_footer">
                <button class="add_task_button_clear add_task_hover_button">Clear X</button>
                <button class="add_task_button_create add_task_hover_button" onclick="addTaskToTasks('to_do')">Create Task
                    <img src="./assets/img/vector_check.svg">
                </button>
            </div>
        </div>
    `;
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
