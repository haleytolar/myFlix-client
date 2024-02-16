import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
    const [movieBooks, setMovieBooks] = useState([]);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
  
  
  
    useEffect(() => {
      if (!token) {
          return;
      }

      fetch("https://movieflix-87lf.onrender.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
       .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            imagePath: movie.ImagePath,
            description: movie.Description,
            genre: {
              genreName: movie.Genre.Name,
              genreDescription: movie.Description,
            },
            director: {
              directorName: movie.Director.Name,
              bio: movie.Director.Bio,
              birth: movie.Director.Birth,
              death: movie.Director.Death,
            },
            // featured: movie.featured,
          };
        });
        setMovieBooks(moviesFromApi);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [token]);

  if (!user) {
    return (
      <>
        <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} />
        or
        <SignupView />
      </>
    );
  }

  console.log("movieBooks", movieBooks);
  if (selectedMovie) {
    let genre = selectedMovie.genre.genreName;

    // Filter movies by genre
    let similarMovies = movieBooks.filter(
      (movie) => movie.genre.genreName === genre
    );

    return (
      <>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
        <hr />
        <h2>Similar Movies</h2>
        {similarMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </>
    );
  }

  if (movieBooks.length === 0) {
    return <div>The list is empty!</div>;
  }

  if (movieBooks.length === 1) {
    return <div>Only one more movie left!</div>;
  }
  return (
    <div>
      {movieBooks.map((movie) => (
        <div key={movie.id}>
          <MovieCard
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        </div>
      ))}
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      >
        Logout
      </button>
    </div>
  )}