import { todoManager } from "./managers/todoManager";


export const projectsList = {};

export function resetElements(elements) {
    elements.forEach(element => {
        element.value = "";
    });
}

export function createTodoItem(props) {
    let todoItem = {
        id: props.id,
        title: props.title,
        dueDate: props.dueDate,
        priority: props.priority,
        desc: props.desc,
        done : false
    }

    return todoItem;
}

const todoItemTemplate = document.getElementById('todoItemTemplate');

export function createDOMItem(props) {
    let item = todoItemTemplate.content.firstElementChild.cloneNode(true);
    item.setAttribute('data-id', props.id);
    item.classList.add(props.priority);
    item.querySelector('.todoItem_title').textContent = props.title;
    if (props.done === true)
    {
        item.classList.add('done');
    }


    item.querySelector('.showTodoDetailsBtn').addEventListener('click', (e) => {
        let itemID = e.target.closest('.todoItem').dataset.id;
        todoManager.showTodoDetails(itemID);
    });
    return item;
}

const todoContainer = document.querySelector('.todos');

export function resetTodosContainer() {
    document.getElementById('currentProjectTitle').textContent = "";
    while(todoContainer.firstElementChild)
    {
        todoContainer.removeChild(todoContainer.lastElementChild);
    }
}