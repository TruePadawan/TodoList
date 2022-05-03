import "./init.css";
import "./main.css";
import "./logic/sidebar/sidebar";
import "./logic/projects/projects";
import { projectManager } from "./managers/projectManager";

// INIT
(function _init() {
    let projectCount = projectManager.numberOfProjects();

    if (projectCount === 0)
    {
        projectManager.addProject("Default");
    }
})();