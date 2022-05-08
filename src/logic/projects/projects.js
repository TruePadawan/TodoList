import { eventManager } from "../../managers/eventManager";
import { projectManager } from "../../managers/projectManager";
import { v4 as uuidv4 } from 'uuid';
import { projectsList } from "../../global_data";
import { todoDisplay } from "../todos/todoDisplay";
import "./projects.css";

const projectItemTemplate = document.getElementById('projectTemplate');

export class Project {
    #id;
    #node;
    title = '';
    todos = {};

    constructor(_title, _todos = {})
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
            eventManager.triggerEvent('projectItemClicked', [this.#id]);
        });
    
        this.#node.addEventListener('input', (e) => {
            let updatedTitle = e.target.textContent;
            eventManager.triggerEvent('projectItemTitleUpdated', [this.#id, updatedTitle]);
        });

        let deleteProjectBtn = this.#node.querySelector(".deleteProjectItem");
        deleteProjectBtn.addEventListener("click", (e) => {
            this.#node.remove();
            eventManager.triggerEvent('projectItemDeleted', [this.#id]);
            
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
eventManager.registerEvent('projectItemTitleUpdated');


// SETTING HANDLERS FOR EVENTS
try {
  eventManager.registerActionToEvent("projectItemAdded",(id) => {
      projectManager.setActiveProject(id);
  });

  eventManager.registerActionToEvent("projectItemClicked", (id) => {
      projectManager.setActiveProject(id);
  });

  eventManager.registerActionToEvent("projectItemActive", (id) => {
      const project = projectsList[id];
      todoDisplay.load(project);
  });

  eventManager.registerActionToEvent("projectItemDeleted", (id) => {
      projectManager.removeProject(id);
  });

  eventManager.registerActionToEvent("projectItemTitleUpdated", (id, title) => {
      if (id in projectsList)
      {
          projectsList[id].title = title;

          if (id === projectManager.getActiveProjectID())
          {
              todoDisplay.setProjectTitle(title);
          }
      }
  });

} catch (error) {
  alert(error);
}

const newProjectBtn = document.getElementById('newProjectBtn');
newProjectBtn.addEventListener('click', () => {
    projectManager.addProject();
});