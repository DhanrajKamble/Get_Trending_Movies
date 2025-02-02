
const Search = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="search-bar">
            <img src="./search.svg" alt="search" />
            <input
                type="text"
                placeholder="Search through thousands of movies..."
                value={searchTerm}
                onChange={(event)=> setSearchTerm(event.target.value)}
            />
        </div>
    )
}

export default Search;