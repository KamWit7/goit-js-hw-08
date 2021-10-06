import throttle from 'lodash.throttle';

const qs = query => document.querySelector(query);
const feedbackForm = qs('.feedback-form');
const formEmail = qs('[name="email"]');
const formMessage = qs('[name="message"]');

const getObjLocalStorage = item => JSON.parse(localStorage.getItem(item));

const loadLocalStorage = () => {
  let savedInputSate = getObjLocalStorage('feedback-form-state');
  if (savedInputSate === null) {
    clearEmailMessage();
  } else {
    console.log(savedInputSate);
    formEmail.value = savedInputSate.email;
    formMessage.value = savedInputSate.message;
  }
};

const removeLocalStorage = eve => {
  eve.preventDefault();
  let itemToDelat = getObjLocalStorage('feedback-form-state');

  if (itemToDelat === null) {
    console.log("Input doesn't exist!");
    alert("Input doesn't exist!");
  } else {
    console.log(itemToDelat.email);
    console.log(itemToDelat.message);
    localStorage.removeItem('feedback-form-state');
    clearEmailMessage();
  }
};

const clearEmailMessage = () => {
  formEmail.value = '';
  formMessage.value = '';
};

const saveLocalStorage = () => localStorage.setItem('feedback-form-state', updateEmailMessage());

const updateEmailMessage = () => {
  let email = formEmail.value;
  let message = formMessage.value;
  return JSON.stringify({ email, message });
};

loadLocalStorage();
feedbackForm.addEventListener('input', throttle(saveLocalStorage, 500));
feedbackForm.addEventListener('submit', removeLocalStorage);
