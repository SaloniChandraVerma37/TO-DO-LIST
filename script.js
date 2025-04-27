// Select elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const clearAllBtn = document.getElementById('clear-all-btn');
const darkModeToggle = document.getElementById('dark-mode-toggle');

// Load tasks from local storage
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task
addTaskBtn.addEventListener('click', addTask);

// Enter key to add task
taskInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    addTask();
  }
});

// Clear all tasks
clearAllBtn.addEventListener('click', function() {
  if (confirm('Are you sure you want to clear all tasks?')) {
    taskList.innerHTML = '';
    saveTasks();
  }
});

// Dark mode toggle
darkModeToggle.addEventListener('click', function() {
  document.body.classList.toggle('dark');
  saveDarkMode();
});

// Add task function
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  const li = createTaskElement(taskText);

  taskList.appendChild(li);
  taskInput.value = '';

  saveTasks();
}

// Create task element
function createTaskElement(taskText) {
  const li = document.createElement('li');
  li.innerHTML = `
    ${taskText}
    <button class="delete-btn">X</button>
  `;

  li.addEventListener('click', function(e) {
    if (e.target.tagName !== 'BUTTON') {
      li.classList.toggle('completed');
      saveTasks();
    }
  });

  li.querySelector('.delete-btn').addEventListener('click', function() {
    li.remove();
    saveTasks();
  });

  return li;
}

// Save tasks to local storage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#task-list li').forEach(li => {
    tasks.push({
      text: li.firstChild.textContent.trim(),
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    const li = createTaskElement(task.text);
    if (task.completed) {
      li.classList.add('completed');
    }
    taskList.appendChild(li);
  });

  // Load dark mode preference
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark');
  }
}

// Save dark mode preference
function saveDarkMode() {
  if (document.body.classList.contains('dark')) {
    localStorage.setItem('darkMode', 'enabled');
  } else {
    localStorage.setItem('darkMode', 'disabled');
  }
}
