/* Simple functions for easily adding objects and array to localStorage */
Storage.prototype.setObj = function (key, obj) {
    return this.setItem(key, JSON.stringify(obj));
};

Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key));
};


export function storeProjectDataLocally(projects) {
    localStorage.setObj('projects', projects);
}

export function retriveProjectDataLocally() {
    return getObj('projects');
}