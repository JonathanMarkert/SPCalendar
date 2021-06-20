// const todos = [];

// för att kunna rendera något
const todos = [{
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
    }, {
        id: "3",
        title: "Gå ut med kattskrället", 
        date: "2021-07-03", 
        starttime: "14:30", 
        endtime: "14:33", 
        description: "kort promenad"
    }]


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
    accordionContainer.innerHTML = "";
    // for loop
    todos.forEach(function(todo) {
        const todoItem = document.createElement('div')
        todoItem.className = 'accordion-item'
        const todoContent =
        `<h2 class="accordion-header" id="heading${todo.id}">
            <button class="accordion-button collapsed " type="button" data-bs-toggle="collapse"
                data-bs-target="#collapse${todo.id}" aria-expanded="true" aria-controls="collapse${todo.id}">
                ${todo.title}
            </button>
        </h2>
        <div id="collapse${todo.id}" class="accordion-body-div  accordion-collapse collapse "  aria-labelledby="heading${todo.id}"
        data-bs-parent="#accordionExample">
            <div class="accordion-body d-flex flex-column">
                <div class="todo-date-time-info my-3">${todo.date + ' ' + todo.starttime + " - " + todo.endtime}</div>
                
                <div class="description">${todo.description}</div>
                <!-- mobile buttons -->
                <button class="btn edit-btn my-3 d-md-none ">Ändra</button>
                <button class="btn remove-btn d-md-none">Ta Bort</button>
                <!-- Desktop buttons -->
                <div class="d-none d-md-flex justify-content-end" >
                    <button class=" edit-icon-btn fa-2x"><i class="fas fa-edit"></i></button>
                    <button onclick="deleteTodo(${todo.id})" class="delete-btn remove-icon-btn fa-2x"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>
        </div>`;
        todoItem.innerHTML = todoContent
        accordionContainer.append(todoItem);
    });
    // for loop end
    console.log(todos);
}

function deleteTodo(id) {
    const index = todos.findIndex(todo => todo.id == id);
    todos.splice(index , 1);
    renderTodos();
}



// function deleteTodo(id) {
//     // const id = todo.id;
//     console.log(id)

//     // for (var i = 0; i < todos.length; i++) {
//     //     if(todos[i].id == id) {
//     //         todos.splice(i, 1);
//     //         break;
//     //     }
//     // }
//     // console.log(todos);
//     // renderTodos();
//     // console.log(id);
// }

// function deleteTodo(todo) {
//     const index = todos.indexOf(todo);
//     todos.splice(index, 1);
//     console.log(todos);
//     renderTodos();
// }



// const array = [2, 5, 9];

// console.log(array);

// const index = array.indexOf(5);
// if (index > -1) {
//   array.splice(index, 1);
// }

// // array = [2, 9]
// console.log(array); 