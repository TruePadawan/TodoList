import { eventManager } from "./eventManager";
import { projectsList } from "../global_data";

const todoItemDetailsDialog = document.querySelector('.todoItemDetailsDialog');
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
        todoItemDetailsDialog.style.display = "flex";
    };
}


export const todoManager = new TodoManager();