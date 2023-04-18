const checkbox = document.querySelector('.checkbox');
const droplist = document.querySelector('.movie-droplist');
const slider = document.querySelector('.glide__slides');
const footer = document.querySelector('.footer');
const authModal = document.querySelector('.authorization-modal');
const cross = document.querySelector('.team-member-modal__close-btn');
import { LocalStorage } from './localStorage';

const libraryLocalStorage = new LocalStorage();

const handleCheckbox = () => {
  turnToggle();
  if (document.body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
    cross.style.cssText =
      'stroke: var(--base-white); border-color: var(--base-white)';
    document.querySelector('.plug') && libraryLocalStorage.markupPlug();
  } else {
    localStorage.removeItem('theme', 'dark');
    cross.style.cssText = 'stroke: inherit; border-color: inherit';
    document.querySelector('.plug') && libraryLocalStorage.markupPlug();
  }
};

if (localStorage.getItem('theme')) {
  turnToggle();
  cross.style.cssText =
    'stroke: var(--base-white); border-color: var(--base-white)';
  checkbox.checked = true;
}

checkbox.addEventListener('change', handleCheckbox);

function turnToggle() {
  document.body.classList.toggle('dark');
  droplist?.classList.toggle('dark');
  slider?.classList.toggle('dark');
  footer.classList.toggle('dark');
  authModal.classList.toggle('dark');
}
