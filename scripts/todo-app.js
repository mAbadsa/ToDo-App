'use strict'

//Read todos data from localstorage
const getTodos = function () {
    const todoJSON = localStorage.getItem('todos');
    try {
        return todoJSON ? JSON.parse(todoJSON) : [];        
    } catch (error) {
        return [];
    }
    // if (todoJSON !== null) {
    //     return JSON.parse(todoJSON);
    // } else {
    //     return [];
    // }
}

//Save the todos to localStorage
const saveTodos = function (todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

//Remove todo by id
const removeToDo = function (id) {
    const todoIndex = todos.findIndex(todo => {
        return todo.id === id;
    })

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1);
    }
}

//Toggle the complete value for a given todo
const toggleTodo = function (id) {
    const todo = todos.find(function (todo) {
        return todo.id === id;
    })

    if (todo !== undefined) {
        todo.completed = !todo.completed;
    }
}

//Generate Todos Elements
const generateTodoELe = function (todo) {
    const todoBox = document.createElement('div');
    const checkBox = document.createElement('input');
    const todoTextEl = document.createElement('p');
    const button = document.createElement('button');

    checkBox.setAttribute('type', 'checkbox');
    checkBox.classList.add('checkbox');
    checkBox.checked = todo.completed;
    todoBox.appendChild(checkBox);
    checkBox.addEventListener('change', function () {
        toggleTodo(todo.id);
        saveTodos(todos);
        rendersTodos(todos, filters);
    })
    todoBox.classList.add('note-btn-container');
    
    todoBox.appendChild(todoTextEl);
    todoBox.appendChild(button);
    button.classList.add('delete-btn');
    button.textContent = 'X';
    todoTextEl.classList.add('todo-text');
    todoTextEl.textContent = todo.text;
    button.addEventListener('click', function (e) {
        removeToDo(todo.id);
        saveTodos(todos);
        rendersTodos(todos, filters);
    })
  
    return todoBox;
}


// Render todos
const rendersTodos = (todos, filters) => {
    let filterToDos = todos.filter(todo => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
        const hideCompleteMatch = !filters.hideCompleted || !todo.completed;
        return searchTextMatch && hideCompleteMatch;
    })

    // filterToDos = todos.filter(todo => {
    //     return !filters.hideCompleted || !todo.completed;
    //     // if(filters.hideCompleted) {
    //     //     return !todo.completed;
    //     // } else {
    //     //     return true;
    //     // }
    // })

    const incomplete = filterToDos.filter(function (todo) {
        return !todo.completed;
    })

    document.querySelector('#todos').innerHTML = '';

    summerydomEl(incomplete);
    filterToDos.forEach(todo => {
        document.querySelector('#todos').appendChild(generateTodoELe(todo));
    })
}

//Generate todo summary elemets 
const summerydomEl = function (incomplete) {
    const summary = document.createElement('p');
    summary.textContent = `You have ${incomplete.length} incomplete tasks`;
    return document.querySelector('#todos').appendChild(summary);
}