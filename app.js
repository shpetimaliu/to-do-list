// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// Function

function addTodo(event){
    // PreventDefault
    event.preventDefault();
    
    // Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create Li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    if(todoInput.value === ''){
        return !todoInput;
    }

    // Add todo to LocalStorage
    saveLocalTodos(todoInput.value);

    //Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = `<i class="fa-solid fa-check"></i>`;
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton);

    //Remove mark button
    const removedButton = document.createElement('button');
    removedButton.innerHTML = `<i class="fa-duotone fa-trash"></i>`;
    removedButton.classList.add('removed-btn');
    todoDiv.appendChild(removedButton);

    //Append to list
    todoList.appendChild(todoDiv);

    // Clear Todo Input Value
    todoInput.value = "";
}


function deleteCheck(e){
    e.preventDefault();

    //Delete todo
    const item = e.target;
    if(item.classList[0] === 'removed-btn') {
        const todo = item.parentElement;

        //Animation 
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
    }

    if(item.classList[0] === 'completed-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed')
    }
};


function filterTodo(e) {
        const todos = todoList.childNodes;

        todos.forEach(function(todo) {
            switch (e.target.value) {
                
                case "all": 
                todo.style.display = "flex";
                    break;

                case "complete": 
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else{
                    todo.style.display = "none";
                }
                break;
                case "uncomplete": 
            if(!todo.classList.contains("completed")){
                todo.style.display = "flex";
            }else{
                todo.style.display = "none";
            }
            } 
        })

}


function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
};

function getTodos(){
    let todos; 
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    
    todos.forEach(function(todo){
    
    //Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create Li
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = `<i class="fa-solid fa-check"></i>`;
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton);

    //Remove mark button
    const removedButton = document.createElement('button');
    removedButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    removedButton.classList.add('removed-btn');
    todoDiv.appendChild(removedButton);

    //Append to list
    todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
};


