import { eventManager } from "../../handlers/eventManager";
import { projectManager } from "./projectManager";
import { v4 as uuidv4 } from 'uuid';
import "./projects.css";

const projectItemTemplate = document.getElementById('projectTemplate');

export class Project {
    #id;
    #node;
    title = '';
    todos = [];

    constructor(_title, _todos = [])
    {
        this.#id = uuidv4();
        this.title = _title;
        
        let projectDOMNode = projectItemTemplate.content.firstElementChild.cloneNode(true);
        projectDOMNode.querySelector(".projectTitle").textContent = _title;
        
        this.#node = projectDOMNode;
        this.todos = _todos;

        this.#_init();
    }

    #_init()
    {
        this.#node.addEventListener("click", () => {
            eventManager.triggerActions('projectItemClicked', this.#id);
        });
    
        let deleteProjectBtn = this.#node.querySelector(".deleteProjectItem");
        deleteProjectBtn.addEventListener("click", (e) => {
            this.#node.remove();
            eventManager.triggerActions('projectItemDeleted', [this.#id]);
            
            e.stopPropagation();
        });
    }
    
    getNode = () => this.#node;
    getID = () => this.#id;
}

// REGISTER EVENTS
eventManager.registerEvent('projectItemAdded');
eventManager.registerEvent('projectItemClicked');
eventManager.registerEvent('projectItemActive');
eventManager.registerEvent('projectItemDeleted');


// SETTING HANDLERS FOR EVENTS
try {
  eventManager.registerActionToEvent("projectItemAdded",(id) => {
      projectManager.setActiveProject(id);
  });

  eventManager.registerActionToEvent("projectItemClicked", (id) => {
      projectManager.setActiveProject(id);
  });

  eventManager.registerActionToEvent("projectItemActive", (id) => {
      const todos = projectManager.getTodos(id);
      console.log('setting todos', todos);
  });

  eventManager.registerActionToEvent("projectItemDeleted", (id) => {
      projectManager.removeProject(id);
  });
} catch (error) {
  alert(error);
}