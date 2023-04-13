// class LocalStorage {
//   constructor() {}

//   // цей метод повертає масив фільмів вказаного масива
//   getMovies(watchedOrQueue) {
//     const movies = localStorage.getItem(watchedOrQueue);
//     if (movies) {
//       return JSON.parse(movies);
//     } else {
//       return 'Нема збережених фільмів';
//     }
//   }

//   // Цей метод додає фільм у вказаний масив
//   addToLocalStorage(movie, watchedOrQueue) {
//     let arrMovie = localStorage.getItem(watchedOrQueue);
//     if (arrMovie) {
//       arrMovie = JSON.parse(arrMovie);
//       arrMovie.push(movie);
//     } else {
//       arrMovie = [movie];
//     }
//     localStorage.setItem(watchedOrQueue, JSON.stringify(arrMovie));
//   }

//   // Цей метод видаляє фільм по його id
//   removeFromLocalStorage(id, watchedOrQueue) {
//     let arrMovie = localStorage.getItem(watchedOrQueue);
//     arrMovie = JSON.parse(arrMovie);
//     const index = arrMovie.findIndex(movie => movie.id === id);
//     if (index !== -1) {
//       arrMovie.splice(index, 1);
//       localStorage.setItem(watchedOrQueue, JSON.stringify(arrMovie));
//     }
//   }
// }

// const localStorageInstance = new LocalStorage();

// // Знаходимо кнопки WATCHED, QUEUE та додаєм слухачів
// const btnQueue = document.querySelector(`.${classBtnQueue}`);
// const btnWatched = document.querySelector(`.${classBtnWatched}`);

// btnQueue.addEventListener('click', () => {
//   const movies = localStorageInstance.getMovies('queue');
//   console.log(movies);
// });

// btnWatched.addEventListener('click', () => {
//   const movies = localStorageInstance.getMovies('watched');
//   console.log(movies);
// });

// // Знаходимо кнопки ADD_WATCHED, ADD_QUEUE та додаєм слухачів
// const btnAddQueue = document.querySelector(`.${classBtnAddQueue}`);
// const btnAddWatched = document.querySelector(`.${classBtnAddWatched}`);

// btnAddQueue.addEventListener('click', () => {
//   const nextMovie = movie;
//   nextMovie.id = getRandomNumber();
//   localStorageInstance.addToLocalStorage(nextMovie, 'queue');
// });

// btnAddWatched.addEventListener('click', () => {
//   const nextMovie = movie;
//   nextMovie.id = getRandomNumber();
//   localStorageInstance.addToLocalStorage(nextMovie, 'watched');
// });

// const btnHome = document.querySelector(`.${classBtnHome}`);

// btnHome.addEventListener('click', () => {
//   const id = 7972;
//   const watchedOrQueue = 'queue';
//   localStorageInstance.removeFromLocalStorage(id, watchedOrQueue);
// });
