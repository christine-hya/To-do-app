class ToDoClass {
    constructor() {
        let data = localStorage.getItem('TASKS');
        this.tasks = [];

        if (!data) {
            const p = document.createElement('p')
            p.textContent = 'Nothing to do! Add a task?'
            document.getElementById('list').append(p);
        }

        else {
            this.tasks = JSON.parse(localStorage.getItem('TASKS'));
            this.loadTasks();
        }

        this.addEventListeners();
    }

    addEventListeners() {
        document.getElementById('addTask').addEventListener('keyup', event => {
            if (event.key === 'Enter') {
                this.addTask(event.target.value);
                event.target.value = '';
            }
        });
    };

    loadTasks() {
        let tasksHtml = this.tasks.reduce((html, task, index) => html +=
            this.generateTaskHtml(task, index), '');
        document.getElementById('list').innerHTML = tasksHtml;
        localStorage.setItem('TASKS', JSON.stringify(this.tasks));
    }

    generateTaskHtml(task, index) {
        return ` <li>
        
        <div class="row mx-auto">
    
            <div class="col-1 my-auto">
                <input id="toggleTaskStatus" type="checkbox" onchange="toDo.toggleTaskStatus(${index})" name="completed" class="custom-checkbox" value="" ${task.isComplete ? 'checked' : ''}>       
            </div>
    
            <div class="col-7 my-auto" onClick="toDo.editTask(event, ${index})">
               <input type="text" data-id="${index}" class="${task.isComplete ? 'complete' : ''} mx-0 todo-style form-control-sm float-start" input value="${task.task}" disabled>                            
            </div>
              
              <div class="col-2 my-auto">                   
               <input type="date" data-id="${index}" name="due-date" class="date-picker form-control-sm" disabled> 
               <button class="button-style-list ${task.hasDate ? 'hide' : ''}" onClick="toDo.addDueDate(event, ${index})">&#xf073</button>                   
            </div>
   
            <div class="col-2 ps-0 my-auto">
              <button class="button-style-list" onClick="toDo.deleteTask(event, ${index})">
              <i id="deleteTask" data-id="${index}" class="far fa-trash-alt"></i>
              </button>
            </div>

    </li> `
    }

    toggleTaskStatus(index) {
        this.tasks[index].isComplete = !this.tasks[index].isComplete;
        this.loadTasks();
    }

    deleteTask(event, taskIndex) {
        event.preventDefault();
        this.tasks.splice(taskIndex, 1);
        this.loadTasks();
    }

    addTaskClick() {
        let target = document.getElementById('addTask');
        this.addTask(target.value);
        target.value = "";
    }

    addTask(task) {
        let newTask = {
            task: task,
            isComplete: false,
            hasDate: false,
            date: date,
        }

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

    clearTasks() {
        localStorage.clear();
        location.reload();
    }


    addDueDate(event, index) {
        let dateButton = event.target;
        let datePicker = dateButton.previousElementSibling;

        datePicker.style.display = 'inline-block';
        dateButton.style.display =  'none';

            if (datePicker.disabled == true) {
                datePicker.disabled = !datePicker.disabled;
            }

        datePicker.addEventListener('keyup', event => {

            if (event.key === 'Enter') {

                let dateString = datePicker.value;
                let dateObject = new Date(dateString);

                //convert date
                const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(dateObject);
                const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(dateObject);

                let dueDate = `${da} ${mo}`;

                datePicker.style.display = 'none';

                //add date to array to display next to task                   
                let taskValue = this.tasks[index].task;
                this.tasks[index].task = taskValue + "  " + " " + "&#xf073" + " " + dueDate;
                
                //add date to array for sort function
                this.tasks[index].date = dateString;
                
                //true/false value to hide date button
                this.tasks[index].hasDate = !this.tasks[index].hasDate;
                localStorage.setItem('TASKS', JSON.stringify(this.tasks));
                this.loadTasks();
                dateButton.style.display = 'none';
            }
        })
    }

    editTask(event, index) {

        let taskInput = event.target;

            if (taskInput.disabled == true) {
                taskInput.disabled = !taskInput.disabled;
            }

        taskInput.addEventListener('keyup', event => {

            if (event.key === 'Enter') {

                let newValue = event.target.value;
                taskInput.innerHTML = newValue;
                taskInput.disabled = true;
                this.tasks[index].task = newValue;
                localStorage.setItem('TASKS', JSON.stringify(this.tasks));
                this.loadTasks();
            }
        });
    }


    sortByDateandABC() {
        if (this.tasks.hasDate == true) { this.tasks.sort((a, b) => a.date.localeCompare(b.date)); }
        else if (!this.tasks.hasDate){ 
            this.tasks.sort((a, b) => a.task.localeCompare(b.task));
         }   
        this.loadTasks();
    }  
}


//instantiation of ToDoClass
let toDo;
window.addEventListener("load", function () {
    toDo = new ToDoClass();
});

//display today's date
const dateElement = document.getElementById("date");
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-GB", options);

