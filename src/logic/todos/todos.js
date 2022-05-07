import { projectsList } from '../../global_data';
import { todoDisplay } from './todoDisplay';
import { eventManager } from '../../managers/eventManager';
import { projectManager } from '../../managers/projectManager';
import { todoManager } from '../../managers/todoManager';

const todoItemDetailsDialog = document.querySelector('.todoItemDetailsDialog');
const todoItemTemplate = document.getElementById('todoItemTemplate');

class TodoItem {
    title;
    dueDate;
    priority;
    desc;
    #node;

    constructor(data) {
        console.log('creating todo item');
        
        this.title = data.title;
        this.dueDate = data.dueDate;
        this.priority = data.priority;
        this.desc = data.desc;

        this.#node = this.buildDOMNode();
    }
    
    buildDOMNode = () => {
        const todoItemDOMNode = todoItemTemplate.content.firstElementChild.cloneNode(true);
        todoItemDOMNode.querySelector('.todoItem_title').textContent = this.title;
        todoItemDOMNode.classList.add(this.priority);
        
        const todoDetailsBtns = todoItemDOMNode.querySelector('.showTodoDetailsBtn');
        todoDetailsBtns.addEventListener('click', () => {
            todoItemDetailsDialog.style.display = "flex";
        });

        return todoItemDOMNode;
    }
}








const newTodoItem = document.getElementById('newItemBtn');
const createTodoItemDialog = document.querySelector('.createTodoItemDialog');
const createTodoForm = createTodoItemDialog.querySelector('form');

// EVENTS 
eventManager.registerEvent('todoItemAdded');

eventManager.registerActionToEvent('todoItemAdded', (projectID) => {
    const project = projectsList[projectID];
    todoDisplay.load(project);
});

function createTodoItem(props)
{
    let todoItem = {
        title: props.title,
        dueDate: props.dueDate,
        priority: props.priority,
        desc: props.desc
    }

    return todoItem;
}

// INIT
newTodoItem.addEventListener('click', () => {
    createTodoItemDialog.style.display = "flex";
});

createTodoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let title = createTodoItemDialog.querySelector('.todoItemTitle').value;
    let dueDate = createTodoItemDialog.querySelector('.todoItemDueDate').value;
    let priority = createTodoItemDialog.querySelector('.selectItemPriority').value;
    let desc = createTodoItemDialog.querySelector('.todoItemDescription').value;

    const item = createTodoItem({title, dueDate, priority, desc});
    todoManager.addTodoItem(item,projectManager.getActiveProjectID());

    createTodoItemDialog.style.display = "none";
});