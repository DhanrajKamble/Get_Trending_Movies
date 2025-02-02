import { useState } from 'react';
import Search from './components/Search';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <main>
      <header>
        <div className="header-container">
          <img src="./hero.png" alt="hero poster" />
          <h1>Find <span>Movies</span> You'll Enjoy Without the Hassle</h1>
          <Search 
            searchTerm = {searchTerm}
            setSearchTerm = {setSearchTerm}
           />
        </div>
      </header>

      <section>
      All Movies
      <h2>{searchTerm}</h2>
      </section>
    </main>
  )
}

export default App;