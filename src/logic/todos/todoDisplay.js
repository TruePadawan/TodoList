/* HANDLE TAKING THE TODO DATA FROM PROJECT ITEMS AND ADDING THEM TO THE DOM */
class TodoDisplay {
    #projectTitleElement;
    #todoContainer;
    #todoItemTemplate;
    #projectID;

    constructor() {
        this.#projectTitleElement = document.getElementById('currentProjectTitle');
        this.#todoContainer = document.querySelector('.todos');
        this.#todoItemTemplate = document.getElementById('todoItemTemplate');
    }

    load(projectData) {
        this.#resetTodoContainer();
        this.setProjectTitle(projectData.title);

        this.#projectID = projectData.id;
        let sortedTodolist = this.#sortTodoList(projectData.todos);

        for (let i = 0; i < sortedTodolist.length; ++i)
        {
            let props = {
                title : sortedTodolist[i].title,
                priority : sortedTodolist[i].priority
            };

            let item = this.#createDOMItem(props);
            this.#todoContainer.appendChild(item);
        }
    }

    #createDOMItem(props) {
        let item = this.#todoItemTemplate.content.firstElementChild.cloneNode(true);
        item.classList.add(props.priority);
        item.querySelector('.todoItem_title').textContent = props.title;

        return item;
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

    #resetTodoContainer() {
        let children = this.#todoContainer.children;
        if (children.length === 0) return;

        for (let i = 0; i < children.length; ++i)
        {
            children.item(i).remove();
        }
    }
}


export const todoDisplay = new TodoDisplay();