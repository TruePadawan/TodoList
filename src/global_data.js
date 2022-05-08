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
const todoItemDetailsDialog = document.querySelector('.todoItemDetailsDialog');

export function createDOMItem(props) {
    let item = todoItemTemplate.content.firstElementChild.cloneNode(true);
    item.setAttribute('data-id', props.id);
    item.classList.add(props.priority);
    item.querySelector('.todoItem_title').textContent = props.title;

    item.querySelector('.showTodoDetailsBtn').addEventListener('click', (e) => {
        // console.log(e.target.closest('.todoItem'));
        todoItemDetailsDialog.style.display = "flex";
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