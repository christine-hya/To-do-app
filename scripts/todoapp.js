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
                <p class="${task.isComplete ? 'complete' : ''}"> ${task.task}</p>
            </div>
    
            <div class="col-1" onClick="toDo.editTask()">
            <a class="edit" href="/"><i class="far fa-edit"></i> </a>
        </div>
           
    
            <div class="col-1">
                <a class="" href="/" onClick="toDo.deleteTask(event, ${index})">
                <i id="deleteTask" data-id="${index}" class="far fa-trash-alt"></i>
                </a>
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

   //edit item
    editTask() {
        if (e.target.classList.contains("edit")) {
            document.getElementById("addTask").value =
                e.target.parentNode.childNodes[0].data;
            submit.value = "EDIT";
            editItem = e;
        }
    }
}

let toDo;
window.addEventListener("load", function () {
    toDo = new ToDoClass();
});

