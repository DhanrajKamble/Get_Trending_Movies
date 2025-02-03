import { useEffect, useState } from 'react';
import Search from './components/Search';
import MovieCard from './components/MovieCard';
import Spinner from './components/Spinner';
import { getTrendingMovies, updateSearchCount } from '../appwrite';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
// console.log(API_KEY);

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [trendingMovies, setTrendingMovies] = useState([]);



  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');
    try {

      const response = query
        ? await fetch(`${BASE_URL}/search/movie?query=${encodeURI(query)}&api_key=${API_KEY}`, options)
        : await fetch(`${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`, options);



      if (!response.ok) {
        throw new Error('Failed to fetch movies...');
      }
      const data = await response.json();
      // console.log(data.results);
      if (data.status_code) {
        setErrorMessage(data.status_message || 'Failed to fetch movies...')
      }

      if (!data.results || data.results.length === 0) {
        setErrorMessage("No movies found.");
        setMovieList([]);  // Clear previous results
        return;
      }
      setMovieList(data.results);

      if (query && data.results.length > 0) {
        updateSearchCount(query, data.results[0]);
      }

    } catch (error) {
      console.log(`Failed to fetch movies...${error}`);
      setErrorMessage('Failed to fetch movies...')
    } finally {
      setIsLoading(false);
    }
  }

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    }
    catch (error) {
      console.error(`Erroe fetching trending movies: ${error}`);
    }
  }

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      fetchMovies(searchTerm);
    }, 500); // Debounce API call

    return () => clearTimeout(delaySearch); // Cleanup previous timeout
  }, [searchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <main>
      <header>
        <div className="header-container">
          <img src="./hero.png" alt="hero poster" />
          <h1>Find <span className='movie-span'>Movies</span> You'll Enjoy Without the Hassle</h1>
          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </header>

      {/* Trending Movies Section */}
      {trendingMovies.length > 0 && (
        <section className="trending">
          <h2>Trending Movies</h2>
          <ul>
            {trendingMovies.map((movie, index) => (
              <li key={movie.$id}>
                <p>{index + 1}</p>
                <img src={movie.poster_url} alt={movie.title} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2 className='section-heading'>All Movies</h2>

        <ul>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="error-message">{errorMessage}</p> // Properly rendering error message
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}

        </ul>
      </section>
    </main>
  )
}

export default App;