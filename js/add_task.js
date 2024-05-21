

function initAddTask() {
    let add_task_form = document.getElementById('add_task_form');

    add_task_form.innerHTML = `
    <h1>Add Task</h1>
    <form action="">
        <div class="add_task_form">
            <div class="add_task_width50">
                <div class="add_task_title add_task_form_row">
                    <label for="">Title<b>*</b></label>
                    <input class="add_task_input" type="text" placeholder="Enter a title" required>
                </div>
                <div class="add_task_descripion add_task_form_row">
                    <label for="">Description</label>
                    <textarea class="add_task_textarea" name="" id="" placeholder="Enter a Description"></textarea>
                </div>
                <div class="add_task_assignet add_task_form_row">
                    <label for="">Assignet to</label>
                    <select class="add_task_input" name="select">
                        <option value="" hidden>Select contact to assign</option>
                        <option value="">Name 1</option>
                        <option value="">Name 2</option>
                        <option value="">Name 3</option>
                    </select>
                </div>
            </div>

            <div class="add_task_line"></div>

            <div class="add_task_width50">
                <div class="add_task_date add_task_form_row">
                    <label for="">Due date<b>*</b></label>
                    <input class="add_task_input" type="date" required>
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
                    <select class="add_task_input" name="" id="" required>
                        <option value="" hidden>Select task categoriy</option>
                        <option value="">Technical Task</option>
                        <option value="">User Story</option>
                    </select>
                </div>
                <div class="add_task_subtask add_task_form_row">
                    <label for="">Subtasks</label>
                    <select class="add_task_input" name="" id=""></select>
                </div>
            </div>

        </div>
        <div class="add_task_footer">
            <p><b>*</b>This field is required</p>
            <div class="add_task_button_group_footer">
                <button class="add_task_button_clear add_task_hover_button">Clear X</button>
                <button class="add_task_button_create add_task_hover_button">Create Task
                    <img src="./assets/img/vector_check.svg">
                </button>
            </div>
        </div>
    </form>  
    `;
}