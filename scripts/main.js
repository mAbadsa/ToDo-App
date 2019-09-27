'use strict'

let todos = getTodos();

const addToDo = document.querySelector('#add-todo');
const removeAll = document.querySelector('#remove-all');
const searchNotes = document.querySelector('#search-todo')

const filters = {
    searchText: "",
    hideCompleted: false
}

rendersTodos(todos, filters);

document.querySelector('#todo-form').addEventListener('submit', e => {
    e.preventDefault();
    if (e.target.elements.todoText.value === '') {

    } else {
        todos.push({
            id: uuidv4(),
            text: e.target.elements.todoText.value,
            completed: false
        })
        saveTodos(todos);
        rendersTodos(todos, filters);
        e.target.elements.todoText.value = '';
    }
})

// todos.forEach((todo) => {
//     const p = document.createElement('p');
//     p.textContent = todo.text;
//     document.querySelector('body').appendChild(p);
// })


addToDo.addEventListener('click', (e) => {

})

removeAll.addEventListener('click', e => {
    console.log(e);
})

searchNotes.addEventListener('input', e => {
    filters.searchText = e.target.value;
    rendersTodos(todos, filters);
})

document.querySelector('#check-box').addEventListener('change', e => {
    filters.hideCompleted = e.target.checked;
    rendersTodos(todos, filters);
})
