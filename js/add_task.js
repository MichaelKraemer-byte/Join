const BASE_URL_GUEST = 'https://join-b0cbf-default-rtdb.europe-west1.firebasedatabase.app';
let show = true;
let guesteArray = [];
let userPriotity;
let imgPriority;
let addTaskProcess = false;


/**
 * The function `loadGuestFromServer` asynchronously fetches guest contacts data from a server and maps
 * the response to an array.
 */
async function loadGuestFromServer() {
    try {
        const response = await fetch(`${BASE_URL_GUEST}/guestContacts.json`);
        if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok.');
        }
        const data = await response.json();
        const serverDaten = Object.keys(data).map(id => ({
            id,
            ...data[id]
        }));
        guesteArray = [user, ...serverDaten];

    } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
    }
}


/**
 * The `initAddTask` function asynchronously loads guest and tasks from the server, generates
 * checkboxes, and adds an event listener to checkboxes to get their values.
 */
async function initAddTask() {
    await loadGuestFromServer();
    generateCheckBox();
    document.querySelectorAll('input[name="optionen"]').forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            getValues('add_task_show_check');
        });
    });
}


/**
 * Sets the inner HTML of an element with the id 'boardPopUp' to render HTML for adding tasks to a specified column.
 * 
 * @param {string} column - The specific column identifier where tasks will be added.
 * 
 * This function retrieves the element with the id 'boardPopUp' from the DOM and sets its inner HTML
 * to the result of rendering HTML content for adding tasks to the specified column. The `column` parameter
 * typically represents a category, status, or any other grouping within a task management board.
 */
function generateAddTasks(column) {
    let boardPopUp = document.getElementById('boardPopUp');
    boardPopUp.innerHTML = renderHtmlAddtask(column);
}


/**
 * Adds a new task to a list of tasks, saves it to the server and local storage, and updates the user interface.
 * 
 * @param {string} column - The category or column where the task will be added.
 * @returns {Promise<void>} - A promise that resolves once the task is successfully added and saved.
 * 
 * @description
 * This asynchronous function performs the following steps:
 * 1. Checks if the `addTaskProcess` flag is set; if true, exits early.
 * 2. Disables the 'createTaskButton' element on the page to prevent duplicate submissions.
 * 3. Generates a unique name for a checkbox.
 * 4. Constructs a task object with properties like category, date, description, ID, name, initial,
 *    color, priorityImg, priority, status, title, subtasks, and selectedTask.
 * 5. Pushes the task object to the `todos` array.
 * 6. Saves the updated `todos` array to the server asynchronously.
 * 7. Saves the updated `todos` array to local storage.
 * 8. If the current page URL includes 'board.html', closes the popup window, reinitializes the board tasks,
 *    and updates the UI.
 * 9. Reinitializes the add task form and displays a confirmation slide-in.
 */
async function addTaskToTasks(column) {
    if (addTaskProcess) return;
    addTaskProcess = true;

    document.getElementById('createTaskButton').disabled = true;
    generateCheckBoxName();

    let task = {
        'category': column,
        'date': document.getElementById('task_date').value,
        'description': document.getElementById('task_description').value,
        'id': generateUniqueId(),
        'name': namelist,
        'initial': initials,
        'color': colorList,
        'priorityImg': getPriorityImage(userPriotity),
        'priority': getUserPriorityStatus(userPriotity),
        'status': document.getElementById('task_category').value,
        'title': document.getElementById('task_title').value,
        'subtasks': subtasks,
        'selectedTask': [],
    };

    todos.push(task);
    await saveTasksToServer();
    saveTaskToLocalStorage();
    if (window.location.href.includes('board.html')) {
        closeWindow();
        await initBoardTasks();
    }
    initAddTask();
    slideInConfirmation();
}


/**
 * Returns an image URL based on the user's priority level.
 * 
 * @param {string} userPriotity - The priority level of the task or item. Can be 'Urgent', 'Medium', or 'Low'.
 * @returns {string} - The path to an image based on the user's priority level:
 *   - './assets/img/vector_red.svg' for 'Urgent'
 *   - './assets/img/vector_strich.svg' for 'Medium' or if priority is undefined
 *   - './assets/img/vector_green.svg' for 'Low'
 */
function getPriorityImage(userPriotity) {
    switch (userPriotity) {
        case 'Urgent':
            return './assets/img/vector_red.svg';
        case 'Medium':
            return './assets/img/vector_strich.svg';
        case 'Low':
            return './assets/img/vector_green.svg';
        default:
            return './assets/img/vector_strich.svg';
    }
}


/**
 * Returns the user priority status, defaulting to 'Medium' if not provided.
 * 
 * @param {string} userPriotity - The user priority status to check.
 * @returns {string} - The user priority status. Returns the provided `userPriority` if truthy,
 *   otherwise defaults to 'Medium'.
 * 
 * @description
 * This function takes a parameter `userPriority` and checks if it has a value. If `userPriority`
 * has a value (is truthy), it returns that value. If `userPriority` is not provided (is falsy),
 * the function returns 'Medium' as the default priority status.
 */
function getUserPriorityStatus(userPriotity) {
    if (userPriotity) {
        return userPriotity;
    } else {
        return 'Medium';
    }
}


/**
 * The `slideInConfirmation` function animates a confirmation message sliding in and then fading out
 * after a set duration.
 */
function slideInConfirmation() {
    let confirmation = document.getElementById('addedTaskConfirmation');
    confirmation.style.animation = 'slideInAddedTaskConfirmation 1.25s cubic-bezier(0, 1.19, 0, 0.96)';
    setTimeout(() => {
        addTaskProcess = false;
        createTaskButton = document.getElementById('createTaskButton');
        createTaskButton.disabled = false;
        confirmation.style.animation = 'fadeConfirmation 0.3s ease-in-out';
        if (window.location.href.includes('add_task.html')) { navigateTo('board.html') }
    }, 1250);
}


/**
 * The function `generateUniqueId` generates a unique random ID within a range and ensures it is not
 * already in use.
 * @returns The function `generateUniqueId` returns a randomly generated unique ID as a string.
 */
function generateUniqueId() {
    let id;
    do {
        id = Math.floor(Math.random() * 1000000).toString();
    } while (usedIds.has(id));
    usedIds.add(id);
    return id;
}


/**
 * Toggles the active state of a button and sets the user priority based on the button's text content.
 * 
 * @param {string} id - The ID of the task priority button that was interacted with.
 * 
 * @description
 * This function toggles the 'active' class of the button identified by the `id` parameter. If the button
 * is already active, it removes the 'active' class. If the button is not active, it removes the 'active'
 * class from all other buttons with the class '.add_button_group' and adds the 'active' class to the
 * clicked button. It then sets the global variable `userPriotity` to the trimmed text content of the
 * clicked button.
 */
function getTaskPriority(id) {
    const button = document.getElementById(id);
    if (button.classList.contains('active')) {
        button.classList.remove('active');
    } else {
        document.querySelectorAll('.add_button_group').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');

        userPriotity = button.innerText.trim();
    }
}


/**
 * Toggles the visibility of checkboxes and clears the value of an input field based on a boolean variable `show`.
 * 
 * @param {Event} event - The event object representing an event that occurs in the DOM.
 * 
 * @description
 * This function toggles the visibility of checkboxes based on the global boolean variable `show`.
 * If `show` is true, checkboxes are made visible and `show` is set to false.
 * If `show` is false, checkboxes are hidden, `show` is set to true, and the value of the input field
 * with the ID 'task_assignet_input' is cleared.
 */
function toggleCheckboxes(event) {
    event.stopPropagation();
    let idInput = document.getElementById('task_assignet_input');
    let checkboxes = document.getElementById("checkBoxes");
    if (show) {
        checkboxes.style.visibility = "initial";
        show = false;
    } else {
        checkboxes.style.visibility = "hidden";
        show = true;
        idInput.value = ''
    }
}


/**
 * The function generates a list of selected guests' names, colors, and initials based on checked
 * checkboxes.
 */
function generateCheckBoxName() {
    const selectedGuests = Array.from(document.querySelectorAll('input[name="optionen"]:checked'))
        .map(checkbox => guesteArray.find(g => g.name === checkbox.value))
        .filter(Boolean);

    selectedGuests.forEach(guest => {
        namelist.push(guest.name);
        colorList.push(guest.color);
        initials.push(getInitials(guest.name));
    });
}


/**
 * The function generates checkboxes based on elements in an array and hides the checkboxes when
 * clicking outside the select box.
 */
function generateCheckBox() {
    let id = document.getElementById('check_box_user_name');
    if (id) {
        id.innerHTML = '';
        for (let i = 0; i < guesteArray.length; i++) {
            const element = guesteArray[i];
            id.innerHTML += renderHtmlGenerateCheckBox(element, i)
        }

        let checkboxes = document.getElementById("checkBoxes");
        if (checkboxes) {
            document.addEventListener('click', function (event) {
                let selectBox = document.querySelector('.selectBox');

                if (selectBox && !selectBox.contains(event.target)) {
                    checkboxes.style.visibility = "hidden";
                    show = true;
                }
            });
        }
    }
}


/**
 * The function `searchNameFromGuestList` searches for a name from a guest list based on user input and
 * renders the results.
 */
function searchNameFromGuestList() {
    let idInput = document.getElementById('task_assignet_input').value;
    idInput = idInput.toLowerCase();

    let id = document.getElementById('check_box_user_name');

    id.innerHTML = '';
    for (let i = 0; i < guesteArray.length; i++) {
        const element = guesteArray[i];
        let initial = getInitials(element.name)
        if (element.name.toLowerCase().includes(idInput)) {
            id.innerHTML += rendersearchNameFromGuestList(element, initial)
        }
    }
}


/**
 * Retrieves the checked values of checkboxes with a specific name and calls the `checkGuestsName` function with those values.
 * 
 * @param {string} id - The ID of an HTML element where the selected values from checkboxes will be displayed.
 * 
 * @description
 * This function retrieves the checked values of checkboxes with the name 'optionen' and updates the inner HTML
 * of the element identified by the `id` parameter with these values. It then calls the `checkGuestsName` function
 * with an array of the checked values.
 */
function getValues(id) {
    let add_task_show_check = document.getElementById(id);
    const checkboxes = document.querySelectorAll('input[name="optionen"]:checked');
    add_task_show_check.innerHTML = '';

    let checkedValues = [];
    checkboxes.forEach((checkbox) => {
        checkedValues.push(checkbox.value);
    });
    checkGuestsName(checkedValues);
}


/**
 * Retrieves selected guest names and their corresponding colors from checkboxes and displays their initials with respective colors on the webpage.
 * 
 * @param {Array<string>} checkedValues - An array of strings representing the names of guests selected through checkboxes.
 * 
 * @description
 * This function checks if any checkboxes have been checked by verifying the truthiness of the `checkedValues` parameter.
 * If `checkedValues` is truthy, the function retrieves the selected checkboxes with the name 'optionen',
 * finds the corresponding guest information from `guesteArray`, and displays the initials of the selected guests
 * along with their respective colors on the webpage.
 */
function checkGuestsName(checkedValues) {
    if (checkedValues) {
        const selectedCheckboxes = document.querySelectorAll('input[name="optionen"]:checked');
        const selectedGuests = [];
        selectedCheckboxes.forEach(checkbox => {
            const guestName = checkbox.value;
            const guest = guesteArray.find(g => g.name === guestName);
            if (guest) {
                selectedGuests.push({
                    name: guest.name,
                    color: guest.color
                });
            }
        });
        add_task_show_check.innerHTML = '';
        for (let index = 0; index < selectedGuests.length; index++) {
            const element = selectedGuests[index];
            let initial = getInitials(element.name);
            add_task_show_check.innerHTML += `
                <div class="add_task_checkbox_name board_task_user_initial show_task_user_initial" style="background-color: ${element.color};">${initial}</div>
            `;
        }
    }
}

/**
 * Adds or removes classes to toggle checkbox and label colors based on checkbox state.
 * 
 * @param {Event} event - The event object representing a change event on a checkbox.
 * 
 * @description
 * This function is triggered on the change event of checkboxes with the name 'optionen'. It toggles the
 * 'checkedLabel' class on the closest '.checkBoxLabel' element based on the checked state of the checkbox.
 * Additionally, it toggles the 'whiteCheckbox' class on the closest '.checkbox' element to change checkbox
 * appearance. If the checkbox is checked, both classes are added; if unchecked, both classes are removed.
 */
function addOrRemoveCheckboxLabelColor(event) {
    const checkbox = event.target;
    if (checkbox.tagName !== 'INPUT' || checkbox.type !== 'checkbox') return;
    const label = checkbox.closest('.checkBoxLabel'); 
    const checkboxLabel = checkbox.closest('.checkbox'); 
    if (!label || !checkboxLabel) return; 
    if (checkbox.checked) {
        label.classList.add('checkedLabel');
        checkboxLabel.classList.add('whiteCheckbox');
    } else {
        label.classList.remove('checkedLabel');
        checkboxLabel.classList.remove('whiteCheckbox');
    }
}

document.addEventListener('change', function (event) {
    if (event.target.matches('input[name="optionen"]')) {
        addOrRemoveCheckboxLabelColor(event);
    }
});


/**
 * The clearForm function resets the input fields in a form with the ID "meinFormular".
 */
function clearForm() {
    const addTaskShowCheckElement = document.getElementById('add_task_show_check');

    if (addTaskShowCheckElement) {
        subtasks = [];
        document.getElementById('add_task_show_check').innerHTML = '';
        document.getElementById('get_subtask').innerHTML = '';
        document.getElementById("meinFormular").reset();
        getSubTaskAddTask();        
    } else {
        return;
    }
}


/**
 * The function `showAddAndDeleteSubTask` hides the add task button, displays a check button, and
 * displays a delete subtask button.
 */
function showAddAndDeleteSubTask() {
    let add_task_button_plus = document.getElementById('add_task_button_plus');
    let deleteSubtask = document.getElementById('delete_subtask');
    let check = document.getElementById('check');

    add_task_button_plus.style.visibility = 'hidden';
    check.style.display = 'inline';
    deleteSubtask.style.display = 'inline';
}


/**
 * The function `deleteSubtask` resets and hides elements related to subtasks in a task management
 * interface.
 */
function deleteSubtask() {
    let add_task_button_plus = document.getElementById('add_task_button_plus');
    let deleteSubtask = document.getElementById('delete_subtask');
    let check = document.getElementById('check');
    let task_subtasks = document.getElementById('task_subtasks');
    task_subtasks.value = '';
    check.style.display = 'none';
    deleteSubtask.style.display = 'none';
    add_task_button_plus.style.visibility = 'initial';
}


/**
 * The function `getSubtask` retrieves subtasks from an array and displays them on a webpage.
 */
function getSubtask() {
    let get_subtask = document.getElementById('get_subtask');
    get_subtask.innerHTML = '';
    if (subtasks) {
        for (let i = 0; i < subtasks.length; i++) {
            const element = subtasks[i];
            get_subtask.innerHTML = `
                ${element}
            `;
        }
    }
}


/**
 * The function `addNewSubTask` adds a new subtask to a list and updates the display accordingly.
 * It prevents duplicate subtasks from being added.
 */
function addNewSubTask() {
    let task_subtask = document.getElementById('task_subtasks');
    let add_task_button_plus = document.getElementById('add_task_button_plus');
    if (task_subtask.value) {
        const inputValue = task_subtask.value.trim();
        const isDuplicate = subtasks.some(subtask => subtask === inputValue);
        if (isDuplicate) {
            alert('Subtask already exists!'); 
            return; 
        } else{ 
            subtasks.push(inputValue);
            getSubTaskAddTask();
            add_task_button_plus.style.visibility = 'initial';
            task_subtask.value = "";
        }
    }
}


function checkIfKeyisEnterThenAddNewSubTask(event) {
    if (event.key === 'Enter') { 
        event.preventDefault(); 
        const subtaskInput = document.getElementById('task_subtasks'); 
        const inputValue = subtaskInput.value.trim(); 
        if (inputValue) {
            addNewSubTask();
            subtaskInput.value = ''; 
        }
    }
}


/**
 * The function `getSubTaskAddTask` populates a specified HTML element with subtasks data.
 */
function getSubTaskAddTask() {
    let get_subtask = document.getElementById('get_subtask');
    get_subtask.innerHTML = '';
    if (subtasks) {
        for (let i = 0; i < subtasks.length; i++) {
            const element = subtasks[i];
            get_subtask.innerHTML += renderGetSubTaskAddTask(i, element);
        }
    }
}


/**
 * Displays an edit button and input field for a specific subtask based on the index `i`.
 * 
 * @param {number} i - The index used to identify the specific subtask.
 * 
 * @description
 * This function shows the edit button and sets the value of the input field corresponding to the subtask
 * at index `i`. The HTML elements are identified using the ID suffixes `show_task_subtask_edit_btn{i}` for
 * the edit button and `show_task_subtask_edit_input{i}` for the input field.
 */
function showEditNewSubTask(i) {
    let show_task_subtask_edit_btn = document.getElementById(`show_task_subtask_edit_btn${i}`);
    show_task_subtask_edit_btn.style.display = 'flex';
    let show_task_subtask_edit_input = document.getElementById(`show_task_subtask_edit_input${i}`);
    show_task_subtask_edit_input.value = subtasks[i];
}


/**
 * Updates a specific subtask in an array and then calls another function to update the task.
 * 
 * @param {number} i - The index used to access and update a specific subtask in the `subtasks` array.
 * 
 * @description
 * This function retrieves the value from the input field identified by `show_task_subtask_edit_input{i}`,
 * updates the corresponding subtask in the `subtasks` array at index `i`, and then calls the `getSubTaskAddTask`
 * function to update the task with the modified subtask list.
 */
function addEditNewSubTask(i) {
    let show_task_subtask_edit_input = document.getElementById(`show_task_subtask_edit_input${i}`);
    subtasks[i] = show_task_subtask_edit_input.value;
    getSubTaskAddTask();
}


/**
 * Deletes a specific subtask from the `subtasks` array at the given index `i` and updates the task.
 * 
 * @param {number} i - The index of the subtask to be deleted from the `subtasks` array.
 * 
 * @description
 * This function uses the `splice` method to remove the subtask at index `i` from the `subtasks` array.
 * After removing the subtask, it calls the `getSubTaskAddTask` function to update the task with the
 * modified subtask list.
 */
function deleteNewSubTask(i) {
    subtasks.splice(i, 1);
    getSubTaskAddTask();
}


/**
 * Sets the minimum date for an input field with id 'task_date' to today's date.
 * This function is executed when the DOM content is fully loaded.
 * 
 * @param {Event} event - The DOMContentLoaded event object.
 */
document.addEventListener('DOMContentLoaded', (event) => {
    function setMinDate() {
        const input = document.getElementById('task_date');
        if (input) {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            const minDate = `${year}-${month}-${day}`;

            input.min = minDate;
        }
    }

    setMinDate();
});


/**
 * Generates and returns the current date in 'YYYY-MM-DD' format.
 * 
 * @returns {string} The current date formatted as 'YYYY-MM-DD'.
 */
function setDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const minDate = `${year}-${month}-${day}`;

    return minDate
}