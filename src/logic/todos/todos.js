import { v4 as uuidv4 } from 'uuid';
import { projectsList, resetElements, createTodoItem } from '../../global_data';
import { todoDisplay } from './todoDisplay';
import { eventManager } from '../../managers/eventManager';
import { projectManager } from '../../managers/projectManager';
import { todoManager } from '../../managers/todoManager';

// const todoItemDetailsDialog = document.querySelector('.todoItemDetailsDialog');

// EVENTS 
eventManager.registerEvent('todoListModified');

eventManager.registerActionToEvent('todoListModified', (projectID) => {
    const project = projectsList[projectID];
    todoDisplay.load(project);
});



const createTodoItemDialog = document.querySelector('.createTodoItemDialog');
const createTodoForm = createTodoItemDialog.querySelector('form');
const newTodoItem = document.getElementById('newItemBtn');

// CREATE TODO ITEM FORM INPUT FIELDS
let titleInput = createTodoItemDialog.querySelector('.todoItemTitle');
let dueDateInput = createTodoItemDialog.querySelector('.todoItemDueDate');
let priorityInput = createTodoItemDialog.querySelector('.selectItemPriority');
let descInput = createTodoItemDialog.querySelector('.todoItemDescription');


newTodoItem.addEventListener('click', () => {
    createTodoItemDialog.style.display = "flex";
});

createTodoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let id = uuidv4();
    let title = titleInput.value;
    let dueDate = dueDateInput.value;
    let priority = priorityInput.value;
    let desc = descInput.value;

    const item = createTodoItem({id, title, dueDate, priority, desc});
    try {
        todoManager.addTodoItem(item,projectManager.getActiveProjectID());
    } catch (error) {
        alert(error);
    }
    resetElements([titleInput, dueDateInput, descInput]);
    createTodoItemDialog.style.display = "none";
});