import { getGenres } from './genres';
// import { LocalStorage } from './localStorage';

// const localStorage = new LocalStorage();
// localStorage.numMoviesInPages = 6; // - задаёшь сколько фильмов на странице хочешь видеть (по умолчанию 20)
// console.log(localStorage.getPages('watched')); //  - возвращает число страниц только надо указать queue или watched

const movieCollection = document.querySelector('.movie-collection');

const buttonLib = {
  watched: document.querySelector('.btn__library-watch'),
  queue: document.querySelector('.btn__library-queue'),
};

buttonLib.watched.addEventListener('click', getMoviesWatched);
buttonLib.queue.addEventListener('click', getMoviesQueue);

function getMoviesWatched() {
  const movies = localStorage.getItem('watched');
  if (movies) {
    createMarkupOneCard(JSON.parse(movies));
  } else {
    movieCollection.innerHTML = '';
  }
}

function getMoviesQueue() {
  const movies = localStorage.getItem('queue');
  if (movies) {
    createMarkupOneCard(JSON.parse(movies));
  } else {
    movieCollection.innerHTML = '';
  }
}

function createMarkupOneCard(results) {
  movieCollection.innerHTML = results
    .map(({ poster_path, genres, title, release_date, id }) => {
      const genresList = getGenres(genres);
      const movieYear = release_date.slice(0, 4);
      let poster;
      if (!poster_path) {
        poster = 'https://otv.one/uploads/default_image/thumbnail.jpg';
      } else {
        poster = `https://image.tmdb.org/t/p/w500/${poster_path}`;
      }
      return `  <li class="movie-collection__item" data-id="${id}">
   <img class="movie-collection__poster" src="${poster}" alt="${title}" />
   <h2 class="movie-collection__title">${title}</h2>
   <div class="movie-collection__discription">
     <p class="movie-collection__genre">${genresList}</p>
     <p class="movie-collection__year">${movieYear}</p>
   </div>
   <button class="movie-collection__button" type="button"><span class="movie-collection__title">Trailer</span></button>
</li>`;
    })
    .join('');
}
