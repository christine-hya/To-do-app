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
    
            <div class="col-8 input-container" onClick="toDo.editTask(event, ${index})">
           <input type="text" data-id="${index}" class="${task.isComplete ? 'complete' : ''} mx-0 todo-style" input value="${task.task}" disabled>
           <input type="date" data-id="${index}" name="due-date" class="date-pick form-control" disabled> 
           <button class="hide-date-button" onClick="toDo.addDueDate(event, ${index})">add date</button>
           
              </div>
              
              <div class="col-1" >            
              
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
        //let duedate = document.getElementById("due-date").innerHTML; 
        //let newDueDate = JSON.stringify(new Date (duedate));
        let newTask = {
            task: task,
            isComplete: false        
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
   addDueDate(event) {
    let dateButton = event.target;
    let datePicker = dateButton.previousElementSibling;
    console.log(datePicker);
    datePicker.style.display = "inline-block";
    dateButton.style.display = "none";

    let addInput = datePicker.previousElementSibling;
    console.log(addInput);
    const previousValue = addInput.value;
    
    // let parentN = dateInput.parentNode;
    // let closestP = dateInput.previousSibling;
    // console.log(parentN)
    // console.log(closestP)

    if (datePicker.disabled == true) {
        datePicker.disabled = !datePicker.disabled;
        console.log(previousValue);
    }

    datePicker.addEventListener('keyup', event => {
        if (event.key === 'Enter') {
            //let newDueDate = JSON.stringify(new Date (event.target.value)); //object for array
            console.log(previousValue);
            console.log(typeof previousValue);

           // let dateString = datePicker.value; //string value
            console.log(dateString);
            console.log(typeof dateString);

            //convert date

            let dateAndTask = previousValue.concat(dateString);
            console.log(dateAndTask);
            console.log(typeof dateAndTask);

            //let newaddInput = datePicker.previousElementSibling;
            
            //newaddInput.innerHTML += previousValue + "Duedate:" + "<br>"  + dateString;
                               
            datePicker.style.display = "none";
            //let e = document.createElement("span");
           // e.innerHTML = dateString;

            
                            
            //add date object to array
            //this.tasks[index].task = dateAndTask;
            console.log(this.tasks);
            //localStorage.setItem('TASKS', JSON.stringify(this.tasks));
           // this.loadTasks();
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

        this.tasks.sort((a, b) => a.task.localeCompare(b.task))
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
