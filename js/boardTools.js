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


function getcheckBoxesEdit(contact) {
    let checkBoxesEdit = document.getElementById('checkBoxesEdit');
    checkBoxesEdit.innerHTML = '';
    let contactNames = contact.name;
    let checkBoxesHTML = '';
    guesteArray.forEach(guest => {
        let isChecked = contactNames ? contactNames.includes(guest.name) : false;
        let initial = getInitials(guest.name);
        checkBoxesHTML += rendergetcheckBoxesEdit(guest, initial, isChecked)
    });
    checkBoxesEdit.innerHTML = checkBoxesHTML;   
    checkBoxClickNone(); 
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