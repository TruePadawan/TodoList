import "./init.css";
import "./main.css";
import "./sidebar";
import  { getNumberOfProjects, addNewProjectItem } from "./logic/projects/projects";

// INIT
(function _init() {
    let projectCount = getNumberOfProjects();

    if (projectCount === 0)
    {
        addNewProjectItem("Default");
    }
})();