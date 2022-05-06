const newTodoItem = document.getElementById('newItemBtn');
const createTodoItemDialog = document.querySelector('.createTodoItemDialog');

newTodoItem.addEventListener('click', () => {
    createTodoItemDialog.style.display = "flex";
});