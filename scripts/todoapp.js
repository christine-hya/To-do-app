

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
    
            <div class="col-8 input-container" onClick="toDo.editTask(event, ${undefined})">
              <input type="text" data-id="${id}" class="${task.isComplete ? 'complete' : ''} mx-0 todo-style" input value="${task.task}" disabled>
                
            </div>

              
            <div class="col-2 ps-0">
                <button class="button-style-list" onClick="toDo.editTask(event, ${index})">
                edit
                </button>
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

    clearTasks() {
       localStorage.clear();
       location. reload();
    }

    //edit task item
    editTask(event, index) {

        let taskInput = event.target;

        let _data; 

        // Copy the current to do tasks into the private _data array
        if (index !== undefined) {

            _data = this.tasks; 

            _data[index] = taskInput.innerHTML; 
    
            // Step 3 Write the contents of _data to loccal storage 

            localStorage.setItem('TASKS', JSON.stringify(_data));

    
            // Force load tasks 
    
            // loadTasks 

        }
        

        if (taskInput.disabled == true) {
            taskInput.disabled = !taskInput.disabled;

        }

        taskInput.addEventListener('keyup', event => {
            if (event.key === 'Enter') {

                let newValue = event.target.value;
                taskInput.innerHTML = newValue;
                taskInput.disabled = true;
                // this.tasks.task = newvalue;
                // this.addToLocalStorageArray("TASKS", newvalue);

                let editedTask = {
                    // id: this.id++,
                     task: `${newValue}`,
                     isComplete: false,
                     date: date
                 }

            //    this.tasks.push(editedTask);
               localStorage.setItem('TASKS', JSON.stringify(this.tasks));

               //load tasks call 
              


               //JSON.stringify(localStorage.setItem("TASKS", `${newvaluestring}`));
             
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

//function addDate() {
   // let dueDate = document.getElementById("due-date").value;
    
//}

