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
 * @param {string} name - A string representing a person's name from which initials are extracted.
 * @returns {string} Returns the initials of the name as a string in uppercase.
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
 * The function `getcheckBoxesEdit` populates a list of checkboxes based on a selected currentTask's name
 * and updates the displayed names accordingly.
 * @param {number} id - The ID of the currentTask in the `todos` array that is selected to populate checkboxes.
 * This ID is used to find and retrieve the currentTask's information from `todos`.
 */
function getcheckBoxesEdit(id) {
    let currentTask = todos.find(obj => obj['id'] == id);
    let checkBoxesEdit = document.getElementById('checkBoxesEdit');
    checkBoxesEdit.innerHTML = '';
    selectedNames = currentTask.name ? [...currentTask.name] : [];

    checkBoxesEdit.innerHTML = guesteArray.map(guest => {
        let isChecked = currentTask.name ? currentTask.name.includes(guest.name) : false;
        let initial = getInitials(guest.name);
        return rendergetcheckBoxesEdit(guest, initial, isChecked);
    }).join('');

    document.querySelectorAll('#checkBoxesEdit .board_task_check_box_name').forEach(box => {
        let checkbox = box.querySelector('input[type="checkbox"]');
        if (checkbox.checked) {
            box.classList.add('checked-checkbox');
        }
    });

    document.querySelectorAll('#checkBoxesEdit input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', updateSelectedNames);
    });
    checkBoxClickNone();
    updateDisplayedNames();
}


/**
 * The function `updateSelectedNames` updates an array of selected names based on checkbox input and
 * then calls another function to update the displayed names.
 * @param {Event} event - The `event` parameter in the `updateSelectedNames` function is an object that
 * represents the event that occurred, such as a click event on a checkbox. It contains information
 * about the event, including the target element that triggered the event (in this case, a checkbox).
 */
function updateSelectedNames(event) {
    let checkbox = event.target;
    let name = checkbox.value;
    let checkBoxParent = checkbox.closest('.board_task_check_box_name');
    let checkboxLabel = checkbox.closest('.checkbox');


    if (checkbox.checked) {
        checkBoxParent.classList.add('checked-checkbox');
        checkboxLabel.classList.add('whiteCheckbox');
        if (!selectedNames.includes(name)) {
            selectedNames.push(name);
        }
    } else {
        checkBoxParent.classList.remove('checked-checkbox');
        checkboxLabel.classList.remove('whiteCheckbox');
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
 * @param {string} userPriority - The `userPriority` parameter in the `getPriorityUpdateTodos` function
 * represents the priority level of a task, which can be 'Urgent', 'Medium', or 'Low'.
 * @returns {string} The function `getPriorityUpdateTodos` returns the path to an image corresponding
 * to the input priority level. If the priority is 'Urgent', it returns './assets/img/vector_red.svg'.
 * If the priority is 'Medium', it returns './assets/img/vector_strich.svg'. If the priority is 'Low',
 * it returns './assets/img/vector_green.svg'. If the input priority does not match any of these, an
 * empty string is returned.
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
 * @param {object} element - The `element` parameter in the `showSubtask` function is expected to be
 * an object that may contain a property `subtasks`. If the `subtasks` property exists in the `element`
 * object, the function will return the value of `element.subtasks`. Otherwise, it will return an empty string.
 * @returns {string} The function `showSubtask` returns the subtasks of the given element if they exist,
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
 * @param {string} category - The `category` parameter specifies the category for which the board ID
 * is assigned. Possible values are 'to_do', 'in_progress', 'awaitt', and 'done'.
 * @returns {string} The function returns a board ID based on the `category`. If `category` is one of
 * the specified values, the corresponding board ID is returned. If `category` is not recognized,
 * returns an empty string.
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
 * The function `getCategorieBackGroundColor` changes the background color of a specified element
 * based on its status.
 * @param {Object} element - The `element` parameter represents an object that has a `status`
 * property. This status property is used to determine the background color for a specific element
 * on the page.
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
 * @param {Object} contact - An object representing task or contact information, likely containing
 * a `status` property. This property determines the background color for a specific element on the
 * page.
 * @param {string} id - The `id` parameter is used to identify a specific element on the webpage,
 * typically with the format `show_task_category${id}`. It helps target and update the background
 * color of this specific element based on the `status` of the contact.
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
 * specified HTML element.
 * @param {HTMLElement} categorie_id - The `categorie_id` parameter is an HTML element where the
 * message indicating no tasks for a specific category will be appended. It should be a valid
 * reference to an HTML element that can accept inner HTML content.
 * @param {string} category - The `category` parameter is a string representing the category for
 * which no tasks are available. It is used to dynamically generate the message indicating the lack
 * of tasks within that category.
 */
function generateNoTask(categorie_id, category) {
    categorie_id.innerHTML += `<div class="no_task">No tasks ${category}</div>`
}


draggableElement = null;

function startDragging(id) {
    draggableElement = document.getElementById(`draggableElement${id}`);
    draggableElement.classList.add('dragging');  
    currentElement = id;
    draggableElement.style.transform = `rotate(20deg)`; 
}


function stopDragging() {
    if (draggableElement) {
        draggableElement.classList.remove('dragging'); 
        draggableElement.style.transform = '';
        draggableElement = null;
    }
}


function allowDrop(event) {
    event.preventDefault(); 
}



/**
 * The `moveTo` function updates the category of a task, saves the changes to the server and local
 * storage, and initializes the board tasks.
 * @param {string} category - The new category to which the task will be moved.
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
 * The function `highlightTaskCategory` adds a CSS class to highlight a specific element on the webpage.
 * @param {string} id - The ID of the HTML element to highlight. The function adds the `drag-area-highlight`
 * class to the element with the specified ID.
 */
function highlightTaskCategory(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}


/**
 * The function `removeHighlightTaskCategory` removes a CSS class that highlights a specific element on the webpage.
 * @param {string} id - The ID of the HTML element from which to remove the highlight. The function removes the
 * `drag-area-highlight` class from the element with the specified ID.
 */
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
 * a contact and updates their status based on user interaction.
 * @param {object} contact - The `contact` parameter represents an object containing information about
 * a task, including its subtasks. The function uses this information to generate HTML checkboxes for
 * each subtask associated with the task.
 * @param {string} id - The `id` parameter is used to identify the specific task for which the subtasks
 * are being generated. It helps differentiate between different tasks and their corresponding subtasks.
 */
function generateCheckBoxSubTask(currentTask, id) {
    let show_task_subtask = document.getElementById('show_task_subtask');
    show_task_subtask.innerHTML = '';

    if (currentTask && currentTask.subtasks) {
        for (let i = 0; i < currentTask.subtasks.length; i++) {
            const element = currentTask.subtasks[i];
            show_task_subtask.innerHTML += rendergenerateCheckBoxSubTaskHtml(currentTask, element, id, i);
        }

        // Eventlistener nur einmal hinzufügen und alte entfernen
        const checkboxes = document.querySelectorAll(`#show_task_subtask input[type="checkbox"]`);
        checkboxes.forEach(checkbox => {
            checkbox.onchange = async function () {
                await updateSubtaskStatus(currentTask, this.dataset.value, this.checked);
            };
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
 * The function `createInitialBlock` generates a styled HTML div element displaying initials with a
 * specified background color.
 * @param {string} initial - The `initial` parameter represents the initials of a user or a task.
 * @param {string} color - The `color` parameter specifies the background color of the block created.
 * @returns {string} A string containing an HTML div element with the class "board_task_user_initial",
 * a background color set to the provided `color`, and text content set to the provided `initial`.
 */
function createInitialBlock(initial, color) {
    return `
        <div class="board_task_user_initial" style="background-color: ${color};">${initial}</div>
    `;
}


/**
 * The function `createRemainingPersonsBlock` generates a block displaying the count of remaining
 * persons with a specified background color.
 * @param {number} remainingPersonsCount - The `remainingPersonsCount` parameter represents the number
 * of remaining persons for a task or a board.
 * @returns {string} A string containing an HTML block with a div element having the class
 * "board_task_user_initial", a gray background color, and displaying the `remainingPersonsCount`
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
 * @param {string} id - The `id` parameter in the `showTask` function is used to identify the specific
 * task that needs to be displayed. It is passed to the function to determine which task information
 * should be shown on the `boardPopUp` element.
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
    clearForm(); 
    slideOutTask();
    removeGreyBackground();
    initBoardTasks();
}