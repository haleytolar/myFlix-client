import React, { useState, useEffect } from "react";
import MovieCard from "../movie-card/movie-card";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { MovieView } from "../movie-view/movie-view";
import { Col, Row } from "react-bootstrap";
import { Routes, Route, Navigate, BrowserRouter, Link } from "react-router-dom";
import Navbar from "../navigation-bar/navigation-bar";
import ProfileView from "../profile-view/profile-view";


export const MainView = () => {
  const [movieBooks, setMovieBooks] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

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
          };
        });
        setMovieBooks(moviesFromApi);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [token]);

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={() => { setUser(null); setToken(null); localStorage.clear(); }} />
      <Routes>
        <Route
          path="/login"
          element={
            <Row className="justify-content-md-center">
              <Col md={5} style={{ textAlign: "center", color: "white" }}>
                <LoginView onLoggedIn={(user, token) => {
                  setUser(user);
                  setToken(token);
                }} />
              </Col>
            </Row>
          }
        />
        <Route
          path="/signup"
          element={
            <Row className="justify-content-md-center">
              <Col md={5} style={{ textAlign: "center", color: "white" }}>
                <SignupView />
              </Col>
            </Row>
          }
        />
         <Route
        path="/movies/:movieId"
        element={(params) => {
          const movieId = params.match.params.movieId;
          const movie = movieBooks.find((m) => m.id === movieId);

          return (
            movie ? (
              <div>
                <Row className="justify-content-md-center">
                  <Col md={10}>
                    <MovieView movie={movie} />
                  </Col>
                </Row>

                {movieBooks.length > 0 && (
                  <>
                    <hr />
                    <h2 style={{ color: "white", borderTop: "2px solid white", padding: "20px 0" }}>Recommended Movies</h2>
                    <Row>
                      {movieBooks
                        .filter((m) => m.genre.genreName === movie.genre.genreName && m.id !== movie.id)
                        .map((m) => (
                          <Col key={m.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                            <Link to={`/movies/${m.id}`}>
                              <MovieCard movie={m} />
                            </Link>
                          </Col>
                        ))}
                    </Row>
                  </>
                )}
              </div>
            ) : (
              <Navigate to="/" />
            )
          );
        }}
      />
      <Route
        path="/"
        element={
          movieBooks.length === 0 ? (
            <Col>The list is empty!</Col>
          ) : movieBooks.length === 1 ? (
            <Col>Only one more movie left!</Col>
          ) : (
            <Row>
              {movieBooks.map((movie) => (
                <Col className="mb-5" key={movie.id} md={3}>
                  <Link to={`/movies/${movie.id}`}>
                    <MovieCard movie={movie} />
                  </Link>
                </Col>
              ))}
            </Row>
          )
        }
      />
   <Route
  path="/profile"
  element={
    <>
      {!user ? (
        <Navigate to="/login" replace />
      ) : (
        <Col>
          <Row>
            <ProfileView
              user={user}
              token={token}
              setUser={setUser}
              movies={movieBooks} // Pass the movies array
              onDelete={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
              }}
            />
          </Row>
        </Col>
      )}
    </>
  }
/>
      </Routes>
    </BrowserRouter>
  );
};
