import { createMarkupOneCard } from './renderCardMarkup';

const classBtnQueue = 'navigation__link--queue';
const classBtnWatched = 'navigation__link--watched';
const classBtnAddQueue = 'navigation__link--addQueue';
const classBtnAddWatched = 'navigation__link--addWatched';

export class LocalStorage {
  constructor() {
    this.movie = {};
    this.textRemoveBTN = 'remove from ';
    this.textAddBTN = 'add to ';
    this.addToLocalStorage = this.addToLocalStorage.bind(this);
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
      createMarkupOneCard(JSON.parse(movies));
    } else {
      return 'Нема збережених фільмів';
    }
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
      arrMovie.push(this.movie);
    } else {
      arrMovie = [this.movie];
    }
    localStorage.setItem(watchedOrQueue, JSON.stringify(arrMovie));
    const queueSpan = document.querySelector(
      `span[data-text="${watchedOrQueue}"]`
    );
    queueSpan.textContent = this.textRemoveBTN;
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
}

// const localStorage = new LocalStorage();

// localStorage.movie = {
//   adult: false,
//   backdrop_path: '/wybmSmviUXxlBmX44gtpow5Y9TB.jpg',
//   id: 594767,
//   title: 'Shazam! Fury of the Gods',
//   original_language: 'en',
//   original_title: 'Shazam! Fury of the Gods',
//   overview:
//     'Billy Batson and his foster siblings, who transform into superheroes by saying "Shazam!", are forced to get back into action and fight the Daughters of Atlas, who they must stop from using a weapon that could destroy the world.',
//   poster_path: '/A3ZbZsmsvNGdprRi2lKgGEeVLEH.jpg',
//   media_type: 'movie',
//   genre_ids: [28, 35, 14],
//   popularity: 5827.392,
//   release_date: '2023-03-15',
//   video: false,
//   vote_average: 6.978,
//   vote_count: 747,
// };

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
