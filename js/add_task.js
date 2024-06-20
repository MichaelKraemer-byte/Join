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
        guesteArray = Object.keys(data).map(id => ({
            id,
            ...data[id]
        }));

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
    await loadTasksFromServer();
    generateCheckBox();
    document.querySelectorAll('input[name="optionen"]').forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            getValues('add_task_show_check');
        });
    });
}


/**
 * The function `generateAddTasks` sets the inner HTML of an element with the id 'boardPopUp' to the
 * result of rendering HTML for adding tasks to a specified column.
 * @param column - The `column` parameter in the `generateAddTasks` function likely refers to a
 * specific column in a task management board or similar interface. This column could represent a
 * category, status, or any other grouping of tasks within the board. The function seems to be
 * responsible for generating and rendering HTML content for
 */
function generateAddTasks(column) {
    let boardPopUp = document.getElementById('boardPopUp');
    boardPopUp.innerHTML = renderHtmlAddtask(column);
}


/**
 * The function `addTaskToTasks` adds a new task to a list of tasks, saves it to the server and local
 * storage, and updates the user interface.
 * @param column - The `column` parameter in the `addTaskToTasks` function represents the category or
 * column where the task will be added. It is used to specify the category of the task being created.
 * @returns The `addTaskToTasks` function is an asynchronous function that adds a task to a list of
 * tasks. It performs the following steps:
 * 1. Checks if the `addTaskProcess` flag is set, and if so, it returns early.
 * 2. Disables the 'createTaskButton' element on the page.
 * 3. Generates a unique name for a checkbox.
 * 4. Creates a task
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
        initBoardTasks();
    }
    initAddTask();
    slideInConfirmation();
}


/**
 * The function `getPriorityImage` returns an image URL based on the user's priority level.
 * @param userPriotity - userPriority is a parameter that represents the priority level of a task or
 * item. It can have three possible values: 'Urgent', 'Medium', or 'Low'. The function getPriorityImage
 * takes this userPriority as input and returns the corresponding image URL based on the priority
 * level.
 * @returns The function `getPriorityImage` returns the path to an image based on the user's priority
 * level. If the user's priority is 'Urgent', it returns './assets/img/vector_red.svg'. If the priority
 * is 'Medium', it returns './assets/img/vector_strich.svg'. If the priority is 'Low', it returns
 * './assets/img/vector_green.svg'. If the priority is not any
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
 * The function `getUserPriorityStatus` returns the user priority status, defaulting to 'Medium' if not
 * provided.
 * @param userPriotity - The function `getUserPriorityStatus` takes a parameter `userPriority` and
 * checks if it has a value. If `userPriority` has a value, it returns that value. Otherwise, it
 * returns 'Medium'.
 * @returns If the `userPriority` parameter is provided (truthy), the function will return the value of
 * `userPriority`. If `userPriority` is not provided (falsy), the function will return 'Medium'.
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
 * The function `getTaskPriority` toggles the active state of a button and sets the user priority based
 * on the button's text content.
 * @param id - The `id` parameter in the `getTaskPriority` function is used to identify the specific
 * task priority button that was clicked or interacted with.
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
 * The function `toggleCheckboxes` toggles the visibility of checkboxes and clears the value of an
 * input field based on a boolean variable `show`.
 * @param event - The `event` parameter is an object that represents an event that occurs in the DOM
 * (Document Object Model), such as a click, keypress, or mouse movement. In this context, it is likely
 * being used to handle an event triggered by a user action, such as clicking on a checkbox or
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

        // Überprüfe, ob das Element 'checkBoxes' vorhanden ist, bevor du darauf zugreifst
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
 * The function `getValues` retrieves the checked values of checkboxes with a specific name and calls
 * the `checkGuestsName` function with those values.
 * @param id - The `id` parameter in the `getValues` function is used to specify the ID of an HTML
 * element that will be targeted to display the selected values from checkboxes.
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
 * The function `checkGuestsName` retrieves selected guest names and their corresponding colors from
 * checkboxes and displays their initials with respective colors on the webpage.
 * @param checkedValues - The `checkedValues` parameter in the `checkGuestsName` function is used to
 * determine if any checkboxes have been checked. If `checkedValues` is truthy, the function will
 * proceed to retrieve the selected checkboxes, find the corresponding guest information, and display
 * the initials of the selected guests with
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
 * The clearForm function resets the input fields in a form with the ID "meinFormular".
 */
function clearForm() {
    let idChekBox = document.getElementById('add_task_show_check');
    idChekBox.innerHTML = '';
    subtasks = [];
    document.getElementById('add_task_show_check').innerHTML = '';
    document.getElementById('get_subtask').innerHTML = '';
    document.getElementById("meinFormular").reset();
    getSubTaskAddTask();
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
 */
function addNewSubTask() {
    let task_subtask = document.getElementById('task_subtasks');
    let add_task_button_plus = document.getElementById('add_task_button_plus');
    let deleteSubtask = document.getElementById('delete_subtask');
    let check = document.getElementById('check');

    if (task_subtask.value) {
        subtasks.push(task_subtask.value);

    }
    getSubTaskAddTask();
    check.style.display = 'none';
    deleteSubtask.style.display = 'none';
    add_task_button_plus.style.visibility = 'initial';
    task_subtask.value = "";
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
 * The function `showEditNewSubTask` displays an edit button and input field for a specific subtask
 * based on the index `i`.
 * @param i - The parameter `i` in the `showEditNewSubTask` function is used as an index to identify a
 * specific subtask.
 */
function showEditNewSubTask(i) {
    let show_task_subtask_edit_btn = document.getElementById(`show_task_subtask_edit_btn${i}`);
    show_task_subtask_edit_btn.style.display = 'flex';
    let show_task_subtask_edit_input = document.getElementById(`show_task_subtask_edit_input${i}`);
    show_task_subtask_edit_input.value = subtasks[i];
}


/**
 * The function `addEditNewSubTask` updates a specific subtask in an array and then calls another
 * function to update the task.
 * @param i - The parameter `i` in the `addEditNewSubTask` function is used as an index to access and
 * update a specific subtask in the `subtasks` array.
 */
function addEditNewSubTask(i) {
    let show_task_subtask_edit_input = document.getElementById(`show_task_subtask_edit_input${i}`);
    subtasks[i] = show_task_subtask_edit_input.value;
    getSubTaskAddTask();
}


/* The above code is a JavaScript function named `deleteNewSubTask` that takes an index `i` as a
parameter. Inside the function, it uses the `splice` method to remove one element at the specified
index `i` from the `subtasks` array. After removing the element, the function then calls another
function `getSubTaskAddTask()`. */
function deleteNewSubTask(i) {
    subtasks.splice(i, 1);
    getSubTaskAddTask();
}


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

function setDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const minDate = `${year}-${month}-${day}`;

    return minDate
}