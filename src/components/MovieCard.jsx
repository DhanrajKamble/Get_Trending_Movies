
const MovieCard = ({ movie:
    { poster_path, release_date, title, vote_average, original_language }
}) => {
    return (
        <div className="movie-card">
            <img className="poster" src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />
            <p className="title">{title}</p>
            <div className="movie-card-content">
                <img src="./star.svg" alt="rating" />
                <p>{vote_average.toFixed(1)}</p>

                <span className="dot">•</span>
                <p>{original_language}</p>
                <span className="dot">•</span>
                <p>{release_date.split("-")[0]}</p>
            </div>
        </div>
    )

}

export default MovieCard;