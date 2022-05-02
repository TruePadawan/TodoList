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

  #createProjectItem(title) {
    const projectItem = new Project(title);
    return projectItem;
  }

  addProject(title = "Untitled") {
    const project = this.#createProjectItem(title);
    this.#projectsContainer.appendChild(project);

    eventManager.triggerActions("projectAdded");
  }

  updateProjectList(projectItem) {
    const projectID = projectItem.getID();

    this.#projectsList[projectID] = {
      title: projectItem.title,
      todos: projectItem.todos,
      node: projectItem.getNode(),
    };
  }

  numberOfProjects() {
    return Object.keys(this.#projectsList).length;
  }
}

export const projectManager = new ProjectManager();
