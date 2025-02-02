import { useEffect, useState } from 'react';
import Search from './components/Search';
import MovieCard from './components/MovieCard';

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

  const fetchMovies = async () =>{
    try{

      const response = await fetch(`${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key`, options);

      
      if(!response.ok){
        throw new Error ('Failed to fetch movies...');
      }
      const data = await response.json();
      // console.log(data.results);
      setMovieList(data.results);

    }catch(error){
      console.log(`Failed to fetch movies...${error}`);
    }
  }

  useEffect(()=>{
    fetchMovies();
  }, []);

  useEffect(() => {
    console.log("Updated movie list:", movieList);
  }, [movieList]);
 
  return (
    <main>
      <header>
        <div className="header-container">
          <img src="./hero.png" alt="hero poster" />
          <h1>Find <span className='movie-span'>Movies</span> You'll Enjoy Without the Hassle</h1>
          <Search 
            searchTerm = {searchTerm}
            setSearchTerm = {setSearchTerm}
           />
        </div>
      </header>

      <section>
        <h2 className='section-heading'>All Movies</h2>
        <ul>
          {movieList.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App;