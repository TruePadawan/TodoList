import { v4 as uuidv4 } from "uuid";
import { eventManager } from "./eventManager";
import { projectsList } from "../global_data";

class TodoManager {
    constructor() {  
    }

    addTodoItem = (todoItem, projectID) => {
        if (projectID === "") throw "No Projects Available. Create a project";
        if(projectID in projectsList)
        {
            projectsList[projectID].todos[todoItem.id] = todoItem;
            // let title = projectsList[projectID].title;
            // let todos = projectsList[projectID].todos;
            eventManager.triggerEvent('todoListModified', [projectID]);
        }
    };

    removeTodoItem = (todoItemID) => {

    }

    updateTodoItem = (todoItemID, newData) => {

    }

    showTodoDetails = (todoItemID) => {

    };
}


export const todoManager = new TodoManager();