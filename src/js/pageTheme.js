const checkbox = document.querySelector('.checkbox');
const droplist = document.querySelector('.movie-droplist');
import { LocalStorage } from './localStorage';

const libraryLocalStorage = new LocalStorage();
const slider = document.querySelector('.glide__slides');
const footer = document.querySelector('.footer');

const handleCheckbox = () => {
  document.body.classList.toggle('dark');
  droplist?.classList.toggle('dark');
  slider?.classList.toggle('dark');
  footer.classList.toggle('dark');
  if (document.body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
    document.querySelector('.plug') && libraryLocalStorage.markupPlug();
  } else {
    localStorage.removeItem('theme', 'dark');
    document.querySelector('.plug') && libraryLocalStorage.markupPlug();
  }
};

if (localStorage.getItem('theme')) {
  document.body.classList.toggle('dark');
  droplist?.classList.toggle('dark');
  slider?.classList.toggle('dark');
  footer.classList.toggle('dark');
  checkbox.checked = true;
}

checkbox.addEventListener('change', handleCheckbox);
