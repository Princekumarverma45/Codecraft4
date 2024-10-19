const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskTime = document.getElementById('task-time');
const taskList = document.getElementById('task-list');

let tasks = [];

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addTask(taskInput.value, taskTime.value);
  taskInput.value = '';
  taskTime.value = '';
});

function addTask(description, dueTime) {
  const task = {
    id: Date.now(),
    description,
    dueTime,
    completed: false
  };

  tasks.push(task);
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.classList.add(task.completed ? 'completed' : '');

    const taskText = document.createElement('span');
    taskText.innerText = `${task.description} (Due: ${new Date(task.dueTime).toLocaleString()})`;

    const completeButton = document.createElement('button');
    completeButton.innerText = 'Mark as Done';
    completeButton.classList.add('completed-btn');
    completeButton.addEventListener('click', () => {
      toggleCompleteTask(task.id);
    });

    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.classList.add('edit-btn');
    editButton.addEventListener('click', () => {
      editTask(task.id);
    });

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', () => {
      deleteTask(task.id);
    });

    li.append(taskText, completeButton, editButton, deleteButton);
    taskList.appendChild(li);
  });
}

function toggleCompleteTask(id) {
  tasks = tasks.map((task) => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });
  renderTasks();
}

function editTask(id) {
  const taskToEdit = tasks.find((task) => task.id === id);
  taskInput.value = taskToEdit.description;
  taskTime.value = taskToEdit.dueTime;

  deleteTask(id);
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}
