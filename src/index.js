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


//create a pop up form in html (then maybe eventually dynamically generate it with Javascript on new project button click)
    //probably make it pop up later in development, just have it in the sidebar for now
const submitBtn = document.getElementById('proj_form_submit_btn');
submitBtn.addEventListener('click', () => {
    const inputValue = document.getElementById('proj_title_input').value;
    //run a function that creates a project object with 'inputValue' as it's name/title
        //later you will have a function that creates a task object within that object
})

//module to hold array that contains project objects
const projectsList = (() => {
    const projectArr = [
        {
            name: 'Default Project',
            tasks: [
                {
                    name: 'default1 task',
                },
                {
                    name: 'default2 task',
                },
            ]
        },
    ];
    return { projectArr };
})();

//factory function to create project objects
const Project = (name, id) => {
    const tasks = [];
    return { name, id, tasks };
};

//factory function to create task objects 
const Task = (name, id) => {
    return { name, id };
};
    //function to add task objects to an array inside of the correct project object


//#1 step after skeleton is complete is to generate projects objects
    //on new project btn click, a pop up form appears
        //on hitting submit, a new object will be created from a factory/construcor
            //this will be added to a module? containing an array of objects (put a default object in at first)
    //then add a way to find and write that object to the DOM (will remove current project from DOM as well)
        //this will happen on button click as well
        //write the object to the project area and the sidebar
            //clicking it in the sidebar will call the function that clears the project area and writes that object to the DOM