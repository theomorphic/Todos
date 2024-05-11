
//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const body = document.getElementById("body")

const pictures = [
	"../img/bg/1.jpg",
	"../img/bg/2.jpg",
	"../img/bg/3.jpg",
	"../img/bg/4.png",
	"../img/bg/5.jpg",

]

//Event Listeners

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
// filterOption.addEventListener("click", filterTodo)

//Functions

function addTodo(e){
	//prevent form from submitting
	e.preventDefault();

	if(todoInput.value.length === 0){
		//Prevent zero task
		todoInput.placeholder = "напиши задачу"
	}
	else{
		//todo div
		const todoDiv = document.createElement("div");
		todoDiv.classList.add("todo");
		//create li
		const newTodo = document.createElement("li");
		newTodo.classList.add("todo-item");
		newTodo.innerText = todoInput.value;
		todoDiv.appendChild(newTodo);
		//localStorage
		saveLocalTodoes(todoInput.value)
		//check trash button
		const trashButton = document.createElement("button");
		trashButton.classList.add("trash-btn");
		trashButton.innerHTML = '<i class="fa-solid fa-square-check"></i>';
		todoDiv.appendChild(trashButton);
		//append to list
		todoList.appendChild(todoDiv);
		todoInput.placeholder = "написать задачу"
	}
	//clear todoInput
	todoInput.value = ""
}

function deleteCheck(e){
	const item = e.target;
	//delete todo
	if(item.classList[0] === "trash-btn"){
		const todo = item.parentElement;
		//Animation
		todo.classList.add("fall")
		removeLocalTodos(todo)
		todo.addEventListener("transitionend", function(){
			todo.remove();
		})
	}
}

function randomArrayNumber(arrayName){
	let lastIndex = arrayName.length;
	const randomNumber = Math.floor(Math.random()*lastIndex);
	return randomNumber;
}

function changeBackgroundImage(){
	body.style.backgroundImage = `url(${pictures[randomArrayNumber(pictures)]})`;	
}
changeBackgroundImage()

function saveLocalTodoes(todo){
	//check the items
	let todos;
	if(localStorage.getItem("todos") === null){
		todos = []
	}else{
		todos = JSON.parse(localStorage.getItem("todos"));
	}

	todos.push(todo);
	localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
	let todos;
	if(localStorage.getItem("todos") === null){
		todos = []
	}else{
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	todos.forEach(function(todo){
	
	//todo div
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");
	//create li
	const newTodo = document.createElement("li");
	newTodo.classList.add("todo-item");
	newTodo.innerText = todo;
	todoDiv.appendChild(newTodo);
	//check trash button
	const trashButton = document.createElement("button");
	trashButton.classList.add("trash-btn");
	trashButton.innerHTML = '<i class="fa-solid fa-square-check"></i>';
	todoDiv.appendChild(trashButton);
	//append to list
	todoList.appendChild(todoDiv);
	})
}

function removeLocalTodos(todo){
	let todos;
	if(localStorage.getItem("todos") === null){
		todos = []
	}else{
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	const todoIndex = todo.children[0].innerText;
	todos.splice(todos.indexOf(todoIndex), 1);
	localStorage.setItem("todos", JSON.stringify(todos));
}