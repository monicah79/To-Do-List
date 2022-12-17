import './style.css';

const form = document.querySelector('.input-form');
const ul = document.querySelector('.todo-list');
const input = document.querySelector('.top-b');

const saveToLocalStorage = (task, completed, index) => {
  const todo = { task, completed, index };

  const taskArr = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];

  taskArr.push(todo);
  localStorage.setItem('todos', JSON.stringify(taskArr));
};

const delFromLocalStorage = (index) => {
  let taskArr = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];

  taskArr = taskArr.filter((item) => {
    if (item.index !== index) {
      return true;
    }
    return false;
  });

  localStorage.setItem('todos', JSON.stringify(taskArr));
};

const changeLocalStorage = (task, status, index) => {
  let taskArr = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
  taskArr = taskArr.map((item) => {
    if (item.index === index) {
      item.task = task;
      item.completed = status;
    }
    return item;
  });
  localStorage.setItem('todos', JSON.stringify(taskArr));
};

const addTodo = (e) => {
  e.preventDefault();
  const taskArr = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];

  const task = input.value;
  const completed = false;
  const index = (taskArr.length + 1).toString();
  if (task) {
    const li = document.createElement('li');
    li.className = 'li-todo';
    const attr = document.createAttribute('data-index');
    attr.value = index;
    li.setAttributeNode(attr);
    li.innerHTML = `<div class="check">
    <input type="checkbox">
    <div class="parent"><p class="para">${task}</p></div>
</div>
<div>
    <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
    <i class="fa fa-trash" aria-hidden="true"></i>
</div>`;
    ul.appendChild(li);
    const todoObj = {};
    todoObj.task = task;
    todoObj.completed = false;
    todoObj.index = index;

    saveToLocalStorage(task, completed, index);

    input.value = '';

    // delete task
    const optionBtn = li.querySelector('.fa-ellipsis-v');
    const trash = li.querySelector('.fa-trash');
    optionBtn.addEventListener('click', (e) => {
      optionBtn.classList.add('hide');
      trash.classList.add('show');
      const edit = e.target.parentElement.previousElementSibling.lastElementChild.childNodes[0];
      const editInput = document.createElement('input');
      editInput.type = 'text';
      editInput.className = 'changed-task';
      li.classList.add('edit-task');
      editInput.value = edit.textContent;
      const editIndex = e.target.parentElement.parentElement.dataset.index;
      const parentDiv = e.target.parentElement.previousElementSibling.lastElementChild;
      parentDiv.removeChild(edit);
      parentDiv.appendChild(editInput);

      editInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          edit.textContent = editInput.value;

          parentDiv.appendChild(edit);
          parentDiv.removeChild(editInput);
          li.classList.remove('edit-task');
          optionBtn.classList.remove('hide');
          trash.classList.remove('show');
        }
        changeLocalStorage(edit.textContent, completed, editIndex);
      });
    });
    trash.addEventListener('click', () => {
      const task = e.target.parentElement.parentElement;

      const { index } = task.dataset;

      ul.removeChild(li);
      //   if (ul.children.length === 0) {
      //     listContainer.classList.remove('show-container');
      //   }
      delFromLocalStorage(index);
    });
  }
};

form.addEventListener('submit', addTodo);

function createNewListItem(task) {
  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  const label = document.createElement('label');

  checkbox.type = 'checkbox';
  li.innerText = task;

  li.appendChild(checkbox);
  li.appendChild(label);

  return li;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const task = event.target.elements.task.value;
  const li = createNewListItem(task);
  ul.appendChild(li);
  event.target.elements.task.value = '';
});