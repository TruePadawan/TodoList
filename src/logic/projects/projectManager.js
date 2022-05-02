import { Project } from "./projects";
// import { eventManager } from "../../handlers/eventManager";

class ProjectManager {
  #projectsContainer;
  #projectsList;
  
  constructor() {
    this.#projectsContainer = document.querySelector('.projects');
    this.#projectsList = {};
    console.log("creating project manager");
  }

  createProjectItem(title) {
      const projectItem = new Project(title);
      const projectID = projectItem.getID();

      this.#projectsList[projectID] = {
        title : projectItem.title,
        todos : projectItem.todos,
        node : projectItem.getNode()
      };

      return projectItem;
  }

  // ADD PROJECT ITEM
  addProject(title = "Untitled") {
    this.createProjectItem(title);

  }
}

export const projectManager = new ProjectManager();