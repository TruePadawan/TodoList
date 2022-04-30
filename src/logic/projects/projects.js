// HANDLE PROJECT AND PROJECT ITEM LOGIC
import "./projects.css";

const newProjectBtn = document.getElementById('newProjectBtn');
const projectsContainer = document.querySelector('.projects');
const projectItemTemplate = document.getElementById('projectTemplate');
let projectItemList = [];

newProjectBtn.onclick = () => { addNewProjectItem() };

export function createNewProjectItem(title)
{
    // CLONE THE PROJECT ITEM TEMPLATE
    let newProjectItem = projectItemTemplate.content.firstElementChild.cloneNode(true);

    newProjectItem.querySelector('.projectTitle').textContent = title;

    newProjectItem.addEventListener('click',() => {
        setActiveProject(newProjectItem);
    });

    let deleteProjectBtn = newProjectItem.querySelector('.deleteProjectItem');
    deleteProjectBtn.addEventListener('click', (e) => {
        newProjectItem.remove();
        updateProjectItemList();

        e.stopPropagation();
    });

    return newProjectItem;
}

export function addNewProjectItem(title="Untitled")
{
    const projectItem = createNewProjectItem(title);
    projectsContainer.appendChild(projectItem);
    
    updateProjectItemList();
    setActiveProject(projectItem);
}

function updateProjectItemList()
{
    let items = document.querySelectorAll('.projects > .projectItem');
    projectItemList = Array.from(items);
}

function setActiveProject(projectItem)
{
    // RESET ANY CURRENTLY ACTIVE PROJECT ITEM
    projectItemList.forEach(item => {
        item.className = "projectItem";
    });
    console.log('setting active project');

    projectItem.classList.add('active');
}

export function getNumberOfProjects()
{
    return projectItemList.length;
}

updateProjectItemList();