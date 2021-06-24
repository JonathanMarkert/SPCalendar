let isClicked = false;
let monthSelector = 0;
const weekdays = [
  "måndag",
  "tisdag",
  "onsdag",
  "torsdag",
  "fredag",
  "lördag",
  "söndag",
];

function initCalender() {
  renderCalender();
  initButtons();
}

async function renderCalender() {
  const calendarContainer = document.getElementById("calendar");
  const date = new Date();
  if (monthSelector !== 0) {
    date.setMonth(new Date().getMonth() + monthSelector);
  }
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const firstDayOfTheMonth = new Date(year, month, 1);
  const numberOfDaysInMonth = new Date(year, month + 1, 0).getDate();
  const holidayArray = await getAllHolidaysForMonth(year, month);
  const formattedDay = day.toString().padStart(2, "0")
  const thisMonth = month + 1;
    formatMonth = thisMonth.toString().padStart(2, "0");
  const dayString = `${year}-${formatMonth}-`;
  
  const dateString = firstDayOfTheMonth.toLocaleDateString("sv-SE", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const inactiveDays = weekdays.indexOf(dateString.split(", ")[0]);

  document.getElementById(
    "monthDisplay"
  ).innerText = `${date.toLocaleDateString("sv-se", {
    month: "long",
  })} ${year}`;

  calendarContainer.innerHTML = "";

  displayDays(inactiveDays, numberOfDaysInMonth, calendarContainer, year, month, day, holidayArray,dayString);
}

function displayDays(inactiveDays, numberOfDaysInMonth, calendarContainer, year, month, day, holidayArray,dayString) {
  for (let i = 1; i <= inactiveDays + numberOfDaysInMonth; i++) {
    const dateOfI = i - inactiveDays;
    const daySquare = document.createElement("button");
    let numberOfTodos = 0;
    let isHoliday = false;
    let holidayName ="";
    daySquare.classList.add("calendar-button");
    daySquare.setAttribute("id", dateOfI);
    daySquare.addEventListener('click', () => updateSelectedDay(dayString + `${dateOfI}`, daySquare));
    
    if (i > inactiveDays) {
      daySquare.innerText = i - inactiveDays;
      daySquare.classList.add("calendar-weekday");
      
      for (todo of todos) 
      {    
        let todoDate = todo.date.slice(-2);
        let thisDay = dateOfI;
        let activeMonth = todo.date.slice(-5, -3);
        let activeYear = todo.date.slice(-10, -6);
        if (thisDay == todoDate && (month + 1) == activeMonth && year == activeYear) {
          numberOfTodos += 1;
        }        
      }

      if (numberOfTodos > 0) {
        daySquare.innerHTML =
          `${i - inactiveDays} 
            <i id="icon" class="fas fa-calendar"></i>
            <span id="icon-span">${numberOfTodos}</span>`;
      }
      
      for (const holiday of holidayArray) {
        let daysDate = holiday.datum.slice(-2);
        let activeMonth = holiday.datum.slice(-5, -3);
        let activeYear = holiday.datum.slice(-10, -6);
        
        if (dateOfI == daysDate && (month + 1) == activeMonth && year == activeYear) {
          isHoliday = true;
          holidayName = holiday.helgdag
        }
      }     
      
      if (isHoliday) 
      {
          const p = document.createElement("div");
          const textNode =document.createTextNode(holidayName);
          p.appendChild(textNode);
          daySquare.classList.add("holiday");
          p.classList.add("holiday-text")
          daySquare.appendChild(p);
      }

      if (i - inactiveDays === day && monthSelector === 0) {
        daySquare.id = 'currentDay';
      }
    } else {
      daySquare.classList.add("inactive");
    }

    calendarContainer.appendChild(daySquare);
  }
}

function initButtons() {
  document.getElementById("nextButton").addEventListener("click", () => {
    monthSelector++;
    renderCalender();
  });

  document.getElementById("backButton").addEventListener("click", () => {
    monthSelector--;
    renderCalender();
  });
}

async function getAllHolidaysForMonth(year, month) {
  const response = await fetch(`http://sholiday.faboul.se/dagar/v2.1/${year}/${month+1}`)
  const data = await response.json();
  
  const holidayArray = [];
  for (const day of data.dagar) {
    if (day['helgdag']) {
      holidayArray.push(day);
    }
  }
  return holidayArray;
}

function updateSelectedDay(date, daySquare) {
  renderSelectedDaysTodos(date);
  const prevSelected = document.getElementsByClassName("selected-Todo")
  
  if (prevSelected) {
    for (p of prevSelected) {
      p.classList.remove("selected-Todo");
    }
  }
    daySquare.classList.add("selected-Todo");
}

