// =========================
// STORAGE KEY
// =========================

const STORAGE_KEY = "todoApp";

// =========================
// FUNCTION
// =========================

function saveStorage() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(appData)
    );

}

function loadStorage() {

    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) return;

    const parsedData = JSON.parse(data);

    appData.lists = parsedData.lists || [];
    appData.priorities = parsedData.priorities || [];
    appData.tasks = parsedData.tasks || [];

    appData.currentList = parsedData.currentList;
    appData.currentPriority = parsedData.currentPriority;
    appData.currentView = parsedData.currentView || "list";

}