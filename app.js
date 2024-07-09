class TaskManager {
    constructor() {
      // Загружаем задачи из localStorage или создаем пустой массив
      this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      this.taskForm = document.getElementById('task-form');
      this.taskInput = document.getElementById('task-input');
      this.taskList = document.getElementById('task-list');
      this.filterAll = document.getElementById('filter-all');
      this.filterCompleted = document.getElementById('filter-completed');
      this.filterIncomplete = document.getElementById('filter-incomplete');
  
      this.taskForm.addEventListener('submit', this.addTask.bind(this));
      this.filterAll.addEventListener('click', () => this.filterTasks('all'));
      this.filterCompleted.addEventListener('click', () => this.filterTasks('completed'));
      this.filterIncomplete.addEventListener('click', () => this.filterTasks('incomplete'));
  
      this.taskList.addEventListener('click', this.toggleTask.bind(this));
  
      this.renderTasks();
    }
  
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  
    renderTasks(tasks = this.tasks) {
      this.taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) {
          li.classList.add('completed');
        }
        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('actions');
        const editButton = document.createElement('button');
        editButton.textContent = 'Редактировать';
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        actionsDiv.appendChild(editButton);
        actionsDiv.appendChild(deleteButton);
        li.appendChild(actionsDiv);
        this.taskList.appendChild(li);
  
        editButton.addEventListener('click', () => this.editTask(index));
        deleteButton.addEventListener('click', () => this.deleteTask(index));
      });
    }
  
    addTask(event) {
      event.preventDefault();
      const taskText = this.taskInput.value.trim();
      if (taskText !== '') {
        this.tasks.push({ text: taskText, completed: false });
        this.saveTasks();
        this.renderTasks();
        this.taskInput.value = '';
      }
    }
  
    editTask(index) {
      const newText = prompt('Редактировать задачу:', this.tasks[index].text);
      if (newText !== null) {
        this.tasks[index].text = newText;
        this.saveTasks();
        this.renderTasks();
      }
    }
  
    deleteTask(index) {
      this.tasks.splice(index, 1);
      this.saveTasks();
      this.renderTasks();
    }
  
    toggleTask(event) {
      if (event.target.tagName === 'LI') {
        const index = Array.from(this.taskList.children).indexOf(event.target);
        this.tasks[index].completed = !this.tasks[index].completed;
        this.saveTasks();
        this.renderTasks();
      }
    }
  
    filterTasks(filterType) {
      // Снимаем активный класс со всех кнопок фильтра перед применением нового фильтра
      document.querySelectorAll('.filter').forEach(btn => btn.classList.remove('active'));

      let filteredTasks = [];
      if (filterType === 'completed') {
        filteredTasks = this.tasks.filter(task => task.completed);
        this.filterCompleted.classList.add('active');
      } else if (filterType === 'incomplete') {
        filteredTasks = this.tasks.filter(task => !task.completed);
        this.filterIncomplete.classList.add('active');
      } else {
        filteredTasks = this.tasks;
        this.filterAll.classList.add('active');
      }
      this.renderTasks(filteredTasks); // Передаем отфильтрованный список для отображения
    }
  }
  
  const taskManager = new TaskManager();
