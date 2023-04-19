import { LocalStorage } from './localStorage';

const myLocalStorage = new LocalStorage();

const stylePushButton =
  'background-color: #b92f2c; color: #ffffff; box-shadow: 0px 0px 7px rgba(27, 27, 27, 0.15); border: solid 1px #f4d03f;';

const movieCollection = document.querySelector('.movie-collection');

const buttonLib = {
  watched: document.querySelector('.btn__library-watch'),
  queue: document.querySelector('.btn__library-queue'),
};

getMoviesWatched();

buttonLib.watched.style.cssText = stylePushButton;
buttonLib.watched.addEventListener('click', getMoviesWatched);
buttonLib.queue.addEventListener('click', getMoviesQueue);

function getMoviesWatched() {
  getMovies('watched');
}

function getMoviesQueue() {
  getMovies('queue');
}

// Функція змінює стан кнопок, робе запит у LocalStorage та виводить фільми
function getMovies(watchedOrQueue) {
  if (watchedOrQueue === 'queue') {
    buttonLib.watched.style.cssText = '';
    buttonLib.queue.style.cssText = stylePushButton;
  } else {
    buttonLib.queue.style.cssText = '';
    buttonLib.watched.style.cssText = stylePushButton;
  }
  myLocalStorage.results = JSON.parse(localStorage.getItem(watchedOrQueue));
  myLocalStorage.getMovies(watchedOrQueue);
}
