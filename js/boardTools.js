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


function getInitials(name) {
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
  
    let initials = [...name.matchAll(rgx)] || [];
  
    initials = (
      (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
    ).toUpperCase();
  
    return initials;
  }


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


function schowSubtask(element) {
    if (element.subtasks) {
        return element.subtasks
    } else {
        return " "
    }
}


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


function getCategorieBackGroundColor(element) {
    let borderCategory = document.getElementById(`board_task_category${element.id}`);
    if (element.status == 'Technical Task') {
        borderCategory.style.backgroundColor = '#1FD7C1';
    } else {
        borderCategory.style.backgroundColor = '#0038FF';
    }
}


function getCategorieBackGroundColorShowTask(contact, id) {
    let borderCategory = document.getElementById(`show_task_category${id}`);
    if (contact['status'] == 'Technical Task') {
        borderCategory.style.backgroundColor = '#1FD7C1';
    } else {
        borderCategory.style.backgroundColor = '#0038FF';
    }
} 


function generateNoTask(categorie_id, category) {
    categorie_id.innerHTML += `<div class="no_task">No tasks ${category}</div>`
}


function startDragging(id) {
    currentElement = id;
}


function allowDrop(ev) {
    ev.preventDefault();
}


async function moveTo(category) {
    let contact = todos.find(obj => obj['id'] == currentElement);
    contact['category'] = category;
    await saveTasksToServer();
    saveTaskToLocalStorage();
    initBoardTasks();
}


function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}


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


function slideInTask() {
    let boardPopUp = document.getElementById('boardPopUp');
    if (boardPopUp) {
        boardPopUp.style.display = 'flex';
        boardPopUp.classList.remove('slideOut');
        boardPopUp.classList.add('slideIn');
    }
}


function closeWindow() {
    slideOutTask();
    removeGreyBackground();
}


function generateCheckBoxSubTask(contact, id ) {
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


function createInitialBlock(initial, color) {
    return `
        <div class="board_task_user_initial" style="background-color: ${color};">${initial}</div>
    `;
}


function createRemainingPersonsBlock(remainingPersonsCount) {
    return `
        <div class="board_task_user_initial" style="background-color: #a3a3a3;">+${remainingPersonsCount}</div>
    `;
}


function showTask(id) {
    let boardPopUp = document.getElementById('boardPopUp');
    boardPopUp.style.display = 'flex';
    slideInTask();
    displayGreyBackground();
    generateShowTask(id);
}


function closeShowTask() {
    let input_find_task = document.getElementById('input_find_task');
    input_find_task.value = '';
    slideOutTask();
    removeGreyBackground();
    initBoardTasks();
}

