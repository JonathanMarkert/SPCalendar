let todos = []

function initTodos() {
    loadTodos();
    addEventListeners();
    renderTodos();
    
}

function addEventListeners() {
    const createButton = document.querySelector('.createButton');
    createButton.addEventListener('click', () => openTodoForm());
    
    const exitButton = document.querySelector('.exitButton');
    exitButton.addEventListener('click', closeCreateNewTodoForm);

    const showAllTodosButton = document.getElementById('show-all-todos');
    showAllTodosButton .addEventListener('click', showAllTodos);
}

function openTodoForm(todoItem) {
    let todoForm = document.querySelector('#sidebar-todo-form');
    let sidebarWrapper = document.querySelector('#sidebar-wrapper');
    
    sidebarWrapper.classList.add('class', 'd-none');
    todoForm.classList.remove('d-none');

    if (todoItem) {
        document.getElementById('todo-name').value = todoItem.title;
        document.getElementById('date').value = todoItem.date;
        document.getElementById('starttime').value = todoItem.starttime;
        document.getElementById('endtime').value = todoItem.endtime;
        document.getElementById('todo-description').value = todoItem.description;
    }
    
    const submitButton = document.getElementById('save-btn');
    submitButton.onclick = (e) => handleSubmitTodo(e, todoItem);
}

function closeCreateNewTodoForm() {
    let todoForm = document.querySelector('#sidebar-todo-form');
    let sidebarWrapper = document.querySelector('#sidebar-wrapper');

    todoForm.classList.add('class', 'd-none');
    sidebarWrapper.classList.remove('d-none');
}

function handleSubmitTodo(event, todoItem) {
    event.preventDefault();
    const title = document.getElementById('todo-name').value;
    const date = document.getElementById('date').value;
    const starttime = document.getElementById('starttime').value;
    const endtime = document.getElementById('endtime').value;
    const description = document.getElementById('todo-description').value;
    const todoData = { title, date, starttime, endtime, description }
    if (todoItem) {
        Object.assign(todoItem, todoData);
        console.log(todoItem);
    } else {
        const todoId = uuidv4();
        todo = { id: todoId, ...todoData }
        todos.push(todo);
    }
    document.querySelector('form').reset();

    saveTodosToLocalStorage();
    closeCreateNewTodoForm();
    loadTodos();
    renderTodos();
    renderCalender();
}



// hittade en guid funktion på stackoverflow https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
}

function renderTodos() {
    const accordionContainer = document.querySelector('.todo-list .accordion');
    accordionContainer.innerHTML = "";
    todos.forEach(function(todo) {
        const todoItem = document.createElement('div')
        todoItem.className = 'accordion-item'
        const todoContent = createAccordionElements(todo);
        todoItem.innerHTML = todoContent
        accordionContainer.append(todoItem);
    });
}

function deleteTodo(id) {
    const index = todos.findIndex(todo => todo.id == id);
    todos.splice(index, 1);
    saveTodosToLocalStorage();
    renderTodos();
    renderCalender();
}

/**
 * 
 * @param {string} id 
 */
function editTodo(id) {
    const todoToEdit = todos.find(todo => todo.id == id);
    console.log(todoToEdit);

    openTodoForm(todoToEdit);
}

/**
 * 
 * @param {todo} todo
 * @returns 
 */
function createAccordionElements(todo){
     return `<h2 class="accordion-header" id="heading${todo.id}">
     <button class="accordion-button collapsed " type="button" data-bs-toggle="collapse"
         data-bs-target="#collapse${todo.id}" aria-expanded="true" aria-controls="collapse${todo.id}">
         ${todo.title}
     </button>
 </h2>
 <div id="collapse${todo.id}" class="accordion-body-div  accordion-collapse collapse "  aria-labelledby="heading${todo.id}"
 data-bs-parent="#accordion">
     <div class="accordion-body d-flex flex-column">
         <div class="todo-date-time-info my-3">${todo.date + ' ' + todo.starttime + " - " + todo.endtime}</div>
         <div class="description">${todo.description}</div>
         <!-- mobile buttons -->
         <button onclick="editTodo('${todo.id}')" class="btn edit-btn my-3 d-md-none ">Ändra</button>
         <button onclick="deleteTodo(${todo.id})" class="btn remove-btn d-md-none">Ta Bort</button>
         <!-- Desktop buttons -->
         <div class="d-none d-md-flex justify-content-end" >
             <button onclick="editTodo('${todo.id}')" class=" edit-icon-btn fa-2x"><i class="fas fa-edit"></i></button>
             <button onclick="deleteTodo('${todo.id}')" class="delete-btn remove-icon-btn fa-2x"><i class="fas fa-trash-alt"></i></button>
         </div>
     </div>
 </div>`;
}

function saveTodosToLocalStorage() {
    const sortedTodos = sortTodos(todos)
    localStorage.setItem('todos', JSON.stringify(sortedTodos));
    console.log(todo);
}

function loadTodos() {
    if (localStorage.todos) {
        const localTodos = localStorage.getItem('todos');
        todos = JSON.parse(localTodos);
    }
}

// function saveEditTodo() {
//     console.log('tryckt på save edit');
// }



function sortTodos(todos) {
    const copiedTodoList = [...todos];
    const sortedTodos = copiedTodoList.sort((a, b) => a.date < b.date ? -1 : 1);
    return sortedTodos;
}

function renderSelectedDaysTodos(dayString) {
console.log('du har kommit till renderSelectedDaysTodo');
console.log(dayString);

    const accordionContainer = document.querySelector('.todo-list .accordion');
    accordionContainer.innerHTML = "";
   
    todos.forEach(function(todo) {
        if (todo.date == dayString) {
            
            const todoItem = document.createElement('div')
            todoItem.className = 'accordion-item'
            const todoContent = createAccordionElements(todo);
            todoItem.innerHTML = todoContent
            accordionContainer.append(todoItem);
        }
    });
}

function showAllTodos() {
    renderTodos();
    renderCalender();
}
