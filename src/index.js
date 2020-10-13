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