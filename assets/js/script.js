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
            case 'Alta':
                priorityColor = 'high'
                break
            case 'Média':
                priorityColor = 'medium'
                break
            case 'Baixa':
                priorityColor = 'low'
                break
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
    }
}