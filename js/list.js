// =========================
// ELEMENT
// =========================
// ambil element HTML

const addListBtn = document.getElementById("addListBtn");
const listModal = document.getElementById("listModal");
const listName = document.getElementById("listName");
const saveListBtn = document.getElementById("saveList");
const cancelListBtn = document.getElementById("cancelList");
const listContainer = document.getElementById("listContainer");

const currentListName = document.getElementById("currentListName");

const listMenu = document.getElementById("listMenu");

let selectedListId = null;

// =========================
// INIT
// =========================
// function init

function initList() {

    addListBtn.addEventListener("click", openListModal);

    cancelListBtn.addEventListener("click", closeListModal);

    saveListBtn.addEventListener("click", saveList);

}

// =========================
// FUNCTION
// =========================
// semua function

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

    // const newList = {

    //     id: Date.now(),

    //     name

    // };

    // appData.lists.push(newList);

    renderLists();

    closeListModal();

}

function renderLists() {

    listContainer.innerHTML = "";
    
    appData.lists.forEach(list => {

        // Container
        const listItem = document.createElement("div");
        listItem.classList.add("list-item");

        if (list.id === appData.currentList) {
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

        // Masukin semuanya
        listItem.appendChild(listNameBtn);
        listItem.appendChild(menuBtn);

        listContainer.appendChild(listItem);
        menuBtn.appendChild(menuIcon);

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

    renderLists();

}


// =========================
// EVENT
// =========================

document.addEventListener("click", () => {

    listMenu.classList.remove("show");

});