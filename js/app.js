// =========================
// INIT
// =========================

document.addEventListener("DOMContentLoaded", initApp);

const sidebarAccordions = document.querySelectorAll(".sidebar-section");

function initApp() {
    
    loadStorage();
    
    showToday();
    
    initList();

    initPriority();

    initCalendar();

    initTask();

    initSidebarAccordion();

    renderLists();

    renderPriority();

    renderPrioritySelect();

    renderTask();

    renderOverdue();

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


function initSidebarAccordion() {

    sidebarAccordions.forEach(section => {

        const button =
            section.querySelector(".accordion-btn");

        const content =
            section.querySelector(".section-content");

        const icon =
            button.querySelector(".chevron-icon");

        button.addEventListener("click", () => {

            content.classList.toggle("hide");

            icon.classList.toggle("rotate");

        });

    });

}