import './style.css';

const form = document.querySelector('.input-form');
const ul = document.querySelector('.todo-list');
const input = document.querySelector('.top-b');

const addTodo = (e) => {
  e.preventDefault;
  const task = input.value;
  const completed = false;
  // const index = (taskArr.length + 1).toString();
  if (task) {
    const li = document.createElement('li');
    li.className = 'li-todo';
    // const attr = document.createAttribute('data-index');
    // attr.value = index;
    // li.setAttributeNode(attr);
    li.innerHTML = `<div class="check">
        <input type="checkbox">
        <p class="para">${task}</p>
    </div>
    <div><i class="fa fa-ellipsis-v" aria-hidden="true"></i></div>`;
    ul.appendChild(li);
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