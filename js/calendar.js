// =========================
// ELEMENT
// =========================

const calendarBtn = document.getElementById("calendarBtn");

const calendarPopup = document.getElementById("calendarPopup");

const calendarTitle = document.getElementById("calendarTitle");

const calendarDays = document.getElementById("calendarDays");

const prevMonth = document.getElementById("prevMonth");

const nextMonth = document.getElementById("nextMonth");


// =========================
// VARIABLE
// =========================

const today = new Date();

let currentMonth = today.getMonth();

let currentYear = today.getFullYear();

let selectedDate = null;


// =========================
// INIT
// =========================

function initCalendar(){

    calendarBtn.addEventListener(
        "click",
        openCalendar
    );

    prevMonth.addEventListener(
        "click",
        previousMonth
    );

    nextMonth.addEventListener(
        "click",
        nextMonthHandler
    );

}


// =========================
// FUNCTION
// =========================

function openCalendar(event){

    event.stopPropagation();

    calendarPopup.classList.add("show");

    calendarPopup.style.left =
    event.pageX - 260 + "px";

    calendarPopup.style.top =
    event.pageY + 40 + "px";

    renderCalendar();

}

function renderCalendar(){

    const monthNames = [

        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"

    ];

    calendarTitle.textContent =
        `${monthNames[currentMonth]} ${currentYear}`;
    
    calendarDays.innerHTML = "";

    const firstDay =
    new Date(currentYear, currentMonth, 1).getDay();

    const lastDate =
    new Date(currentYear, currentMonth + 1, 0).getDate();

    for(let i = 0; i < firstDay; i++){

        const empty = document.createElement("div");
    
        calendarDays.appendChild(empty);
    
    }

    for(let day = 1; day <= lastDate; day++){

        const date = document.createElement("div");
    
        date.classList.add("calendar-day");
    
        date.textContent = day;

        date.addEventListener("click", () => {

            selectDate(day);
    
        });
    
        calendarDays.appendChild(date);
    
    }

}

function selectDate(day) {

    selectedDate = new Date(
        currentYear,
        currentMonth,
        day
    ).toISOString();

    calendarPopup.classList.remove("show");

}

function previousMonth(event){

    currentMonth--;

    if(currentMonth < 0){

        currentMonth = 11;

        currentYear--;

    }

    renderCalendar();

}

function nextMonthHandler(event){

    currentMonth++;

    if(currentMonth > 11){

        currentMonth = 0;

        currentYear++;

    }

    renderCalendar();

}


// =========================
// EVENT
// =========================

document.addEventListener("click", () => {

    calendarPopup.classList.remove("show");

});

calendarPopup.addEventListener("click", (event) => {

    event.stopPropagation();

});