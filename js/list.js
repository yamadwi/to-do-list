// =========================
// ELEMENT
// =========================

const addListBtn = document.getElementById("addListBtn");
const listModal = document.getElementById("listModal");
const listName = document.getElementById("listName");
const saveListBtn = document.getElementById("saveList");
const cancelListBtn = document.getElementById("cancelList");
const listContainer = document.getElementById("listContainer");

const currentListName = document.getElementById("currentListName");

const listMenu = document.getElementById("listMenu");

let selectedListId = null;

const editListBtn = document.getElementById("editListBtn");
const deleteListBtn = document.getElementById("deleteListBtn");

const editListModal = document.getElementById("editListModal");

const editListName = document.getElementById("editListName");

const cancelEditList = document.getElementById("cancelEditList");

const updateListBtn = document.getElementById("updateListBtn");

const deleteListModal = document.getElementById("deleteListModal");

const cancelDeleteList = document.getElementById("cancelDeleteList");

const confirmDeleteList = document.getElementById("confirmDeleteList");

// =========================
// INIT
// =========================

function initList() {

    addListBtn.addEventListener("click", openListModal);

    cancelListBtn.addEventListener("click", closeListModal);

    saveListBtn.addEventListener("click", saveList);

    editListBtn.addEventListener("click", editList);

    deleteListBtn.addEventListener("click", deleteList);

    cancelEditList.addEventListener("click", closeEditModal);

    updateListBtn.addEventListener("click", updateList);

    cancelDeleteList.addEventListener("click", closeDeleteModal);

    confirmDeleteList.addEventListener("click", confirmDeleteListAction);

}

// =========================
// FUNCTION
// =========================

function openListModal() {

    listModal.classList.add("show");

}

function closeListModal() {

    listModal.classList.remove("show");

    listName.value = "";

}

function saveList() {

    const name = listName.value.trim();

    if (!name)  return;

    appData.lists.push({

        id: Date.now(),

        name: name

    });

    saveStorage();

    renderLists();

    closeListModal();

}

function renderLists() {

    listContainer.innerHTML = "";
    
    appData.lists.forEach(list => {

        // Container
        const listItem = document.createElement("div");
        listItem.classList.add("list-item");

        if (
            appData.currentView === "list" &&
            list.id === appData.currentList
        ) {
            listItem.classList.add("active");
        }

        // Nama List
        const listNameBtn = document.createElement("button");
        listNameBtn.classList.add("list-name");
        listNameBtn.textContent = list.name;

        listNameBtn.addEventListener("click", () => {

            selectList(list.id);

        });

        // Tombol titik tiga
        const menuBtn = document.createElement("button");
        menuBtn.classList.add("list-menu");

        const menuIcon = document.createElement("img");
        menuIcon.src = "assets/three-dot.svg";
        menuIcon.alt = "menu";

        menuBtn.appendChild(menuIcon);

        listItem.appendChild(listNameBtn);
        listItem.appendChild(menuBtn);

        listContainer.appendChild(listItem);

        menuBtn.addEventListener("click", (event) => {

            event.stopPropagation();
        
            selectedListId = list.id;
        
            listMenu.classList.add("show");
        
            listMenu.style.left = event.pageX + "px";
            listMenu.style.top = event.pageY + "px";
        
        });

    });

    const activeList = appData.lists.find(
        list => list.id === appData.currentList
    );

    if (activeList) {

        currentListName.textContent = activeList.name;

    } else {

        currentListName.textContent = "Choose a List";

    }

}

function selectList(id) {

    appData.currentList = id;

    appData.currentView = "list";

    saveStorage();

    renderLists();

    renderPriority();

    renderTask();

    closeSidebar();

}

function editList() {

    const list = appData.lists.find(item => item.id === selectedListId);

    if (!list) return;

    editListName.value = list.name;

    editListModal.classList.add("show");

    listMenu.classList.remove("show");

    openEditModal();

}

function openEditModal(){

    editListModal.classList.add("show");

}

function closeEditModal() {

    editListModal.classList.remove("show");

    editListName.value = "";

}

function updateList() {

    const list = appData.lists.find(
        item => item.id === selectedListId
    );

    if (!list) return;

    const name = editListName.value.trim();

    if (!name) return;

    list.name = name;

    saveStorage();

    renderLists();

    closeEditModal();

}

function deleteList() {

    openDeleteModal();

}

function openDeleteModal() {

    listMenu.classList.remove("show");

    deleteListModal.classList.add("show");

}

function closeDeleteModal() {

    deleteListModal.classList.remove("show");

}

function confirmDeleteListAction() {

    appData.lists = appData.lists.filter(
        item => item.id !== selectedListId
    );

    if (appData.currentList === selectedListId) {

        appData.currentList = null;

    }

    saveStorage();

    renderLists();

    closeDeleteModal();

}

// =========================
// EVENT
// =========================

document.addEventListener("click", () => {

    listMenu.classList.remove("show");

});