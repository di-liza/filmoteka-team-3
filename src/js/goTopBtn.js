
const scrollBtn = document.getElementById('scroll-up');

scrollBtn.addEventListener('click', onScrollUp);

function onScrollUp() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', function () {
  scrollBtn.hidden = pageYOffset < document.documentElement.clientHeight;
}); 