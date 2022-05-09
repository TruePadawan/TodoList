import { createDOMItem, resetTodosContainer } from "../../global_data";
/* HANDLE TAKING THE TODO DATA FROM PROJECT ITEMS AND ADDING THEM TO THE DOM */
class TodoDisplay {
    #projectTitleElement;
    #todoContainer;

    constructor() {
        this.#projectTitleElement = document.getElementById('currentProjectTitle');
        this.#todoContainer = document.querySelector('.todos');
    }

    load(projectData) {
        resetTodosContainer();
        this.setProjectTitle(projectData.title);

        let sortedTodolist = this.#sortTodoList(projectData.todos);
        for (let i = 0; i < sortedTodolist.length; ++i)
        {
            let props = {
                id : sortedTodolist[i].id,
                title : sortedTodolist[i].title,
                priority : sortedTodolist[i].priority,
                done : sortedTodolist[i].done
            };

            let item = createDOMItem(props);
            this.#todoContainer.appendChild(item);
        }
    }

    setProjectTitle(title) {
        this.#projectTitleElement.textContent = title;
    }

    #sortTodoList(todos) {
        let itemIDs = Object.keys(todos);

        // STRUGGLES OF A DEV THAT DOESNT KNOW DS AND ALGO
        let high = [], med = [], low = [];

        for (let i = 0; i < itemIDs.length; ++i)
        {
            let nthKey = itemIDs[i];
            if (todos[nthKey].priority === "priority_high")
            {
                high.push(todos[nthKey]);
            }
            else if (todos[nthKey].priority === "priority_med")
            {
                med.push(todos[nthKey]);
            }else {
                low.push(todos[nthKey]);
            }
        }

        let sortedList = [...high,...med,...low];

        return sortedList;
    }
}


export const todoDisplay = new TodoDisplay();