const scriptURL = ' https://script.google.com/macros/s/AKfycbwQJuAfT0BIfuerpCYnYyJ53L2NhBtoRLp5PehyFhY-LO2LH_LLmVGAgwtTidg1zw70jQ/exec'

const form = document.forms['contact-form']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! your form is submitted successfully." ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})




