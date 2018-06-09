const form = document.querySelector('#subscribe-form');

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

    if (isEmail(email)) {
      console.log(true);
    } else {
      console.log(false);
    }
  })
}


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

const currentYear = (new Date()).getFullYear();
document.getElementById('copy').innerHTML = currentYear;

function smoothScroll(target) {
  let scrollContainer = target;
  do { //find scroll container
    scrollContainer = scrollContainer.parentNode;
    if (!scrollContainer) return;
    scrollContainer.scrollTop += 1;
  } while (scrollContainer.scrollTop == 0);

  let targetY = 0;
  do { //find the top of target relatively to the container
    if (target == scrollContainer) break;
    targetY += target.offsetTop;
  } while (target = target.offsetParent);

  scroll = function(c, a, b, i) {
    i++;
    if (i > 30) return;
    c.scrollTop = a + (b - a) / 30 * i;
    setTimeout(function(){ scroll(c, a, b, i); }, 20);
  }
  // start scrolling
  scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}

document.getElementById('join-button').addEventListener('click', () => {
  smoothScroll(document.getElementById('join'));
});
