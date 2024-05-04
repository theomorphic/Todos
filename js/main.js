
import { pictures as pictures } from "./background.js";

//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const body = document.getElementById("body")
const filterOption = document.querySelector(".filter-todo")

//Event Listeners

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo)

//Functions

function addTodo(e){
	//prevent form from submitting
	e.preventDefault();

	if(todoInput.value.length === 0){
		//Prevent zero task
		todoInput.placeholder = "напиши задачу!"
	}
	else{
		//todo div
		const todoDiv = document.createElement("div");
		todoDiv.classList.add("todo");
		//create li
		const newTodo = document.createElement("li");
		newTodo.classList.add("todo-item");
		newTodo.innerText = todoInput.value;
		// newTodo.innerText = todoInput.value;
		todoDiv.appendChild(newTodo);
		//check button
		const completedButton = document.createElement("button");
		completedButton.classList.add("complete-btn");
		completedButton.innerHTML = '<i class="fas fa-check"></i>';
		todoDiv.appendChild(completedButton);
		//check trash button
		const trashButton = document.createElement("button");
		trashButton.classList.add("trash-btn");
		trashButton.innerHTML = '<i class="fas fa-trash"></i>';
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
		todo.addEventListener("transitionend", function(){
			todo.remove();
		})
	}
	//check mark
	if(item.classList[0] === "complete-btn"){
		const todo = item.parentElement;
		todo.classList.toggle("completed")
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

function filterTodo(e){
	const todos = todoList.childNodes;
	todos.forEach(function(todo){
		switch(e.target.value){
			case "all":
				todo.style.display = "flex";
				break;
			case "completed":
				if(todo.classList.contains("completed")){
					todo.style.display = "flex";
				}else{
					todo.style.display = "none";
				}
				break;
			case "uncompleted":
				if (!todo.classList.contains("completed")){
					todo.style.display = "flex";

				}else{
					todo.style.display = "none";
				}	
				break;	
		}
	})
}