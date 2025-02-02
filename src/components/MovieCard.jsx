
const MovieCard = ({ movie:
    { poster_path, release_date, title, vote_average, original_language }
}) => {
    return (
        <div className="movie-card">
            {poster_path ? <img className="poster" src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} /> : <img className="poster" src="no-poster.png" alt="No poster" />}

            <p className="title">{title}</p>
            <div className="movie-card-content">
                <img src="./star.svg" alt="rating" />
                <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>

                <span className="dot">•</span>
                <p>{original_language}</p>
                <span className="dot">•</span>
                <p>{release_date ? release_date.split("-")[0] : 'N/A'}</p>
            </div>
        </div>
    )

}

export default MovieCard;