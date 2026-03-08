import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../css/MovieDetails.css";
import { getMovieReviews, getMovieCredits } from "../services/api";

function MovieDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state || {};
    const { overview, release_date, moviePoster, movie_average } = state;
    const movieTitle = state.movieTitle || state.title || state.name || '';

    const [reviews, setReviews] = useState([]);
    const [credits, setCredits] = useState({ cast: [], crew: [] });
    const [input, setInput] = useState('');
    const { movieId } = useParams();
    const [reviewsLoading, setReviewsLoading] = useState(false);
    const [reviewsError, setReviewsError] = useState(null);
    const [creditsLoading, setCreditsLoading] = useState(false);
    const [creditsError, setCreditsError] = useState(null);

    // local comment input removed — only TMDb reviews are shown

    useEffect(() => {
        const load = async () => {
            if (!movieId) return;
            try {
                setReviewsLoading(true);
                const data = await getMovieReviews(movieId);
                setReviews(data);
                setReviewsError(null);
            } catch (err) {
                console.error('Reviews fetch failed', err);
                setReviewsError('Failed to load reviews');
            } finally {
                setReviewsLoading(false);
            }
        };
        load();
    }, [movieId]);

    useEffect(() => {
        const loadCredits = async () => {
            if (!movieId) return;
            try {
                setCreditsLoading(true);
                const data = await getMovieCredits(movieId);
                setCredits(data);
                setCreditsError(null);
            } catch (err) {
                console.error('Credits fetch failed', err);
                setCreditsError('Failed to load credits');
            } finally {
                setCreditsLoading(false);
            }
        };
        loadCredits();
    }, [movieId]);

    return (
        <div className="movie-details">
            {/* Back button */}
            <button onClick={() => navigate(-1)} className="back-button">Back</button>
            <div className="details-row">
                <div className="leftCard">
                    <h1 className="movie-title">{movieTitle}</h1>
                    <img className="posterClass" src={moviePoster} alt="Movie-Poster" />
                </div>

                {overview && (
                    <div className="rightCard">
                        <div className="movie-overview">
                            {/* Progress bar for rating */} <br></br>
                            <h2>Rating</h2>
                            <p>{movie_average} / 10</p>
                            <br></br>
                            <div className="rating-bar">
                                <div 
                                    className="fill" 
                                    style={{ width: `${(movie_average / 10) * 100}%` }}
                                ></div>
                            </div>

                            <h2>Overview</h2>
                            <p>{overview}</p>
                            <h2>Release Date</h2>
                            <p>{release_date}</p>

                            <h2>Director</h2>
                            <p>
                                {creditsLoading ? 'Loading...' : (
                                    (credits.crew || []).filter(c => c.job === 'Director').map(d => d.name).join(', ') || 'N/A'
                                )}
                            </p>

                            <h2>Top Cast</h2>
                            <p>
                                {creditsLoading ? 'Loading...' : (
                                    (credits.cast || []).slice(0,6).map(c => c.name).join(', ') || 'N/A'
                                )}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom card placed after details - Discussions */}
            <div className="bottomCard discussion-card">
                <h3>Reviews from TMDb</h3>
                {reviewsError && <div className="error">{reviewsError}</div>}
                <div className="messages">
                    {reviews && reviews.length > 0 ? (
                        reviews.map(r => (
                            <div key={r.id} className="message">
                                <strong className="author">{r.author}:</strong>
                                <span className="text"> {r.content}</span>
                            </div>
                        ))
                    ) : (
                        !reviewsLoading && <div className="message">No reviews available.</div>
                    )}
                </div>

                {/* Local comment functionality removed — this view shows TMDb reviews only. */}
            </div>
        </div>
    );
}

export default MovieDetails;