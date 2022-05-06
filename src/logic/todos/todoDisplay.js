/* HANDLE TAKING THE TODO DATA FROM PROJECT ITEMS AND ADDING THEM TO THE DOM */
class TodoDisplay {
    #projectTitleElement;

    constructor() {
        console.log('creating todo display');
        this.#projectTitleElement = document.getElementById('currentProjectTitle');
    }

    load(project) {
        // LOAD PROJECT'S TODO DATA
    }

    setCurrentProjectTitle(title) {
        this.#projectTitleElement.textContent = title;
    }
}


export const TodoDisplay = new TodoDisplay();