import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export function useMovieContext() { return useContext(MovieContext); }

export const MovieProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);

    function getMovieById(id) {
        console.log("Searching for movie with ID:", id);
        console.log("Current movies array:", movies);
        const movie = movies.find(movie => movie.id === parseInt(id));
        return movie;
    }

    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem("favorites");
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
        console.log("Saved favorites to local storage:", favorites);
    }, [favorites]);

    const addFavorite = (movie) => {
        setFavorites((prev) => {
            const updatedFavorites = [...prev, movie];
            console.log("Added favorite:", movie);
            return updatedFavorites;
        });
    };

    const removeFavorite = (movieId) => {
        setFavorites((prev) => {
            const removedFavorites = prev.filter((m) => m.id !== movieId);
            console.log("Removed favorite with ID:", movieId);
            return removedFavorites;
        });
    };

    const isFavorite = (movieId) => {
        return favorites.some((m) => m.id === movieId);
    };

    const viewMovieInfo = (movieId) => {
        console.log("Viewing movie info for ID:", movieId);
    }

    return (
        <MovieContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, viewMovieInfo, movies, getMovieById, setMovies }}>
            {children}
        </MovieContext.Provider>
    );
};