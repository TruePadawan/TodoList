export function storeProjectDataLocally(projects) {
    localStorage.setObj('projects', projects);
}

export function retriveProjectDataLocally() {
    return getObj('projects');
}