import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movieBooks, setMovieBooks] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch('https://movieflix-87lf.onrender.com/movies')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie.id,
            title: movie.title,
            imagePath: movie.imagePath,
            description: movie.description,
            releaseDate: movie.releaseDate,
            genre: {
              genreName: movie.genre.genreName,
              genreDescription: movie.genre.genreDescription,
            },
            director: {
              directorName: movie.director.directorName,
              bio: movie.director.bio,
              birth: movie.director.birth,
              death: movie.director.death,
            },
            featured: movie.featured,
          };
        });
        setMovieBooks(moviesFromApi);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, []);

  if (selectedMovie) {
    let genre = selectedMovie.genre.genreName;

    // Filter movies by genre
    let similarMovies = movieBooks.filter((movie) => movie.genre.genreName === genre);

    return (
      <>
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
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
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
