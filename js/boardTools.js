/**
 * The function `checkBoxClickNone` hides a set of checkboxes when a click event occurs outside of the
 * checkboxes or a specific select box.
 */
function checkBoxClickNone() {
    document.addEventListener('click', function (event) {
        let checkboxes = document.getElementById("checkBoxesEdit");
        let selectBox = document.querySelector('.selectBox');

        if (checkboxes && selectBox) {
            if (!selectBox.contains(event.target) && !checkboxes.contains(event.target)) {
                checkboxes.style.display = "none";
                showEdit = true;
            }
        }
    });
}


/**
 * The function `getInitials` takes a name as input and returns the initials of the name in uppercase.
 * @param name - The `getInitials` function takes a `name` parameter, which is a string representing a
 * person's name.
 * @returns The function `getInitials` takes a `name` as input and returns the initials of the name as
 * a string in uppercase.
 */
function getInitials(name) {
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

    let initials = [...name.matchAll(rgx)] || [];

    initials = (
        (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
    ).toUpperCase();

    return initials;
}


/**
 * The function `getcheckBoxesEdit` populates a list of checkboxes based on a selected contact's name
 * and updates the displayed names accordingly.
 * @param id - The `id` parameter in the `getcheckBoxesEdit` function is used to find a specific
 * contact in the `todos` array based on its ID. This contact's information will then be used to
 * populate and update a list of checkboxes in the HTML with the corresponding names and initials.
 */
function getcheckBoxesEdit(id) {
    let contact = todos.find(obj => obj['id'] == id);
    let checkBoxesEdit = document.getElementById('checkBoxesEdit');
    checkBoxesEdit.innerHTML = '';
    selectedNames = contact.name ? [...contact.name] : [];

    checkBoxesEdit.innerHTML = guesteArray.map(guest => {
        let isChecked = contact.name ? contact.name.includes(guest.name) : false;
        let initial = getInitials(guest.name);
        return rendergetcheckBoxesEdit(guest, initial, isChecked);
    }).join('');

    document.querySelectorAll('#checkBoxesEdit input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', updateSelectedNames);
    });

    checkBoxClickNone();
    updateDisplayedNames();
}



/**
 * The function `updateSelectedNames` updates an array of selected names based on checkbox input and
 * then calls another function to update the displayed names.
 * @param event - The `event` parameter in the `updateSelectedNames` function is an object that
 * represents the event that occurred, such as a click event on a checkbox. It contains information
 * about the event, including the target element that triggered the event (in this case, a checkbox).
 */
function updateSelectedNames(event) {
    let checkbox = event.target;
    let name = checkbox.value;
    if (checkbox.checked) {
        if (!selectedNames.includes(name)) {
            selectedNames.push(name);
        }
    } else {
        let index = selectedNames.indexOf(name);
        if (index > -1) {
            selectedNames.splice(index, 1);
        }
    }

    updateDisplayedNames();
}


/**
 * The function `updateDisplayedNames` updates the displayed names on a task board based on the
 * selected names and their corresponding colors.
 */
function updateDisplayedNames() {

    let task_edit_initial = document.getElementById('task_edit_initial');
    task_edit_initial.innerHTML = '';
    if (selectedNames.length > 0) {
        selectedNames.forEach((element, i) => {
            let name = element;
            let guest = guesteArray.find(guest => guest.name === name);
            task_edit_initial.innerHTML += `
                <div class="board_task_user_initial show_task_user_initial" style="background-color: ${guest.color};">${getInitials(element)}</div>
            `;
        });
    }
}


/**
 * The function `getPriorityUpdateTodos` returns an image path based on the priority level provided as
 * input.
 * @param userPriotity - The `getPriorityUpdateTodos` function takes a user's priority level as input
 * and returns the corresponding image path based on that priority level. The priority levels it
 * accepts are 'Urgent', 'Medium', and 'Low'. If the input priority level does not match any of these,
 * it will
 * @returns The function `getPriorityUpdateTodos` returns the path to an image based on the user's
 * priority input. If the user priority is 'Urgent', it returns './assets/img/vector_red.svg'. If the
 * user priority is 'Medium', it returns './assets/img/vector_strich.svg'. If the user priority is
 * 'Low', it returns './assets/img/vector_green.svg'. If the user priority
 */
function getPriorityUpdateTodos(userPriotity) {
    switch (userPriotity) {
        case 'Urgent':
            return './assets/img/vector_red.svg';
        case 'Medium':
            return './assets/img/vector_strich.svg';
        case 'Low':
            return './assets/img/vector_green.svg';
        default:
            return '';
    }
}


/**
 * The function `showSubtask` returns the subtasks of an element if they exist, or an empty string if
 * they do not.
 * @param element - The `element` parameter in the `schowSubtask` function is expected to be an object
 * that may contain a property `subtasks`. If the `subtasks` property exists in the `element` object,
 * the function will return the value of `element.subtasks`. Otherwise, it will
 * @returns The function `schowSubtask` returns the subtasks of the given element if they exist,
 * otherwise it returns an empty string.
 */
function schowSubtask(element) {
    if (element.subtasks) {
        return element.subtasks
    } else {
        return " "
    }
}


/**
 * The function `searchSwithId` uses a switch statement to assign different board IDs based on the
 * input category.
 * @param category - The function `searchSwithId` takes a `category` parameter and assigns a
 * corresponding `searchId` based on the value of `category`. The possible values for `category` are
 * 'to_do', 'in_progress', 'awaitt', and 'done'. When `category` is '
 */
function searchSwithId(category) {
    switch (category) {
        case 'to_do':
            searchId = 'board_to_do';
            break;
        case 'in_progress':
            searchId = 'board_in_progress';
            break;
        case 'awaitt':
            searchId = 'board_await_feedback';
            break;
        case 'done':
            searchId = 'board_done';
            break;
    }
}


/**
 * The function `getCategorieBackGroundColor` changes the background color of a specified element based
 * on its status.
 * @param element - The `element` parameter seems to be an object that has a `status` property. The
 * `getCategorieBackGroundColor` function uses this `status` property to determine the background color
 * for a specific element on the page. If the `status` is 'Technical Task', it sets the background
 */
function getCategorieBackGroundColor(element) {
    let borderCategory = document.getElementById(`board_task_category${element.id}`);
    if (element.status == 'Technical Task') {
        borderCategory.style.backgroundColor = '#1FD7C1';
    } else {
        borderCategory.style.backgroundColor = '#0038FF';
    }
}


/**
 * The function `getCategorieBackGroundColorShowTask` changes the background color of a specified
 * element based on the status of a contact.
 * @param contact - The `contact` parameter is an object that likely contains information about a task
 * or a contact. In this function, it is being used to determine the background color of a category
 * based on the `status` property of the `contact` object. If the `status` is 'Technical Task', the
 * @param id - The `id` parameter in the `getCategorieBackGroundColorShowTask` function is used to
 * identify a specific element on the webpage. It is likely used to target and update the background
 * color of a specific element with the id `show_task_category` based on the status of a contact
 */
function getCategorieBackGroundColorShowTask(contact, id) {
    let borderCategory = document.getElementById(`show_task_category${id}`);
    if (contact['status'] == 'Technical Task') {
        borderCategory.style.backgroundColor = '#1FD7C1';
    } else {
        borderCategory.style.backgroundColor = '#0038FF';
    }
}


/**
 * The function `generateNoTask` appends a message indicating no tasks for a specific category to the
 * specified element.
 * @param categorie_id - The `categorie_id` parameter seems to be referring to an HTML element where
 * you want to append a message indicating that there are no tasks for a specific category. This
 * function `generateNoTask` is designed to dynamically generate and display this message within the
 * specified HTML element.
 * @param category - The `category` parameter in the `generateNoTask` function is a string that
 * represents the category for which no tasks are available.
 */
function generateNoTask(categorie_id, category) {
    categorie_id.innerHTML += `<div class="no_task">No tasks ${category}</div>`
}


/**
 * The function `startDragging` sets the currentElement variable to the provided id.
 * @param id - The `id` parameter in the `startDragging` function is used to specify the element that
 * is being dragged. When the `startDragging` function is called with an element's ID as the argument,
 * it sets the `currentElement` variable to that ID, indicating that this element is currently being
 */
function startDragging(id) {
    currentElement = id;
}


/**
 * The function `allowDrop` is used to allow a drop event to occur by preventing the default behavior.
 * @param ev - The `ev` parameter in the `allowDrop` function is an event object that represents the
 * event being handled, such as a drag-and-drop event.
 */
function allowDrop(ev) {
    ev.preventDefault();
}


/**
 * The `moveTo` function updates the category of a task, saves the changes to the server and local
 * storage, and initializes the board tasks.
 * @param category - Category is the new category to which the task will be moved.
 */
async function moveTo(category) {
    let contact = todos.find(obj => obj['id'] == currentElement);
    contact['category'] = category;
    await saveTasksToServer();
    saveTaskToLocalStorage();
    removeHighlightTaskCategory('board_' + category);
    initBoardTasks();
}


/**
 * The function "highlight" adds a CSS class to highlight a specific element on the webpage.
 * @param id - The `id` parameter in the `highlight` function is used to specify the ID of the HTML
 * element that you want to highlight by adding the `drag-area-highlight` class to it.
 */
function highlightTaskCategory(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlightTaskCategory(id) {
    let ID = id
    if(ID === 'board_awaitt'){
        ID = 'board_await_feedback';
    }
    document.getElementById(ID).classList.remove('drag-area-highlight');
}


/**
 * The `slideOutTask` function removes the 'slideIn' class and adds the 'slideOut' class to an element
 * with the id 'boardPopUp', then hides the element after a delay.
 */
function slideOutTask() {
    let boardPopUp = document.getElementById('boardPopUp');
    if (boardPopUp) {
        boardPopUp.classList.remove('slideIn');
        boardPopUp.classList.add('slideOut');
        setTimeout(() => {
            boardPopUp.style.display = 'none';
        }, 300);
    }
}


/**
 * The `slideInTask` function displays a board pop-up element with a sliding animation effect.
 */
function slideInTask() {
    let boardPopUp = document.getElementById('boardPopUp');
    if (boardPopUp) {
        boardPopUp.style.display = 'flex';
        boardPopUp.classList.remove('slideOut');
        boardPopUp.classList.add('slideIn');
    }
}


/**
 * The function `closeWindow` slides out a task and removes a grey background.
 */
function closeWindow() {
    slideOutTask();
    removeGreyBackground();
}


/**
 * The function `generateCheckBoxSubTask` dynamically generates checkboxes for subtasks associated with
 * a contact and updates their status.
 * @param contact - The `contact` parameter in the `generateCheckBoxSubTask` function seems to be an
 * object that contains information about a task, including its subtasks. The function loops through
 * the subtasks of the task and generates HTML checkboxes for each subtask.
 * @param id - The `id` parameter in the `generateCheckBoxSubTask` function seems to be used to
 * identify the specific task for which the subtasks are being generated. It is likely used to
 * differentiate between different tasks and their corresponding subtasks.
 */
function generateCheckBoxSubTask(contact, id) {
    let show_task_subtask = document.getElementById('show_task_subtask');
    show_task_subtask.innerHTML = '';
    if (contact && contact.subtasks) {
        for (let i = 0; i < contact.subtasks.length; i++) {
            const element = contact.subtasks[i];

            show_task_subtask.innerHTML += rendergenerateCheckBoxSubTaskHtml(contact, element, id, i);
        }
        document.querySelectorAll(`#show_task_subtask input[type="checkbox"]`).forEach(checkbox => {
            checkbox.addEventListener('change', function () {
                updateSubtaskStatus(contact, this.dataset.value, this.checked);
            });
        });
    } else {
        show_task_subtask.innerHTML = 'No subtasks here.';
    }
}


/**
 * The function `showCheckboxesEdit` toggles the display of checkboxes based on the current state.
 */
function showCheckboxesEdit() {
    let checkboxes = document.getElementById("checkBoxesEdit");
    if (showEdit) {
        checkboxes.style.display = "block";
        showEdit = false;
    } else {
        checkboxes.style.display = "none";
        showEdit = true;
    }
}


/**
 * The function `createInitialBlock` generates a styled HTML div element displaying an initial with a
 * specified background color.
 * @param initial - The `initial` parameter is a string representing the initials of a user or a task.
 * @param color - Color parameter is used to specify the background color of the block that will be
 * created.
 * @returns A string containing an HTML div element with the class "board_task_user_initial", a
 * background color set to the provided color, and the text content set to the provided initial.
 */
function createInitialBlock(initial, color) {
    return `
        <div class="board_task_user_initial" style="background-color: ${color};">${initial}</div>
    `;
}


/**
 * The function `createRemainingPersonsBlock` generates a block displaying the count of remaining
 * persons with a specified background color.
 * @param remainingPersonsCount - The `remainingPersonsCount` parameter represents the number of
 * remaining persons for a task or a board. This function `createRemainingPersonsBlock` generates an
 * HTML block that visually represents the count of remaining persons with a colored background and a
 * plus sign.
 * @returns A string containing an HTML block with a div element having the class
 * "board_task_user_initial", a gray background color, and displaying the remainingPersonsCount
 * preceded by a plus sign.
 */
function createRemainingPersonsBlock(remainingPersonsCount) {
    return `
        <div class="board_task_user_initial" style="background-color: #a3a3a3;">+${remainingPersonsCount}</div>
    `;
}


/**
 * The function `showTask` displays a task popup on a webpage and generates content based on the
 * provided task ID.
 * @param id - The `id` parameter in the `showTask` function is used to identify the specific task that
 * needs to be displayed. It is passed to the function to determine which task information should be
 * shown on the boardPopUp element.
 */
function showTask(id) {
    let boardPopUp = document.getElementById('boardPopUp');
    boardPopUp.style.display = 'flex';
    slideInTask();
    displayGreyBackground();
    generateShowTask(id);
}


/**
 * The function `closeShowTask` resets input field, hides task display, removes grey background, and
 * initializes board tasks.
 */
function closeShowTask() {
    let input_find_task = document.getElementById('input_find_task');
    input_find_task.value = '';
    slideOutTask();
    removeGreyBackground();
    initBoardTasks();
}

