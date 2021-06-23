function initToday() {
    renderDayInfo();
}

function renderDayInfo() {
    const date = new Date();
    const currentWeekday = getWeekday(date);
    const activeMonth = getMonth(date);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const minutesFormatted = minutes.toString().padStart(2, "0");
    const hoursFormatted = hours.toString().padStart(2, "0");
    
    const todayContainer = document.getElementById('today');
    const todayItem = document.createElement('div');
    todayItem.classList.add('today')
    todayContainer.innerHTML = "";
    const todayContent =
        `<p class="mb-1">${currentWeekday}</p>
        <p class="mb-1">${date.getDate()} ${activeMonth}</p>
        <p class="mb-1">${hoursFormatted}:${minutesFormatted}</p>`
    todayItem.innerHTML = todayContent
    todayContainer.append(todayItem);
}

function getWeekday(date) {
    const weekdayIndex = date.getDay();
    switch (weekdayIndex) {
        case 0: return 'Söndag';
        case 1: return 'Måndag';
        case 3: return 'Onsdag';
        case 2: return 'Tisdag';
        case 4: return 'Torsdag';
        case 5: return 'Fredag';
        case 6: return 'Lördag';
    }
}

function getMonth(date){
    const monthIndex = date.getMonth();
    switch(monthIndex) {
        case 0: return 'Januari'
        case 1: return 'Februari'
        case 2: return 'Mars'
        case 3: return 'April'
        case 4: return 'Maj'
        case 5: return 'Juni'
        case 6: return 'Juli'
        case 7: return 'Augusti'
        case 8: return 'September'
        case 9: return 'Oktober'
        case 10: return 'November'
        case 11: return 'December'
    }
}
