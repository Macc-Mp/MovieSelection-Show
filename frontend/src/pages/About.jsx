import "../css/About.css";

function About() {
  return (
    <div className="about-page">
      <div className="about-container">
        <div className="containerOwner">
          <img className="ownerTag" src="/Movielist.png" alt="Developer Logo" />
        </div>
        
        <div className="about-content">
          <h1>About <span>Paule's Movie Selection</span></h1>
          <p className="description">
            This project was built to explore the power of <strong>React Hooks</strong> 
            and modern web development workflows.
          </p>
          
          <div className="tech-stack">
            <span className="badge">React</span>
            <span className="badge">Vite</span>
            <span className="badge">TMDb API</span>
            <span className="badge">GitHub Copilot</span>
          </div>

          <div className="info-grid">
            <div className="info-item">
              <h3>The Mission</h3>
              <p>To create a seamless, cinematic interface for discovering your next favorite film or TV show.</p>
            </div>
            <div className="info-item">
              <h3>The Tech</h3>
              <p>Powered by the TMDb API, providing real-time data on thousands of titles, ratings, and reviews.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;