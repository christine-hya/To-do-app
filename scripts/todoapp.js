
class ToDoClass {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('TASKS'));
        if (!this.tasks) {
            this.tasks = [
                { task: 'Practise violin', isComplete: false, date: date },
                { task: 'Feed the cat', isComplete: true, date: date },
            ];
        }

        this.loadTasks();
        this.addEventListeners();
        //this.updateNewTask();
    }

    addEventListeners() {
        document.getElementById('addTask').addEventListener('keyup', event => {
            if (event.key === 'Enter') {
                this.addTask(event.target.value);
                event.target.value = '';
            }
        });
    }

    loadTasks() {
        let tasksHtml = this.tasks.reduce((html, task, index) => html +=
            this.generateTaskHtml(task, index, date), '');
        document.getElementById('list').innerHTML = tasksHtml;
        localStorage.setItem('TASKS', JSON.stringify(this.tasks));
    }

    generateTaskHtml(task, index, date) {
        return ` <li>
        <div class="row py-1 px-2 mx-auto">
    
            <div class="col-1">
                <input id="toggleTaskStatus" type="checkbox" onchange="toDo.toggleTaskStatus(${index})" name="completed" class="custom-checkbox" 
                 value="" ${task.isComplete ? 'checked' : ''}>
        
            </div>
    
            <div class="col-8">
                <input type="text" id="taskDisplay" class="${task.isComplete ? 'complete' : ''} mx-0 todo-style" input value="${task.task} ${date.date}" disabled>
                <input type="text" placeholder="${task.task}" id="editTaskField" class="hide">
            </div>
    
            <div class="col-1 ps-0">
            <button id="edit-button" data-id="${index}" class="button-style-list" onClick="toDo.editTask()";><i class="far fa-edit"></i> </button>

        </div>
           
    
            <div class="col-2 ps-0">
                <button class="button-style-list" onClick="toDo.deleteTask(event, ${index})">
                <i id="deleteTask" data-id="${index}" class="far fa-trash-alt"></i>
                </button>
            </div>
    </li> `

    }

    //complete or incomplete
    toggleTaskStatus(index) {
        this.tasks[index].isComplete = !this.tasks[index].isComplete;
        this.loadTasks();
    }

    //delete
    deleteTask(event, taskIndex) {
        event.preventDefault();
        this.tasks.splice(taskIndex, 1);
        this.loadTasks();
    }

    //add tasks
    addTaskClick() {
        let target = document.getElementById('addTask');
        this.addTask(target.value);
        target.value = ""
    }

    addTask(task) {
        let dueDate = document.getElementById("due-date").value;
        let dateString = dueDate.toString();
        let newTask = {
            task,
            isComplete: false,
            date: dateString
        };
        let addWarning = document.getElementById('addTask');
        if (task === '') {
            addWarning.classList.add('border');
            addWarning.classList.add('border-danger');
            addWarning.classList.add('border-4');
        } else {
            addWarning.classList.remove('border');
            addWarning.classList.remove('border-danger');
            addWarning.classList.remove('border-4');
            this.tasks.push(newTask);
            this.loadTasks();
        }
    }

    //clearTasks() {
    //localStorage.clear();
    //}

    //edit task item

    editTask() {

        let taskInput = document.getElementById("taskDisplay");
        let name = taskInput.value;

        if (taskInput.disabled == true) {
            taskInput.disabled = !taskInput.disabled;
        }
        else {
            taskInput.disabled = !taskInput.disabled;
            let indexof = this.tasks.indexOf(name);
            this.tasks[indexof] = taskInput.value;

            this.loadTasks();
        }

    }

    //sort alphabetically
    sortAlphabetically() {
        let sortedTodos = this.tasks.map(el => this.tasks[el.index]);
        this.loadTasks(sortedTodos);
        return this.tasks
            .sort((a, b) => {
                if (a.value > b.value) { return 1; }
                if (a.value < b.value) { return -1 }
                return 0;
            })

    }

}

let toDo;
window.addEventListener("load", function () {
    toDo = new ToDoClass();
    console.log(toDo.tasks);
});

//display today's date
const dateElement = document.getElementById("date");
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-GB", options);

