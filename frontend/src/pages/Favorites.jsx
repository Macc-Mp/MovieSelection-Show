import "../css/Favorites.css"
import { useMovieContext } from "../contexts/MovieContext"
import MovieCard from "../components/MovieCard"
import { useEffect } from "react"

function Favorites() {
    const { favorites, setFavorites } = useMovieContext();

    useEffect(() => {
        if (favorites) {
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    }, [favorites]);

    if (favorites.length > 0) {
        console.log("Movie List here")
        return (
            
            <div className="favorites">
                <h2>Favorites</h2>
                <div className="movies-grid">
                    {favorites.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="favorites-empty">
            <h2>No favorites yet</h2>
            <p>Go back and favorite some movies</p>
        </div>
    );
}

export default Favorites;