//todo properties
    //minimum: title, description, dueDate and priority
        //extra: notes and checklist

// separate your application logic (i.e. creating new todos, setting todos as complete, changing todo priority etc.) from the DOM-related stuff, so keep all of those things in separate modules.

//UI
    //expand a single todo to see/edit its details
    //delete a todo

//Use localStorage to save user’s projects and todos between sessions.??????????????

//Since you are probably already using webpack, adding external libraries from npm is a cinch! You might want to consider using the following useful library in your code:
    //date-fns gives you a bunch of handy functions for formatting and manipulating dates and times.

//strucure:
    //index file holds the basic sidebar
    //another file holds what is loaded in the sidebar
    //another holds what is loads in current project


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

const Project = (name, id) => {
    const projId = id;
    const currentTaskId = 0;
    const tasks = [];
    return { name, projId, currentTaskId, tasks };
};

function addProject(project) {
    projectsList.projectArr.push(project)
}

const Task = (name, projId) => {
    const getProjId = () => projId;
    return { name, getProjId };
};


//create a pop up form in html (then maybe eventually dynamically generate it with Javascript on new project button click)
    //probably make it pop up later in development, just have it in the sidebar for now
const submitBtn = document.getElementById('proj_form_submit_btn');
submitBtn.addEventListener('click', () => {
    const inputName = document.getElementById('proj_title_input').value;
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
    let newProject = 
        `<h3 id=side_${id}_title">${name}</h3>
        <button id="side_${id}_delete">Delete</button>`;
    newDiv.innerHTML = newProject;
    sideNode.appendChild(newDiv);
    addProjectBtn(newDiv.firstChild, name, id); //might need to change this to something other than .firstChild when you reorganize the DOM tree
    addDeleteProj(id, newDiv)
    }; 

function addDeleteProj(id, parent) {
    const dBtn = document.getElementById(`side_${id}_delete`)
    dBtn.addEventListener('click', () => {
        let objIndex = projectsList.projectArr.findIndex((x) => x === +id);
        projectsList.projectArr.slice(objIndex, 1);
        parent.remove();
        if (document.getElementById(`${id}_proj`)) {
            clearMain();
        };
    })
}

function addProjectBtn(proj, name, id) {
    proj.addEventListener('click', () => {
        clearMain();
        addProjectMain(name, id);
    })
};

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
                    <input type="text" id="${id}_proj_task_input">
                    <button id="${id}_proj_btn">New Task</button>
                </div>
            </div>
            <div id="${id}_proj_task_div">
            </div>
        </div>`
    projMain.innerHTML = projectContents
    const taskContainer = document.getElementById(`${id}_proj_task_div`);
    let currentProject = projectsList.projectArr.filter(obj => obj.projId === +id)[0];
    currentProject.tasks.forEach(task => addTaskDOM(task.name, task.taskId, id, taskContainer));
    addTaskBtn(id, taskContainer);
};

function addTaskDOM (name, id, pId, parent) {
    let newTaskDiv = document.createElement('div');
    newTaskDiv.id = `${pId}_proj_${id}_task_div`;
    let newTask = `<p>${name}</p>`;
    newTaskDiv.innerHTML = newTask;
    parent.appendChild(newTaskDiv);
};


function addTaskBtn(id, task) {
    const taskBtn = document.getElementById(`${id}_proj_btn`)
    taskBtn.addEventListener('click', () => {
        const inputText = document.getElementById(`${id}_proj_task_input`).value;
        let projIndex = projectsList.projectArr.findIndex((x) => x.projId === +id);
        let addId = projectsList.projectArr[projIndex].currentTaskId;
        projectsList.projectArr[projIndex].currentTaskId ++;
        projectsList.projectArr[projIndex].tasks.push(Task(inputText, addId));
        addTaskDOM(inputText, addId, id, task);
    })
}



addProjectMain('Default Project', 0);
let defaultProj = document.getElementById('side_0_title');
addProjectBtn(defaultProj, 'Default Project', 0); /*probably make this so it get from the object or not*/
addDeleteProj(0, defaultProj.parentElement)
//maybe make a function that does all this shit/make the default proj in sidebar be generated on load