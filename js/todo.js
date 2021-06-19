const todos = [];

function initTodos() {
    addEventListeners();
}

function addEventListeners() {
    const createButton = document.querySelector('.createButton');
    createButton.addEventListener('click', openCreateNewTodoForm);
    
    const exitButton = document.querySelector('.exitButton');
    exitButton.addEventListener('click', closeCreateNewTodoForm);

    const submitButton = document.getElementById('save-btn');
    submitButton.addEventListener('click', handleSubmit);
}


function openCreateNewTodoForm() {
    let todoForm = document.querySelector('#sidebar-todo-form');
    let sidebarWrapper = document.querySelector('#sidebar-wrapper');

    sidebarWrapper.setAttribute('class', 'd-none');
    todoForm.classList.remove('d-none');
}

function closeCreateNewTodoForm() {
    let todoForm = document.querySelector('#sidebar-todo-form');
    let sidebarWrapper = document.querySelector('#sidebar-wrapper');

    todoForm.setAttribute('class', 'd-none');
    sidebarWrapper.classList.remove('d-none');
}

function handleSubmit(event) {
    event.preventDefault();
    const todoTitle = document.getElementById('todo-name').value;
    const todoDate = document.getElementById('date').value;
    const todoStarttime = document.getElementById('starttime').value;
    const todoEndtime = document.getElementById('endtime').value;
    const todoDescription = document.getElementById('todo-description').value;
    todo = { title: todoTitle, date: todoDate, starttime: todoStarttime, endtime: todoEndtime, description: todoDescription }
    todos.push(todo);
    console.log(todo);
    document.querySelector('form').reset();
}





