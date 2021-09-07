import throttle from 'lodash.throttle';

const qs = query => document.querySelector(query);
const feedbackForm = qs('.feedback-form');
const formEmail = qs('[name="email"]');
const formMessage = qs('[name="message"]');

const getLSItemObj = item => JSON.parse(localStorage.getItem(item));

const updateFeedbackFormSate = () => {
 let email = formEmail.value;
  let message = formMessage.value;
  return JSON.stringify({ email, message });
};

const loadLocalStorage = () => {
  let savedInputSate = getLSItemObj('feedback-form-state');
  if (savedInputSate === null) {
    formEmail.value = '';
    formMessage.value = '';
  } else {
    console.log(savedInputSate);
    formEmail.value = savedInputSate.email;
    formMessage.value = savedInputSate.message;
  }
};

const removeLocalStorage = () => {
  event.preventDefault();
  const itemToDelat = getLSItemObj('feedback-form-state');
  if (itemToDelat === null) {
    console.log("Input doesn't exist!");
  } else {
    console.log(itemToDelat.email);
    console.log(itemToDelat.message);
    localStorage.removeItem('feedback-form-state');
    loadLocalStorage(); // clear input form
  }
};

const saveLocalStorage = () =>
  localStorage.setItem('feedback-form-state', updateFeedbackFormSate());

loadLocalStorage();
feedbackForm.addEventListener('input', saveLocalStorage);
feedbackForm.addEventListener('submit', removeLocalStorage);
