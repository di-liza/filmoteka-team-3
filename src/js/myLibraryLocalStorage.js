import { getGenres } from './genres';
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

// myLocalStorage.results = JSON.parse(localStorage.getItem('watched'));
// myLocalStorage.selectedArray = 'watched';
// myLocalStorage.createMarkupOneCard();

buttonLib.watched.style.cssText = stylePushButton;
buttonLib.watched.addEventListener('click', getMoviesWatched);
buttonLib.queue.addEventListener('click', getMoviesQueue);

function getMoviesWatched() {
  buttonLib.queue.style.cssText = '';
  buttonLib.watched.style.cssText = stylePushButton;
  const movies = localStorage.getItem('watched');
  if (myLocalStorage.isLibraryWatched()) {
    myLocalStorage.results = JSON.parse(movies);
    myLocalStorage.selectedArray = 'watched';
    myLocalStorage.createMarkupOneCard();
    movieCollection.style.pointerEvents = 'auto';
  } else {
    movieCollection.innerHTML = myLocalStorage.plug;
    movieCollection.style.pointerEvents = 'none';
  }
}

function getMoviesQueue() {
  buttonLib.watched.style.cssText = '';
  buttonLib.queue.style.cssText = stylePushButton;
  const movies = localStorage.getItem('queue');
  if (myLocalStorage.isLibraryQueue()) {
    myLocalStorage.results = JSON.parse(movies);
    myLocalStorage.selectedArray = 'queue';
    myLocalStorage.createMarkupOneCard();
    movieCollection.style.pointerEvents = 'auto';
  } else {
    movieCollection.innerHTML = myLocalStorage.plug;
    movieCollection.style.pointerEvents = 'none';
  }
}
