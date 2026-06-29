// =========================
// ELEMENT
// =========================

const taskInput = document.getElementById("taskInput");

const prioritySelect = document.getElementById("prioritySelect");

const calendarBtn = document.getElementById("calendarBtn");

const addTaskBtn = document.getElementById("addTaskBtn");

const todoContainer = document.getElementById("todoContainer");

const completedContainer = document.getElementById("completedContainer");

const deleteAllBtn = document.getElementById("deleteAllBtn");


// =========================
// INIT
// =========================

function initTask() {

    addTaskBtn.addEventListener("click", saveTask);

}


// =========================
// FUNCTION
// =========================

function saveTask() {

    const title = taskInput.value.trim();

    const priorityId = Number(prioritySelect.value);

    if (!title) return;

    if (!appData.currentList) {

        alert("Choose a list first.");

        return;

    }

    if (!priorityId) {

        alert("Choose a priority.");

        return;

    }

    appData.tasks.push({

        id: Date.now(),

        title: title,

        listId: appData.currentList,

        priorityId: priorityId,

        dueDate: null,

        completed: false

    });

    saveStorage();

    renderTask();

    taskInput.value = "";

    prioritySelect.value = "";

}

function renderTask() {

    todoContainer.innerHTML = "";

    const tasks = appData.tasks.filter(task =>

        task.listId === appData.currentList &&
        !task.completed

    );

    tasks.forEach(task => {

        const item = document.createElement("div");

        item.classList.add("task-item");

        item.textContent = task.title;

        todoContainer.appendChild(item);

    });

}

function deleteTask() {

}

function updateTask() {

}

function completeTask() {

}

function renderPrioritySelect() {

    prioritySelect.innerHTML = "";

    const defaultOption = document.createElement("option");

    defaultOption.value = "";

    defaultOption.textContent = "Choose Priority";

    prioritySelect.appendChild(defaultOption);

    appData.priorities.forEach(priority => {

        const option = document.createElement("option");

        option.value = priority.id;

        option.textContent = priority.name;

        prioritySelect.appendChild(option);

    });

}


// =========================
// EVENT
// =========================

// event listener