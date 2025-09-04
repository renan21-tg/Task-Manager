let body = document.querySelector('body')
body.addEventListener('keyup', function(event) {
    if (event.code === 'Enter') {
        addTask ()
    }
})

function addTask () {
    let taskName = document.getElementById('name').value
    let taskCategory = document.getElementById('category').value
    let taskPriority = document.getElementById('priority').value
    let taskDate = document.getElementById('date').value

    if (!taskName || !taskDate || !taskCategory || !taskPriority) {
        alert('Preencha todos os campos')
    } else {
        partData = taskDate.split('-')
        taskDate = `${partData[2]}/${partData[1]}/${partData[0]}`

        let list = document.getElementById('list')

        let priorityColor = ''

        switch (taskPriority) {
            case 'Alta': priorityColor = 'high'; break
            case 'Média': priorityColor = 'medium'; break
            case 'Baixa': priorityColor = 'low'; break
        }

        list.innerHTML += `<li>
                                <div class="task-card">
                                    <div class="task-info">
                                        <div class="task-title">${taskName}</div>
                                        <div class="task-category">${taskCategory}</div>
                                        <div class="task-date">Data Limite: <span>${taskDate}</span></div>
                                        <div class="task-btns">
                                            <button class="done-btn">Marcar como Concluida</button>
                                            <button class="delete-btn">Deletar Tarefa</button>
                                        </div>
                                    </div>
                                    <div class="task-priority-icon">
                                        <div class="icon ${priorityColor}">${taskPriority}</div>
                                    </div>
                                </div>
                            </li> `
        
        document.querySelector('#name').value = ' '
        document.querySelector('#date').value = ' '
        document.querySelector('#category').selectedIndex = 0;
        document.querySelector('#priority').selectedIndex = 0;

        updateTaskCount()
    }
}

let taskList = document.getElementById('list')
taskList.addEventListener('click', updateTask)

let taskDoneList = document.getElementById('done-list')
taskDoneList.addEventListener('click', updateTask)

function updateTask (event) {
    let clicked = event.target

    // Concluir Task
    if (clicked.classList.contains('done-btn')) {
        let taskCard = clicked.closest('.task-card')
        taskCard.classList.toggle('task-done')

        let elementLi = clicked.closest('li')
        let doneList = document.getElementById('done-list')
        let doneBtn = taskCard.querySelector('.done-btn')

        if (taskCard.classList.contains('task-done')) {
            doneList.appendChild(elementLi)
            doneBtn.style.display = 'none'
        }
    }

    // Deletar Task
    if (clicked.classList.contains('delete-btn')) {
        let listElement = clicked.closest('li')
        listElement.remove()
    }

    updateTaskCount ()
}

function updateTaskCount () {
    let list = document.getElementById('list')
    let taskCount = list.children.length

    let pendingTask = document.getElementById('pending-tasks')
    pendingTask.textContent = taskCount

}

let themeToggle = document.getElementById('theme-toggle')
themeToggle.addEventListener('click', function() {
    let body = document.querySelector('body')
    body.classList.toggle('dark-mode')
})