'use strict';

/*let dataBank = [
    {'task' : 'Estudar JS', 'status' : ''},
    {'task' : 'Netflix', 'status' : 'checked'}
];*/

const getData = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setData = (dataBank) => localStorage.setItem('todoList', JSON.stringify(dataBank))

function createItem(task, status, index) {
    const item = document.createElement('label');
    item.classList.add('todo_item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-index=${index}>
        <div>${task}</div>
        <input type="button" value="x" data-index=${index}>
    `;
    document.getElementById('todo_list').appendChild(item);
}
const clearTasks = () => {
    const todolist = document.getElementById('todo_list');
    while (todolist.firstChild) {
        todolist.removeChild(todolist.lastChild);
    };
}

const displayUpdate = () => {
    clearTasks();
    const dataBank = getData();
    dataBank.forEach((item, index)=> createItem (item.task, item.status, index));
}

const addItem = (event) => {
    const key = event.key;
    const dataBank = getData();
    if (key == 'Enter' && !event.shiftKey) {
        dataBank.push ({'task' : event.target.value, 'status' : ''});
        event.target.value = '';
        setData(dataBank);
        displayUpdate();
    } else if (key == 'Enter' && event.shiftKey) {
        dataBank.push ({'task' : event.target.value, 'status' : 'checked'});
        event.target.value = '';
        setData(dataBank);
        displayUpdate();
    }
};
const removeItem = (index) => {
    const dataBank =getData();
    dataBank.splice(index,1);
    setData(dataBank);
    displayUpdate();
}
const itemUpdate = (index) => {
    const dataBank =getData();
    dataBank[index].status = dataBank[index].status === '' ? 'checked': '';
    setData(dataBank);
    displayUpdate();
};
const clickItem = (event) => {
    const element = event.target;
    if (element.type == 'button') {
        const index = element.dataset.index; 
        removeItem(index);
    } else if (element.type === 'checkbox') {
        const index = element.dataset.index;
        itemUpdate(index);
    }
};

document.getElementById('newItem').addEventListener('keypress', addItem);
document.getElementById('todo_list').addEventListener('click', clickItem);

displayUpdate();