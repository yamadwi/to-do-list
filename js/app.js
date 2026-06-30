// =========================
// INIT
// =========================

document.addEventListener("DOMContentLoaded", initApp);

const sidebarAccordions = document.querySelectorAll(".sidebar-section");

const menuToggle = document.getElementById("menuToggle");

const sidebar = document.querySelector(".sidebar");

const sidebarOverlay = document.getElementById("sidebarOverlay");

function initApp() {
    
    loadStorage();
    
    showToday();
    
    initList();

    initPriority();

    initCalendar();

    initTask();

    initSidebarAccordion();

    initMobileSidebar();

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

function initMobileSidebar() {

    menuToggle.addEventListener("click", () => {

        sidebar.classList.add("show");

        sidebarOverlay.classList.add("show");

        menuToggle.classList.add("hide");

    });

    sidebarOverlay.addEventListener("click", closeSidebar);

}

function closeSidebar() {

    sidebar.classList.remove("show");

    sidebarOverlay.classList.remove("show");

    menuToggle.classList.remove("hide");

}