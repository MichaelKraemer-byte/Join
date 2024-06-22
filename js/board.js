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
 * The function `deleteTaskFromLocalStorage` deletes a task with a specific ID from local storage,
 * updates the task list, saves the updated tasks to the server, and initializes the board tasks.
 * @param id - The `id` parameter in the `deleteTaskFromLocalStorage` function represents the unique
 * identifier of the task that needs to be deleted from the local storage. This identifier is used to
 * find and remove the specific task from the `todos` array before saving the updated tasks to the
 * server and local storage.
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
 * The function `generateToDo` populates a specified HTML element with to-do items from an array,
 * including rendering subtasks and progress bars.
 * @param arr - The `arr` parameter in the `generateToDo` function is an array that contains the tasks
 * to be displayed in a to-do list. Each element in the array represents a task object with properties
 * like `id`, `subtasks`, `selectedTask`, etc. The function iterates over this array
 * @param categorie_id - `categorie_id` is a DOM element that represents the container where the
 * generated to-do items will be displayed. The function `generateToDo` populates this container with
 * to-do items based on the input array and category information.
 * @param category - The `category` parameter in the `generateToDo` function is used to specify the
 * category of the to-do items being generated. It is likely used for rendering the to-do items in the
 * appropriate category section on the user interface.
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
 * The function `addTask` adds a new task to a specified column in a task management system.
 * @param column - The `column` parameter in the `addTask` function likely refers to the column or
 * section where the task is being added. This parameter is used to specify the location within the
 * task management system where the new task will be created.
 */
function addTask(column) {
    generateAddTasks(column);
    displayGreyBackground();
    slideInTask();
    initAddTask();
}


/**
 * The function `generateShowTask` populates a popup with information about a specific task, including
 * subtasks and user details.
 * @param id - The `id` parameter in the `generateShowTask` function is used to identify the specific
 * task or contact that needs to be displayed in the pop-up on the board. It is used to find the
 * corresponding task object in the `todos` array and then render the task details in the pop-up
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
 * The function `updateSubtaskStatus` updates the status of a subtask for a given contact by adding or
 * removing it from the selected tasks list, saving the changes to local storage, sending the updated
 * tasks to the server, and initializing the board tasks.
 * @param contact - Contact is an object representing a user or a person. It likely contains
 * information such as name, email, phone number, and other details.
 * @param subtask - The `subtask` parameter in the `updateSubtaskStatus` function represents the
 * specific subtask that you want to update the status for. It is used to identify the subtask within
 * the `contact` object and determine whether it should be added to or removed from the `selectedTask`
 * array
 * @param isChecked - The `isChecked` parameter is a boolean value that indicates whether a subtask is
 * checked or not. If `isChecked` is `true`, it means the subtask is checked; if `isChecked` is
 * `false`, it means the subtask is not checked.
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
 * The function `getshowTaskUserName` populates the `show_task_user_name` element with user names and
 * initials from a given contact object.
 * @param contact - It seems like the information about the `contact` object is missing in your
 * message. Could you please provide the details or properties of the `contact` object so that I can
 * assist you further with the `getshowTaskUserName` function?
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
 * The `editTask` function retrieves a task by its ID, hides the task container, and populates a popup
 * with the task details for editing.
 * @param id - The `id` parameter in the `editTask` function is used to identify the specific task that
 * needs to be edited. It is passed to the function to locate the task within the `todos` array and
 * retrieve its details for editing.
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
 * The function `getContactPriorityEdit` sets the active class on the corresponding HTML element based
 * on the priority of a contact.
 * @param contact - The function `getContactPriorityEdit` takes a `contact` object as a parameter. The
 * `contact` object likely has a property called `priority` which specifies the priority level of the
 * contact. The function then selects elements with IDs 'urgent_edit', 'medium_edit', and 'low_edit'
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
 * The function `getContactInitialEdit` populates input fields with contact information and calls
 * another function to generate selected names.
 * @param contact - The `contact` parameter in the `getContactInitialEdit` function seems to represent
 * an object with properties like `title`, `description`, and `date`. These properties are used to
 * populate input fields in a form with IDs `task_title_edit`, `task_description_edit`, and
 * `task_date_edit
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
 * The function `generateSelectedNames` populates a specified HTML element with user initials and
 * background colors based on the provided contact data.
 * @param contact - It seems like you haven't provided the complete information about the `contact`
 * parameter. Could you please provide more details or the structure of the `contact` object so that I
 * can assist you better in completing the `generateSelectedNames` function?
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
 * The function `getSubtaskEdit` populates a specified HTML element with subtask information based on a
 * given contact object.
 * @param contact - The `contact` parameter in the `getSubtaskEdit` function seems to be an object that
 * contains information about a contact, including their subtasks. The function loops through the
 * subtasks of the contact and renders HTML elements based on the subtask data. If the contact has
 * subtasks, it
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
 * The function `showTaskEditSubtask` displays a specific subtask for editing within a task.
 * @param i - The parameter `i` in the `showTaskEditSubtask` function is likely representing the index
 * of the subtask within the `subtasks` array of the `contact` object.
 * @param id - The `id` parameter in the `showTaskEditSubtask` function is used to find the specific
 * task object in the `todos` array based on its `id` property. This allows the function to retrieve
 * the task details, including its subtasks, for further manipulation.
 */
function showTaskEditSubtask(i, id) {
    let contact = todos.find(obj => obj['id'] == id);
    let show_task_subtask_edit_btn = document.getElementById(`show_task_subtask_edit_btn${i}`);
    show_task_subtask_edit_btn.style.display = 'flex';
    let show_task_subtask_edit_input = document.getElementById(`show_task_subtask_edit_input${i}`);

    show_task_subtask_edit_input.value = contact.subtasks[i];
}


/**
 * The function `addEditSubtask` updates a subtask for a specific task and saves the changes to local
 * storage and the server.
 * @param i - The parameter `i` in the `addEditSubtask` function represents the index of the subtask
 * within the `contact` object's subtasks array that you want to add or edit.
 * @param id - The `id` parameter in the `addEditSubtask` function is used to identify the specific
 * task in the `todos` array that needs to be updated. It is used to find the task object with the
 * matching `id` value in the `todos` array.
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
 * The function `showTaskDeleteSubtask` deletes a subtask from a task, saves the updated task to local
 * storage, sends the updated tasks to the server, and then retrieves the edited subtask for display.
 * @param i - The parameter `i` in the `showTaskDeleteSubtask` function represents the index of the
 * subtask that needs to be deleted from the `subtasks` array of a task.
 * @param id - The `id` parameter in the `showTaskDeleteSubtask` function is used to identify the task
 * for which a subtask needs to be deleted. It is used to find the specific task object from the
 * `todos` array.
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
 * The function `addNewSubTaskEdit` adds a new subtask to a task, saves it to local storage, sends it
 * to the server, and updates the UI.
 * @param id - The `id` parameter in the `addNewSubTaskEdit` function is used to identify the specific
 * task in the `todos` array that needs to be updated with a new subtask.
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
 * The function `upgradeTodos` updates a specific todo item by finding it in the `todos` array,
 * updating its details, guest information, and priority, saving the updates, and then reloading the
 * user interface.
 * @param id - The `id` parameter in the `upgradeTodos` function is used to identify the specific todo
 * item that needs to be upgraded. It is used to find the corresponding todo object in the `todos`
 * array based on the provided `id`.
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
 * The function `updateContactDetails` updates contact details based on input values from specific
 * elements in a form.
 * @param contact - The `contact` parameter is an object that represents a contact or task. It contains
 * the following properties:
 */
function updateContactDetails(contact) {
    contact.title = document.getElementById('task_title_edit').value;
    contact.description = document.getElementById('task_description_edit').value;
    contact.date = document.getElementById('task_date_edit').value;
    contact.assignedTo = document.getElementById('task_assignet_input_edit').value;
    contact.name = selectedNames;
}


/**
 * The function `updateGuestInfo` updates the color and initials of a contact based on selected guest
 * names.
 * @param contact - The `contact` parameter is an object that contains information about a guest, such
 * as their name, color, and initials. The `updateGuestInfo` function takes this `contact` object and
 * updates its `color` and `initial` properties based on the selected guest names in the `selectedNames
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
 * The function `updatePriority` updates the priority and priority image of a contact based on a
 * user-defined priority value.
 * @param contact - The `contact` parameter seems to be an object representing a contact. It appears
 * that the function `updatePriority` is designed to update the priority of this contact based on the
 * value of `userPriority`. If `userPriority` is truthy, the function sets the `priority` property of
 * the
 */
function updatePriority(contact) {
    if (userPriotity) {
        contact.priority = userPriotity;
        contact.priorityImg = getPriorityUpdateTodos(userPriotity);
    }
}

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
 * The function `getInitialsArray` populates a board with initials and colors, showing a limited number
 * of initials with circles and displaying the rest as a count.
 * @param element - The `element` parameter in the `getInitialsArray` function seems to represent an
 * object with properties like `initial`, `color`, and `id`. The function retrieves the initials and
 * colors arrays from the `element` object, sets a limit for the number of initials to display, and
 * then
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