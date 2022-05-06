const forms = document.querySelectorAll('dialog > form');
const newTodoItem = document.getElementById('newItemBtn');

const createTodoItemDialog = document.querySelector('.createTodoItemDialog');
const todoItemDetailsDialog = document.querySelector('.todoItemDetailsDialog');

const todoDetailsBtns = document.querySelectorAll('.showTodoDetailsBtn');

newTodoItem.addEventListener('click', () => {
    createTodoItemDialog.style.display = "flex";
});

forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });
});

todoDetailsBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        todoItemDetailsDialog.style.display = "flex";
    });
});