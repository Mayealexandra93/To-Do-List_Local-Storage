// DOM Elements
const add_task_btn_885 = document.getElementById('add_task_btn');
const task_title_885 = document.getElementById('task_title');
const task_descrip_885 = document.getElementById('task_desc');
const task_list_885 = document.getElementById('task_list');
const clearAllButton_885 = document.getElementById('clearAllButton');

// Load tasks from LocalStorage when the page loads
document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);

// Event Listener for Clear All Tasks button
clearAllButton_885.addEventListener('click', clearAllTasks_885);

function clearAllTasks_885() {
    task_list_885.innerHTML = '';
    localStorage.removeItem('tasks');  // Remove tasks from LocalStorage
}

// Event Listener for Add Task button
add_task_btn_885.addEventListener('click', add_task_885);

// Function to Add a Task
function add_task_885() {
    if (task_title_885.value.trim() === '' || task_descrip_885.value.trim() === '') {
        toastr.error("Please enter the To-Do Name and Description"); // Toast Error if input is empty
        return;
    }

    // Create task object
    const newTask = {
        title: task_title_885.value,
        description: task_descrip_885.value,
        completed: false
    };

    // Create list item and task content
    let li = document.createElement('li');
    let task_content_885 = document.createElement('div');
    let task_buttons_885 = document.createElement('div');
    
    task_content_885.innerHTML = `
        <b class="task-title">${newTask.title}</b>
        <p class="task-desc">${newTask.description}</p>
    `;
    
    task_buttons_885.classList.add('buttons'); 

    // Create Buttons: Edit, Complete, Delete
    const edit_btn_885 = document.createElement('button');
    edit_btn_885.textContent = 'Edit';
    edit_btn_885.style.fontWeight = 'bold';
    edit_btn_885.classList.add('edit');

    const complete_btn_885 = document.createElement('button');
    complete_btn_885.textContent = 'Complete';
    complete_btn_885.style.fontWeight = 'bold';
    complete_btn_885.classList.add('complete');

    const delete_btn_885 = document.createElement('button');
    delete_btn_885.textContent = 'Delete';
    delete_btn_885.style.fontWeight = 'bold';
    delete_btn_885.classList.add('delete');

    task_buttons_885.appendChild(edit_btn_885);    
    task_buttons_885.appendChild(delete_btn_885);
    task_buttons_885.appendChild(complete_btn_885);

    li.appendChild(task_content_885);
    li.appendChild(task_buttons_885);

    // Append the task item to the list
    task_list_885.appendChild(li);

    // Clear input fields
    task_title_885.value = '';
    task_descrip_885.value = '';

    // Save tasks to LocalStorage after adding a new task
    saveTasksToLocalStorage();

    // Event listeners for the buttons
    edit_btn_885.addEventListener('click', () => edit_task_885(li, newTask));
    complete_btn_885.addEventListener('click', () => complete_task_885(li, newTask));
    delete_btn_885.addEventListener('click', () => delete_task_885(li, newTask));
}

// Function to Edit Task
function edit_task_885(task_item_885, taskData) {
    let new_title_885 = prompt('Edit Task Title', taskData.title);
    let new_descrip_885 = prompt('Edit Task Description', taskData.description);

    if (new_title_885.trim() !== '' && new_descrip_885.trim() !== '') {
        task_item_885.querySelector('.task-title').textContent = new_title_885;
        task_item_885.querySelector('.task-desc').textContent = new_descrip_885;

        // Update task object
        taskData.title = new_title_885;
        taskData.description = new_descrip_885;

        // Save the updated tasks to LocalStorage
        saveTasksToLocalStorage();
    } else {
        alert('Please enter both a task title and description.');
    }
}

// Function to Toggle Complete Task
function complete_task_885(task_item_885, taskData) {
    task_item_885.classList.toggle('completed');
    taskData.completed = !taskData.completed; // Toggle the completed status
    saveTasksToLocalStorage(); // Save updated tasks to LocalStorage
}

// Function to Delete Task
function delete_task_885(task_item_885, taskData) {
    task_list_885.removeChild(task_item_885);

    // Remove the task from the tasks array in LocalStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.title !== taskData.title);  // Remove the task from array
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save updated tasks
}

// Save tasks to LocalStorage
function saveTasksToLocalStorage() {
    let tasks = [];

    // Iterate over the list items and build the task array
    document.querySelectorAll('#task_list li').forEach((taskItem) => {
        const taskTitle = taskItem.querySelector('.task-title').textContent;
        const taskDesc = taskItem.querySelector('.task-desc').textContent;
        const isCompleted = taskItem.classList.contains('completed');

        tasks.push({
            title: taskTitle,
            description: taskDesc,
            completed: isCompleted
        });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save the tasks to LocalStorage
}

// Load tasks from LocalStorage
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach((taskData) => {
        // Create task elements
        let li = document.createElement('li');
        let task_content_885 = document.createElement('div');
        let task_buttons_885 = document.createElement('div');
        
        task_content_885.innerHTML = `
            <b class="task-title">${taskData.title}</b>
            <p class="task-desc">${taskData.description}</p>
        `;
        
        task_buttons_885.classList.add('buttons'); 

        // Create Buttons: Edit, Complete, Delete
        const edit_btn_885 = document.createElement('button');
        edit_btn_885.textContent = 'Edit';
        edit_btn_885.style.fontWeight = 'bold';
        edit_btn_885.classList.add('edit');

        const complete_btn_885 = document.createElement('button');
        complete_btn_885.textContent = 'Complete';
        complete_btn_885.style.fontWeight = 'bold';
        complete_btn_885.classList.add('complete');

        const delete_btn_885 = document.createElement('button');
        delete_btn_885.textContent = 'Delete';
        delete_btn_885.style.fontWeight = 'bold';
        delete_btn_885.classList.add('delete');

        task_buttons_885.appendChild(edit_btn_885);    
        task_buttons_885.appendChild(delete_btn_885);
        task_buttons_885.appendChild(complete_btn_885);

        li.appendChild(task_content_885);
        li.appendChild(task_buttons_885);

        // Append the task item to the list
        task_list_885.appendChild(li);

        if (taskData.completed) {
            li.classList.add('completed'); // Add completed class if the task is marked as completed
        }

        // Event listeners for the buttons
        edit_btn_885.addEventListener('click', () => edit_task_885(li, taskData));
        complete_btn_885.addEventListener('click', () => complete_task_885(li, taskData));
        delete_btn_885.addEventListener('click', () => delete_task_885(li, taskData));
    });
}
