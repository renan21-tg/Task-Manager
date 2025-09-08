let body = document.querySelector('body');
body.addEventListener('keyup', function(event) {
    if (event.code === 'Enter') {
        addTask();
    }
});

const categoryFilter = document.getElementById('category-filter-select');
const sortBy = document.getElementById('sort-by-select');

categoryFilter.addEventListener('change', filterAndSortTasks);
sortBy.addEventListener('change', filterAndSortTasks);


function addTask() {
    let taskName = document.getElementById('name').value;
    let taskCategory = document.getElementById('category').value;
    let taskPriority = document.getElementById('priority').value;
    let taskDate = document.getElementById('date').value;

    if (!taskName || !taskDate || !taskCategory || !taskPriority) {
        alert('Preencha todos os campos');
        return;
    }

    let partData = taskDate.split('-');
    let formattedDate = `${partData[2]}/${partData[1]}/${partData[0]}`;

    let list = document.getElementById('list');
    let priorityColor = '';
    switch (taskPriority) {
        case 'Alta': priorityColor = 'high'; break;
        case 'Média': priorityColor = 'medium'; break;
        case 'Baixa': priorityColor = 'low'; break;
    }

    list.innerHTML += `<li data-category="${taskCategory}" data-priority="${taskPriority}" data-date="${taskDate}">
                            <div class="task-card">
                                <div class="task-info">
                                    <div class="task-title">${taskName}</div>
                                    <div class="task-category">${taskCategory}</div>
                                    <div class="task-date">Data Limite: <span>${formattedDate}</span></div>
                                    <div class="task-btns">
                                        <button class="done-btn">Marcar como Concluida</button>
                                        <button class="delete-btn">Deletar Tarefa</button>
                                    </div>
                                </div>
                                <div class="task-priority-icon">
                                    <div class="icon ${priorityColor}">${taskPriority}</div>
                                </div>
                            </div>
                        </li>`;
    
    document.querySelector('#name').value = '';
    document.querySelector('#date').value = '';
    document.querySelector('#category').selectedIndex = 0;
    document.querySelector('#priority').selectedIndex = 0;

    updateTaskCount();
    filterAndSortTasks();
}

let taskList = document.getElementById('list');
taskList.addEventListener('click', updateTask);

let taskDoneList = document.getElementById('done-list');
taskDoneList.addEventListener('click', updateTask);

function updateTask(event) {
    let clicked = event.target;
    let elementLi = clicked.closest('li');

    // Concluir Task
    if (clicked.classList.contains('done-btn')) {
        let taskCard = clicked.closest('.task-card');
        taskCard.classList.toggle('task-done');

        let doneList = document.getElementById('done-list');
        let doneBtn = taskCard.querySelector('.done-btn');

        if (taskCard.classList.contains('task-done')) {
            doneList.appendChild(elementLi);
            doneBtn.style.display = 'none';
        }
    }

    // Deletar Task
    if (clicked.classList.contains('delete-btn')) {
        elementLi.remove();
    }

    updateTaskCount();
}

function updateTaskCount() {
    let list = document.getElementById('list');
    let taskCount = list.children.length;

    let pendingTask = document.getElementById('pending-tasks');
    pendingTask.textContent = taskCount;
}

function filterAndSortTasks() {
    const categoryValue = categoryFilter.value;
    const sortValue = sortBy.value;
    const list = document.getElementById('list');
    
    let items = Array.from(list.getElementsByTagName('li'));

    if (sortValue !== 'default') {
        items.sort((a, b) => {
            if (sortValue === 'priority') {
                const priorityOrder = { 'Alta': 1, 'Média': 2, 'Baixa': 3 };
                const priorityA = priorityOrder[a.dataset.priority];
                const priorityB = priorityOrder[b.dataset.priority];
                return priorityA - priorityB;
            } else if (sortValue === 'date') {
                const dateA = new Date(a.dataset.date);
                const dateB = new Date(b.dataset.date);
                return dateA - dateB;
            }
            return 0;
        });
    }
    
    list.innerHTML = '';
    items.forEach(item => list.appendChild(item));

    items.forEach(item => {
        const itemCategory = item.dataset.category;
        if (categoryValue === 'default' || itemCategory === categoryValue) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}


let themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', function() {
    let body = document.querySelector('body');
    body.classList.toggle('dark-mode');
    
    let moon = document.getElementById('moon');
    let sun = document.getElementById('sun');

    if (sun.classList.contains('no-display')) {
        sun.classList.remove('no-display');
        moon.classList.add('no-display');
    } else {
        sun.classList.add('no-display');
        moon.classList.remove('no-display');
    }
});