window.addEventListener('load', main);

function main(){
    initTodos();
    initCalender();
    initToday();

    setInterval(() => {
        initToday();
    }, 500);
}