// =========================
// ELEMENT
// =========================

const taskInput = document.getElementById("taskInput");

const prioritySelect = document.getElementById("prioritySelect");

const addTaskBtn = document.getElementById("addTaskBtn");

const todoContainer = document.getElementById("todoContainer");

const completedContainer = document.getElementById("completedContainer");

const deleteAllBtn = document.getElementById("deleteAllBtn");

const completedAccordion = document.getElementById("completedAccordion");

const taskMenu = document.getElementById("taskMenu");

const editTaskBtn = document.getElementById("editTaskBtn");

const deleteTaskBtn = document.getElementById("deleteTaskBtn");

const editTaskModal = document.getElementById("editTaskModal");

const editTaskInput = document.getElementById("editTaskInput");

const editPrioritySelect = document.getElementById("editPrioritySelect");

const cancelEditTask = document.getElementById("cancelEditTask");

const updateTaskBtn = document.getElementById("updateTaskBtn");

const deleteTaskModal = document.getElementById("deleteTaskModal");

const cancelDeleteTask = document.getElementById("cancelDeleteTask");

const confirmDeleteTaskBtn = document.getElementById("confirmDeleteTask");

const deleteAllModal = document.getElementById("deleteAllModal");

const cancelDeleteAll = document.getElementById("cancelDeleteAll");

const confirmDeleteAllBtn = document.getElementById("confirmDeleteAll");

const overdueContainer = document.getElementById("overdueContainer");

let selectedTaskId = null;


// =========================
// INIT
// =========================

function initTask() {

    addTaskBtn.addEventListener("click", saveTask);

    completedAccordion.addEventListener(
        "click",
        toggleCompleted
    );

    editTaskBtn.addEventListener(
        "click",
        openEditTaskModal
    );
    
    cancelEditTask.addEventListener(
        "click",
        closeEditTaskModal
    );
    
    updateTaskBtn.addEventListener(
        "click",
        updateTask
    );

    cancelDeleteTask.addEventListener(
        "click",
        closeDeleteTaskModal
    );
    
    confirmDeleteTaskBtn.addEventListener(
        "click",
        confirmDeleteTask
    );
    
    deleteTaskBtn.addEventListener(
        "click",
        deleteTask
    );

    deleteAllBtn.addEventListener(
        "click",
        openDeleteAllModal
    );
    
    cancelDeleteAll.addEventListener(
        "click",
        closeDeleteAllModal
    );
    
    confirmDeleteAllBtn.addEventListener(
        "click",
        deleteAllTasks
    );

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

        dueDate: selectedDate,

        completed: false

    });

    saveStorage();

    renderTask();

    renderOverdue();

    taskInput.value = "";

    prioritySelect.value = "";

}

function getPriority(priorityId) {

    return appData.priorities.find(
        priority => priority.id === priorityId
    );

}

function openTaskMenu(event, taskId) {

    event.stopPropagation();

    selectedTaskId = taskId;

    taskMenu.classList.add("show");

    taskMenu.style.left = event.pageX + "px";
    taskMenu.style.top = event.pageY + "px";

}

function renderTask() {

    todoContainer.innerHTML = "";

    completedContainer.innerHTML = "";

    const tasks = appData.tasks.filter(task =>

        task.listId === appData.currentList &&
        !task.completed

    );

    tasks.forEach(task => {

        const priority = getPriority(task.priorityId);

        // =========================
        // Container
        // =========================

        const item = document.createElement("div");

        item.classList.add("task-item");

        // =========================
        // Left
        // =========================

        const left = document.createElement("div");

        left.classList.add("task-left");

        // Checkbox

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.classList.add("task-check");
        
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {

            completeTask(task.id);
        
        });

        // Info

        const info = document.createElement("div");

        info.classList.add("task-info");

        // Title

        const title = document.createElement("div");

        title.classList.add("task-title");

        title.textContent = task.title;

        info.appendChild(title);

        if (task.dueDate) {

            const dueDate = document.createElement("div");
        
            dueDate.classList.add("task-date");
        
            dueDate.textContent = formatTaskDate(task.dueDate);

            if (isOverdue(task)) {

                dueDate.style.color = "#EF4444";
        
            }
        
            info.appendChild(dueDate);
        
        }

        left.appendChild(checkbox);

        left.appendChild(info);

        // =========================
        // Right
        // =========================

        const right = document.createElement("div");

        right.classList.add("task-right");

        // Flag

        const flag = document.createElement("img");

        flag.classList.add("task-flag");

        if (priority) {

            if (priority.color === "#EF4444") {

                flag.src = "assets/red-flag.svg";

            }

            else if (priority.color === "#F59B0B") {

                flag.src = "assets/yellow-flag.svg";

            }

            else {

                flag.src = "assets/blue-flag.svg";

            }

        }

        // Menu

        const menu = document.createElement("button");

        menu.classList.add("task-more");

        const menuIcon = document.createElement("img");

        menuIcon.src = "assets/three-dot.svg";

        menu.appendChild(menuIcon);

        menu.addEventListener("click", (event) => {

            openTaskMenu(event, task.id);
        
        });

        right.appendChild(flag);
        
        right.appendChild(menu);

        // =========================

        item.appendChild(left);

        item.appendChild(right);

        todoContainer.appendChild(item);

    });

    const completedTasks = appData.tasks.filter(task =>

        task.listId === appData.currentList &&
        task.completed
    
    );
    
    completedTasks.forEach(task => {
    
        const priority = getPriority(task.priorityId);
    
        const item = document.createElement("div");
        item.classList.add("task-item");
    
        // LEFT
        const left = document.createElement("div");
        left.classList.add("task-left");
    
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("task-check");
        checkbox.checked = true;
    
        checkbox.addEventListener("change", () => {
    
            completeTask(task.id);
    
        });
    
        const info = document.createElement("div");
        info.classList.add("task-info");
    
        const title = document.createElement("div");
        title.classList.add("task-title");
        title.textContent = task.title;
    
        info.appendChild(title);

        if (task.dueDate) {

            const dueDate = document.createElement("div");
        
            dueDate.classList.add("task-date");
        
            dueDate.textContent = formatTaskDate(task.dueDate);

            if (isOverdue(task)) {

                dueDate.style.color = "#EF4444";
        
            }
        
            info.appendChild(dueDate);
        
        }
    
        left.appendChild(checkbox);
        left.appendChild(info);
    
        // RIGHT
        const right = document.createElement("div");
        right.classList.add("task-right");
    
        if(priority){
    
            const flag = document.createElement("img");
    
            flag.classList.add("task-flag");
    
            if(priority.color === "#EF4444"){
    
                flag.src = "assets/red-flag.svg";
    
            }
    
            else if(priority.color === "#F59B0B"){
    
                flag.src = "assets/yellow-flag.svg";
    
            }
    
            else{
    
                flag.src = "assets/blue-flag.svg";
    
            }
    
            right.appendChild(flag);
    
        }
    
        const menu = document.createElement("button");
    
        menu.classList.add("task-more");
    
        const menuIcon = document.createElement("img");
    
        menuIcon.src = "assets/three-dot.svg";
    
        menu.appendChild(menuIcon);

        menu.addEventListener("click", (event) => {

            openTaskMenu(event, task.id);
        
        });
    
        right.appendChild(menu);
    
        item.appendChild(left);
        item.appendChild(right);
    
        completedContainer.appendChild(item);
    
    });

}

function deleteTask() {

    taskMenu.classList.remove("show");

    deleteTaskModal.classList.add("show");

}

function closeDeleteTaskModal() {

    deleteTaskModal.classList.remove("show");

}

function openDeleteAllModal() {

    deleteAllModal.classList.add("show");

}

function closeDeleteAllModal() {

    deleteAllModal.classList.remove("show");

}

function deleteAllTasks() {

    appData.tasks = appData.tasks.filter(task =>

        task.listId !== appData.currentList

    );

    saveStorage();

    renderTask();

    renderOverdue();

    closeDeleteAllModal();

}

function confirmDeleteTask() {

    appData.tasks = appData.tasks.filter(
        task => task.id !== selectedTaskId
    );

    saveStorage();

    renderTask();

    renderOverdue();

    closeDeleteTaskModal();

}

function openEditTaskModal() {

    const task = appData.tasks.find(
        item => item.id === selectedTaskId
    );

    if (!task) return;

    editTaskInput.value = task.title;

    renderEditPrioritySelect();

    editPrioritySelect.value = task.priorityId;

    editTaskModal.classList.add("show");

    taskMenu.classList.remove("show");

}

function closeEditTaskModal() {

    editTaskModal.classList.remove("show");

    editTaskInput.value = "";

    editPrioritySelect.value = "";

}

function renderEditPrioritySelect() {

    editPrioritySelect.innerHTML = "";

    appData.priorities.forEach(priority => {

        const option = document.createElement("option");

        option.value = priority.id;

        option.textContent = priority.name;

        editPrioritySelect.appendChild(option);

    });

}

function updateTask() {

    const task = appData.tasks.find(
        item => item.id === selectedTaskId
    );

    if (!task) return;

    const title = editTaskInput.value.trim();

    if (!title) return;

    task.title = title;

    task.priorityId = Number(editPrioritySelect.value);

    saveStorage();

    renderTask();

    renderOverdue();

    closeEditTaskModal();

}

function completeTask(id) {

    const task = appData.tasks.find(
        item => item.id === id
    );

    if (!task) return;

    task.completed = !task.completed;

    saveStorage();

    renderTask();

    renderOverdue();

}

function toggleCompleted(){

    completedContainer.classList.toggle("show");

    completedAccordion
        .querySelector(".chevron-icon")
        .classList.toggle("rotate");

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

function renderOverdue() {

    overdueContainer.innerHTML = "";

    const overdueTasks = appData.tasks.filter(task =>
        isOverdue(task)
    );

    overdueTasks.forEach(task => {

        const item = document.createElement("div");

        item.classList.add("list-item");

        const button = document.createElement("button");

        button.classList.add("list-name");

        button.textContent = task.title;

        item.appendChild(button);

        overdueContainer.appendChild(item);

    });

}

function isOverdue(task) {

    if (!task.dueDate) return false;

    if (task.completed) return false;

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const due = new Date(task.dueDate);

    due.setHours(0, 0, 0, 0);

    return due < today;

}

function formatTaskDate(dateString) {

    const date = new Date(dateString);

    return date.toLocaleDateString(
        "en-US",
        {

            month: "short",

            day: "numeric"

        }

    );

}


// =========================
// EVENT
// =========================

document.addEventListener("click", () => {

    taskMenu.classList.remove("show");

});