function validate() {
  let form = document.getElementById('form');
  let mail = document.getElementById('email').value;
  let emailAddress = document.getElementById('mail');
  let errorInputText = document.getElementById('error-input');
  const mailValidation = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (mail.match(mailValidation)) {
    emailAddress.classList.add('valid');
    emailAddress.classList.remove('invalid');
    errorInputText.innerHTML = 'Adresse mail invalid. Ex adresse mail valid: jhon@hotmail.com';
    errorInputText.style.color = 	'#FF0000'; 
  } else {
    emailAddress.classList.remove('valid');
    emailAddress.classList.add('invalid');
    errorInputText.innerHTML = 'adresse mail valid';
    errorInputText.style.color = 	'#00FF00'; 
  }
  if (mail === '') {
    emailAddress.classList.remove('valid');
    emailAddress.classList.remove('invalid');
    errorInputText.innerHTML = '';

  }
}
validate();
