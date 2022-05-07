import { v4 as uuidv4 } from "uuid";
import { eventManager } from "./eventManager";
import { projectsList } from "../global_data";

class TodoManager {
    constructor() {  
    }

    addTodoItem = (todoItem, projectID) => {
        if(projectID in projectsList)
        {
            let id = uuidv4();
            projectsList[projectID].todos[id] = todoItem;
            // let title = projectsList[projectID].title;
            // let todos = projectsList[projectID].todos;
            eventManager.triggerEvent('todoItemAdded', [projectID]);
        }
    };
}


export const todoManager = new TodoManager();