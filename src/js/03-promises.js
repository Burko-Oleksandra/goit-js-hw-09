import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
const delayEl = formEl.querySelector('input[name="delay"]');
const stepEl = formEl.querySelector('input[name="step"]');
const amountEl = formEl.querySelector('input[name="amount"]');

formEl.addEventListener('submit', clickOnSubmitBtn);

function clickOnSubmitBtn(event) {
  event.preventDefault();
  let delay = +delayEl.value;
  let step = +stepEl.value;
  for (let i = 1; i <= amountEl.value; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        }, delay);
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
        }, delay);
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}
