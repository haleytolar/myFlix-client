import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [books, movieBooks] = useState([]);

  useEffect(() => {
    fetch('https://movieflix-87lf.onrender.com')
      .then((response) => response.json())
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
        setMovie(moviesFromApi);
      });
  }, []);
  

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView book={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

if (movie.length === 0) {
  return <div>The list is empty!</div>;
}

if (movie.length === 1) {
  return <div>Only one more book left!</div>;
}

return (
  <div>
    {movie.map((movie) => (
      <MovieCard
        key={bmovie.id}
        movie={movie}
        onMovieClick={(newSelectedMovie) => {
          setSelectedMovie(newSelectedMovie);
        }}
      />
    ))}
  </div>
);
};

