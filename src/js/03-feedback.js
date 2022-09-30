import throttle from "lodash.throttle";

const refs = {
    form: document.querySelector('.feedback-form'),
    textarea: document.querySelector('.feedback-form textarea'),
};

const formData = {};

refs.form.addEventListener('submit', onFormSubmit);
refs.textarea.addEventListener('input', throttle (onTextareaInput, 500));
refs.form.addEventListener('input', e => {
    
    formData[e.target.name] = e.target.value;
    console.log(formData);
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
} )

populateTxtarea();

function onFormSubmit(e) {
    console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
    e.preventDefault();
    e.currentTarget.reset();
    localStorage.removeItem('feedback-form-state');
    
}

function onTextareaInput(e) {
    const message = e.target.value;
    console.log(message);
    localStorage.setItem('feedback-form-state', message);
}

(function populateTxtarea() {
  const data = JSON.parse(localStorage.getItem('feedback-form-state'));
  const email = document.querySelector('.feedback-form input');
  if (data) {
    email.value = data.email;
    textarea.value = data.textarea;
  }
})();

