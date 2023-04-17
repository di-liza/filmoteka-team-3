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

function getMovies(watchedOrQueue) {
  let isLibrary;
  if (watchedOrQueue === 'queue') {
    isLibrary = myLocalStorage.isLibraryQueue();
    buttonLib.watched.style.cssText = '';
    buttonLib.queue.style.cssText = stylePushButton;
  } else {
    isLibrary = myLocalStorage.isLibraryWatched();
    buttonLib.queue.style.cssText = '';
    buttonLib.watched.style.cssText = stylePushButton;
  }
  const movies = localStorage.getItem(watchedOrQueue);
  if (isLibrary) {
    myLocalStorage.results = JSON.parse(movies);
    myLocalStorage.selectedArray = watchedOrQueue;
    myLocalStorage.createMarkupCards();
    movieCollection.style.pointerEvents = 'auto';
  } else {
    myLocalStorage.markupPlug();
  }
}
