console.log('Client JavaScript loaded');

const weatherForm = document.querySelector('form');
const locationInput = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  messageOne.textContent = 'Loading...';
  const location = locationInput.value;
  fetch(`http://localhost:3001/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if(data.error) messageOne.textContent = data.error;
      else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    })
  });
  console.log(location);
  console.log(weatherForm);
});
