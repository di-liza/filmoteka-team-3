import { GetMovie } from './apiFetch';
import { getGenres } from './genres';
import { addPagination } from './pagination';

const movieCollection = document.querySelector('.movie-collection');
const getMovie = new GetMovie();

// Вызов fetch
async function trandMovie() {
  try {
    const data = await getMovie.getTrandMovies();
    console.log(data.results);
    createMarkupOneCard(data.results);
    addPagination(data.total_results);
  } catch (error) {
    console.log(error, error.stack);
  }
}

trandMovie();

// Функция для рендера разметки

// export function createMarkupOneCard(results) {
//   const { poster_path, genre_ids, title, release_date } = results;

//   const genresList = getGenres(genre_ids);
//   const movieYear = release_date.slice(0, 4);
//   let poster;
//   if (!poster_path) {
//     poster =
//       'https://static.wikia.nocookie.net/ideas/images/6/66/FoxAndroidTM2%27s_No_Poster.jpg';
//   } else {
//     poster = `https://image.tmdb.org/t/p/w500/${poster_path}`;
//   }

//   const movieCard = `
//   <li class="movie-collection__item">
//   <a href="#">
//     <img class="movie-collection__poster" src="${poster}" alt="${title}" />
//     <h2 class="movie-collection__title">${title}</h2>
//     <div class="movie-collection__discription">
//       <p class="movie-collection__genre">${genresList}</p>
//       <p class="movie-collection__year">${movieYear}</p>
//     </div>
//   </a>
// </li>`;

//   movieCollection.insertAdjacentHTML('beforeend', movieCard);
// }

// Функция для рендера разметки
export function createMarkupOneCard(results) {
  movieCollection.innerHTML = results.map(
    ({ poster_path, genre_ids, title, release_date, id }) => {
      const genresList = getGenres(genre_ids);
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
</li>`;
    }
  );
}
