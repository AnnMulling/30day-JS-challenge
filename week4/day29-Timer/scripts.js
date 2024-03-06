
let countDown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    //clear existing timer
    clearInterval(countDown)
    const now = Date.now(); //millisecond
    const then = now + seconds * 1000;
    //display time function will immediately run once
    displayTimeLeft(seconds);
    displayEndTime(then)
    //set interval this will not run immediately
    countDown = setInterval(() => {
        const secondLeft = Math.round((then - Date.now()) / 1000);
        //check if we should stop
        if (secondLeft <= 0 ) {
             clearInterval(countDown);
             console.log('stopped')
             return
        }
        displayTimeLeft(secondLeft);
        //then runs again after the setInterval runs
        console.log(secondLeft)
    },1000);

};

function displayTimeLeft(seconds){
    const minuites = Math.floor(seconds / 60);
    const remainderSecond = seconds % 60;

    const display = `${minuites}:${remainderSecond < 10 ? 0 : ""}${remainderSecond}`;
    timerDisplay.textContent = display;

    document.title = display

    console.log({minuites, remainderSecond})
};

function displayEndTime(timeStamp) {
    const end = new Date(timeStamp);
    const hour = end.getHours();
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    const minutes = end.getMinutes();

    endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;

};

function startTimer() {
    const seconds = this.dataset.time;
    timer(seconds)
};

buttons.forEach((button) => button.addEventListener('click', startTimer))
document.customForm.addEventListener('submit', function(e){
    e.preventDefault();
    const min = this.minutes.value;
    timer(min * 60);
    this.reset();

    console.log(e , this)
});
