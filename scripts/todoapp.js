

class ToDoClass {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('TASKS'));
        if (!this.tasks) {
            this.tasks = [
                { id: 0, task: task, isComplete: false, date: date },

            ], id = 0;
            ;

        }

        this.loadTasks();
        this.addEventListeners();
    }
    //constructor end


    addEventListeners() {
        document.getElementById('addTask').addEventListener('keyup', event => {
            if (event.key === 'Enter') {
                this.addTask(event.target.value);
                event.target.value = '';
            }
        });
    };


    loadTasks() {

        let tasksHtml = this.tasks.reduce((html, task, index, date) => html +=
            this.generateTaskHtml(task, index, date), '');
        document.getElementById('list').innerHTML = tasksHtml;
        localStorage.setItem('TASKS', JSON.stringify(this.tasks));
    }

    generateTaskHtml(task, index, id) {
        return ` <li>
        <div class="row py-1 px-2 mx-auto">
    
            <div class="col-1">
                <input id="toggleTaskStatus" type="checkbox" onchange="toDo.toggleTaskStatus(${index})" name="completed" class="custom-checkbox" 
                 value="" ${task.isComplete ? 'checked' : ''}>
        
            </div>
    
            <div class="col-9 input-container" onClick="toDo.editTask(event)">
              <input type="text" data-id="${id}" class="${task.isComplete ? 'complete' : ''} mx-0 todo-style" input value="${task.task} ${date.date}" disabled>
                
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
        target.value = "";
    }

    addTask(task) {
        let dueDate = document.getElementById("due-date").value;
        let dateString = JSON.stringify(dueDate);
        let newTask = {
            id: this.id++,
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
            this.addDate();
        }
    }

    //clearTasks() {
    //localStorage.clear();
    //}

    //edit task item
    editTask(event) {

        let taskInput = event.target;

        if (taskInput.disabled == true) {
            taskInput.disabled = !taskInput.disabled;

        }

        taskInput.addEventListener('keyup', event => {
            if (event.key === 'Enter') {

                let newvalue = taskInput.value;
                taskInput.innerHTML = newvalue;
                taskInput.disabled = true;
                // this.tasks.task = newvalue;
                // this.addToLocalStorageArray("TASKS", newvalue);
                saveNewEdit('TASKS', "tasks:", newvalue);
            }
        });
    }

    saveNewEdit(name, key, value) {
        let existing = localStorage.getItem(name);
        existing = existing ? JSON.parse(existing) : {};
        existing[key] = value;
        window.localStorage.setItem(name, JSON.stringify(existing));
    }

    addToLocalStorageArray(name, value) {

        // Get the existing data
        var existing = localStorage.getItem(name);

        // If no existing data, create an array
        // Otherwise, convert the localStorage string to an array
        existing = existing ? existing.split(',') : [];

        // Add new data to localStorage Array
        existing.push(value);

        // Save back to localStorage
        localStorage.setItem(name, existing.toString());
    };

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
//class end

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

