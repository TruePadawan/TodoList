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
        desc: props.desc
    }

    return todoItem;
}

const todoItemTemplate = document.getElementById('todoItemTemplate');

export function createDOMItem(props) {
    let item = todoItemTemplate.content.firstElementChild.cloneNode(true);
    item.setAttribute('data-id', props.id);
    item.classList.add(props.priority);
    item.querySelector('.todoItem_title').textContent = props.title;

    item.querySelector('.showTodoDetailsBtn').addEventListener('click', (e) => {
        console.log(e.target.closest('.todoItem'));
    });
    return item;
}

const todoContainer = document.querySelector('.todos');

export function resetTodosContainer() {
    while(todoContainer.firstElementChild)
    {
        todoContainer.removeChild(todoContainer.lastElementChild);
    }
}