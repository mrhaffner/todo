// separate your application logic (i.e. creating new todos, setting todos as complete, changing todo priority etc.) from the DOM-related stuff, so keep all of those things in separate modules.

//Use localStorage to save user’s projects and todos between sessions.??????????????

//Since you are probably already using webpack, adding external libraries from npm is a cinch! You might want to consider using the following useful library in your code:
    //date-fns gives you a bunch of handy functions for formatting and manipulating dates and times.

//strucure:
    //index file holds the basic sidebar
    //another file holds what is loaded in the sidebar
    //another holds what is loads in current project

//if main is empty (there are now projects) when you create a new project, that project should appear in main
//if project is currently loaded already, clicking on it in sidebar will not reload main

//change index.html javascript file

// localStorage.getItem()
// localStorage.setItem()
// maybe add event listener to the page that on click updates the localstorage?
// also need to figure out how to load it 

function getStorage() {
    projectsList.projectArr = JSON.parse(window.localStorage.getItem('arrKey'))
    projectsList.currentId = JSON.parse(window.localStorage.getItem('idKey'))
}
//might need to rerender after calling? upon loading???
//run addProjectSide()
    //run addProjectMain()
        //simple is to just load the first object in array
        //advanced is to store what project was open in local storage(this will be the default setting, at the bottom), then plug that into addProjectMain
            //if there are no projects in array, then do not run these, especially addProjectMain

//use setters and getters to do this????
function setStorage() {
    let stringArr = JSON.stringify(projectsList.projectArr);
    window.localStorage.setItem('arrKey', stringArr);
    let stringId = JSON.stringify(projectsList.currentId);
    window.localStorage.setItem('idKey', stringId);
}

const projectsList = (() => {
    let projectArr = [
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
    setStorage()
    addProjectSide();
})


function addProjectSide() {
    clearSide()
    projectsList.projectArr.forEach(x => addSideDOM(x.name, x.projId))
    }; 

function addSideDOM(name, id) {
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
}

function clearSide() {
    const projSide = document.getElementById('side_proj_div')
    while (projSide.firstChild) {
        projSide.removeChild(projSide.firstChild);
    } 
}

function addDeleteProj(id, parent) {
    const dBtn = document.getElementById(`side_${id}_delete`)
    dBtn.addEventListener('click', () => {
        let objIndex = projectsList.projectArr.findIndex((x) => x === +id);
        projectsList.projectArr.splice(objIndex, 1);
        setStorage()
        parent.remove();
        if (document.getElementById(`${id}`)) {
            clearMain();
        };
        addProjectSide()
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
        setStorage()
        populateTasks();
    })
}

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
    `<span id='${task.taskId}_name'>${task.name}</span>
    <button id='task_${task.taskId}_delete'>Delete</button>
    <div id='${task.taskId}_details' class='details_container'>    
        <span id='${task.taskId}_note_text'>${task.note}</span>
        <input type="text" id='${task.taskId}_note_edit'>
        <button id ='${task.taskId}_note_edit_btn'>Edit Note</button><br>
        <span id='${task.taskId}_date_text'>${task.dueDate}</span>
        <input type="text" id="${task.taskId}_date_edit">
        <button id ='${task.taskId}_date_edit_btn'>Edit Date</button><br>
        <span id='${task.taskId}_priority_text'>${task.priority}</span>
        <input type="text" id="${task.taskId}_priority_edit">
        <button id ='${task.taskId}_priority_edit_btn'>Edit Priority</button><br>
    </div>`;
    newTaskDiv.innerHTML = newTask;
    let taskDiv = document.getElementById('task_container')
    taskDiv.appendChild(newTaskDiv);
    addDeleteTask(task);
    addExpandBtn(task);
    editButtons(task)
}

function editButtons(task) {
    editNote(task)
    editDate(task)
    editPriority(task)
}

function editNote(task) {
    const editBtn = document.getElementById(`${task.taskId}_note_edit_btn`);
    editBtn.addEventListener('click', () => {
        const nameEdit = document.getElementById(`${task.taskId}_note_edit`).value
        let projIndex = projectsList.projectArr.findIndex((x) => x.projId === getProjectNum());
        let taskIndex = projectsList.projectArr[projIndex].tasks.findIndex((x) => x.taskId === +task.taskId);
        projectsList.projectArr[projIndex].tasks[taskIndex].note = nameEdit;
        setStorage()
        document.getElementById(`${task.taskId}_note_text`).innerHTML = nameEdit;
    })
}

function editDate(task) {
    const editBtn = document.getElementById(`${task.taskId}_date_edit_btn`);
    editBtn.addEventListener('click', () => {
        const dateEdit = document.getElementById(`${task.taskId}_date_edit`).value
        let projIndex = projectsList.projectArr.findIndex((x) => x.projId === getProjectNum());
        let taskIndex = projectsList.projectArr[projIndex].tasks.findIndex((x) => x.taskId === +task.taskId);
        projectsList.projectArr[projIndex].tasks[taskIndex].dueDate = dateEdit;
        setStorage()
        document.getElementById(`${task.taskId}_date_text`).innerHTML = dateEdit;
    })
}

function editPriority(task) {
    const editBtn = document.getElementById(`${task.taskId}_priority_edit_btn`);
    editBtn.addEventListener('click', () => {
        const priorityEdit = document.getElementById(`${task.taskId}_priority_edit`).value
        let projIndex = projectsList.projectArr.findIndex((x) => x.projId === getProjectNum());
        let taskIndex = projectsList.projectArr[projIndex].tasks.findIndex((x) => x.taskId === +task.taskId);
        projectsList.projectArr[projIndex].tasks[taskIndex].priority = priorityEdit;
        setStorage()
        document.getElementById(`${task.taskId}_priority_text`).innerHTML = priorityEdit;
    })
}

function addExpandBtn(task) {
    let taskNameBtn = document.getElementById(`${task.taskId}_name`)
    taskNameBtn.addEventListener('click', () => {
        let detailsDiv = document.getElementById(`${task.taskId}_details`)
        detailsDiv.style.display === 'block' ? detailsDiv.style.display = 'none' : detailsDiv.style.display = 'block'
    })
}

function addDeleteTask (task) {//would be nice to make function for adding object to array and changing DOM
    let taskDltBtn = document.getElementById(`task_${task.taskId}_delete`)
    taskDltBtn.addEventListener('click', () => {
        let projIndex = projectsList.projectArr.findIndex((x) => x.projId === getProjectNum());
        let taskIndex = projectsList.projectArr[projIndex].tasks.findIndex((x) => x.taskId === +task.taskId);
        projectsList.projectArr[projIndex].tasks.splice(taskIndex, 1);
        setStorage()
        taskDltBtn.parentElement.remove(); //careful when refactoring DOM tree
    })
}

getStorage()
addProjectSide()
//find first object in array, get it's values, plug them into addProjectMain (unless there are not)
addProjectMain('Default Project', 0); 
//let defaultProj = document.getElementById('side_0_title');
//addProjectBtn(defaultProj, 'Default Project', 0); /*probably make this so it get from the object or not*/
//addDeleteProj(0, defaultProj.parentElement)
//maybe make a function that does all this shit