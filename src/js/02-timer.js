import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputRef = document.querySelector('#datetime-picker');
const buttonRef = document.querySelector('[data-start]');
const timerRef = document.querySelector('.timer');
const fieldRef = document.querySelectorAll('.field');
const valueRef = document.querySelectorAll('.value');
let time = null;
let timerId = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
        Notiflix.Notify.failure('Please choose a date in the future');
    } else {
        buttonRef.disabled = false;
        time = selectedDates[0] - Date.now();
        }
    },
};

buttonRef.addEventListener('click', onBtnClick);

inputRef.style.border = '1px solid grey';
inputRef.style.fontSize = '14px';
inputRef.style.height = '25px';
inputRef.style.width = '210px';
timerRef.style.display = 'flex';
timerRef.style.marginRight = '10px';
buttonRef.disabled = true;
buttonRef.style.height = '25px';

fieldRef.forEach(el => {
    el.style.display = 'flex';
    el.style.flexDirection = 'column';
    el.style.marginRight = '10px';
    el.style.marginTop = '20px';
    el.style.alignItems = 'center';
    el.style.textTransform = 'uppercase';
});

valueRef.forEach(el => {
    el.style.fontSize = '40px';
})
    
flatpickr("#datetime-picker", options);

function onBtnClick() {
    timerId = setInterval(() => {
        if (time >= 1000) {
            time -= 1000;
            convertMs(time);
        } else {
            clearInterval(timerId)
        }
    }, 1000)
    buttonRef.disabled = true;
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    valueRef[0].textContent = days;
    valueRef[1].textContent = hours;
    valueRef[2].textContent = minutes;
    valueRef[3].textContent = seconds;
    
    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}