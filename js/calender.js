

function initCalender() {
    // testThisShit();
    test();
}

function testThisShit(){
    const nr = 0;
    const calenderDate = document.querySelectorAll('datetime');
    for(datetime of calenderDate)
    {
        for(item of todos)
        {
           if (sameDay(item.date, datetime.date)) {
            //    rendera 
    
            const day = document.querySelector('.calendar-grid button'); 
            day.innerHTML = 
            `<div>${nr++}</div>`
           }
            console.log(item.date)
            
        }

    }
    
}



function test(){
    const month = new Date().getMonth();

    for(const i = 1; i < month.length; i++) {
        // const date = new Date()
        // const day = date.day
        const calendarDay = document.querySelector('.calendar-grid');
        calendarDay = ` 
        <button class="calendar-day may calendar-weekday inactive">
        <div>${i}</div>
        </button>`
        
    }
}

/* <time datetime="${month.getDate()}">${day}</time> */

function sameDay(dayOne,dayTwo) {
    return dayOne.getFullYear() === dayTwo.getFullYear() &&
    dayOne.getMonth() === dayTwo.getMonth() &&
    dayOne.getDate() === dayTwo.getDate();
}



