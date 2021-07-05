# To-do app
 Final JavaScript project for Interactive Web Apps (CodeSpace)

The brief was to create a simple To-do App in Vanilla JavaScript, which should be able to 
* Add tasks to the list
* Delete tasks from the list
* Edit tasks
* Add due dates to tasks
* Sort tasks alphabetically
* Strike through tasks on the list
* Save tasks in their expected states and order even after the browser has been closed

This project consists of HTML, CSS and JavaScript. I used some Bootstrap, mainly to display the app contents in a grid, but otherwise no libraries were used.

# How to use the app
Tasks can be added to the list by clicking the plus sign or hitting enter, and a duedate can be added by clicking on the calendar icon and selecting a date. On hitting enter, the date will be displayed next to the relevant task. Tasks become editable when the text is clicked on and hitting enter will save the edit.
To mark a task complete, a checkbox can be selected and the sort button orders the tasks alphabetically. All tasks are stored in local storage and are still available after the page reloads. If the user wishes to clear all tasks, the clear button deletes all tasks from local storage.

