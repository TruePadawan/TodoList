import { Project } from "../logic/projects/projects";
import { eventManager } from "./eventManager";
import { projectsList } from "../global_data";

class ProjectManager {
  #projectsContainer;
  #activeProjectID;

  constructor() {
    this.#projectsContainer = document.querySelector(".projects");
  }

  addProject(title = "Untitled") {
    const project = new Project(title);
    this.#updateProjectList(project);

    this.#projectsContainer.appendChild(project.getNode());
    eventManager.triggerEvent("projectItemAdded", [project.getID()]);
  }

  removeProject(projectID) {
    for (const id in projectsList) {
      if (id === projectID) {
        let projectNode = projectsList[id].node;
        delete projectsList[projectID];

        // IF THE DELETED PROJECT WAS THE CURRENTLY ACTIVE PROJECT, SET A NEW ACTIVE PROJECT
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

    projectsList[projectID] = {
      title: projectItem.title,
      todos: projectItem.todos,
      node: projectItem.getNode(),
    };
  }

  setActiveProject(projectID = "") {
    if (projectID !== "")
    {
      if (projectsList.hasOwnProperty(projectID)) // CHECK IF A PROJECT, WITH THE ID CONTAINED IN 'PROJECTID', EXISTS
      {
        for (const id in projectsList)
        {
          let itemNode = projectsList[id].node;
          itemNode.className = "projectItem";
        }
        this.#activeProjectID = projectID;

        const activeProject = projectsList[projectID];
        activeProject.node.classList.add('active');
        eventManager.triggerEvent("projectItemActive", [projectID]);

        return;
      }
      throw `Error - Project with ID ${projectID} not found`;
    }

    // MAKE THE FIRST PROJECT ITEM THE DEFAULT ACTIVE PROJECT
    const projectIDs = Object.keys(projectsList);
    if (projectIDs.length > 0) // MAKING SURE THERE IS AT LEAST ONE PROJECT
    {
      const firstProjectID = projectIDs[0];
      this.#activeProjectID = projectIDs[0];

      const projectNode = projectsList[firstProjectID].node;
      projectNode.classList.add("active");
      eventManager.triggerEvent("projectItemActive", [firstProjectID]);
    }
    else {
      this.#activeProjectID = "";
      eventManager.triggerEvent('allProjectsDeleted', []);
    }
  }

  getActiveProjectID = () => this.#activeProjectID;

  getTodos(projectID) {
    for (const id in projectsList) {
      if (id === projectID) {
        let projectTodos = projectsList[id].todos;
        return projectTodos;
      }
    }

    throw `Project with ID [${projectID}] doesn't exist`;
  }

  numberOfProjects() {
    return Object.keys(projectsList).length;
  }
}

export const projectManager = new ProjectManager();