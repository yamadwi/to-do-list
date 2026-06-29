// =========================
// ELEMENT
// =========================

const addPriorityBtn = document.getElementById("addPriorityBtn");
const priorityModal = document.getElementById("priorityModal");

const cancelPriorityBtn = document.getElementById("cancelPriority");

const flagButtons = document.querySelectorAll(".flag-btn");

let selectedPriorityColor = null;

// =========================
// INIT
// =========================

function initPriority() {

    addPriorityBtn.addEventListener("click", openPriorityModal);

    cancelPriorityBtn.addEventListener("click", closePriorityModal);

    flagButtons.forEach(button => {

        button.addEventListener("click", selectFlag);

    });

}

// =========================
// FUNCTION
// =========================

function openPriorityModal() {

    priorityModal.classList.add("show");

}

function closePriorityModal() {

    priorityModal.classList.remove("show");

}

function selectFlag(event) {

    flagButtons.forEach(btn => {

        btn.classList.remove("active");

    });

    event.currentTarget.classList.add("active");

    selectedPriorityColor = event.currentTarget.dataset.color;

}


// =========================
// EVENT
// =========================

// event listener