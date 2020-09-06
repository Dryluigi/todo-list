const addBtn = document.querySelector(".to-do-submit");
const todoInput = document.querySelector(".to-do-input");
const todoList = document.querySelector(".to-do-list");
const filter = document.querySelector(".filter");


document.addEventListener("DOMContentLoaded", parseLocalTodos);
addBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", removeComplete);
filter.addEventListener("click", filterTodo);

function createTodo(text) {
	// Creating the main element
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("to-do");
	const todoText = document.createElement("p");
	todoText.innerText = text;
	todoDiv.appendChild(todoText);
	// Creating Complete Button
	const completeBtn = document.createElement("button");
	completeBtn.classList.add("complete-btn");
	completeBtn.innerHTML = '<span class="fas fa-check"></span>'
	todoDiv.appendChild(completeBtn);
	// Creating Remove Button
	const removeBtn = document.createElement("button");
	removeBtn.classList.add("remove-btn");
	removeBtn.innerHTML = '<span class="fas fa-trash"></span>'
	todoDiv.appendChild(removeBtn);
	return todoDiv;
}

function addTodo(event) {
	// Prevent form submitting
	event.preventDefault();
	// Prevent null value from getting submitting
	if(todoInput.value == "") return;
	const todoDiv = createTodo(todoInput.value);
	saveLocalStorage(todoInput.value);
	// Appending the Complete Todo Element
	todoList.appendChild(todoDiv);
	// Emptying the Form
	todoInput.value = "";
}

function removeComplete(e) {
	console.log(e.target);
	const item = e.target;

	if(item.classList.contains("complete-btn")){
		item.parentElement.classList.toggle("completed");
	} else if(item.classList.contains("remove-btn")){
		item.parentElement.classList.add("removed");
		item.parentElement.addEventListener("transitionend", () => {
			removeLocalTodo(item.parentElement.childNodes[0].innerText);
			item.parentElement.remove();
		});
	}
}

function filterTodo(e) {
	const todos = todoList.childNodes;
	console.log(todos);

	todos.forEach(todo => {
		if(e.target.value == "all") {
			todo.style.display = "flex";
		}
		if(e.target.value == "completed") {
			if(todo.classList.contains("completed")){
				todo.style.display = "flex";
			} else {
				todo.style.display = "none";
			}
		}
		if(e.target.value == "uncompleted") {
			if(todo.classList.contains("completed")){
				todo.style.display = "none";
			} else {
				todo.style.display = "flex";
			}
		}
	});
}

function saveLocalStorage(todo) {
	let todos = retrieveLocalTodos();
	
	todos.push(todo);
	localStorage.setItem("todos", JSON.stringify(todos));
}

function parseLocalTodos() {
	let todos = retrieveLocalTodos();

	todos.forEach(todo => {
		let todoDiv = createTodo(todo);
		todoList.appendChild(todoDiv);
	})
}

function retrieveLocalTodos() {
	if(localStorage.getItem("todos") === null)
		return [];
	else
		return JSON.parse(localStorage.getItem("todos"));
}

function removeLocalTodo(todo) {
	let todos = retrieveLocalTodos();

	todos.splice(todos.indexOf(todo), 1);
	localStorage.setItem("todos", JSON.stringify(todos));
}