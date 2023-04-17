const checkbox = document.querySelector('.checkbox');
const droplist = document.querySelector('.movie-droplist');
import { LocalStorage } from './localStorage';

const libraryLocalStorage = new LocalStorage();

const handleCheckbox = () => {
  document.body.classList.toggle('dark');
  droplist.classList.toggle('dark');
  if (
    document.body.classList.contains('dark') &&
    droplist.classList.contains('dark')
  ) {
    localStorage.setItem('theme', 'dark');
    document.querySelector('.plug') && libraryLocalStorage.markupPlug();
  } else {
    localStorage.removeItem('theme', 'dark');
    document.querySelector('.plug') && libraryLocalStorage.markupPlug();
  }
};

if (localStorage.getItem('theme')) {
  droplist.classList.toggle('dark');
  document.body.classList.toggle('dark');
  checkbox.checked = true;
}

checkbox.addEventListener('change', handleCheckbox);
