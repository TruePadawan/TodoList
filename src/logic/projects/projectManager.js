import { Project } from "./projects";
import { eventManager } from "../../handlers/eventManager";

class ProjectManager {
  #projectsContainer;
  #projectsList;

  constructor() {
    this.#projectsContainer = document.querySelector(".projects");
    this.#projectsList = {};
    console.log("creating project manager");
  }
  
  addProject(title = "Untitled") {
    const project = new Project(title);
    this.#projectsContainer.appendChild(project.getNode());

    eventManager.triggerEvent("projectItemAdded", [project.getID()]);
  }

  updateProjectList(projectItem) {
    const projectID = projectItem.getID();

    this.#projectsList[projectID] = {
      title: projectItem.title,
      todos: projectItem.todos,
      node: projectItem.getNode(),
    };
  }

  setActiveProject(projectID) {
    for (const id in this.#projectsList) {
      let itemNode = this.#projectsList[id].node;
      if (id === projectID)
      {
        itemNode.classList.add('active');
        eventManager.triggerEvent('projectItemActive');
        return;
      }
      itemNode.className = "projectItem";
    }
  }

  getTodos(projectID){
    for (const id in this.#projectsList)
    {
      if (id === projectID)
      {
        let projectTodos = this.#projectsList[id].todos;
        return projectTodos;
      }
    }

    throw `Project with ID [${projectID}] doesn't exist`;
  }

  numberOfProjects() {
    return Object.keys(this.#projectsList).length;
  }
}

export const projectManager = new ProjectManager();
