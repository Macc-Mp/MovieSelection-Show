import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../css/MovieDetails.css";
import { getTVReviews } from "../services/api";

function TVDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state || {};
    const { overview } = state;
    const tvTitle = state.tvTitle || state.name || state.title || '';
    const posterSrc = state.tvPoster || state.poster_path || state.poster || '';
    const dateText = state.release_date || state.first_air_date || '';
    const rawRating = (state.movie_average ?? state.vote_average ?? '').toString();
    const ratingNum = parseFloat(rawRating);
    const rating = Number.isFinite(ratingNum) ? ratingNum : null;

    const [reviews, setReviews] = useState([]);
    const { tvId } = useParams();
    const [reviewsLoading, setReviewsLoading] = useState(false);
    const [reviewsError, setReviewsError] = useState(null);

    useEffect(() => {
        const load = async () => {
            if (!tvId) return;
            try {
                setReviewsLoading(true);
                const data = await getTVReviews(tvId);
                setReviews(data);
                setReviewsError(null);
            } catch (err) {
                console.error('TV reviews fetch failed', err);
                setReviewsError('Failed to load reviews');
            } finally {
                setReviewsLoading(false);
            }
        };
        load();
    }, [tvId]);

    return (
        <div className="movie-details">
            <button onClick={() => navigate(-1)} className="back-button">Back</button>
            <div className="details-row">
                <div className="leftCard">
                    <h1 className="movie-title">{tvTitle}</h1>
                    <img className="posterClass" src={posterSrc} alt="Poster" />
                </div>

                {overview && (
                    <div className="rightCard">
                        <div className="movie-overview">
                            <h2>Rating</h2>
                            <p>{rating !== null ? `${rating} / 10` : 'N/A'}</p>
                            <div className="rating-bar">
                                <div className="fill" style={{ width: `${rating !== null ? (rating / 10) * 100 : 0}%` }}></div>
                            </div>
                            <h2>Overview</h2>
                            <p>{overview}</p>
                            <h2>First Air Date</h2>
                            <p>{dateText}</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="bottomCard discussion-card">
                <h3>Reviews from TMDb</h3>
                {reviewsLoading && <div>Loading reviews...</div>}
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
            </div>
        </div>
    );
}

export default TVDetails;
