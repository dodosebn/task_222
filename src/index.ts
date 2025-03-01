
type Todo = {
    id: number;
    text: string;
    completed: boolean;
};

const todoInput = document.getElementById('todoInput') as HTMLInputElement;
const todoOutput = document.getElementById('todoOutput') as HTMLDivElement;
const todoForm = document.getElementById('todoForm') as HTMLFormElement;
const completedCountDisplay = document.getElementById('completedCountDisplay') as HTMLDivElement;
const deleteCompletedButton = document.getElementById('deleteCompletedButton') as HTMLButtonElement;
const deleteCompTasks = document.getElementById('delCompBtn') as HTMLButtonElement;
let todos: Todo[] = [];
let completedCount: number = 0;
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
});

deleteCompletedButton.addEventListener('click', deleteCompletedTodos);

function addTodo(): void {
    if (todoInput.value.trim() !== '') {
        const newTodo: Todo = {
            id: Date.now(),
            text: todoInput.value.trim(),
            completed: false
        };

        todos.push(newTodo);
        todoInput.value = '';
        displayTodos();
        updateCompletedCount();
    }
}

function displayTodos(): void {
    todoOutput.innerHTML = '';

    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.className = 'todo-item';

        const todoText = document.createElement('span');
        todoText.textContent = todo.text;
        todoText.className = todo.completed ? 'completed' : '';

        const editButton = document.createElement('button');
        editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
        editButton.addEventListener('click', () => editTodo(todo.id));

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
        deleteButton.addEventListener('click', () => deleteTodo(todo.id));

        const completeButton = document.createElement('button');
        completeButton.textContent = todo.completed ? 'Undo Complete' : 'Complete';

        completeButton.addEventListener('click', () => toggleComplete(todo.id));

        todoItem.appendChild(todoText);
        todoItem.appendChild(editButton);
        todoItem.appendChild(deleteButton);
        todoItem.appendChild(completeButton);

        todoOutput.appendChild(todoItem);
    });
}

function editTodo(id: number): void {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
        const todo = todos[todoIndex];
        
        const textarea = document.createElement('textarea');
        textarea.value = todo.text;
        textarea.addEventListener('blur', () => {
            if (textarea.value.trim() !== '') {
                todos[todoIndex] = { ...todo, text: textarea.value.trim() };
                displayTodos();
                updateCompletedCount();
            }
        });

        const todoItem = document.querySelector(`.todo-item:nth-child(${todoIndex + 1})`);
        if (todoItem) {
            todoItem.replaceChild(textarea, todoItem.firstChild as Node);
            textarea.focus();
        }
    }
}

function deleteTodo(id: number): void {
    todos = todos.filter(todo => todo.id !== id);
    displayTodos();
    updateCompletedCount();
}

function toggleComplete(id: number): void {
    todos = todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    displayTodos();
    updateCompletedCount();
}

function updateCompletedCount(): void {
    completedCount = todos.filter(todo => todo.completed).length;
    completedCountDisplay.textContent = `Completed Tasks: ${completedCount}`;
    console.log(`Completed Tasks: ${completedCount}`);
}

function deleteCompletedTodos(): void {
    todos = todos.filter(todo => !todo.completed);
    displayTodos();
    updateCompletedCount();
}