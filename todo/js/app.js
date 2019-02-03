// Императивный стиль

function createElement(tag, props, ...children) {
  const element = document.createElement(tag);

  Object.keys(props).forEach(key => element[key] = props[key]);
  // or
  //Такий спосіб дещо не зручний. Об'єкту крім наших заданих властивостей можуть потрапити властивості
  //які прийшли по наслідству і щоб не додати в html-елемент нічого лишнього, то потрібно ще робити 
  //перевірку на те чи є властивість цього об'єкта його ж чи воно перейшло по наслідству.
  // for(let prop in props) {
  //   if(!props.hasOwnProperty(prop)) continue;
  //   else
  //     element[prop] = props[prop]; //elsment.type = props.type or (.['type']);
  // }

  if (children.length > 0) {
    children.forEach(child => {
      if (typeof child === 'string') {
        child = document.createTextNode(child);
      }
      element.appendChild(child);
    });
  }

  return element;
}

function createTodoItem(title) {
  const checkbox = createElement('input', { type: 'checkbox', className: 'checkbox' });
  const label = createElement('label', { className: 'title' }, title);
  const editInput = createElement('input', { type: 'text', className: 'textfield' });
  const editButton = createElement('button', { className: 'edit' }, 'Edit');
  const deleteButton = createElement('button', { className: 'delete' }, 'Remove');
  const listItem = createElement('li', { className: 'todo-item' }, checkbox, label, editInput, editButton, deleteButton);

  bindEvents(listItem);

  return listItem;
}

function bindEvents(todoItem) {
  const checkbox = todoItem.querySelector('.checkbox');
  const editButton = todoItem.querySelector('button.edit');
  const deleteButton = todoItem.querySelector('button.delete');

  checkbox.addEventListener('change', toggleTodoItem);
  editButton.addEventListener('click', editTodoItem);
  deleteButton.addEventListener('click', deleteTodoItem);
}

var closeWindow = document.querySelector('.closeModal').addEventListener('click', () => {
  document.querySelector('.modalWindow').style.display = 'none';
});

function addTodoItem(event) {
  event.preventDefault();

  //Modal window
  if (addInput.value == '') {
    var window = document.querySelector('.modalWindow').style.display = 'block';
    return false;
  }

  //LocalStorage - search true number start:
  var nId = 0;
  const todoItems = document.querySelectorAll('.todo-item');
  if(todoItems.length > 0) {
    todoItems.forEach(function(item, i, arr) {
      const oldId = item.getAttribute('data-item').slice(8);
      nId = +oldId + 1;
    });
    console.log(nId);
  }
  //-----------------

  const todoItem = createTodoItem(addInput.value);
  todoList.appendChild(todoItem);

  //LocalStorage - add in storage:
  localStorage.setItem('ItemChange_'+nId, '0');
  todoItem.firstElementChild.setAttribute('name', 'ItemChange_'+nId); //add name for checkbox

  var str = addInput.value;
  localStorage.setItem('ItemKey_'+nId, str);
  todoItem.setAttribute('data-item', 'ItemKey_'+nId);
  //-----------------
  
  addInput.value = '';
}

//Add items from LocalStorage while load page:
window.onload = function() {
  var lsLength = localStorage.length;
  if(lsLength > 0) {
    for(var i=0; i<lsLength; i++) {
      var key = localStorage.key(i); //key it is key in LocalStorage
      var value = localStorage.getItem(key); //value it is value in LocalStorage

      if(key.slice(0, 7) == 'ItemKey') {
        const todoItem = createTodoItem(value);
        todoItem.setAttribute('data-item', key);
        todoItem.firstElementChild.setAttribute('name', 'ItemChange_'+key.slice(8)); //for checkbox
        todoList.appendChild(todoItem);
      } /*else if(key.slice(0, 10) == 'ItemChange') {
        console.log('...');
      }*/
    }

    const todoItems = document.querySelectorAll('.todo-item');
    for(var i=0; i<todoItems.length; i++) {
      var attr = todoItems[i].firstElementChild.getAttribute('name');
      if(localStorage.getItem(attr) == '1') {
        const itemCheked = todoItems[i].firstElementChild;
        itemCheked.checked = true;
        toggleTodoItem.call(itemCheked);
      }
    }
  }
}

function toggleTodoItem() {
  const listItem = this.parentNode;
  listItem.classList.toggle('completed');

  //LocalStorage save change item:
  const attr = listItem.firstElementChild.getAttribute('name');
  const isEditing = listItem.classList.contains('completed');
  if(isEditing) {
    localStorage.setItem(attr, '1');
  } else {
    localStorage.setItem(attr, '0');
  }
  //------------------------------
}

function editTodoItem() {
  const listItem = this.parentNode;
  const title = listItem.querySelector('.title');
  const editInput = listItem.querySelector('.textfield');
  const isEditing = listItem.classList.contains('editing');

  if (isEditing) {
    title.innerText = editInput.value;
    this.innerText = 'Edit';
  } else {
    editInput.value = title.innerText;
    this.innerText = 'Save';
  }

  //LocalStorage edit:
  const attr = listItem.getAttribute('data-item');
  localStorage.setItem(attr, title.innerText);
  //-----------------

  listItem.classList.toggle('editing');
}

function deleteTodoItem() {
  const listItem = this.parentNode;
  todoList.removeChild(listItem);

  //delete in LocalStorage:
  localStorage.removeItem(listItem.getAttribute('data-item'));
  localStorage.removeItem(listItem.firstElementChild.getAttribute('name'));
  //-----------------
}

const todoForm = document.getElementById('todo-form');
const addInput = document.getElementById('add-input');
const todoList = document.getElementById('todo-list');
const todoItems = document.querySelectorAll('.todo-item');

function main() {
  todoForm.addEventListener('submit', addTodoItem);
  todoItems.forEach(item => bindEvents(item));
}
main();
