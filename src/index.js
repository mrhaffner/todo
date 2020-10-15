//todo properties
    //minimum: description, dueDate and priority

// separate your application logic (i.e. creating new todos, setting todos as complete, changing todo priority etc.) from the DOM-related stuff, so keep all of those things in separate modules.

//UI
    //expand a single todo to see/edit its details

//Use localStorage to save user’s projects and todos between sessions.??????????????

//Since you are probably already using webpack, adding external libraries from npm is a cinch! You might want to consider using the following useful library in your code:
    //date-fns gives you a bunch of handy functions for formatting and manipulating dates and times.

//strucure:
    //index file holds the basic sidebar
    //another file holds what is loaded in the sidebar
    //another holds what is loads in current project

//if main is empty (there are now projects) when you create a new project, that project should appear in main

const projectsList = (() => {
    const projectArr = [
        {
            name: 'Default Project',
            projId: 0,
            currentTaskId: 2,
            tasks: [
                {
                    taskId: 0,
                    name: 'default task',
                    note: 'I am a note.',
                    dueDate: '1985',
                    priority: '1',
                },
                {
                    taskId: 1,
                    name: 'second default task',
                    note: 'I am also a note.',
                    dueDate: 'The Year 2000',
                    priority: '88',
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

const Task = (id, name, note, dueDate, priority) => {
    const taskId = id;
    return { taskId, name, note, dueDate, priority };
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
    const sideNode = document.getElementById('side_proj_div');
    let newDiv = document.createElement('div')
    newDiv.id = `side_${id}_div`
    let newProject = 
        `<h3 id=side_${id}_title">${name}</h3>
        <button id="side_${id}_delete">Delete</button>`;
    newDiv.innerHTML = newProject;
    sideNode.appendChild(newDiv);
    addProjectBtn(newDiv.firstChild, name, id); //might need to change this to something other than .firstChild when you reorganize the DOM tree!!!!!!!
    addDeleteProj(id, newDiv)
    }; 

function addDeleteProj(id, parent) {
    const dBtn = document.getElementById(`side_${id}_delete`)
    dBtn.addEventListener('click', () => {
        let objIndex = projectsList.projectArr.findIndex((x) => x === +id);
        projectsList.projectArr.slice(objIndex, 1);
        parent.remove();
        if (document.getElementById(`${id}`)) {
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

function addProjectMain(name, id) { //get rid of the (name/id dependencies here if possible - maybe get the id on click, then find the correct object and use that to populate !!!! have to do this to populate todos correctly!!!!!)
    const projMain = document.getElementById('proj_div')
    const projectContents = 
        `<div id="${id}">
            <div id="${id}_proj_top">
                <div id="${id}_proj_title_div">
                    <h2 id="${id}_proj_title">${name}</h2>
                </div>
                <div id="${id}_proj_btn_div">
                    <span>Task Name</span>
                    <input type="text" id="name_input"><br>
                    <span>Notes</span>
                    <input type="text" id="notes_input"><br>
                    <span>Due Date</span>
                    <input type="text" id="date_input"><br>
                    <span>Priority</span>
                    <input type="text" id="priority_input"><br>
                    <button id="proj_btn">Submit</button>
                </div>
            </div>
            <div id="task_container">
            </div>
        </div>`
    projMain.innerHTML = projectContents
    populateTasks();
    addTaskBtn(id);
};



//reformulate so there is a form with 1 button (change new task to submit) that has entry for name, note, date, priority


function addTaskBtn(id) {
    const taskBtn = document.getElementById(`proj_btn`)
    taskBtn.addEventListener('click', () => {
        const nameInput = document.getElementById(`name_input`).value;
        const notesInput = document.getElementById(`notes_input`).value;
        const dateInput = document.getElementById(`date_input`).value;
        const priorityInput = document.getElementById(`priority_input`).value;
        let projIndex = projectsList.projectArr.findIndex((x) => x.projId === +id);
        let addId = projectsList.projectArr[projIndex].currentTaskId;
        projectsList.projectArr[projIndex].currentTaskId ++;
        projectsList.projectArr[projIndex].tasks.push(Task(addId, nameInput, notesInput, dateInput, priorityInput));
        populateTasks();
    })
}





//nothing should be fed into addTaskDom, it should read the appropariate task object and populate the tasks from there
// let taskPId = function() {

// }
// let taskId = function() {
    
// }
// let taskName = function() {
    
// }
// let taskNote = function() {
    
// }
// let taskDueDate = function() {
    
// }
// let taskPriority = function() {
    
// }

function getProjectNum() {
    let projNum = document.getElementById('proj_div').firstElementChild.id;
    let projIndex = projectsList.projectArr.findIndex((x) => x.projId === +projNum)
    return projIndex;
}

function populateTasks() {
    clearTasks();
    projectsList.projectArr[getProjectNum()].tasks.forEach(x => addTaskDOM(x));
}

function clearTasks() {
    const taskBox = document.getElementById('task_container')
    while (taskBox.firstChild) {
        taskBox.removeChild(taskBox.firstChild);
    }
}

function addTaskDOM(task) {
    let newTaskDiv = document.createElement('div');
    newTaskDiv.dataset.task_id = task.taskId;//do i need this?
    let newTask = 
    `<p>${task.name}</p>
    <p>${task.note}</p>
    <p>${task.dueDate}</p>
    <p>${task.priority}</p>
    <button id='task_${task.taskId}_delete'>Delete</button>`;//???do I need this id?
    newTaskDiv.innerHTML = newTask;
    let taskDiv = document.getElementById('task_container')
    taskDiv.appendChild(newTaskDiv);
    addDeleteTask(task);
}


function addDeleteTask (task) {//would be nice to make function for adding object to array and changing DOM
    let taskDltBtn = document.getElementById(`task_${task.taskId}_delete`)
    taskDltBtn.addEventListener('click', () => {
        let projIndex = projectsList.projectArr.findIndex((x) => x.projId === getProjectNum());
        let taskIndex = projectsList.projectArr[projIndex].tasks.findIndex((x) => x.taskId === +task.taskId);
        projectsList.projectArr[projIndex].tasks.splice(taskIndex, 1);
        taskDltBtn.parentElement.remove(); //careful when refactoring DOM tree
        
    })
}



addProjectMain('Default Project', 0);
let defaultProj = document.getElementById('side_0_title');
addProjectBtn(defaultProj, 'Default Project', 0); /*probably make this so it get from the object or not*/
addDeleteProj(0, defaultProj.parentElement)
//maybe make a function that does all this shit/make the default proj in sidebar be generated on load