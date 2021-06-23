
function initTodos() {
    addEventListeners();
    // renderTodos();
}

function addEventListeners() {
    const createButton = document.querySelector('.createButton');
    createButton.addEventListener('click', openTodoForm);
}


function openTodoForm() {
    console.log("click!")
    
    // gömma en div och visa en annan ? 
}

function createNewTodo() {

    renderTodos();
}

function renderTodos() {
    const accordionContainer = document.querySelector('.todo-list .accordion');
    const template = document.querySelector('#accordion-item');
    
    // for loop
        const accordion = template.content.cloneNode(true);
        console.log(accordion);
        // hämta ut
        const dateDiv = accordion.querySelector(".todo-date-time-info");
        dateDiv.innerHTML = todo.text + todo.date.toString()
        
        // dessa två är samma sak för att ändra id.
        dateDiv.id = "asdasdasd";
        dateDiv.setAttribute('id', '#asdasdasd')
        
        dateDiv.setAttribute('data-bs-target', '#aausdajhsh')

        // event till andra knappar
        dateDiv.addEventListener('click', () => deleteTodo(todo))
        accordionContainer.append(accordion);
    // for loop end
    
    // olika syntax för samma sak. localstorage.
    localStorage.todos = []
    localStorage.setItem('todos', [])
}
