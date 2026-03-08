import "../css/About.css";

function About() {
  return (
    <div >
        <div className="containerOwner">
      <img className = "ownerTag" src = "/Movielist.png" alt="Logo" />
        </div>
      <h1>About</h1>
      <p>Made with React and Vite</p>
      <p>I am trying to learn about react hooks. The API key used here is from themovie.org.</p>
       <p>This project is assisted with Github and Copilot.</p> 
    </div>
  );
}

export default About;