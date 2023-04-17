import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';

const glide = new Glide('.glide', {
  type: 'carousel',
  startAt: 0,
  perView: 3,
  // focusAt: 'center',
});

const openModalLinkEl = document.querySelector('[data-footer="open"]');
const addBodyClassEl = document.querySelector('body');
const modalBoxEl = document.querySelector('.team-member-modal');
const closeBtn = document.querySelector('.team-member-modal__close-btn');

const liEl = document.querySelector('.glide__slide');
const footerModalEl = document.querySelector('.footer-modal');
const modalEl = document.querySelector('[data-modal-footer]');
const sliderCardBoxEl = document.querySelector('.glide__track');

export function onClickEsc(event) {
  if (event.key === 'Escape') {
    modalBoxEl.classList.add('hidden');
    // addBodyClassEl.classList.remove('modal-open');
    // document.removeEventListener('keydown', onClickEsc);
  }
}
function closeModal() {
  modalBoxEl.classList.add('hidden');
}

export function openModal() {
  modalBoxEl.classList.remove('hidden');
  addBodyClassEl.classList.add('modal-open');
  document.addEventListener('keydown', onClickEsc);
  // footerModalEl.innerHTML = '';
  // const slide = document.querySelector('.glide__slides--footer');

  closeBtn.addEventListener('click', closeModal);

  glide.mount();
}

openModalLinkEl.addEventListener('click', openModal);
