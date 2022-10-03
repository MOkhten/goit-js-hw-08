
import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const LOCALE_STORAGE_KEY = 'feedback-form-state';

const formData = {};

populateTextarea();

const onTextareaInput = e => {
  const { name, value } = e.target;
  try {
    let savedMessage = localStorage.getItem(LOCALE_STORAGE_KEY);
    
    if (savedMessage) {
      savedMessage = JSON.parse(savedMessage);
    } else {
      savedMessage = {};
    }
    savedMessage[name] = value;
    const stringifyData = JSON.stringify(savedMessage);
    localStorage.setItem(LOCALE_STORAGE_KEY, stringifyData);
  } catch (error) {}
  
};

formRef.addEventListener('input', throttle(onTextareaInput, 500));
 
function populateTextarea() {
  const savedMessage = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (!savedMessage) {
    return
   }
    try {
      const parseData = JSON.parse(savedMessage);
      Object.entries(parseData).forEach(([name, value]) => {
        formRef.elements[name].value = value;
      });
    } catch (error) {
      console.error(error);
    }
  
  }

const handleSubmit = e => {
  e.preventDefault();

  const { elements: { email, message } } = e.currentTarget;
  console.log({ email: email.value, message: message.value });
  e.currentTarget.reset();
  localStorage.removeItem(LOCALE_STORAGE_KEY);
}

formRef.addEventListener('submit', handleSubmit);
