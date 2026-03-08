import React, { useState, useEffect } from 'react';
import MovieCard from "../components/MovieCard";
import MovieDetails from "../components/MovieDetails";
import "../css/Home.css";
import "../css/pagination.css";
import { searchMovie, getPopularMovies, getPopularTV, searchTV } from "../services/api";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchLoading, setSearchLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [activeTab, setActiveTab] = useState('movies'); // 'movies' or 'tv'

    useEffect(() => {
        const loadPopular = async (page) => {
            try {
                setLoading(true);
                let data;
                if (activeTab === 'movies') {
                    data = await getPopularMovies(page);
                } else {
                    data = await getPopularTV(page);
                }
                console.log("Fetched results:", data.results);
                setMovies(data.results);
                setTotalPages(data.total_pages);
                setError(null);
            } catch (err) {
                console.error("Failed to load popular items:", err);
                setError("Failed to load items.");
            } finally {
                setLoading(false);
            }
        };
        loadPopular(currentPage);
    }, [currentPage, activeTab]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        if (loading || searchLoading) return;

        setSearchLoading(true);
        try {
            let searchResults;
            if (activeTab === 'movies') {
                searchResults = await searchMovie(searchQuery);
            } else {
                searchResults = await searchTV(searchQuery);
            }
            console.log("Search results:", searchResults);
            setMovies(searchResults);
            setError(null);
        } catch (err) {
            console.error("Failed to search:", err);
            setError("Failed to search items.");
        } finally {
            setSearchLoading(false);
        }
        setSearchQuery("");
    };

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    const getPaginationRange = () => {
        const rangeSize = 10;
        const start = Math.max(1, currentPage - Math.floor(rangeSize / 2));
        const end = Math.min(totalPages, start + rangeSize - 1);
        return Array.from({ length: end - start + 1 }, (_, index) => start + index);
    };

    return (
        <div className="home">
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

            {error && <div className="error-message">{error}</div>}

           
                <div>
                    <div className="tabs">
                        <button className={`tab ${activeTab === 'movies' ? 'active' : ''}`} onClick={() => { setActiveTab('movies'); setCurrentPage(1); }}>Movies</button>
                        <button className={`tab ${activeTab === 'tv' ? 'active' : ''}`} onClick={() => { setActiveTab('tv'); setCurrentPage(1); }}>TV Shows</button>
                    </div>

                    <div className="movies-grid">
                        {Array.isArray(movies) && movies.map((item) => (
                            <MovieCard movie={item} key={item.id} />
                        ))}
                    </div>
                </div>
          

            

            <div className="paginationCard">
                <div className="pagination">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        &laquo;
                    </button>
                    {getPaginationRange().map((page) => (
                        <button
                            key={page}
                            className={currentPage === page ? "active" : ""}
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </button>
                    ))}
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        &raquo;
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;