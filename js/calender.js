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

function renderCalender() 
{
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

  for (let i = 1; i <= inactiveDays + numberOfDaysInMonth; i++) {
    //  console.log(i);
    const dateOfI = i - inactiveDays;
    const daySquare = document.createElement("button");
    let numberOfTodos = 0;
    daySquare.classList.add("calendar-button");

    // const dayString = `${month+1}/${i- inactiveDays}/${year}`;

    if (i > inactiveDays) {
      daySquare.innerText = i - inactiveDays;

      daySquare.classList.add("calendar-weekday");

      for (todo of todos) {
        //  console.log(todo.date.getDate());
        // console.log("date of I:" + dateOfI);
        // console.log("slice:" + todo.date.slice(-2));
        let daysDate = todo.date.slice(-2);
        let activeMonth = todo.date.slice(-5, -3);
        if (dateOfI == daysDate && (month+1)==activeMonth) {
          numberOfTodos += 1;
        //   console.log("todosadded=" + numberOfTodos);
        //   console.log("month"+month)
        //   console.log("monthsplice:"+activeMonth)
        }

        // console.log(i);
        // console.log(todo.date);
        // if (sameDay(i.date, todo.date)) {
        //     numberOfTodos += 1;
        // }
      }

      if (numberOfTodos > 0) {
        daySquare.innerHTML = 
            `${i - inactiveDays} 
            <i id="icon" class="fas fa-calendar"></i>
            <span id="icon-span">${numberOfTodos}</span>`;

        const todoNumberContainer = document.createElement("div");
        todoNumberContainer.classList.add("todoCalendarIcon");
        daySquare.append(todoNumberContainer);
      }

      //const eventsForDay

      // if (i - inactiveDays === day && monthSelector === 0) {
      //         daySquare.id = 'currentDay';
      //     }
    } 
    
    else {
      daySquare.classList.add("inactive");
    }

    console.log("todos=" + numberOfTodos);

    calendarContainer.appendChild(daySquare);
  }
}

function initButtons() {
  document.getElementById("nextButton").addEventListener("click", () => {
    monthSelector++;
    console.log(monthSelector);
    renderCalender();
  });

  document.getElementById("backButton").addEventListener("click", () => {
    monthSelector--;
    console.log(monthSelector);
    renderCalender();
  });
}

function sameDay(d1, d2) {
  return (
    d1.getFullyear() === d2.getFullyear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}
