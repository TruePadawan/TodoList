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








const forms = document.querySelectorAll('dialog > form');
const newTodoItem = document.getElementById('newItemBtn');

const createTodoItemDialog = document.querySelector('.createTodoItemDialog');


// INIT
newTodoItem.addEventListener('click', () => {
    createTodoItemDialog.style.display = "flex";
});

forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });
});