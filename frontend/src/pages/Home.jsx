import React, { useState, useEffect } from 'react';
import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import { searchMovie, getPopularMovies, getPopularTV, searchTV } from "../services/api";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('movies'); 
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const loadPopular = async (page) => {
            try {
                setLoading(true);
                const data = activeTab === 'movies' ? await getPopularMovies(page) : await getPopularTV(page);
                setMovies(data.results);
                setTotalPages(data.total_pages);
                setError(null);
            } catch (err) {
                setError("Failed to load items.");
            } finally {
                setLoading(false);
            }
        };
        loadPopular(currentPage);
    }, [currentPage, activeTab]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim() || loading) return;

        setLoading(true);
        try {
            const searchResults = activeTab === 'movies' 
                ? await searchMovie(searchQuery) 
                : await searchTV(searchQuery);
            setMovies(searchResults);
            setError(null);
        } catch (err) {
            setError("Search failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home">
            <header className="home-header">
                <div className="overlay">
                    <h1>See reviews of the latest movies and TV shows.</h1>
                    <form onSubmit={handleSearch} className="search-form">
                        <input
                            type="text"
                            placeholder="Search for a movie or TV show..."
                            className="search-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit" className="search-btn">Search</button>
                    </form>
                </div>
            </header>

            <div className="content-container">
                <div className="tabs">
                    <button className={`tab ${activeTab === 'movies' ? 'active' : ''}`} 
                            onClick={() => { setActiveTab('movies'); setCurrentPage(1); }}>Movies</button>
                    <button className={`tab ${activeTab === 'tv' ? 'active' : ''}`} 
                            onClick={() => { setActiveTab('tv'); setCurrentPage(1); }}>TV Shows</button>
                </div>

                {error && <div className="error-message">{error}</div>}

                {loading ? (
                    <div className="loading">Loading movies...</div>
                ) : (
                    <div className="movies-grid">
                        {movies.map((item) => (
                            <MovieCard movie={item} key={item.id} />
                        ))}
                    </div>
                )}

                {/* Pagination (Simplified logic) */}
                <div className="pagination-container">
                    <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Prev</button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
                </div>
            </div>
        </div>
    );
}

export default Home;