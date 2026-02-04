const DAYS = document.querySelector('.days');
const HRS = document.querySelector('.hrs');
const MINS = document.querySelector('.mins');
const SECS = document.querySelector('.secs');

const TIMER_SECTION = document.querySelector('.main__img__timer')

const time = () => {
    const countDownDate = new Date("May 26, 2023").getTime();


    let now = new Date().getTime();
    let timeleft = countDownDate - now;
        
    let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    if(days <= 0 && hours <= 0 &&  minutes <= 0 && seconds <= 0 ) {
        TIMER_SECTION.innerHTML = '';
    }
    else {
        DAYS.textContent = days;
        HRS.textContent = hours;
        MINS.textContent = minutes;
        SECS.textContent = seconds; 
    }
  

}
/* time(); */
const myfunc = setInterval(function() {
    time();
}, 1000)