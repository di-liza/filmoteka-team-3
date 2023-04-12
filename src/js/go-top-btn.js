// <!-- JS кнопка вверх -->
let btnTop = document.querySelector('#toTop');
btnTop.addEventListener('click', function(event) {
  event.preventDefault();
  scrollToTop();
});

window.addEventListener('scroll', function () {
  if (window.scrollY > 100) {
    btnTop.classList.add('show__button');
  } else {
    btnTop.classList.remove('show__button');
  }
});


