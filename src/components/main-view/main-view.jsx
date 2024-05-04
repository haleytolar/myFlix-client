import React, { useState, useEffect } from "react";
import MovieCard from "../movie-card/movie-card";
import { LoginView } from "../login-view/login-view";
import { Col, Row, Form } from "react-bootstrap";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import Navbar from "../navigation-bar/navigation-bar";

export const MainView = () => {
  const [movieBooks, setMovieBooks] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [selectedGenre, setSelectedGenre] = useState("All");

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://movieflix-87lf.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          id: movie._id,
          title: movie.Title,
          imagePath: movie.ImagePath,
          description: movie.Description,
          genre: movie.Genre.Name,
          director: {
            directorName: movie.Director.Name,
            bio: movie.Director.Bio,
            birth: movie.Director.Birth,
            death: movie.Director.Death,
          },
        }));
        setMovieBooks(moviesFromApi);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [token]);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const filteredMovies = selectedGenre === "All" ? movieBooks : movieBooks.filter(movie => movie.genre === selectedGenre);

  return (
    <div>
      <Navbar
        user={user}
        onLogout={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Routes>
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/" />
            ) : (
              <Col md={6} className="mx-auto mt-5">
                <LoginView
                  onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                  }}
                />
              </Col>
            )
          }
        />

        {/* Add other routes here */}

        <Route
          path="/"
          element={
            user ? (
              <>
                <Form.Group controlId="genreSelect">
                  <Form.Control
                    as="select"
                    value={selectedGenre}
                    onChange={handleGenreChange}
                  >
                    <option value="All">All Genres</option>
                    {/* Add options for each genre dynamically */}
                    {/* For example: <option value="Action">Action</option> */}
                  </Form.Control>
                </Form.Group>
                {filteredMovies.length > 0 ? (
                  <Row>
                    {filteredMovies.map((movie) => (
                      <Col className="mb-5" key={movie.id} md={3}>
                        <Link
                          to={`/movies/${movie.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <MovieCard
                            movie={movie}
                            user={user}
                            token={token}
                            setUser={setUser}
                          />
                        </Link>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <Col>The list is empty!</Col>
                )}
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </div>
  );
};
