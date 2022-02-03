const startBtnRef = document.querySelector('[data-start]');
const stopBtnRef = document.querySelector('[data-stop]');
const bodyRef = document.querySelector('body')
let timerId = null;

stopBtnRef.disabled = true;
startBtnRef.style.width = '100px';
startBtnRef.style.height = '50px';
stopBtnRef.style.width = '100px';
stopBtnRef.style.height = '50px';

startBtnRef.addEventListener('click', onStartBtnClick);
stopBtnRef.addEventListener('click', onStopBtnClick);

function onStartBtnClick(event) {
    timerId = setInterval(() => { bodyRef.setAttribute('style', `background-color: ${getRandomHexColor()};`) }, 1000)
    startBtnRef.disabled = true;
    stopBtnRef.disabled = false;
    }

function onStopBtnClick(event) {
    clearInterval(timerId);
    startBtnRef.disabled = false;
    stopBtnRef.disabled = true;
    }

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}