/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
eval("// separate your application logic (i.e. creating new todos, setting todos as complete, changing todo priority etc.) from the DOM-related stuff, so keep all of those things in separate modules.\r\n\r\n//Use localStorage to save user’s projects and todos between sessions.??????????????\r\n\r\n//Since you are probably already using webpack, adding external libraries from npm is a cinch! You might want to consider using the following useful library in your code:\r\n    //date-fns gives you a bunch of handy functions for formatting and manipulating dates and times.\r\n\r\n//strucure:\r\n    //index file holds the basic sidebar\r\n    //another file holds what is loaded in the sidebar\r\n    //another holds what is loads in current project\r\n\r\n//if main is empty (there are now projects) when you create a new project, that project should appear in main\r\n//if project is currently loaded already, clicking on it in sidebar will not reload main\r\n\r\n//change index.html javascript file\r\n\r\n// localStorage.getItem()\r\n// localStorage.setItem()\r\n// maybe add event listener to the page that on click updates the localstorage?\r\n// also need to figure out how to load it \r\n\r\nconst projectsList = (() => {\r\n    const projectArr = [\r\n        {\r\n            name: 'Default Project',\r\n            projId: 0,\r\n            currentTaskId: 2,\r\n            tasks: [\r\n                {\r\n                    taskId: 0,\r\n                    name: 'default task',\r\n                    note: 'I am a note.',\r\n                    dueDate: '1985',\r\n                    priority: '1',\r\n                },\r\n                {\r\n                    taskId: 1,\r\n                    name: 'second default task',\r\n                    note: 'I am also a note.',\r\n                    dueDate: 'The Year 2000',\r\n                    priority: '88',\r\n                },\r\n            ]\r\n        },\r\n    ];\r\n    let currentId = 1;\r\n    return { projectArr, currentId };\r\n})();\r\n\r\n\r\nconst Project = (name, id) => {\r\n    const projId = id;\r\n    const currentTaskId = 0;\r\n    const tasks = [];\r\n    return { name, projId, currentTaskId, tasks };\r\n};\r\n\r\nfunction addProject(project) {\r\n    projectsList.projectArr.push(project)\r\n}\r\n\r\nconst Task = (id, name, note, dueDate, priority) => {\r\n    const taskId = id;\r\n    return { taskId, name, note, dueDate, priority };\r\n};\r\n\r\n\r\n//create a pop up form in html (then maybe eventually dynamically generate it with Javascript on new project button click)\r\n    //probably make it pop up later in development, just have it in the sidebar for now\r\nconst submitBtn = document.getElementById('proj_form_submit_btn');\r\nsubmitBtn.addEventListener('click', () => {\r\n    const inputName = document.getElementById('proj_title_input').value;\r\n    let inputId = projectsList.currentId\r\n    projectsList.currentId ++;\r\n    projectsList.projectArr.push(Project(inputName, inputId));\r\n    addProjectSide();\r\n})\r\n\r\n\r\nfunction addProjectSide() {\r\n    clearSide()\r\n    projectsList.projectArr.forEach(x => addSideDOM(x.name, x.projId))\r\n    }; \r\n\r\nfunction addSideDOM(name, id) {\r\n    const sideNode = document.getElementById('side_proj_div');\r\n    let newDiv = document.createElement('div')\r\n    newDiv.id = `side_${id}_div`\r\n    let newProject = \r\n        `<h3 id=side_${id}_title\">${name}</h3>\r\n        <button id=\"side_${id}_delete\">Delete</button>`;\r\n    newDiv.innerHTML = newProject;\r\n    sideNode.appendChild(newDiv);\r\n    addProjectBtn(newDiv.firstChild, name, id); //might need to change this to something other than .firstChild when you reorganize the DOM tree!!!!!!!\r\n    addDeleteProj(id, newDiv)\r\n}\r\n\r\nfunction clearSide() {\r\n    const projSide = document.getElementById('side_proj_div')\r\n    while (projSide.firstChild) {\r\n        projSide.removeChild(projSide.firstChild);\r\n    } \r\n}\r\n\r\nfunction addDeleteProj(id, parent) {\r\n    const dBtn = document.getElementById(`side_${id}_delete`)\r\n    dBtn.addEventListener('click', () => {\r\n        let objIndex = projectsList.projectArr.findIndex((x) => x === +id);\r\n        projectsList.projectArr.splice(objIndex, 1);\r\n        parent.remove();\r\n        if (document.getElementById(`${id}`)) {\r\n            clearMain();\r\n        };\r\n        addProjectSide()\r\n    })\r\n}\r\n\r\nfunction addProjectBtn(proj, name, id) {\r\n    proj.addEventListener('click', () => {\r\n        clearMain();\r\n        addProjectMain(name, id);\r\n    })\r\n};\r\n\r\nfunction clearMain() {\r\n    const projMain = document.getElementById('proj_div')\r\n    while (projMain.firstChild) {\r\n        projMain.removeChild(projMain.firstChild);\r\n    }\r\n};\r\n\r\nfunction addProjectMain(name, id) { //get rid of the (name/id dependencies here if possible - maybe get the id on click, then find the correct object and use that to populate !!!! have to do this to populate todos correctly!!!!!)\r\n    const projMain = document.getElementById('proj_div')\r\n    const projectContents = \r\n        `<div id=\"${id}\">\r\n            <div id=\"${id}_proj_top\">\r\n                <div id=\"${id}_proj_title_div\">\r\n                    <h2 id=\"${id}_proj_title\">${name}</h2>\r\n                </div>\r\n                <div id=\"${id}_proj_btn_div\">\r\n                    <span>Task Name</span>\r\n                    <input type=\"text\" id=\"name_input\"><br>\r\n                    <span>Notes</span>\r\n                    <input type=\"text\" id=\"notes_input\"><br>\r\n                    <span>Due Date</span>\r\n                    <input type=\"text\" id=\"date_input\"><br>\r\n                    <span>Priority</span>\r\n                    <input type=\"text\" id=\"priority_input\"><br>\r\n                    <button id=\"proj_btn\">Submit</button>\r\n                </div>\r\n            </div>\r\n            <div id=\"task_container\">\r\n            </div>\r\n        </div>`\r\n    projMain.innerHTML = projectContents\r\n    populateTasks();\r\n    addTaskBtn(id);\r\n};\r\n\r\nfunction addTaskBtn(id) {\r\n    const taskBtn = document.getElementById(`proj_btn`)\r\n    taskBtn.addEventListener('click', () => {\r\n        const nameInput = document.getElementById(`name_input`).value;\r\n        const notesInput = document.getElementById(`notes_input`).value;\r\n        const dateInput = document.getElementById(`date_input`).value;\r\n        const priorityInput = document.getElementById(`priority_input`).value;\r\n        let projIndex = projectsList.projectArr.findIndex((x) => x.projId === +id);\r\n        let addId = projectsList.projectArr[projIndex].currentTaskId;\r\n        projectsList.projectArr[projIndex].currentTaskId ++;\r\n        projectsList.projectArr[projIndex].tasks.push(Task(addId, nameInput, notesInput, dateInput, priorityInput));\r\n        populateTasks();\r\n    })\r\n}\r\n\r\nfunction getProjectNum() {\r\n    let projNum = document.getElementById('proj_div').firstElementChild.id;\r\n    let projIndex = projectsList.projectArr.findIndex((x) => x.projId === +projNum)\r\n    return projIndex;\r\n}\r\n\r\nfunction populateTasks() {\r\n    clearTasks();\r\n    projectsList.projectArr[getProjectNum()].tasks.forEach(x => addTaskDOM(x));\r\n}\r\n\r\nfunction clearTasks() {\r\n    const taskBox = document.getElementById('task_container')\r\n    while (taskBox.firstChild) {\r\n        taskBox.removeChild(taskBox.firstChild);\r\n    }\r\n}\r\n\r\nfunction addTaskDOM(task) {\r\n    let newTaskDiv = document.createElement('div');\r\n    newTaskDiv.dataset.task_id = task.taskId;//do i need this?\r\n    let newTask = \r\n    `<span id='${task.taskId}_name'>${task.name}</span>\r\n    <button id='task_${task.taskId}_delete'>Delete</button>\r\n    <div id='${task.taskId}_details' class='details_container'>    \r\n        <span id='${task.taskId}_note_text'>${task.note}</span>\r\n        <input type=\"text\" id='${task.taskId}_note_edit'>\r\n        <button id ='${task.taskId}_note_edit_btn'>Edit Note</button><br>\r\n        <span id='${task.taskId}_date_text'>${task.dueDate}</span>\r\n        <input type=\"text\" id=\"${task.taskId}_date_edit\">\r\n        <button id ='${task.taskId}_date_edit_btn'>Edit Date</button><br>\r\n        <span id='${task.taskId}_priority_text'>${task.priority}</span>\r\n        <input type=\"text\" id=\"${task.taskId}_priority_edit\">\r\n        <button id ='${task.taskId}_priority_edit_btn'>Edit Priority</button><br>\r\n    </div>`;\r\n    newTaskDiv.innerHTML = newTask;\r\n    let taskDiv = document.getElementById('task_container')\r\n    taskDiv.appendChild(newTaskDiv);\r\n    addDeleteTask(task);\r\n    addExpandBtn(task);\r\n    editButtons(task)\r\n}\r\n\r\nfunction editButtons(task) {\r\n    editNote(task)\r\n    editDate(task)\r\n    editPriority(task)\r\n}\r\n\r\nfunction editNote(task) {\r\n    const editBtn = document.getElementById(`${task.taskId}_note_edit_btn`);\r\n    editBtn.addEventListener('click', () => {\r\n        const nameEdit = document.getElementById(`${task.taskId}_note_edit`).value\r\n        let projIndex = projectsList.projectArr.findIndex((x) => x.projId === getProjectNum());\r\n        let taskIndex = projectsList.projectArr[projIndex].tasks.findIndex((x) => x.taskId === +task.taskId);\r\n        projectsList.projectArr[projIndex].tasks[taskIndex].note = nameEdit;\r\n        document.getElementById(`${task.taskId}_note_text`).innerHTML = nameEdit;\r\n    })\r\n}\r\n\r\nfunction editDate(task) {\r\n    const editBtn = document.getElementById(`${task.taskId}_date_edit_btn`);\r\n    editBtn.addEventListener('click', () => {\r\n        const dateEdit = document.getElementById(`${task.taskId}_date_edit`).value\r\n        let projIndex = projectsList.projectArr.findIndex((x) => x.projId === getProjectNum());\r\n        let taskIndex = projectsList.projectArr[projIndex].tasks.findIndex((x) => x.taskId === +task.taskId);\r\n        projectsList.projectArr[projIndex].tasks[taskIndex].dueDate = dateEdit;\r\n        document.getElementById(`${task.taskId}_date_text`).innerHTML = dateEdit;\r\n    })\r\n}\r\n\r\nfunction editPriority(task) {\r\n    const editBtn = document.getElementById(`${task.taskId}_priority_edit_btn`);\r\n    editBtn.addEventListener('click', () => {\r\n        const priorityEdit = document.getElementById(`${task.taskId}_priority_edit`).value\r\n        let projIndex = projectsList.projectArr.findIndex((x) => x.projId === getProjectNum());\r\n        let taskIndex = projectsList.projectArr[projIndex].tasks.findIndex((x) => x.taskId === +task.taskId);\r\n        projectsList.projectArr[projIndex].tasks[taskIndex].priority = priorityEdit;\r\n        document.getElementById(`${task.taskId}_priority_text`).innerHTML = priorityEdit;\r\n    })\r\n}\r\n\r\nfunction addExpandBtn(task) {\r\n    let taskNameBtn = document.getElementById(`${task.taskId}_name`)\r\n    taskNameBtn.addEventListener('click', () => {\r\n        let detailsDiv = document.getElementById(`${task.taskId}_details`)\r\n        detailsDiv.style.display === 'block' ? detailsDiv.style.display = 'none' : detailsDiv.style.display = 'block'\r\n    })\r\n}\r\n\r\nfunction addDeleteTask (task) {//would be nice to make function for adding object to array and changing DOM\r\n    let taskDltBtn = document.getElementById(`task_${task.taskId}_delete`)\r\n    taskDltBtn.addEventListener('click', () => {\r\n        let projIndex = projectsList.projectArr.findIndex((x) => x.projId === getProjectNum());\r\n        let taskIndex = projectsList.projectArr[projIndex].tasks.findIndex((x) => x.taskId === +task.taskId);\r\n        projectsList.projectArr[projIndex].tasks.splice(taskIndex, 1);\r\n        taskDltBtn.parentElement.remove(); //careful when refactoring DOM tree\r\n    })\r\n}\r\n\r\n\r\naddProjectSide()\r\naddProjectMain('Default Project', 0); //this needs to change\r\n//let defaultProj = document.getElementById('side_0_title');\r\n//addProjectBtn(defaultProj, 'Default Project', 0); /*probably make this so it get from the object or not*/\r\n//addDeleteProj(0, defaultProj.parentElement)\r\n//maybe make a function that does all this shit\n\n//# sourceURL=webpack://todo/./src/index.js?");
/******/ })()
;