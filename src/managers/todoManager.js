import { projectManager } from "./projectManager";
import { eventManager } from "./eventManager";
import { projectsList } from "../global_data";

const todoItemDetailsDialog = document.querySelector('.todoItemDetailsDialog');

export const getTodoDataFromID = (id) => {
    const activeProjectID = projectManager.getActiveProjectID();
    const todoData = projectsList[activeProjectID].todos[id];
    return todoData;
}

class TodoManager {
    constructor() {  
    }

    addTodoItem = (todoItem, projectID) => {
        if (projectID === "") throw "No Projects Available. Create a project";
        if(projectID in projectsList)
        {
            projectsList[projectID].todos[todoItem.id] = todoItem;
            eventManager.triggerEvent('todoListModified', [projectID]);
        }
    };

    removeTodoItem = (todoItemID) => {

    }

    updateTodoItem = (todoItemID, newData) => {

    }

    showTodoDetails = (todoItemID) => {
        const todoItemData = getTodoDataFromID(todoItemID);
        
        todoItemDetailsDialog.style.display = "flex";
        todoItemDetailsDialog.querySelector('.todoItemTitle').value = todoItemData.title;
        todoItemDetailsDialog.querySelector('.todoItemDueDate').value = todoItemData.dueDate;
        todoItemDetailsDialog.querySelector('.selectItemPriority').value = todoItemData.priority;
        todoItemDetailsDialog.querySelector('.todoItemDescription').value = todoItemData.desc;
    };
}


export const todoManager = new TodoManager();