//declarations 
const inputForm = document.querySelector(".input-form");
const todoList = document.querySelector(".todos");
const remainingTask = document.querySelector(".remaining-task span");
const completeTask = document.querySelector(".completed-task span");

//check for local storage or create a empty todo array
let todos = JSON.parse(localStorage.getItem("todos")) || [];
if (localStorage.getItem("todos")) {
    todos.map((todo) => {
    createTodo(todo);
  });
}


//getting the input field value 
inputForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    var input=document.querySelector('.input');
    var inputValue = input.value;
  //check wheather it empty or not
    if(inputValue!=""){
        const todo ={
            id: new Date().getTime(),
            name: inputValue,
            isCompleted: false
        };
        //set todo in local storage
        todos.push(todo);
        localStorage.setItem("todos",JSON.stringify(todos));
        createTodo(todo);
        inputForm.reset();
        input.focus();
    }
});

function createTodo(todo){
    const todoElement = document.createElement("li");
    todoElement.setAttribute("id",todo.id);
    const todoHTML = `
    <div class="tasks">
        <input type="checkbox" class="checkbox" ${todo.isCompleted ? "checked" : ""}>
    <div class="task-text">
        ${todo.name}
    </div>
    <div class="delete">
        <i class="far fa-trash-alt"></i>
    </div>
    </div>`;
    todoElement.innerHTML = todoHTML;
    todoList.appendChild(todoElement);
    updateCount();
};

//cheking the todo states completed or not.
todoList.addEventListener("input",(e)=>{
    const todoId = e.target.closest("li").id;
    updateTodo(todoId, e.target);
});

// updating todo state completed or not
function updateTodo (todoId,element){
    const todo = todos.find((todo)=> todo.id === parseInt(todoId));
    todo.isCompleted = !todo.isCompleted;
    if(todo.isCompleted){
        element.setAttribute("checked","");
    }
    else{
        element.removeAttribute("checked");
    }
    localStorage.setItem("todos",JSON.stringify(todos));
    updateCount();
};

//deleting a todo

todoList.addEventListener("click",(e)=>{
    if (
        e.target.classList.contains("delete") ||
        e.target.parentElement.classList.contains("delete")
      ){
          
          const todoId = e.target.closest("li").id;
            deleteTodo(todoId);
            console.log("delete todo"+todoId);
      }
});

function deleteTodo(todoId){
    todos = todos.filter((todo)=>todo.id !== parseInt(todoId));
    localStorage.setItem("todos",JSON.stringify(todos));
    document.getElementById(todoId).remove();
    updateCount();
};

function updateCount(){
const totalTodo = todos.length;
const completedTodo = todos.filter((todo)=>todo.isCompleted===true);
remainingTask.textContent = totalTodo - completedTodo.length;
completeTask.textContent = completedTodo.length;
}