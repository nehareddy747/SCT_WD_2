let startTime, updatedTime, difference, tInterval;
let running = false;
let hours = 0, minutes = 0, seconds = 0, milliseconds = 0;
let lapCounter = 1;

const displayHours = document.getElementById('hours');
const displayMinutes = document.getElementById('minutes');
const displaySeconds = document.getElementById('seconds');
const displayMilliseconds = document.getElementById('milliseconds');
const lapList = document.getElementById('lapList');

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        running = true;
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    milliseconds = Math.floor((difference % 1000) / 10);
    seconds = Math.floor((difference / 1000) % 60);
    minutes = Math.floor((difference / (1000 * 60)) % 60);
    hours = Math.floor(difference / (1000 * 60 * 60));

    displayHours.innerHTML = format(hours);
    displayMinutes.innerHTML = format(minutes);
    displaySeconds.innerHTML = format(seconds);
    displayMilliseconds.innerHTML = format(milliseconds);
}

function format(value) {
    return value < 10 ? '0' + value : value;
}

function pauseTimer() {
    clearInterval(tInterval);
    running = false;
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    hours = 0;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    displayHours.innerHTML = '00';
    displayMinutes.innerHTML    = '00';
    displaySeconds.innerHTML = '00';
    displayMilliseconds.innerHTML = '00';
    lapList.innerHTML = '';
    lapCounter = 1;
}

function addLap() {
    if (running) {
        const lapTime = `${format(hours)}:${format(minutes)}:${format(seconds)}:${format(milliseconds)}`;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter++}: ${lapTime}`;
        lapList.appendChild(lapItem);
    }
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', addLap);