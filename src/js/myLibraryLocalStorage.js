import { getGenres } from './genres';
import { LocalStorage } from './localStorage';

const myLocalStorage = new LocalStorage();
// localStorage.numMoviesInPages = 6; // - задаёшь сколько фильмов на странице хочешь видеть (по умолчанию 20)
// console.log(localStorage.getPages('watched')); //  - возвращает число страниц только надо указать queue или watched

const stylePushButton =
  'background-color: #b92f2c; color: #ffffff; box-shadow: 0px 0px 7px rgba(27, 27, 27, 0.15); border: solid 1px #f4d03f;';

const movieCollection = document.querySelector('.movie-collection');

const buttonLib = {
  watched: document.querySelector('.btn__library-watch'),
  queue: document.querySelector('.btn__library-queue'),
};

myLocalStorage.results = JSON.parse(localStorage.getItem('watched'));
myLocalStorage.selectedArray = 'watched';
myLocalStorage.createMarkupOneCard();

buttonLib.watched.style.cssText = stylePushButton;
buttonLib.watched.addEventListener('click', getMoviesWatched);
buttonLib.queue.addEventListener('click', getMoviesQueue);

function getMoviesWatched() {
  buttonLib.queue.style.cssText = '';
  buttonLib.watched.style.cssText = stylePushButton;
  const movies = localStorage.getItem('watched');
  if (movies) {
    myLocalStorage.results = JSON.parse(movies);
    myLocalStorage.selectedArray = 'watched';
    myLocalStorage.createMarkupOneCard();
  } else {
    movieCollection.innerHTML = '';
  }
}

function getMoviesQueue() {
  buttonLib.watched.style.cssText = '';
  buttonLib.queue.style.cssText = stylePushButton;
  const movies = localStorage.getItem('queue');
  if (movies) {
    myLocalStorage.results = JSON.parse(movies);
    myLocalStorage.selectedArray = 'queue';
    myLocalStorage.createMarkupOneCard();
  } else {
    movieCollection.innerHTML = '';
  }
}

// function createMarkupOneCard(results) {
//   movieCollection.innerHTML = results
//     .map(({ poster_path, genres, title, release_date, id }) => {
//       const genresList = getGenres(genres);
//       const movieYear = release_date.slice(0, 4);
//       let poster;
//       if (!poster_path) {
//         poster = 'https://otv.one/uploads/default_image/thumbnail.jpg';
//       } else {
//         poster = `https://image.tmdb.org/t/p/w500/${poster_path}`;
//       }
//       return `  <li class="movie-collection__item" data-id="${id}">
//    <img class="movie-collection__poster" src="${poster}" alt="${title}" />
//    <h2 class="movie-collection__title">${title}</h2>
//    <div class="movie-collection__discription">
//      <p class="movie-collection__genre">${genresList}</p>
//      <p class="movie-collection__year">${movieYear}</p>
//    </div>
//    <button class="movie-collection__button" type="button"><span class="movie-collection__title">Trailer</span></button>
// </li>`;
//     })
//     .join('');
// }
