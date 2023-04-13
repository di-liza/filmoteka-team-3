import { GetMovie } from './apiFetch';
import { getGenres } from './genres';

const getMovie = new GetMovie();

// Вызов fetch
async function trandMovie() {
  try {
    const { results } = await getMovie.getTrandMovies();
    console.log('data:', results);
  } catch (error) {
    console.log(error, error.stack);
  }
}

trandMovie();

// Функция для рендера разметки

function createMarkupOneCard(results) {}
