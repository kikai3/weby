const createTaskSaveBTN = document.querySelector('#createTaskSaveBTN').addEventListener('click', (event) => {
    event.preventDefault();

    const CreateTaskName = document.querySelector('#CreateTaskName').value;
    const CreateTaskDescription = document.querySelector('#CreateTaskDescription').value;

    const taskData = {
        taskName: CreateTaskName,
        taskDescription: CreateTaskDescription,
    };

    fetch('http://localhost:3000/create-task', { // Use HTTP for localhost
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);

        // Properly close the Bootstrap modal
        const modalElement = document.getElementById('CreateTaskModal');
        const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        modal.hide();
    })
    .catch(error => console.error('Error:', error));
});

const UpdateTaskBTN = document.querySelector('#UpdateTaskBTN').addEventListener('click', (event)=>{
event.preventDefault();

const UpdateTaskID = document.querySelector('#UpdateTaskID').value;
const UpdateTaskName = document.querySelector('#UpdateTaskName').value;
const UpdateTaskDescription = document.querySelector('#UpdateTaskDescription').value;

const taskData = {
    taskName: UpdateTaskName,
    taskDescription: UpdateTaskDescription,
}

fetch(`http://localhost:3000/update-task/${UpdateTaskID}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData)
})
.then(response => response.json())
    .then(data => {
        alert(data.message);

        // Properly close the Bootstrap modal
        const modalElement = document.getElementById('UpdateTaskModal');
        const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        modal.hide();
    })
    .catch(error => console.error('Error:', error));
});

const DeleteTaskBTN = document.querySelector('#DeleteTaskBTN').addEventListener('click', (event) => {
event.preventDefault();

const DeleteTaskID = document.querySelector('#DeleteTaskID').value;

fetch(`http://localhost:3000/delete-task/${DeleteTaskID}`, {
    method: 'DELETE',
})
.then(response => response.json())
.then(data => {
    alert(data.message);
    const modalElement = document.getElementById('DeleteTaskModal');
        const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        modal.hide();
})
.catch(error => console.error('Error', error));
});

const ViewTaskBTN = document.querySelector('#ViewTaskBTN').addEventListener('click', (event) => {
    event.preventDefault();

    const ViewTaskID = document.querySelector('#ViewTaskID').value;

    fetch(`http://localhost:3000/view-task/${ViewTaskID}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        const taskCreatedDate = new Date(data.taskCreatedTime);
        const formattedDateTime = taskCreatedDate.toISOString().slice(0, 16).replace('T', ' '); // Converts to 'YYYY-MM-DD HH:MM'
        
        const viewInformation = document.querySelector('#ViewInformation');
        
        // Populate the ViewInformation div with task details, including IDs
        viewInformation.innerHTML = `
            <p style="color:black; text-align: left"><strong>Task ID:</strong> <span id="currentTaskID">${data.taskID}</span></p>
            <p style="color:black; text-align: left"><strong>Title:</strong> <span id="currentTaskName"> ${data.taskName}</span></p>
            <p style="color:black; text-align: left"><strong>Description:</strong> <span id="currentTaskDescription">${data.taskDescription}</span></p>
            <p style="color:black; text-align: left"><strong>Task Created:</strong> <span id="currentTaskCreatedTime">${formattedDateTime}</span></p>
        `;

        const viewModal = bootstrap.Modal.getInstance(document.querySelector('#ViewTaskModal'));
        if (viewModal) viewModal.hide();

        const viewTaskModalExtension = new bootstrap.Modal(document.getElementById('ViewTaskModalExtension'));
        viewTaskModalExtension.show();
    })
    .catch(error => {
        console.error('Error fetching task:', error);
        alert("Failed to load task details.");
    });
});


const viewAllTasks = () => {
    fetch('http://localhost:3000/view-all-tasks', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        const ColumnForAllCurrentTask = document.querySelector('#ColumnForAllCurrentTask');
        ColumnForAllCurrentTask.innerHTML = '';  // Clear container to avoid duplicate entries

        data.forEach(task => {
            let formattedDate = 'No information available';
            let formattedTime = 'No information available';

            if (task.taskCreatedTime) {
                const taskCreatedTime = new Date(task.taskCreatedTime);
                if (!isNaN(taskCreatedTime)) {  // Check if date is valid
                    formattedDate = taskCreatedTime.toISOString().slice(0, 10); // Get "YYYY-MM-DD"
                    formattedTime = taskCreatedTime.toTimeString().slice(0, 5);  // Get "HH:MM"
                }
            }

            ColumnForAllCurrentTask.innerHTML += `
                <div class="card mb-4 shadow-sm">
                    <div class="card-body">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-0">${task.taskName}</h5>
                            <small class="text-muted">${formattedDate} ${formattedTime}</small>
                        </div>
                        <p class="card-text">Task ID: ${task.taskID}</p> <!-- Displaying Task ID -->
                        <p class="card-text">Task Description: ${task.taskDescription}</p>
                        <p class="card-text">Task Created: ${formattedDate} ${formattedTime}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#UpdateTaskModal" onclick="updateTask(${task.taskID}, '${task.taskName}', '${task.taskDescription}')">Edit</button>
                                <button type="button" class="btn btn-sm btn-outline-danger" onclick="deleteTask(${task.taskID})">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
    })
    .catch(error => console.error('Error:', error));
};
const deleteTask = (taskID) => {
    // Confirm deletion
    const confirmDelete = confirm('Are you sure you want to delete this task?');

    if (confirmDelete) {
        fetch(`http://localhost:3000/delete-task/${taskID}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            viewAllTasks(); // Refresh the task list after deletion
        })
        .catch(error => console.error('Error:', error));
    }
};

document.addEventListener('DOMContentLoaded', viewAllTasks);

// This function marks a task as done
const markAsDoneBTN = document.querySelector('#markAsDoneBTN').addEventListener('click', () => {
    const finishedTaskName = document.querySelector('#currentTaskName').innerText.trim();
    const finishedTaskDescription = document.querySelector('#currentTaskDescription').innerText.trim();
    const finishedCreatedTime = document.querySelector('#currentTaskCreatedTime').innerText.trim();
    const taskID = document.querySelector('#currentTaskID').innerText.trim(); // Added this line
    
    console.log('Task Name:', finishedTaskName, 'Description:', finishedTaskDescription, 'Created time:', finishedCreatedTime); // Debugging log
    
    if (!finishedTaskName || !finishedTaskDescription || !finishedCreatedTime) {
        console.error("One or more fields are empty");
        return;
    }
    
    fetch('http://localhost:3000/add-finished-task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ finishedTaskName, finishedTaskDescription, finishedCreatedTime })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Task marked as finished') {
            console.log(data.message);
    
            // Delete task from queue after marked as finished
            fetch(`http://localhost:3000/delete-finished-task/${taskID}`, {
                method: 'DELETE',
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                viewAllTasks(); 
                fetchFinishedTasks();
            })
            .catch(error => console.error('Error:', error));
    
            // Hide the modal after marking the task as done
            const viewTaskModalExtension = bootstrap.Modal.getInstance(document.getElementById('ViewTaskModalExtension'));
            viewTaskModalExtension.hide();
        } else {
            console.error('Failed to mark task as done:', data.message);
        }
    })    
    .catch(error => console.error('Error:', error));
});

// Fetch and display all finished tasks in #ColumnForAllTaskMarkedFinish
const fetchFinishedTasks = () => {
    fetch('http://localhost:3000/view-all-finished-tasks', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Finished tasks data:', data); // Log the fetched data

        const finishedTasksContainer = document.querySelector('#ColumnForAllTaskMarkedFinish');
        finishedTasksContainer.innerHTML = ''; // Clear previous tasks

        if (data.message) {
            console.log(data.message); // Log any error messages
            finishedTasksContainer.innerHTML = `<p>${data.message}</p>`;
            return;
        }

        data.forEach(task => {
            // Format the created time and marked done time
            const createdTime = new Date(task.finishedTaskCreatedTime);
            const markedDoneTime = new Date(task.finishedTaskMarkedDone);

            // Format the date to "YYYY-MM-DD HH:MM"
            const formattedCreatedTime = createdTime.toISOString().slice(0, 19).replace('T', ' ');
            const formattedMarkedDoneTime = markedDoneTime.toISOString().slice(0, 19).replace('T', ' ');

            const taskElement = document.createElement('div');
            taskElement.className = 'card mb-3 shadow-sm'; // Use Bootstrap card styles
            taskElement.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title"> ${task.finishedTaskName}</h5>
                    <p class="card-text">Finished Task ID: ${task.finishedTaskID}</p>
                    <p class="card-text">Description:</strong> ${task.finishedTaskDescription}</p>
                    <p class="card-text">Task Created:</strong> ${formattedCreatedTime}</p>
                    <p class="card-text">Marked Done:</strong> ${formattedMarkedDoneTime}</p>
                </div>
            `;
            finishedTasksContainer.appendChild(taskElement);
        });
    })
    .catch(error => console.error('Error fetching finished tasks:', error));
};

document.addEventListener('DOMContentLoaded', () => {
    fetchFinishedTasks(); // Call this to load finished tasks on page load
});



