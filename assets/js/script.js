function addTask () {
    let taskName = document.getElementById('name').value
    let taskCategory = document.getElementById('category').value
    let taskPriority = document.getElementById('priority').value
    let taskDate = document.getElementById('date').value

    if (!taskName || !taskDate) {
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

        let listItem = document.createElement('li')

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
    }
}


let taskList = document.getElementById('list')
taskList.addEventListener('click', function(event) {
    let clicked = event.target

    // Concluir Task
    if (clicked.classList.contains('done-btn')) {
        let taskCard = clicked.closest('.task-card')
        taskCard.classList.toggle('task-done')

        let elementLi = clicked.closest('li')
        let doneList = document.getElementById('done-list')
        if (taskCard.classList.contains('task-done')) {
            doneList.appendChild(elementLi)
        }
    }

    // Deletar
    if (clicked.classList.contains('delete-btn')) {
        let listElement = clicked.closest('li')
        listElement.remove()
    }
}) 