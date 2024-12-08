// 1. DOM Elements
const add_task_btn_885 = document.getElementById('add_task_btn');
const task_title_885 = document.getElementById('task_title');
const task_descrip_885 = document.getElementById('task_desc');
const task_list_885 = document.getElementById('task_list');
const clearAllButton_885 = document.getElementById('clearAllButton');

// 2. Load Tasks from LocalStorage: Load tasks from LocalStorage when the page loads
document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage_885);

// Save tasks to LocalStorage
function saveTasksToLocalStorage() {
    // 1. Create an empty array tasks
    let tasks = [];

    // 2. Iterate over each task item in the task list
    document.querySelectorAll('#task_list li').forEach((taskItem) => {

        // 3. Extract task details from each item
        const taskTitle = taskItem.querySelector('.task-title').textContent;
        const taskDesc = taskItem.querySelector('.task-desc').textContent;
        const isCompleted = taskItem.classList.contains('completed');

        // 4. Create a task object and add it to the tasks array
        tasks.push({
            title: taskTitle,
            description: taskDesc,
            completed: isCompleted
        });
    });

    // 5. Save the tasks array to LocalStorage
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save the tasks to LocalStorage
}

//  Loading Tasks from LocalStorage
function loadTasksFromLocalStorage_885() {
    // 1. Get Tasks from LocalStorage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // 2. Loop Through Each Task
    tasks.forEach((taskData) => {

        // 3. Create HTML Elements for Each Task
        let li = document.createElement('li');
        let task_content_885 = document.createElement('div');
        let task_buttons_885 = document.createElement('div');
        
        // 4. Set the Content for the Task
        task_content_885.innerHTML = `
            <b class="task-title">${taskData.title}</b>
            <p class="task-desc">${taskData.description}</p>
        `;
        
        task_buttons_885.classList.add('buttons'); 

        // 5. Create Buttons for Each Task: Edit, Delete and Complete
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

        // 6. Add Buttons to Task
        task_buttons_885.appendChild(edit_btn_885);    
        task_buttons_885.appendChild(delete_btn_885);
        task_buttons_885.appendChild(complete_btn_885);

        // 7. Add Task Content and Buttons to List Item
        li.appendChild(task_content_885);
        li.appendChild(task_buttons_885);

        // 8. Append Task to the Task List
        task_list_885.appendChild(li);

        // 9. Mark Task as Completed (if applicable)
        if (taskData.completed) {
            li.classList.add('completed'); // Add completed class if the task is marked as completed
        }

        // 10. Attach Event Listeners to Buttons
        edit_btn_885.addEventListener('click', () => edit_task_885(li, taskData));
        complete_btn_885.addEventListener('click', () => complete_task_885(li, taskData));
        delete_btn_885.addEventListener('click', () => delete_task_885(li, taskData));
    });

function clearAllTasks_885() {
    task_list_885.innerHTML = ''; // Removes task from the GUI
    localStorage.removeItem('tasks');  // Remove tasks from LocalStorage
}

// Adding an Event Listener for Clear All Tasks button
clearAllButton_885.addEventListener('click', clearAllTasks_885);

// Function to Edit Task
function edit_task_885(task_item_885, taskData) {
    // 1. Prompt User to Edit Title and Description
    let new_title_885 = prompt('Edit Task Title', taskData.title);
    let new_descrip_885 = prompt('Edit Task Description', taskData.description);

    //2. Check if User Entered Valid Data:
    if (new_title_885.trim() !== '' && new_descrip_885.trim() !== '') {

        //3. Update the Task on the Webpage:
        task_item_885.querySelector('.task-title').textContent = new_title_885;
        task_item_885.querySelector('.task-desc').textContent = new_descrip_885;

        // 4. Update the Task Data Object
        taskData.title = new_title_885;
        taskData.description = new_descrip_885;

        // 5. Save the Updated Tasks to LocalStorage
        saveTasksToLocalStorage();
    } else {
        // 6. Handle Invalid Input
        toastr.error("Please enter both a task title and description.");
    }
}

// Function to Toggle Complete Task
function complete_task_885(task_item_885, taskData) {
    // 1. Toggling the 'completed' class
    task_item_885.classList.toggle('completed');

    // 2. Toggling the 'completed' class
    taskData.completed = !taskData.completed; 

    // 3. Saving updated tasks to LocalStorage
    saveTasksToLocalStorage(); 
}

// Function to Delete Task
function delete_task_885(task_item_885, taskData) {
    // 1. Removing the task from the list (UI)
    task_list_885.removeChild(task_item_885);

    // 2. Removing the task from the LocalStorage array:
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.title !== taskData.title);  // Remove the task from array
    
    // 3.Saving the updated tasks back to LocalStorage:
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save updated tasks
}

// Function to Add a Task
function add_task_885() {
    // 1.  Validate User Input
    if (task_title_885.value.trim() === '' || task_descrip_885.value.trim() === '') {
        toastr.error("Please enter the To-Do Name and Description"); // Toast Error if input is empty
        return;
    }

    // 2. Create task object
    const newTask = {
        title: task_title_885.value,
        description: task_descrip_885.value,
        completed: false
    };

    //3. Create Task List Item and Content
    let li = document.createElement('li');
    let task_content_885 = document.createElement('div');
    let task_buttons_885 = document.createElement('div');
    
    task_content_885.innerHTML = `
        <b class="task-title">${newTask.title}</b>
        <p class="task-desc">${newTask.description}</p>
    `;
    
    task_buttons_885.classList.add('buttons'); 

    // 4. Style and Create Buttons for Each Task: Edit, Delete and Complete
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

    // 5. Add Buttons to Task
    task_buttons_885.appendChild(edit_btn_885);    
    task_buttons_885.appendChild(delete_btn_885);
    task_buttons_885.appendChild(complete_btn_885);

    // 6. Append Task Content and Buttons to the List Item
    li.appendChild(task_content_885);
    li.appendChild(task_buttons_885);

    // 7. Append the Task to the Task List
    task_list_885.appendChild(li);

    // 8. Clear input fields
    task_title_885.value = '';
    task_descrip_885.value = '';

    // 9. Save the Tasks to LocalStorage
    saveTasksToLocalStorage();

    // 10. Attach Event Listeners to Task Buttons
    edit_btn_885.addEventListener('click', () => edit_task_885(li, newTask));
    complete_btn_885.addEventListener('click', () => complete_task_885(li, newTask));
    delete_btn_885.addEventListener('click', () => delete_task_885(li, newTask));
}

// 3. Adding a Task: Event Listener for Add Task button
add_task_btn_885.addEventListener('click', add_task_885);

}
