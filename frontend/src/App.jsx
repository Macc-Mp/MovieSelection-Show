import { useState } from 'react'

import './css/App.css'
import About from './pages/About'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import NavBar from './components/NavBar'
import { Routes, Route } from 'react-router-dom'
import  MovieDetails from './components/MovieDetails'
import  TVDetails from './components/TVDetails'
import { MovieProvider} from './contexts/MovieContext'

function App() {
  return (
  
  <div>
    <MovieProvider>
    <NavBar />

    <main className = "main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} /> 
        <Route path="/about" element={<About />} />
        <Route path="/movie/:movieId" element={<MovieDetails />} />
        <Route path="/tv/:tvId" element={<TVDetails />} />
      </Routes>
    </main>
    </MovieProvider>
  </div>

 /* const movieNumber = 1;
  return (
    <>
    {movieNumber === 1 ? (
      <MovieCard movie={{title: "Tim's", release_date: "20234"}}/>
    ) : (
      <MovieCard movie={{title: "Jim's", release_date: "20234"}}/>
    )}
      </>
  )
      */
  );
}



export default App
