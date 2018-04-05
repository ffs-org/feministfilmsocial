console.log('hello');

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function resolveErrors() {
  document.querySelector('.js-error').innerHTML = '';
}

function validateEmail() {
  document.querySelector('#email').addEventListener('focusout', (e) => {
    const email = e.target.value;
    console.log('email', email);
    if (isEmail(email)) {
      console.log(true);
    } else {
      console.log(false);
    }
  })
}

function hideForm() {

}
const form = document.querySelector('#subscribe-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const name = e.target.name.value;
  if (isEmail(email)) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'subscribe', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
      if (JSON.parse(this.responseText).res === 'ok') {
        form.classList.add('hide');
        document.querySelector('.js-success').innerHTML = 'YAY';
      }
    };
    xhr.send(`email=${email}&name=${name}`);
  } else {
    document.querySelector('.js-error').innerHTML = 'Not valid email';
    e.target.email.addEventListener('focusin', resolveErrors);
    return;
  }
});
