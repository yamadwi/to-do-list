// =========================
// ELEMENT
// =========================

const addPriorityBtn = document.getElementById("addPriorityBtn");
const priorityModal = document.getElementById("priorityModal");

const cancelPriorityBtn = document.getElementById("cancelPriority");

const addFlagButtons = document.querySelectorAll(".add-flag-btn");
const editFlagButtons = document.querySelectorAll(".edit-flag-btn");

let selectedPriorityColor = null;

const priorityMenu = document.getElementById("priorityMenu");

const editPriorityBtn = document.getElementById("editPriorityBtn");

const deletePriorityBtn = document.getElementById("deletePriorityBtn");

let selectedPriorityId = null;

const priorityName = document.getElementById("priorityName");

const savePriorityBtn = document.getElementById("savePriority");

const priorityContainer = document.getElementById("priorityContainer");

const editPriorityModal = document.getElementById("editPriorityModal");
const editPriorityName = document.getElementById("editPriorityName");

const cancelEditPriority = document.getElementById("cancelEditPriority");
const updatePriorityBtn = document.getElementById("updatePriorityBtn");

const deletePriorityModal = document.getElementById("deletePriorityModal");
const cancelDeletePriority = document.getElementById("cancelDeletePriority");
const confirmDeletePriority = document.getElementById("confirmDeletePriority");

// =========================
// INIT
// =========================

function initPriority() {

    addPriorityBtn.addEventListener("click", openPriorityModal);

    cancelPriorityBtn.addEventListener("click", closePriorityModal);

    savePriorityBtn.addEventListener("click", savePriority);

    addFlagButtons.forEach(button => {

        button.addEventListener("click", selectAddFlag);
    
    });
    
    editFlagButtons.forEach(button => {
    
        button.addEventListener("click", selectEditFlag);
    
    });

    editPriorityBtn.addEventListener("click", editPriority);

    deletePriorityBtn.addEventListener("click", deletePriority);

    cancelEditPriority.addEventListener("click", closeEditPriorityModal);

    updatePriorityBtn.addEventListener("click", updatePriority);

    cancelDeletePriority.addEventListener("click", closeDeletePriorityModal);

    confirmDeletePriority.addEventListener("click", confirmDeletePriorityAction);

}

// =========================
// FUNCTION
// =========================

function openPriorityModal() {

    priorityModal.classList.add("show");

}

function closePriorityModal() {

    priorityModal.classList.remove("show");

    priorityName.value = "";

    selectedPriorityColor = null;

    addFlagButtons.forEach(button => {
        button.classList.remove("active");
    });

}

function savePriority(){

    const name = priorityName.value.trim();
       
    if (!name) return;
    
    if (!selectedPriorityColor) return;
    
    appData.priorities.push({
        
        id: Date.now(),
        
        name: name,
        
        color: selectedPriorityColor
        
    });
    
    saveStorage();

    renderPriority();

    renderPrioritySelect();
    
    closePriorityModal();

}

function selectPriority(id){

    appData.currentPriority = id;

    saveStorage();

    renderPriority();

}

function editPriority() {

    const priority = appData.priorities.find(
        item => item.id === selectedPriorityId
    );

    if (!priority) return;

    editPriorityName.value = priority.name;

    selectedPriorityColor = priority.color;

    editFlagButtons.forEach(button => {

        button.classList.remove("active");
    
        if (button.dataset.color === priority.color) {
    
            button.classList.add("active");
    
        }
    
    });

    editPriorityModal.classList.add("show");

    priorityMenu.classList.remove("show");

}

function closeEditPriorityModal() {

    editPriorityModal.classList.remove("show");

    editPriorityName.value = "";

}

function updatePriority() {

    const priority = appData.priorities.find(
        item => item.id === selectedPriorityId
    );

    if (!priority) return;

    const name = editPriorityName.value.trim();

    if (!name) return;

    priority.name = name;

    priority.color = selectedPriorityColor;

    saveStorage();

    renderPriority();

    renderPrioritySelect();;

    closeEditPriorityModal();

}

function openDeletePriorityModal() {

    priorityMenu.classList.remove("show");

    deletePriorityModal.classList.add("show");

}

function closeDeletePriorityModal() {

    deletePriorityModal.classList.remove("show");

}

function deletePriority() {

    openDeletePriorityModal();

}

function confirmDeletePriorityAction() {

    appData.priorities = appData.priorities.filter(
        item => item.id !== selectedPriorityId
    );

    if (appData.currentPriority === selectedPriorityId) {

        appData.currentPriority = null;

    }

    saveStorage();

    renderPriority();

    renderPrioritySelect();

    closeDeletePriorityModal();

}

function selectAddFlag(event) {

    addFlagButtons.forEach(button => {

        button.classList.remove("active");

    });

    event.currentTarget.classList.add("active");

    selectedPriorityColor = event.currentTarget.dataset.color;

}

function selectEditFlag(event) {

    editFlagButtons.forEach(button => {

        button.classList.remove("active");

    });

    event.currentTarget.classList.add("active");

    selectedPriorityColor = event.currentTarget.dataset.color;

}

function renderPriority() {

    priorityContainer.innerHTML = "";

    appData.priorities.forEach(priority => {

        const priorityItem = document.createElement("div");

        priorityItem.classList.add("list-item");

        if (priority.id === appData.currentPriority) {

            priorityItem.classList.add("active");

        }

        const flag = document.createElement("img");

        if (priority.color === "#EF4444") {

            flag.src = "assets/red-flag.svg";

        }

        else if (priority.color === "#F59B0B") {

            flag.src = "assets/yellow-flag.svg";

        }

        else {

            flag.src = "assets/blue-flag.svg";

        }

        flag.classList.add("task-flag");

        const priorityNameBtn = document.createElement("button");

        priorityNameBtn.classList.add("list-name");

        priorityNameBtn.textContent = priority.name;

        priorityNameBtn.addEventListener("click", () => {

            selectPriority(priority.id);

        });
        
        const menuBtn = document.createElement("button");

        menuBtn.classList.add("list-menu");

        const menuIcon = document.createElement("img");

        menuIcon.src = "assets/three-dot.svg";

        menuIcon.alt = "menu";

        menuBtn.appendChild(menuIcon);

        menuBtn.addEventListener("click", (event) => {

            event.stopPropagation();
        
            selectedPriorityId = priority.id;
        
            priorityMenu.classList.add("show");
        
            priorityMenu.style.left = event.pageX + "px";
        
            priorityMenu.style.top = event.pageY + "px";
        
        });

        priorityItem.appendChild(flag);

        priorityItem.appendChild(priorityNameBtn);

        priorityItem.appendChild(menuBtn);

        priorityContainer.appendChild(priorityItem);

    });

    const activePriority = appData.priorities.find(
        priority => priority.id === appData.currentPriority
    );
    
    if (!activePriority) {
    
        appData.currentPriority = null;
    
    }

}


// =========================
// EVENT
// =========================

document.addEventListener("click", () => {

    priorityMenu.classList.remove("show");

});