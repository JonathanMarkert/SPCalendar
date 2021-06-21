let monthSelector = 0;
const weekdays = ['måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag', 'söndag'];

function initCalender() {
    renderCalender()
    initButtons()
}

function renderCalender() {
    const calendarContainer = document.getElementById('calendar');
    const date = new Date();
    if (monthSelector !== 0) {
        date.setMonth(new Date().getMonth() + monthSelector);
    }
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const firstDayOfTheMonth = new Date(year, month, 1);
    const numberOfDaysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfTheMonth.toLocaleDateString('sv-SE', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
    const inactiveDays = weekdays.indexOf(dateString.split(', ')[0]);
    
    document.getElementById('monthDisplay').innerText = `${date.toLocaleDateString('sv-se', {month: 'long'})} ${year}`;
    
    calendarContainer.innerHTML = '';
    
    for (let i = 1; i <= inactiveDays + numberOfDaysInMonth; i++) {
        const daySquare = document.createElement('button');
        daySquare.classList.add('calendar-button')
        
        // const dayString = `${month+1}/${i- inactiveDays}/${year}`;

        if (i > inactiveDays ) {
            daySquare.innerText = i - inactiveDays;
            daySquare.classList.add('calendar-weekday')
            //const eventsForDay

            // if (i - inactiveDays === day && nav === 0) {
            //     daySquare.id = 'currentDay';
            // }
        }
        // else if() {
        //
        // }

        else {
            daySquare.classList.add('inactive');
        }
        
    

        calendarContainer.appendChild(daySquare);
    }
}

function initButtons(){
    document.getElementById('nextButton').addEventListener('click', () => {
    monthSelector++;
    console.log(monthSelector);
    renderCalender();
});

document.getElementById('backButton').addEventListener('click', () => {
    monthSelector--;
    console.log(monthSelector);
    renderCalender();
  });
}



