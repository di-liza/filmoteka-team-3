import { LocalStorage } from './localStorage';
import Pagination from 'tui-pagination';

const myLocalStorage = new LocalStorage();

const stylePushButton =
  'background-color: #b92f2c; color: #ffffff; box-shadow: 0px 0px 7px rgba(27, 27, 27, 0.15); border: solid 1px #f4d03f;';

const movieCollection = document.querySelector('.movie-collection');

const buttonLib = {
  watched: document.querySelector('.btn__library-watch'),
  queue: document.querySelector('.btn__library-queue'),
};

myLocalStorage.numMoviesInPages = 5;

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

// Функція робе запит у LocalStorage та виводить фільми
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
    myLocalStorage.total = myLocalStorage.results.length;
    console.log('total - ', myLocalStorage.total);
    myLocalStorage.selectedArray = watchedOrQueue;
    if (myLocalStorage.total > myLocalStorage.numMoviesInPages) {
      myLocalStorage.results = myLocalStorage.results.slice(
        0,
        myLocalStorage.numMoviesInPages
      );
      console.log('total > 10 - ', myLocalStorage.total);
      addPagination(myLocalStorage.total, watchedOrQueue);
    } else {
      document.getElementById('pagination').innerHTML = '';
    }
    myLocalStorage.createMarkupCards();
    movieCollection.style.pointerEvents = 'auto';
  } else {
    myLocalStorage.markupPlug();
  }
}

function addPagination(total, watchedOrQueue) {
  const pagination = new Pagination(document.getElementById('pagination'), {
    totalItems: 500,
    itemsPerPage: 10,
    visiblePages: myLocalStorage.getPages(watchedOrQueue),
    centerAlign: true,
  });
  pagination.setTotalItems(total);
  pagination.setItemsPerPage(myLocalStorage.numMoviesInPages);
  pagination.on('afterMove', event => {
    const currentPage = event.page;
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    console.log('1myLocalStorage.results - ', myLocalStorage.results);
    getMoviesFromLocalStorageForPagination(watchedOrQueue, currentPage);
    console.log('2myLocalStorage.results - ', myLocalStorage.results);
    myLocalStorage.createMarkupCards();
  });
  pagination.visiblePages = myLocalStorage.getPages(watchedOrQueue);
}

function getMoviesFromLocalStorageForPagination(watchedOrQueue, n) {
  const movies = localStorage.getItem(watchedOrQueue);
  const moviesObj = JSON.parse(movies);
  const endNum = n * myLocalStorage.numMoviesInPages;
  const startNum = endNum - myLocalStorage.numMoviesInPages;
  console.log('startNum - ', startNum, 'endNum - ', endNum);
  myLocalStorage.results = moviesObj.slice(startNum, endNum);
}
