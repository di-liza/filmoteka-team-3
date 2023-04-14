// const classBtnHome = 'navigation__link--home';

// const classBtnQueue = 'navigation__link--queue';
// const classBtnWatched = 'navigation__link--watched';
// const classBtnAddQueue = 'navigation__link--addQueue';
// const classBtnAddWatched = 'navigation__link--addWatched';
// const classBtnAddOrRemove = 'buttonQueueWatched';

// const textAddBTN = 'add to ';
// const textRemoveBTN = 'remove from ';

// const idMovie1 = 64255;
// const idMovie2 = 46405;

// //********************************************************************************************** */
// //******************************* Цей код тільки для розробюки ********************************* */

// //Тимчасова функція для випадкового id фільму
// function getRandomNumber() {
//   return Math.floor(Math.random() * 9901) + 100;
// }

// //Тестовий обʼєкт фільму
// const movie = {
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

// const nav = document.querySelector('.navigation');

// // тестові кнопки
// nav.insertAdjacentHTML(
//   'beforeend',
//   `<button type="button" class="${classBtnQueue}">queue</button>` +
//     `<button type="button" class="${classBtnWatched}">watched</button>` +
//     `<button type="button" class="${classBtnAddQueue}">addQueue</button>` +
//     `<button type="button" class="${classBtnAddWatched}">addWatched</button>` +
//     `<button type="button" class="${classBtnAddOrRemove}">
//         <span>${textButtonRemoveOrAdd(idMovie1, 'queue')}<span>
//         Queue</button>` +
//     `<button type="button" class="${classBtnAddOrRemove}">
//         <span>${textButtonRemoveOrAdd(idMovie2, 'watched')}<span>
//         Watched</button>`
// );

// const addedButtons = nav.querySelectorAll('button');

// addedButtons.forEach((button, index) => {
//   button.style.display = 'flex';
//   button.style.marginBottom = '10px';
// });

// //******************************* Цей код тільки для розробюки ********************************* */
// //********************************************************************************************** */

// // Знаходимо кнопки WATCHED, QUEUE та додаєм слухачів
// const btnQueue = document.querySelector(`.${classBtnQueue}`);
// const btnWatched = document.querySelector(`.${classBtnWatched}`);

// btnQueue.addEventListener('click', getMoviesFromLocalStorage);
// btnWatched.addEventListener('click', getMoviesFromLocalStorage);

// // Ця функція повертає масив обʼєктів фільмів
// function getMoviesFromLocalStorage(e) {
//   const movies = localStorage.getItem(e.target.textContent);
//   console.log(JSON.parse(movies));
//   return JSON.parse(movies);
// }

// // Знаходимо кнопки ADD_WATCHED, ADD_QUEUE та додаєм слухачів
// const btnAddQueue = document.querySelector(`.${classBtnAddQueue}`);
// const btnAddWatched = document.querySelector(`.${classBtnAddWatched}`);

// btnAddQueue.addEventListener('click', addToLocalStarage);
// btnAddWatched.addEventListener('click', addToLocalStarage);

// // Ця функція додає фільми до належного масиву у localStorage
// function addToLocalStarage(e) {
//   let watchedOrQueue = 'watched';
//   if (e.target.textContent.includes('ueue')) {
//     watchedOrQueue = 'queue';
//   }
//   const nextMovie = movie; // e.target.*****************
//   movie.id = getRandomNumber(); // *********************
//   let arrMovie = localStorage.getItem(watchedOrQueue);
//   if (arrMovie) {
//     arrMovie = JSON.parse(arrMovie);
//     arrMovie.push(nextMovie);
//   } else {
//     arrMovie = [nextMovie];
//   }
//   localStorage.setItem(watchedOrQueue, JSON.stringify(arrMovie));
// }

// const btnHome = document.querySelector(`.${classBtnHome}`);

// btnHome.addEventListener('click', removeFromLocalStarage);

// function removeFromLocalStarage(e) {
//   const id = 6425; // e.taget.**********
//   const watchedOrQueue = 'queue'; // e.target.**********
//   let arrMovie = localStorage.getItem(watchedOrQueue);
//   arrMovie = JSON.parse(arrMovie);
//   console.log('arrMovie - ', arrMovie);
//   const index = arrMovie.findIndex(movie => movie.id === id);
//   console.log('index - ', index);
//   if (index !== -1) {
//     arrMovie.splice(index, 1);
//     console.log('arrMovieAfterSplice - ', arrMovie);
//     localStorage.setItem(watchedOrQueue, JSON.stringify(arrMovie));
//   }
// }

// function textButtonRemoveOrAdd(id, watchedOrQueue) {
//   let arrMovie = localStorage.getItem(watchedOrQueue);
//   arrMovie = JSON.parse(arrMovie);
//   console.log('arrMovie - ', arrMovie);
//   const isMovie = arrMovie.find(movie => movie.id === id);
//   console.log(
//     "isMovie ? 'remove' : 'add' - ",
//     isMovie ? textRemoveBTN : textAddBTN
//   );
//   return isMovie ? textRemoveBTN : textAddBTN;
// }
