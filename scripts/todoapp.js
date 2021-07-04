class ToDoClass {
    constructor() {
        let data = localStorage.getItem('TASKS');
        this.tasks = []

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
        let tasksHtml = this.tasks.reduce((html, task, index) => html +=
            this.generateTaskHtml(task, index), '');
        document.getElementById('list').innerHTML = tasksHtml;
        localStorage.setItem('TASKS', JSON.stringify(this.tasks));
    }

    generateTaskHtml(task, index) {
        return ` <li>
        <div class="row py-1 px-2 mx-auto">
    
            <div class="col-1">
                <input id="toggleTaskStatus" type="checkbox" onchange="toDo.toggleTaskStatus(${index})" name="completed" class="custom-checkbox" 
                 value="" ${task.isComplete ? 'checked' : ''}>
        
            </div>
    
            <div class="col-6 input-container" onClick="toDo.editTask(event, ${index})">
           <input type="text" data-id="${index}" class="${task.isComplete ? 'complete' : ''} mx-0 todo-style" input value="${task.task}" disabled>                  
           
              </div>
              
              <div class="col-2 button-container">    
               
              <input type="date" data-id="${index}" name="due-date" class="date-pick form-control" input value="" disabled> 
              <button class="date-button button-style-list ${task.hasDate ? 'hide' : ''}" onClick="toDo.addDueDate(event, ${index})">&#xf073</button>     
              
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
        let newTask = {
            task: task,
            isComplete: false,
            hasDate: false,
            date: date,
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

    clearTasks() {
        localStorage.clear();
        location.reload();
    }


    //select duedate
    addDueDate(event, index) {
        let dateButton = event.target;
        let datePicker = dateButton.previousElementSibling;

        datePicker.style.display = "inline-block";
        dateButton.style.display = "none";

        if (datePicker.disabled == true) {
            datePicker.disabled = !datePicker.disabled;
        }

        datePicker.addEventListener('keyup', event => {
            if (event.key === 'Enter') {

                let dateString = datePicker.value;
                let dateObject = new Date(dateString);

                //convert date
                const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(dateObject)
                const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(dateObject)
                const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(dateObject)

                console.log(`${da} ${mo} ${ye}`);
                let dueDate = `${da} ${mo} ${ye}`;

                datePicker.style.display = "none";

                //add date to array                   
                let taskValue = this.tasks[index].task;
                this.tasks[index].task = taskValue + "  " + " " + "&#xf073" + " " + dueDate;
                this.tasks[index].date = dateString;
                this.tasks[index].hasDate = !this.tasks[index].hasDate;
                console.log(this.tasks);
                localStorage.setItem('TASKS', JSON.stringify(this.tasks));
                this.loadTasks();
                dateButton.style.display = "none";
            }

        })

    }

    //edit task item
    editTask(event, index) {

        let taskInput = event.target; //input container

        if (taskInput.disabled == true) {
            taskInput.disabled = !taskInput.disabled;

        }

        taskInput.addEventListener('keyup', event => {

            if (event.key === 'Enter') {

                let newValue = event.target.value;
                taskInput.innerHTML = newValue;
                taskInput.disabled = true;

                this.tasks[index].task = newValue;

                console.log(this.tasks);
                localStorage.setItem('TASKS', JSON.stringify(this.tasks));
                this.loadTasks();

            }
        });
    }

    //sort alphabetically
    sortAlphabetically() {

        this.tasks.sort((a, b) => a.task.localeCompare(b.task));
        if (this.tasks.hasDate == true) { this.tasks.sort((a, b) => a.date.localeCompare(b.date)) };
        console.log(this.tasks);
        this.loadTasks();
    }
}
//class end

//instantiation
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

// function addDate() {
//    let dueDate = document.getElementById("due-date").value;
//    dateString = JSON.stringify(dueDate);
//    document.querySelector(".todo-style").innerHTML = "<br>" + dateString;


// }

// document.getElementById("due-date").addEventListener('keyup', event => {

//     if (event.key === 'Enter'){
//         addDate();
//         toDo.addTaskClick();
//     }
// });
 //let dueDate = document.getElementById("due-date").value;
 //let dateObject = Date();
 //JSON.stringify(dateObject)
