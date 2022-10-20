import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

const inputData = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const selectedDay = document.querySelector('span[data-days]');
const selectedHours = document.querySelector('span[data-hours]');
const selectedMinutes = document.querySelector('span[data-minutes]');
const selectedSeconds = document.querySelector('span[data-seconds]');
let differenceInTime = null;
let currentDate = null;
let timerOn = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    currentDate = selectedDates[0];
    differenceInTime = currentDate - options.defaultDate;
    if (differenceInTime <= 0) {
      Report.failure('Error', 'Please choose a date in the future', 'Okay');
    } else {
      startBtn.disabled = false;
    }
  },
};

startBtn.addEventListener('click', turnOnTheTimer);
startBtn.disabled = true;

flatpickr(inputData, options);

function turnOnTheTimer() {
  clearInterval(timerOn);
  const date = new Date();
  differenceInTime = currentDate - date;
  console.log(differenceInTime % 1000);
  timerOn = setInterval(() => {
    if (Math.floor(differenceInTime / 1000) === 0) {
      clearInterval(timerOn);
    }
    console.log(Math.floor(differenceInTime / 1000));
    selectedDay.textContent = addLeadingZero(convertMs(differenceInTime).days);
    selectedHours.textContent = addLeadingZero(
      convertMs(differenceInTime).hours
    );
    selectedMinutes.textContent = addLeadingZero(
      convertMs(differenceInTime).minutes
    );
    selectedSeconds.textContent = addLeadingZero(
      convertMs(differenceInTime).seconds
    );
    differenceInTime = differenceInTime - 1000;
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
