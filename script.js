// Handle time filter buttons
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        button.classList.add('active');
        // Logic for switching between Day, Week, Month can be added here
    });
});

// Create the Chart.js bar chart

const ctx = document.getElementById('taskChart').getContext('2d');
const taskChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [{
            label: 'In Progress',
            data: [3, 2, 1, 4, 5, 2, 3],
            backgroundColor: '#a4d68f'
        }, {
            label: 'In Review',
            data: [1, 3, 2, 5, 3, 2, 4],
            backgroundColor: '#b3b3b3'
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Date picker interaction
document.querySelector('.date-picker').addEventListener('change', (event) => {
    const selectedDate = event.target.value;
    console.log('Selected Date:', selectedDate);
});

// Select elements
const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task');
const addTaskBtn = document.getElementById('add-task-btn');
const clearTaskBtn = document.getElementById('clear-task-btn'); // Clear All button
const errorMessage = document.getElementById('error-message');

// Function to add a task
function addTask(task) {
    const taskItem = document.createElement('li');
    taskItem.textContent = task;

    // Toggle completed class on click
    taskItem.onclick = () => {
        taskItem.classList.toggle('completed');
    };

    // Create a remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = '❌';
    removeBtn.classList.add('remove-btn');

    // Remove task when the remove button is clicked
    removeBtn.onclick = (event) => {
        event.stopPropagation(); // Prevent triggering the task click event
        taskList.removeChild(taskItem); // Remove the task item
    };

    taskItem.appendChild(removeBtn); // Append the remove button to the task item
    taskList.appendChild(taskItem);  // Add the task item to the task list
}

// Add task button event listener
addTaskBtn.addEventListener('click', () => {
    const newTask = newTaskInput.value.trim(); // Get the input and trim whitespace

    if (newTask) {
        addTask(newTask);
        newTaskInput.value = '';  // Clear the input field
        errorMessage.style.display = 'none';  // Hide any error message
    } else {
        errorMessage.textContent = 'Please enter a valid task';  // Display an error
        errorMessage.style.display = 'block'; // Show error message
    }
});

// Clear all tasks event listener
clearTaskBtn.addEventListener('click', () => {
    taskList.innerHTML = '';  // Clear all tasks
});



// Select elements

const toggleViewBtn = document.getElementById('toggle-view-btn');
const homeBtn = document.getElementById('home-btn');
const taskScheduleBtn = document.getElementById('task-schedule-btn');
const taskManagerBtn = document.getElementById('task-manager-btn');

// Select sections
const taskOverview = document.querySelector('.task-overview');
const taskSchedule = document.querySelector('.task-schedule');
const homeSection = document.querySelector('.home');

// Initially show task schedule and hide task overview
taskOverview.classList.add('hidden'); // Hide Task Overview initially

// Function to switch views
function switchTo(view) {
    taskOverview.classList.add('hidden');
    taskSchedule.classList.add('hidden');
    homeSection.classList.add('hidden'); // Hide Home section initially

    if (view === 'home') {
        homeSection.classList.remove('hidden'); // Show Home section
        toggleViewBtn.style.display = 'none'; // Hide the toggle button
    } else if (view === 'taskSchedule') {
        taskSchedule.classList.remove('hidden'); // Show Task Schedule
        toggleViewBtn.style.display = 'none'; // Hide the toggle button
    } else if (view === 'taskManager') {
        taskOverview.classList.remove('hidden'); // Show Task Overview
        toggleViewBtn.style.display = 'block'; // Show the toggle button
    }
}


// Update button listeners
homeBtn.addEventListener('click', () => switchTo('home'));
taskScheduleBtn.addEventListener('click', () => switchTo('taskSchedule'));
taskManagerBtn.addEventListener('click', () => switchTo('taskManager'));


// Call the function to render the calendar when the page loads



function renderCalendar() {
    const calendarBody = document.querySelector('.calendar-body');
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();

    // Clear previous days
    calendarBody.innerHTML = '';

    // Get the first day of the month (0 = Sunday, 6 = Saturday)
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    // Add empty divs for days before the first day
    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement('div');
        calendarBody.appendChild(emptyDiv); // Empty spaces for days before the first day
    }

    // Add days of the month
    for (let day = 1; day <= totalDays; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('calendar-day-item');
        dayDiv.textContent = day;

        // Optional: add click event to show tasks for that day
        dayDiv.onclick = () => {
            alert(`Tasks for ${day}/${month + 1}/${year}`);
        };

        calendarBody.appendChild(dayDiv);
    }
}

// Call the function to render the calendar when the page loads
document.addEventListener('DOMContentLoaded', renderCalendar);
