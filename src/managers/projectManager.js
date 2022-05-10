import { projectsList } from "../global_data";
import { Project } from "../logic/projects/projects";

import { projectDisplay } from "../logic/projects/projectsDisplay";

import { eventManager } from "./eventManager";
import { storeProjectDataLocally } from "./dataManager";

class ProjectManager {
  #activeProjectID;

  constructor() {
  }

  addProject(title = "Untitled") {
    const project = new Project(title);
    const projectID = project.getID();

    projectDisplay.addProjectToDOM(projectID, project.title);
    this.#updateProjectList(project);
    
    eventManager.triggerEvent("projectItemAdded", [ projectID ]);
  }

  removeProject(projectID) {
    for (const id in projectsList) {
      if (id === projectID) {
        delete projectsList[projectID];
        
        // IF THE TO-BE DELETED PROJECT WAS THE CURRENTLY ACTIVE PROJECT, SET A NEW ACTIVE PROJECT
        if (projectDisplay.isProjectActive(projectID)) { 
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
    };
  }

  setActiveProject(projectID = "") {
    if (projectID !== "")
    {
      if (projectsList.hasOwnProperty(projectID)) // CHECK IF A PROJECT, WITH THE ID CONTAINED IN 'PROJECTID', EXISTS
      {
        for (const id in projectsList) // MAKE ALL PROJECTS INACTIVE INITIALLY
        {
          projectDisplay.setProjectAsInactive(id);
        }

        this.#activeProjectID = projectID;
        projectDisplay.setProjectAsActive(projectID);

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

      projectDisplay.setProjectAsActive(firstProjectID);
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