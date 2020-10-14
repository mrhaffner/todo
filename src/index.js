// ‘todos’ are going to be objects that you’ll want to dynamically create, which means either using factories or constructors/classes to generate them.

//todo properties
    //minimum: title, description, dueDate and priority
        //extra: notes and checklist

//todos should be separated into projects
    //there should be a deault project when the user opens the app
    //Users should be able to create new projects and choose which project their todos go into.

// separate your application logic (i.e. creating new todos, setting todos as complete, changing todo priority etc.) from the DOM-related stuff, so keep all of those things in separate modules.

//UI
    //view all projects
    //view all todos in each project (probably just the title and duedate.. perhaps changing color for different priorities)
    //expand a single todo to see/edit its details
    //delete a todo

//Use localStorage to save user’s projects and todos between sessions.??????????????

//Since you are probably already using webpack, adding external libraries from npm is a cinch! You might want to consider using the following useful library in your code:
    //date-fns gives you a bunch of handy functions for formatting and manipulating dates and times.


//strucure:
    //index file holds the basic sidebar
    //another file holds what is loaded in the sidebar
    //another holds what is loads in current project


//module to hold array that contains project objects
const projectsList = (() => {
    const projectArr = [
        {
            name: 'Default Project',
            projId: 0,
            currentTaskId: 2,
            tasks: [
                {
                    name: 'default task',
                    taskId: 0,
                },
                {
                    name: 'second default task',
                    taskId: 1,
                },
            ]
        },
    ];
    let currentId = 1;
    return { projectArr, currentId };
})();

//factory function to create project objects
const Project = (name, id) => {
    const projId = id;
    const currentTaskId = 0;
    const tasks = [];
        //should you be able to change task? probably not, will change later
    return { name, projId, currentTaskId, tasks };
};
//function to add project object to project array
function addProject(project) {
    projectsList.projectArr.push(project)
}

//factory function to create task objects 
const Task = (name, projId) => {
    const getProjId = () => projId;
    return { name, getProjId };
};
//function to add task objects to an array inside of the correct project object



//create a pop up form in html (then maybe eventually dynamically generate it with Javascript on new project button click)
    //probably make it pop up later in development, just have it in the sidebar for now
const submitBtn = document.getElementById('proj_form_submit_btn');
submitBtn.addEventListener('click', () => {
    const inputName = document.getElementById('proj_title_input').value;
    // let inputId = projectsList.projectArr.length; /*This needs to change to be generated as a number 1 higher than the highest id in array once a functional delete project button is created */
    let inputId = projectsList.currentId
    projectsList.currentId ++;
    projectsList.projectArr.push(Project(inputName, inputId));
    addProjectSide(inputName, inputId);
})

function addProjectSide(name, id) {
    //maybe refactor this once everything is done so that anything coming from the form is appended, but everything else can be with innerHTML
    const sideNode = document.getElementById('side_proj_div');
    let newDiv = document.createElement('div')
    newDiv.id = `side_${id}_div`
    let newProject = `<h3 id=side_${id}_title">${name}</h3>`;
    newDiv.innerHTML = newProject;
    sideNode.appendChild(newDiv);
    addProjectBtn(newDiv.firstChild, name, id); //might need to change this to something other than .firstChild when you reorganize the DOM tree
    }; 

//this will need to run when a new project is created, but will also need to be applied to the Default Project
function addProjectBtn(proj, name, id) {
    proj.addEventListener('click', () => {
        clearMain();
        addProjectMain(name, id);
    })
};

let defaultProj = document.getElementById('side_default_proj_title');
addProjectBtn(defaultProj, 'Default Project', 0); /*probably make this so it get from the object*/

function clearMain() {
    const projMain = document.getElementById('proj_div')
    while (projMain.firstChild) {
        projMain.removeChild(projMain.firstChild);
    }
};

function addProjectMain(name, id) { /*get rid of the (name/id dependencies here if possible - maybe get the id on click, then find the correct object and use that to populate !!!! have to do this to populate todos correctly!!!!!)*/
    const projMain = document.getElementById('proj_div')
    const projectContents = 
        `<div id="${id}_proj">
            <div id="${id}_proj_top">
                <div id="${id}_proj_title_div">
                    <h2 id="${id}_proj_title">${name}</h2>
                </div>
                <div id="${id}_proj_btn_div">
                    <button id="${id}_proj_btn">New Task</button>
                </div>
            </div>
            <div id="${id}_proj_task_div">
            </div>
        </div>`
    projMain.innerHTML = projectContents
    //function to loop through appropriate object and add all the task
    //find the object with the same id
    const taskContainer = document.getElementById(`${id}_proj_task_div`);
    let currentProject = projectsList.projectArr.filter(obj => obj.projId === +id)[0]; //hope this works lmao
    currentProject.tasks.forEach(task => addTaskDOM(task.name, task.taskId, id, taskContainer));
};

function addTaskDOM (name, id, pId, parent) {
    //create task container node
    let newTaskDiv = document.createElement('div');
        //set it's id
    newTaskDiv.id = `${pId}_proj_${id}_task_div`;
    // change inner html of task container node
    let newTask = `<p>${name}</p>`;
    newTaskDiv.innerHTML = newTask;
    //append task container node to taskContainer
    parent.appendChild(newTaskDiv);
}

// const sideNode = document.getElementById('side_proj_div');
// let newDiv = document.createElement('div')
// newDiv.id = `side_${id}_div`
// let newProject = `<h3 id=side_${id}_title">${name}</h3>`;
// newDiv.innerHTML = newProject;
// sideNode.appendChild(newDiv);