import { GetMovie } from './apiFetch';
import { getGenres } from './genres';

const movieCollection = document.querySelector('.movie-collection');
const getMovie = new GetMovie();

// Вызов fetch
async function trandMovie() {
  try {
    const { results } = await getMovie.getTrandMovies();
    results.map(result => {
      createMarkupOneCard(result);
    });
  } catch (error) {
    console.log(error, error.stack);
  }
}

trandMovie();

// Функция для рендера разметки

export function createMarkupOneCard(results) {
  const { poster_path, genre_ids, title, release_date } = results;

  const genresList = getGenres(genre_ids);
  const movieYear = release_date.slice(0, 4);

  const movieCard = `  
  <li class="movie-collection__item">
  <a href="#">
    <img class="movie-collection__poster" src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}" />
    <h2 class="movie-collection__title">${title}</h2>
    <div class="movie-collection__discription">
      <p class="movie-collection__genre">${genresList}</p>
      <p class="movie-collection__year">${movieYear}</p>
    </div>
  </a>
</li>`;

  movieCollection.insertAdjacentHTML('beforeend', movieCard);
}
