class ToDoClass {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('TASKS'));
        if (!this.tasks) {
            this.tasks = [
                { task: 'Practise violin', isComplete: false },
                { task: 'Feed the cat', isComplete: true },
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
            this.generateTaskHtml(task, index), '');
        document.getElementById('list').innerHTML = tasksHtml;
        localStorage.setItem('TASKS', JSON.stringify(this.tasks));
    }

    generateTaskHtml(task, index) {
        return ` <li>
        <div class="row py-1 mx-auto">
    
            <div class="col-2">
                <input id="toggleTaskStatus" type="checkbox" onchange="toDo.toggleTaskStatus(${index})" name="completed" class="custom-checkbox" 
                 value="" ${task.isComplete ? 'checked' : ''}>
        
            </div>
    
            <div class="col-8">
                <p id="taskDisplay" class="${task.isComplete ? 'complete' : ''} replace-with-edit"> ${task.task}</p>
                <input type="text" placeholder="${task.task}" id="editTaskField" class="hide">
            </div>
    
            <div class="col-1">
            <button id="edit-button" class="button-style" onClick="toDo.editTask()";><i class="far fa-edit"></i> </button>
        </div>
           
    
            <div class="col-1">
                <button class="button-style" onClick="toDo.deleteTask(event, ${index})">
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

    //add tasks
    addTaskClick() {
        let target = document.getElementById('addTask');
        this.addTask(target.value);
        target.value = ""
    }

    //edit item

   

    addTask(task) {
        let newTask = {
            task,
            isComplete: false,
        };
        let addWarning = document.getElementById('addTask');
        if (task === '') {
            addWarning.classList.add('border');
            addWarning.classList.add('border-danger');
        } else {
            addWarning.classList.remove('border');
            addWarning.classList.remove('border-danger');
            this.tasks.push(newTask);
            this.loadTasks();
        }
    }

    //clearTasks() {
    //localStorage.clear();
    //}
    editTask() {
        
            document.getElementById("editTaskField").style.display = "block"; 
            document.getElementById("taskDisplay").style.display = "none";
            this.updateNewTask();
            
            
        } 
        
        updateNewTask() {
           let newValue = document.getElementById("editTaskField").value;
            document.getElementById("editTaskField").addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {                   
                    toDo.tasks.push(newValue);
                    toDo.loadTasks();
                }

                })

            }
        
    }




let toDo;
window.addEventListener("load", function () {
    toDo = new ToDoClass();
});

