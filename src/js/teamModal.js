import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';

const glide = new Glide('.glide', {
  type: 'slider',
  startAt: 0,
  perView: 1,
  // focusAt: 'center',
});

const openModalLinkEl = document.querySelector('[data-footer="open"]');
const addBodyClassEl = document.querySelector('body');
const modalBoxEl = document.querySelector('.team-member-modal');
const closeBtn = document.querySelector('.team-member-modal__close-btn');

export function onClickEsc(event) {
  if (event.key === 'Escape') {
    modalBoxEl.classList.add('hidden');
  }
}
function closeModal() {
  modalBoxEl.classList.add('hidden');
  addBodyClassEl.classList.remove('stop-scrolling');
}

window.addEventListener('click', e => {
  if (e.target === modalBoxEl) {
    closeModal();
  }
});

export function openModal() {
  modalBoxEl.classList.remove('hidden');
  addBodyClassEl.classList.add('modal-open');
  addBodyClassEl.classList.add('stop-scrolling');
  document.addEventListener('keydown', onClickEsc);

  glide.mount();
  closeBtn.addEventListener('click', closeModal);
}

openModalLinkEl.addEventListener('click', openModal);
