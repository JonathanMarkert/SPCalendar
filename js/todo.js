// const todos = [];

// för att kunna rendera något
let todos = [
    {
    // index/guid
        id: "1",
        title: "Städa", 
        date: "2021-07-01", 
        starttime: "13:30", 
        endtime: "15:27", 
        description: "noga under sängen"
    }, {
        id: "2",
        title: "Gå ut med hunden", 
        date: "2021-07-02", 
        starttime: "16:30", 
        endtime: "17:27", 
        description: "lång promenad"
    }
]

function initTodos() {
    addEventListeners();
    // rendera direkt man kör programmet
    renderTodos();
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

    sidebarWrapper.classList.add('class', 'd-none');
    todoForm.classList.remove('d-none');
}

function closeCreateNewTodoForm() {
    let todoForm = document.querySelector('#sidebar-todo-form');
    let sidebarWrapper = document.querySelector('#sidebar-wrapper');

    todoForm.classList.add('class', 'd-none');
    sidebarWrapper.classList.remove('d-none');
}

function handleSubmit(event) {
    event.preventDefault();
    const todoId = uuidv4();
    const todoTitle = document.getElementById('todo-name').value;
    const todoDate = document.getElementById('date').value;
    const todoStarttime = document.getElementById('starttime').value;
    const todoEndtime = document.getElementById('endtime').value;
    const todoDescription = document.getElementById('todo-description').value;
    todo = { id: todoId, title: todoTitle, date: todoDate, starttime: todoStarttime, endtime: todoEndtime, description: todoDescription }
    todos.push(todo);
    console.log(todo);
    document.querySelector('form').reset();

    // stänger create fönstret
    closeCreateNewTodoForm();
    // renderar om listan
    renderTodos();
}

// hittade en guid funktion på stackoverflow https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

// renderar todo när todo är hårdkodad
function renderTodos() {
    const accordionContainer = document.querySelector('.todo-list .accordion');
    accordionContainer.innerHTML = 
    `<template id="accordion-item">
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button collapsed " type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Accordion Item #1
                </button>
            </h2>
            <div id="collapseOne" class="accordion-body-div  accordion-collapse collapse "  aria-labelledby="headingOne"
                data-bs-parent="#accordionExample">
                <div class="accordion-body d-flex flex-column">
                    <div class="todo-date-time-info my-3">1 juni 2021 kl. 13.00 - 14.00</div>
                    
                    <div class="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore facere fuga officiis quas molestias necessitatibus iste, quisquam dolore repudiandae voluptatem quibusdam, sapiente, explicabo sunt perspiciatis magnam. Voluptates possimus dignissimos modi.</div>
                <!-- mobile buttons -->
                    <button class="btn edit-btn my-3 d-md-none ">Ändra</button>
                    <button class="btn remove-btn d-md-none">Ta Bort</button>
                    <!-- Desktop buttons -->
                    <div class="d-none d-md-flex justify-content-end" >
                        <button class=" edit-icon-btn fa-2x"><i class="fas fa-edit"></i></button>
                        <button class="delete-btn remove-icon-btn fa-2x"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </template>`;
    const template = document.querySelector('#accordion-item');
    
    // for loop
    for (todo of todos) {
        
        const accordion = template.content.cloneNode(true);
        // console.log(accordion);
        // hämta ut
        const accordionHeaderH2 = accordion.querySelector(".accordion-header");
        accordionHeaderH2.id = 'heading' + todo.id;
        
        const accordionHeader = accordion.querySelector(".accordion-header button");
        accordionHeader.setAttribute('data-bs-target', '#collapse' + todo.id)
        accordionHeader.setAttribute('aria-controls', 'collapse' + todo.id)
        
        
        const accordionBody = accordion.querySelector(".accordion-body-div");
        accordionBody.id = 'collapse' + todo.id;
        accordionBody.setAttribute('aria-labelledby', 'heading' + todo.id);
        
        accordionHeader.innerHTML = todo.title;
        
        const dateDiv = accordion.querySelector(".todo-date-time-info");
        dateDiv.innerHTML = todo.date + ' ' + todo.starttime + " - " + todo.endtime;
        
        const descriptionDiv = accordion.querySelector(".description");
        descriptionDiv.innerHTML = todo.description;
        
        // event till andra knappar
        // const deleteButton = accordion.querySelector(".delete-btn");
        // deleteButton.addEventListener('click', () => deleteTodo(todo));
        accordionContainer.append(accordion);
    }
    // for loop end
    console.log(todos);

    
    // olika syntax för samma sak. localstorage.
    // localStorage.todos = []
    // localStorage.setItem('todos', [])
}



