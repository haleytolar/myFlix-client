import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Button, Col, Container, Nav, Row } from "react-bootstrap";


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
      <Row className="justify-content-md-center">
        <Col md={5} style={{ textAlign: "center", color: "white" }}>
          <LoginView onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }} />
          <div style={{ margin: "10px", padding: "10px 0", fontSize: "1.5em" }}>or</div>
          <SignupView />
        </Col>
      </Row>
    );
  }

  console.log("movieBooks", movieBooks);
  if (selectedMovie) {
    let genre = selectedMovie.genre.genreName;
  
    // Filter movies by genre and exclude the selected movie
    let similarMovies = movieBooks.filter(
      (movie) => movie.genre.genreName === genre && movie.id !== selectedMovie.id
    );
  
    return (
      <div>
        <Row className="justify-content-md-center">
          <Col md={10}>
            <MovieView
              movie={selectedMovie}
              onBackClick={() => setSelectedMovie(null)}
            />
          </Col>
        </Row>
        {similarMovies.length > 0 && (
          <>
            <hr />
            <h2 style={{ color: "white", borderTop: "2px solid white", padding: "20px 0" }}>Recommended Movies</h2>
            <Row>
              {similarMovies.map((movie) => (
                <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <MovieCard
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                      setSelectedMovie(newSelectedMovie);
                    }}
                  />
                </Col>
              ))}
            </Row>
          </>
        )}
      </div>
    );
  }
  
  
  
  
  

if (movieBooks.length === 0) {
  return <Col>The list is empty!</Col>;
}

if (movieBooks.length === 1) {
  return <Col>Only one more movie left!</Col>;
}

return (
  <Row>
    {movieBooks.map((movie) => (
      <Col className="mb-5" key={movie.id} md={3}>
        <MovieCard
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      </Col>
    ))}
    <button
  className="back-button"
  onClick={() => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  }}
>
  Logout
</button>

  </Row>
)};
