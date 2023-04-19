import { GetMovie } from './apiFetch';
import { getGenres } from './genres';
import { addPagination } from './pagination';
import { Notify } from 'notiflix';

const movieCollection = document.querySelector('.movie-collection');
const droplist = document.querySelector('.movie-droplist');
const getMovie = new GetMovie();

// Вызов fetch
async function trandMovie() {
  try {
    const data = await getMovie.getTrandMovies();

    createMarkupCards(data.results);
    addPagination(data.total_results);
  } catch (error) {
    Notify.failure(error.message);
  }
}

trandMovie();

// Функция для рендера разметки в основном окне
export function createMarkupCards(results) {
  movieCollection.innerHTML = results
    .map(({ poster_path, genre_ids, title, release_date, id }) => {
      const genresList = getGenres(genre_ids);
      const movieYear = release_date.slice(0, 4);
      let poster;
      if (!poster_path) {
        poster = 'https://otv.one/uploads/default_image/thumbnail.jpg';
      } else {
        poster = `https://image.tmdb.org/t/p/w500/${poster_path}`;
      }
      return `  <li class="movie-collection__item" data-id="${id}">
   <img class="movie-collection__poster" loading="lazy" src="${poster}" srcset="${poster} 2x" alt="${title} width="395" height="574"/>
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

// Функция для рендера разметки в выпадающем окне поиска

export function createMarkupDropList(results) {
  droplist.style.display = 'flex';
  const sortedResults = results.sort(function (a, b) {
    return b.vote_average - a.vote_average;
  });
  const shortResults = sortedResults.slice(0, 10);

  droplist.innerHTML = shortResults
    .map(({ poster_path, vote_average, title, release_date, id }) => {
      const movieYear = release_date.slice(0, 4);
      let poster;
      if (!poster_path) {
        poster = 'https://otv.one/uploads/default_image/thumbnail.jpg';
      } else {
        poster = `https://image.tmdb.org/t/p/w500/${poster_path}`;
      }
      return `  <li class="movie-droplist__item" data-id="${id}"">
     <img class="movie-droplist__poster" src="${poster}" srcset="${poster} 2x" alt="${title}" width="70" height="100"/>
     <div class="movie-droplist__wrap">
     <h2 class="movie-droplist__title">${title}</h2>
     <div class="movie-droplist__discription">
       <p class="movie-droplist__vote">Vote: ${vote_average}</p>
       <p class="movie-droplist__year">Year: ${movieYear}</p>
     </div>
     <div><button class="movie-droplist__button" type="button">Trailer</button>
     </div>

  </li>`;
    })
    .join('');
}
