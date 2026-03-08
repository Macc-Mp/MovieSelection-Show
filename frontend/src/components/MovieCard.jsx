import "../css/MovieCard.css"
import { useState } from "react";
import { useMovieContext } from "../contexts/MovieContext";
import { useNavigate } from "react-router-dom";

export function MovieCard({ movie, onClick }) {
    const { addFavorite, removeFavorite, isFavorite } = useMovieContext();
    const favorite = isFavorite(movie.id);
    const navigate = useNavigate();
    const [overview, setOverview] = useState("");

    function onFavoriteClick(e) {
        e.preventDefault();
        e.stopPropagation();
        if (favorite) {
            removeFavorite(movie.id);
        } else {
            addFavorite(movie);
            const shownTitle = movie.title || movie.name || 'Item';
            alert(shownTitle + " was favorited");
            console.log(shownTitle + " was favorited");
        }
    }

    function handleCardClick(movie) {
        const titleTextLocal = movie.title || movie.name || '';
        const shownOverview = movie.overview || movie.description || '';
        const shownDate = movie.release_date || movie.first_air_date || '';
        const avg = movie.vote_average ? (movie.vote_average).toFixed(2) : "N/A";
        const mediaTypeLocal = movie.media_type || (movie.first_air_date ? 'tv' : 'movie');
        const path = mediaTypeLocal === 'tv' ? `/tv/${movie.id}` : `/movie/${movie.id}`;
        const stateObj = {
            movie_average: avg,
            overview: shownOverview,
            release_date: shownDate,
            description: shownOverview,
            moviePoster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            movieTitle: titleTextLocal,
            tvTitle: titleTextLocal,
            tvPoster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        };
        navigate(path, { state: stateObj });
    }

    const titleText = movie.title || movie.name || '';
    const year = (movie.release_date || movie.first_air_date) ? (movie.release_date || movie.first_air_date).split("-")[0] : "";
    const runtime = movie.runtime || movie.episode_run_time?.[0] || movie.runtimeMinutes || movie.duration || movie.runtime_in_minutes;
    const runtimeText = runtime ? `${runtime}m` : "";
    const mediaType = movie.media_type || (movie.first_air_date ? 'tv' : 'movie');

    return (
        <div className="movie-cardContainer">
            <div className="movie-card" onClick={() => handleCardClick(movie)}>
                <div className="movie-poster">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    <div className="movie-overlay">
                        <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>+</button>
                    </div>
                </div>
                <div className="movie-info">
                    <h3 title={titleText}>{titleText}</h3>
                    <div className="movie-meta">
                        <div className="meta-left">
                            {year && <span className="meta-year">{year}</span>}
                            {year && runtimeText && <span className="meta-sep">•</span>}
                            {runtimeText && <span className="meta-runtime">{runtimeText}</span>}
                        </div>
                        <div className="type-badge">{mediaType === 'tv' ? 'TV' : 'Movie'}</div>
                    </div>
                </div>
            </div>

            {overview && (
                <div className="movie-overview">
                    <h2>Overview</h2>
                    <p>{overview}</p>
                </div>
            )}
        </div>
    );
}

export default MovieCard; 