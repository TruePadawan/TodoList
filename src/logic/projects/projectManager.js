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
    this.#updateProjectList(project);

    this.#projectsContainer.appendChild(project.getNode());
    eventManager.triggerEvent("projectItemAdded", [project.getID()]);
  }

  removeProject(projectID) {
    for (const id in this.#projectsList) {
      if (id === projectID) {
        // IF THE DELETED PROJECT WAS THE CURRENTLY ACTIVE PROJECT, SET A NEW ACTIVE PROJECT
        let projectNode = this.#projectsList[id].node;
        delete this.#projectsList[projectID];

        if (projectNode.classList.contains("active")) {
          this.setActiveProject();
        }
        return;
      }
    }
    throw `Project with ID [${projectID}] doesn't exist`;
  }

  #updateProjectList(projectItem) {
    const projectID = projectItem.getID();

    this.#projectsList[projectID] = {
      title: projectItem.title,
      todos: projectItem.todos,
      node: projectItem.getNode(),
    };
  }

  setActiveProject(projectID = "") {
    if (projectID !== "")
    {
      if (this.#projectsList.hasOwnProperty(projectID))
      {
        for (const id in this.#projectsList)
        {
          let itemNode = this.#projectsList[id].node;
          itemNode.className = "projectItem";
        }
        const activeProject = this.#projectsList[projectID].node;
        activeProject.classList.add('active');
        eventManager.triggerEvent("projectItemActive", [projectID]);

        return;
      }
      throw `Error - Project with ID ${projectID} not found`;
    }

    const projectIDs = Object.keys(this.#projectsList);
    if (projectIDs.length > 0) // MAKING SURE THERE IS AT LEAST ONE PROJECT
    {
      const firstProjectID = projectIDs[0];
      const projectNode = this.#projectsList[firstProjectID].node;
      projectNode.classList.add("active");
      eventManager.triggerEvent("projectItemActive", [firstProjectID]);
    }
  }

  getTodos(projectID) {
    for (const id in this.#projectsList) {
      if (id === projectID) {
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
