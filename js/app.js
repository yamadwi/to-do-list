// =========================
// INIT
// =========================

document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
    
    loadStorage();
    
    showToday();
    
    initList();

    initPriority();

    renderLists();
}

// =========================
// FUNCTION
// =========================

function showToday() {

    const todayName = document.getElementById("todayName");
    const todayDate = document.getElementById("todayDate");

    const today = new Date();

    const day = today.toLocaleDateString("en-US", {
        weekday: "long"
    });

    const date = today.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    todayName.textContent = day;
    todayDate.textContent = date;

}
