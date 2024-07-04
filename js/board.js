const BASE_URL = "https://join-b0cbf-default-rtdb.europe-west1.firebasedatabase.app";
const usedIds = new Set();

let showEdit = true;
let todos = [];
let currentElement;
let namelist = [];
let colorList = [];
let initials = [];
let subtasks = [];
let selectedSubtasks = [];
let selectedNames = [];

loadTaskFromLocalStorage();

/**
 * The function `saveTasksToServer` asynchronously saves tasks to a server using a PUT request with
 * error handling.
 */
async function saveTasksToServer() {
    try {
        const response = await fetch(`${BASE_URL}/tasks.json`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todos)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Failed to save tasks to server:', error);
    }
}


/**
 * The function `loadTasksFromServer` asynchronously fetches tasks data from a server and maps the
 * response to an array of todos.
 */
async function loadTasksFromServer() {
    try {
        const response = await fetch(`${BASE_URL}/tasks.json`);
        if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok.');
        }
        const data = await response.json();
        todos = Object.keys(data).map(id => ({
            id,
            ...data[id]
        }));

    } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
    }
}


/**
 * Deletes a task with a specific ID from local storage, updates the task list,
 * saves the updated tasks to the server, and initializes the board tasks.
 * @param {string} id - The unique identifier of the task to be deleted from local storage.
 */
async function deleteTaskFromLocalStorage(id) {
    let arr = [];
    for (let i = 0; i < todos.length; i++) {
        arr = (todos.filter(todo => todo.id != id));
    }
    todos = arr;
    await saveTasksToServer();
    saveTaskToLocalStorage();
    initBoardTasks();
    closeShowTask();
}


/**
 * The function `saveTaskToLocalStorage` converts a JavaScript array `todos` to a JSON string and saves
 * it to the browser's local storage under the key 'todosToServer'.
 */
function saveTaskToLocalStorage() {
    let todosAsText = JSON.stringify(todos);
    localStorage.setItem('todosToServer', todosAsText)
}


/**
 * The function `loadTaskFromLocalStorage` retrieves and parses todos stored in the local storage.
 */
function loadTaskFromLocalStorage() {
    let todosAsText = localStorage.getItem('todosToServer');
    if (todosAsText) {
        todos = JSON.parse(todosAsText);
    }
}


/**
 * The function `initBoardTasks` loads tasks from the server and categorizes them into different
 * sections on a board based on their status.
 */
async function initBoardTasks() {
    await loadTasksFromServer();
    await loadGuestFromServer();

    let task = document.getElementById('board_to_do');
    let progress = document.getElementById('board_in_progress');
    let awaitFeedback = document.getElementById('board_await_feedback');
    let doneId = document.getElementById('board_done');

    let toDo = todos.filter(t => t['category'] == 'to_do');
    let inProgress = todos.filter(t => t['category'] == 'in_progress');
    let feedback = todos.filter(t => t['category'] == 'awaitt');
    let done = todos.filter(t => t['category'] == 'done');

    generateToDo(toDo, task, 'to do');
    generateToDo(inProgress, progress, 'in progress');
    generateToDo(feedback, awaitFeedback, 'await feedback');
    generateToDo(done, doneId, 'done');
}


/**
 * Populates a specified HTML element with to-do items from an array, including rendering subtasks
 * and progress bars.
 * @param {Array} arr - An array containing task objects to be displayed in a to-do list.
 * Each task object should have properties like `id`, `subtasks`, `selectedTask`, etc.
 * @param {HTMLElement} categorie_id - The DOM element where the generated to-do items will be displayed.
 * @param {string} category - Specifies the category of the to-do items being generated.
 * This parameter is used for rendering the to-do items in the appropriate category section.
 */
async function generateToDo(arr, categorie_id, category) {
    categorie_id.innerHTML = '';
    if (arr.length) {
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            categorie_id.innerHTML += renderHtmlToDo(element);
            let idSUb = document.getElementById(`idSUb${element.id}`);

            if (element.subtasks) {
                idSUb.innerHTML = '';
                idSUb.innerHTML = renderHtmlProgressBarEmpty(element)
                if (element.selectedTask) {
                    idSUb.innerHTML = '';
                    idSUb.innerHTML += renderHtmlProgressBar(element);
                }
            }
            getInitialsArray(element);
            getCategorieBackGroundColor(element);
        }
    } else {
        generateNoTask(categorie_id, category);
    }
}


/**
 * Adds a new task to a specified column in a task management system.
 * @param {string} column - Specifies the column or section where the task will be added.
 * This parameter is used to indicate the location within the task management system
 * where the new task will be created.
 */
function addTask(column) {
    generateAddTasks(column);
    displayGreyBackground();
    slideInTask();
    initAddTask();
}


/**
 * Populates a popup with information about a specific task, including subtasks and user details.
 * @param {string} id - The identifier of the specific task or contact to be displayed in the popup on the board.
 * This parameter is used to find the corresponding task object in the `todos` array and render its details in the popup.
 */
async function generateShowTask(id) {
    let boardPopUp = document.getElementById('boardPopUp');
    let contact = todos.find(obj => obj['id'] == id);
    boardPopUp.innerHTML = renderGenerateShowTaskHtml(contact, id);

    generateCheckBoxSubTask(contact, id)
    getshowTaskUserName(contact);
    getCategorieBackGroundColorShowTask(contact, id);
}


/**
 * Updates the status of a subtask for a given contact by adding or removing it from the selected tasks list,
 * saving the changes to local storage, sending the updated tasks to the server, and initializing the board tasks.
 * @param {Object} contact - An object representing a user or a person. It contains information such as name,
 * email, phone number, and other details.
 * @param {string} subtask - The specific subtask that you want to update the status for within the `contact` object.
 * @param {boolean} isChecked - A boolean value indicating whether the subtask is checked (true) or not checked (false).
 * If `isChecked` is true, the subtask will be added to the `selectedTask` array of the `contact`; if false, it will be removed.
 */
async function updateSubtaskStatus(contact, subtask, isChecked) {
    if (contact) {
        if (!contact.selectedTask) {
            contact.selectedTask = [];
        }
        if (isChecked) {
            if (!contact.selectedTask.includes(subtask)) {
                contact.selectedTask.push(subtask);
            }
        } else {
            contact.selectedTask = contact.selectedTask.filter(task => task !== subtask);
        }
        saveTaskToLocalStorage();
        await saveTasksToServer();
        initBoardTasks();
    }
}


/**
 * Populates the `show_task_user_name` element with user names and initials from a given contact object.
 * @param {Object} contact - An object containing information about a contact, likely including properties
 * such as `name`, `color`, and `initial` for each user.
 */
function getshowTaskUserName(contact) {
    let showTaskUserName = document.getElementById('show_task_user_name');
    showTaskUserName.innerHTML = "";
    if (contact.name) {
        for (let i = 0; i < contact['name'].length; i++) {
            const element = contact['name'][i];
            showTaskUserName.innerHTML += /*html*/`
                <div class="show_task_assigned_to_users">                
                    <div class="board_task_user_initial show_task_user_initial" style="background-color: ${contact.color[i]};">${contact.initial[i]}</div>
                    <div>${element}</div>
                </div>
            `;
        }
    }
}


/**
 * Retrieves a task by its ID, hides the task container, and populates a popup with the task details for editing.
 * @param {number} id - The unique identifier of the task to be edited. This ID is used to locate the task within
 * the `todos` array and retrieve its details.
 */
function editTask(id) {
    let contact = todos.find(obj => obj['id'] == id);
    let boardPopUp = document.getElementById('boardPopUp');
    let showTaskContainer = document.getElementById('showTaskContainer');

    showTaskContainer.style.display = 'none';
    boardPopUp.innerHTML += renderEditTaskHtml(contact);/** */

    getcheckBoxesEdit(id);
    getContactPriorityEdit(contact);
    getContactInitialEdit(contact);
    getSubtaskEdit(contact);
    getCurrentTaskCategoryEdit(contact);
}


/**
 * Sets the active class on the corresponding HTML element based on the priority of a contact.
 * @param {Object} contact - The contact object containing the priority property.
 * @param {string} contact.priority - The priority level of the contact ('Urgent', 'Medium', or 'Low').
 */
function getContactPriorityEdit(contact) {
    let urgent_edit = document.getElementById('urgent_edit');
    let medium_edit = document.getElementById('medium_edit');
    let low_edit = document.getElementById('low_edit');

    switch (contact.priority) {
        case 'Urgent':
            urgent_edit.classList.add('active');
            break;
        case 'Medium':
            medium_edit.classList.add('active');
            break
        case 'Low':
            low_edit.classList.add('active');
            break
    }
}


/**
 * Populates input fields with contact information and calls another function to generate selected names.
 * @param {Object} contact - The contact object containing information such as title, description, and date.
 * @param {string} contact.title - The title of the contact task to be edited.
 * @param {string} contact.description - The description of the contact task to be edited.
 * @param {string} contact.date - The date associated with the contact task to be edited.
 */
function getContactInitialEdit(contact) {
    let task_title_edit = document.getElementById('task_title_edit');
    let task_description_edit = document.getElementById('task_description_edit');
    let task_date_edit = document.getElementById('task_date_edit');

    task_title_edit.value = contact.title;
    task_description_edit.value = contact.description;
    task_date_edit.value = contact.date;

    generateSelectedNames(contact);
}


/**
 * Populates a specified HTML element with user initials and background colors based on the provided contact data.
 * @param {Object} contact - The contact object containing information such as color and initial.
 * @param {string[]} contact.color - An array of background colors corresponding to each user.
 * @param {string[]} contact.initial - An array of initials representing each user.
 */
function generateSelectedNames(contact) {
    let task_edit_initial = document.getElementById('task_edit_initial');
    task_edit_initial.innerHTML = '';
    if (selectedNames) {
        for (let i = 0; i < selectedNames.length; i++) {
            task_edit_initial.innerHTML += `
                <div class="board_task_user_initial show_task_user_initial" style="background-color: ${contact.color[i]};">${contact.initial[i]}</div>
                `;
        }
    } else {
        task_edit_initial.innerHTML = '';
    }
}


/**
 * Populates a specified HTML element with subtask information based on the given contact object.
 * @param {Object} contact - The contact object containing subtask information.
 * @param {Object[]} contact.subtasks - An array of subtasks belonging to the contact.
 * @param {string} contact.subtasks[].title - The title of the subtask.
 * @param {string} contact.subtasks[].description - The description of the subtask.
 * @param {string} contact.subtasks[].date - The date associated with the subtask.
 */
function getSubtaskEdit(contact) {
    let task_subtasks_edit = document.getElementById('show_task_subtask_edit');
    task_subtasks_edit.innerHTML = '';

    if (contact.subtasks) {
        for (let i = 0; i < contact.subtasks.length; i++) {
            const element = contact.subtasks[i];
            task_subtasks_edit.innerHTML += rendergetSubtaskEditHtml(element, contact, i);
        }
    } else {
        task_subtasks_edit.innerHTML = '';
    }
}


/**
 * Sets the selected option in a dropdown menu based on the current task category of a contact.
 * @param {Object} contact - The contact object containing information about the task category.
 * @param {string} contact.category - The current category of the task associated with the contact.
 */
function getCurrentTaskCategoryEdit(contact) {
    let task_taskCategory_edit = document.getElementById('task_category_edit');
    let currentTaskCategory = contact.category;
    let options = task_taskCategory_edit.options
    for (let i = 0; i < options.length; i++) {
        if (options[i].value === currentTaskCategory) {
            options[i].selected = true;
        } else {
            options[i].selected = false;
        }
    }
}


/**
 * Displays a specific subtask for editing within a task.
 * @param {number} i - The index of the subtask within the `subtasks` array of the `contact` object.
 * @param {string} id - The unique identifier of the task to be edited, used to locate the task in the `todos` array.
 */
function showTaskEditSubtask(i, id) {
    let contact = todos.find(obj => obj['id'] == id);
    let show_task_subtask_edit_btn = document.getElementById(`show_task_subtask_edit_btn${i}`);
    show_task_subtask_edit_btn.style.display = 'flex';
    let show_task_subtask_edit_input = document.getElementById(`show_task_subtask_edit_input${i}`);

    show_task_subtask_edit_input.value = contact.subtasks[i];
}


/**
 * Updates a subtask for a specific task and saves the changes to local storage and the server.
 * @param {number} i - The index of the subtask within the `contact` object's subtasks array to add or edit.
 * @param {string} id - The unique identifier of the task to be updated, used to locate the task in the `todos` array.
 * @returns {Promise<void>} A Promise that resolves once the subtask is updated and changes are saved.
 */
async function addEditSubtask(i, id) {
    let contact = todos.find(obj => obj['id'] == id);
    let show_task_subtask_edit_input = document.getElementById(`show_task_subtask_edit_input${i}`);
    contact.subtasks[i] = show_task_subtask_edit_input.value;
    saveTaskToLocalStorage();
    await saveTasksToServer();
    getSubtaskEdit(contact);
    initBoardTasks();
}


/**
 * Deletes a subtask from a task, saves the updated task to local storage, sends the updated tasks to
 * the server, and retrieves the edited subtask for display.
 * @param {number} i - The index of the subtask to be deleted from the `subtasks` array of a task.
 * @param {string} id - The unique identifier of the task from which the subtask needs to be deleted,
 * used to locate the task in the `todos` array.
 * @returns {Promise<void>} A Promise that resolves once the subtask is deleted and changes are saved.
 */
async function showTaskDeleteSubtask(i, id) {
    let contact = todos.find(obj => obj['id'] == id);
    contact.subtasks.splice(i, 1);
    saveTaskToLocalStorage();
    await saveTasksToServer();
    getSubtaskEdit(contact);
    initBoardTasks();
}


/**
 * Adds a new subtask to a task, saves it to local storage, sends it to the server, and updates the UI.
 * @param {string} id - The unique identifier of the task in the `todos` array that needs to be updated
 * with a new subtask.
 * @returns {Promise<void>} A Promise that resolves once the new subtask is added and changes are saved.
 */
async function addNewSubTaskEdit(id) {
    let contact = todos.find(obj => obj['id'] == id);
    let task_subtasks = document.getElementById('task_subtasks_edit');
    let task_subtasks_edit = task_subtasks.value
    if (!contact.subtasks) {
        contact.subtasks = [];
    }
    if (task_subtasks_edit) {
        contact.subtasks.push(task_subtasks_edit);
    }
    task_subtasks.value = '';
    saveTaskToLocalStorage();
    await saveTasksToServer();
    getSubtaskEdit(contact);
    initBoardTasks();
}


/**
 * Updates a specific todo item by finding it in the `todos` array, updating its details, guest
 * information, priority, saving the updates, and then reloading the user interface.
 * @param {string} id - The unique identifier of the todo item in the `todos` array that needs to be
 * upgraded.
 * @returns {Promise<void>} A Promise that resolves once the todo item is upgraded and changes are
 * saved.
 */
async function upgradeTodos(id) {
    let contact = todos.find(obj => obj['id'] == id);
    updateContactDetails(contact);
    updateGuestInfo(contact);
    updatePriority(contact);
    updateTaskCategory(contact);
    await saveTaskUpdates();
    reloadUI();
    showTask(id);
}


/**
 * Updates contact details based on input values from specific elements in a form.
 * @param {Object} contact - The contact object to be updated. It contains the following properties:
 * @param {string} contact.title - The title of the contact or task.
 * @param {string} contact.description - The description or details of the contact or task.
 * @param {string} contact.date - The date associated with the contact or task.
 * @param {string} contact.assignedTo - The person assigned to the contact or task.
 * @param {Array<string>} contact.name - An array of names or initials associated with the contact or task.
 */
function updateContactDetails(contact) {
    contact.title = document.getElementById('task_title_edit').value;
    contact.description = document.getElementById('task_description_edit').value;
    contact.date = document.getElementById('task_date_edit').value;
    contact.assignedTo = document.getElementById('task_assignet_input_edit').value;
    contact.name = selectedNames;
}


/**
 * Updates the color and initials of a contact based on selected guest names.
 * @param {Object} contact - The contact object to be updated. It contains information about a guest,
 * including their name, color, and initials.
 * @param {Array<string>} selectedNames - An array of selected guest names whose colors and initials
 * will be updated in the contact object.
 */
function updateGuestInfo(contact) {
    let guestColor = [];
    let initials = [];
    selectedNames.forEach(element => {
        let guest = guesteArray.find(guest => guest.name === element);
        guestColor.push(guest.color);
        initials.push(getInitials(guest.name));
    });
    contact.color = guestColor;
    contact.initial = initials;
}


/**
 * Updates the priority and priority image of a contact based on a user-defined priority value.
 * @param {Object} contact - The contact object to be updated. It represents a contact and contains
 * properties like `priority` and `priorityImg` that will be updated based on the user-defined priority.
 * @param {string} userPriority - The user-defined priority value to update in the contact object.
 * This value will be assigned to the `priority` property of the contact object if truthy.
 */
function updatePriority(contact) {
    if (userPriotity) {
        contact.priority = userPriotity;
        contact.priorityImg = getPriorityUpdateTodos(userPriotity);
    }
}


/**
 * Updates the category of a task contact based on user input from a specific HTML element.
 * @param {Object} contact - The contact object representing a task. It contains properties
 * such as `category` that will be updated based on user input.
 */
function updateTaskCategory(contact) {
    contact.category = document.getElementById('task_category_edit').value;
}


/**
 * The function `saveTaskUpdates` saves task updates to both local storage and the server
 * asynchronously.
 */
async function saveTaskUpdates() {
    saveTaskToLocalStorage();
    await saveTasksToServer();
}


/**
 * The `reloadUI` function initializes adding tasks, initializes board tasks, and closes the task
 * display.
 */
function reloadUI() {
    initAddTask();
    initBoardTasks();
}


/**
 * The function searches for a task on a board based on user input and updates the board accordingly.
 */
function searchTaskFromBoard() {
    let input_find_task = document.getElementById('input_find_task');
    input_find_task = input_find_task.value.toLowerCase();

    if (input_find_task) {
        const ids = ['board_to_do', 'board_in_progress', 'board_await_feedback', 'board_done'];
        const elements = ids.map(id => document.getElementById(id));
        elements.forEach(element => element.innerHTML = '');

        for (let i = 0; i < todos.length; i++) {
            const element = todos[i];
            if (element.title.toLowerCase().includes(input_find_task)) {
                let category = element.category;
                searchSwithId(category);
                let searchResult = document.getElementById(searchId);
                searchResult.innerHTML = renderHtmlToDo(element);
                getInitialsArray(element);
                getCategorieBackGroundColor(element);
            }
        }
    } else {
        initBoardTasks();
    }
}


/**
 * Populates a board with initials and colors, displaying a limited number of initials with circles
 * and showing the rest as a count.
 * @param {Object} element - The object containing properties like `initial`, `color`, and `id`.
 * It represents the element for which initials and colors are to be populated on the board.
 */
function getInitialsArray(element) {
    let initialsArray = element.initial;
    let colorsArray = element.color;
    let showCircleWithInitials = 3;
    if (initialsArray) {
        let showCircleWithRestOfPersons = initialsArray.length - showCircleWithInitials;
        let boardTaskInitial = document.getElementById(`board_task_initial${element.id}`);
        boardTaskInitial.innerHTML = '';
        for (let j = 0; j < initialsArray.length; j++) {
            let initial = initialsArray[j];
            let color = colorsArray[j];
            if (j < showCircleWithInitials) {
                boardTaskInitial.innerHTML += createInitialBlock(initial, color);
            } else {
                boardTaskInitial.innerHTML += createRemainingPersonsBlock(showCircleWithRestOfPersons);
                break;
            }
        }
    }
}