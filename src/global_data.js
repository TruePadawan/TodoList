export const projectsList = {};

export function resetElements(elements) {
    elements.forEach(element => {
        element.value = "";
    });
}

export function createTodoItem(props)
{
    let todoItem = {
        id : props.id,
        title: props.title,
        dueDate: props.dueDate,
        priority: props.priority,
        desc: props.desc
    }

    return todoItem;
}