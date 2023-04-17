import { getGenres } from './genres';
import { createMarkupOneCard } from './renderCardMarkup';
const classBtnQueue = 'navigation__link--queue';
const classBtnWatched = 'navigation__link--watched';
const classBtnAddQueue = 'navigation__link--addQueue';
const classBtnAddWatched = 'navigation__link--addWatched';

export class LocalStorage {
  constructor() {
    this.movie = {};
    this.selectedArray;
    this.textRemoveBTN = 'remove from ';
    this.textAddBTN = 'add to ';
    this.numMoviesInPages = 20;
    this.movieCollection = document.querySelector('.movie-collection');
    this.results;
    this.plug = `<li class="plug"><img class="plug_poster" src="https://otv.one/uploads/default_image/thumbnail.jpg" alt="plug" /></li>`; //pointer-events: none;
    this.addToLocalStorage = this.addToLocalStorage.bind(this);
    this.createMarkupOneCard = this.createMarkupOneCard.bind(this);
    this.removeFromLocalStorage = this.removeFromLocalStorage.bind(this);
    this.addOrRemoveFromLocalStoradgeWatched =
      this.addOrRemoveFromLocalStoradgeWatched.bind(this);
    this.addOrRemoveFromLocalStoradgeQueue =
      this.addOrRemoveFromLocalStoradgeQueue.bind(this);
  }

  // Цей метод повертає масив фільмів вказаного масива
  getMovies(watchedOrQueue) {
    const movies = localStorage.getItem(watchedOrQueue);
    if (movies) {
      this.createMarkupOneCard(JSON.parse(movies));
    } else {
      return 'Нема збережених фільмів';
    }
  }

  isLibraryWatched() {
    return JSON.parse(localStorage.getItem('watched'))?.length > 0;
  }

  isLibraryQueue() {
    return JSON.parse(localStorage.getItem('queue'))?.length > 0;
  }

  isLibrarys() {
    return isLibraryQueue() || isLibraryWatched(); // "/src/my-library.html"
  }

  // Цей метод шукає обраний фільм у обраном масиві та вибирає видалити чи додати фільм у масив
  addOrRemoveFromLocalStoradgeWatched(e) {
    const watchedOrQueue = 'watched';
    const arrMovie = JSON.parse(localStorage.getItem(watchedOrQueue));
    if (!arrMovie) {
      this.addToLocalStorage(watchedOrQueue);
      return;
    }
    const isMovie = arrMovie.find(item => item.id === this.movie.id);
    if (isMovie) {
      this.removeFromLocalStorage(watchedOrQueue);
    } else {
      this.addToLocalStorage(watchedOrQueue);
    }
  }

  addOrRemoveFromLocalStoradgeQueue(e) {
    const watchedOrQueue = 'queue';
    const arrMovie = JSON.parse(localStorage.getItem(watchedOrQueue));
    if (!arrMovie) {
      this.addToLocalStorage(watchedOrQueue);
      return;
    }
    const isMovie = arrMovie.find(item => item.id === this.movie.id);
    if (isMovie) {
      this.removeFromLocalStorage(watchedOrQueue);
    } else {
      this.addToLocalStorage(watchedOrQueue);
    }
  }

  // Цей метод додає фільм у вказаний масив
  addToLocalStorage(watchedOrQueue) {
    let arrMovie = localStorage.getItem(watchedOrQueue);
    if (arrMovie) {
      arrMovie = JSON.parse(arrMovie);
      this.movie.selectedArray = watchedOrQueue;
      arrMovie.unshift(this.movie);
    } else {
      arrMovie = [this.movie];
    }
    localStorage.setItem(watchedOrQueue, JSON.stringify(arrMovie));
    const queueSpan = document.querySelector(
      `span[data-text="${watchedOrQueue}"]`
    );
    queueSpan.textContent = this.textRemoveBTN;
    if (this.selectedArray === watchedOrQueue) {
      this.results = JSON.parse(localStorage.getItem(watchedOrQueue));
      this.createMarkupOneCard();
    }
  }

  // Цей метод видаляє фільм по його id
  removeFromLocalStorage(watchedOrQueue) {
    let arrMovie = localStorage.getItem(watchedOrQueue);
    arrMovie = JSON.parse(arrMovie);
    const index = arrMovie.findIndex(movie => movie.id === this.movie.id);
    if (index !== -1) {
      arrMovie.splice(index, 1);
      localStorage.setItem(watchedOrQueue, JSON.stringify(arrMovie));
      const queueSpan = document.querySelector(
        `span[data-text="${watchedOrQueue}"]`
      );
      queueSpan.textContent = this.textAddBTN;
      if (this.selectedArray === watchedOrQueue) {
        this.results = JSON.parse(localStorage.getItem(watchedOrQueue));
        if (JSON.parse(localStorage.getItem(watchedOrQueue))?.length > 0) {
          this.createMarkupOneCard();
        } else {
          this.movieCollection.innerHTML = this.plug;
        }
      }
    }
  }
  //Цей метод пише текст на кнопці чи додати чи видалити фільм з масиву
  textButtonRemoveOrAdd(watchedOrQueue) {
    const arrMovie = JSON.parse(localStorage.getItem(watchedOrQueue));
    if (!arrMovie) {
      return this.textAddBTN;
    }
    const isMovie = arrMovie.find(movie => movie.id === this.movie.id);
    return isMovie ? this.textRemoveBTN : this.textAddBTN;
  }

  createMarkupOneCard() {
    this.movieCollection.innerHTML = this.results
      .map(({ poster_path, genres, title, release_date, id }) => {
        const genresList = getGenres(genres);
        const movieYear = release_date.slice(0, 4);
        let poster;
        if (!poster_path) {
          poster = 'https://otv.one/uploads/default_image/thumbnail.jpg';
        } else {
          poster = `https://image.tmdb.org/t/p/w500/${poster_path}`;
        }
        return `  <li class="movie-collection__item" data-id="${id}" data-selectedArray="${this.selectedArray}">
   <img class="movie-collection__poster" src="${poster}" alt="${title}" />
   <h2 class="movie-collection__title">${title}</h2>
   <div class="movie-collection__discription">
     <p class="movie-collection__genre">${genresList}</p>
     <p class="movie-collection__year">${movieYear}</p>
   </div>
   <button class="movie-collection__button" type="button" data-id="${id}">Trailer</button>
</li>`;
      })
      .join('');
  }

  getPages(watchedOrQueue) {
    const arr = JSON.parse(localStorage.getItem(watchedOrQueue));
    return Math.round(arr?.length ?? 0 / this.numMoviesInPages);
  }
}

// // Знаходимо кнопки WATCHED, QUEUE та додаєм слухачів
// const btnQueue = document.querySelector(`.${classBtnQueue}`);
// const btnWatched = document.querySelector(`.${classBtnWatched}`);

// btnQueue.addEventListener('click', () => {
//   const movies = localStorage.getMovies('queue');
//   console.log(movies);
// });

// btnWatched.addEventListener('click', () => {
//   const movies = localStorage.getMovies('watched');
//   console.log(movies);
// });

// // Знаходимо кнопки ADD_WATCHED, ADD_QUEUE та додаєм слухачів
// const btnAddQueue = document.querySelector(`.${classBtnAddQueue}`);
// const btnAddWatched = document.querySelector(`.${classBtnAddWatched}`);

// btnAddQueue.addEventListener('click', () => {
//   const nextMovie = movie;
//   nextMovie.id = getRandomNumber();
//   localStorage.addToLocalStorage(nextMovie, 'queue');
// });

// btnAddWatched.addEventListener('click', () => {
//   const nextMovie = movie;
//   nextMovie.id = getRandomNumber();
//   localStorage.addToLocalStorage(nextMovie, 'watched');
// });

// const btnHome = document.querySelector(`.${classBtnHome}`);

// btnHome.addEventListener('click', () => {
//   const id = 7972;
//   const watchedOrQueue = 'queue';
//   localStorage.removeFromLocalStorage(id, watchedOrQueue);
// });

// function getPages(watchedOrQueue) {
//   const arr = localStorage.getItem(watchedOrQueue);
//   return Math.round(arr.length / 20);
// }
