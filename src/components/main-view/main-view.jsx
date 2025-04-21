import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom"; 
import { Col, Row, FormControl, Container, Button } from "react-bootstrap";
import Navbar from "../navigation-bar/navigation-bar";
import { SignupView } from "../signup-view/signup-view";
import { LoginView } from "../login-view/login-view";
import ProfileView from "../profile-view/profile-view";
import MovieCard from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import "./main-view.scss";

export const MainView = () => {
  const [movieBooks, setMovieBooks] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    fetch("https://movieflix-87lf.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const moviesFromApi = data.map((movie) => ({
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
        }));
        setMovieBooks(moviesFromApi);
        setFilteredMovies(moviesFromApi);
        setTimeout(() => setIsLoading(false), 800); // Add a slight delay 
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setIsLoading(false);
      });
  }, [token]);

  // Get genres from movies
  const genres = ["All", ...new Set(movieBooks.map(movie => movie.genre.genreName))];

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    filterMovies(searchTerm, selectedGenre);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    filterMovies(searchTerm, genre);
  };

  const filterMovies = (searchTerm, genre) => {
    let filtered = movieBooks;

    if (searchTerm) {
      filtered = filtered.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm)
      );
    }

    if (genre !== "All") {
      filtered = filtered.filter((movie) => movie.genre.genreName === genre);
    }

    setFilteredMovies(filtered);
  };

  return (
    <div className="app-container">
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
          element={!user ? <LoginView onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }} /> : <Navigate to="/" />}
        />
        
        <Route
          path="/signup"
          element={!user ? <SignupView /> : <Navigate to="/" />}
        />
        
        <Route
          path="/movies/:movieId"
          element={
            user ? (
              <MovieView 
                movies={movieBooks} 
                user={user}
                token={token}
                setUser={setUser}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        
        <Route
          path="/profile"
          element={
            user ? (
              <ProfileView 
                user={user} 
                token={token}
                movies={movieBooks}
                setUser={setUser}
                onDelete={() => {
                  setUser(null);
                  setToken(null);
                  localStorage.clear();
                }}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        
        <Route
          path="/"
          element={
            user ? (
              <div className="movies-page">
                <div className="hero-section">
                  <div className="hero-content">
                    <h1>Welcome to MovieFlix</h1>
                    <p>Discover amazing movies and build your personal collection</p>
                  </div>
                </div>

                <Container>
                  <div className="search-filters-container">
                    <div className="search-container">
                      <i className="fas fa-search search-icon"></i>
                      <FormControl
                        type="text"
                        placeholder="Search movies..."
                        className="search-input"
                        value={searchTerm}
                        onChange={handleSearch}
                      />
                    </div>
                    
                    <div className="genre-filters">
                      {genres.map(genre => (
                        <Button
                          key={genre}
                          variant={selectedGenre === genre ? "primary" : "outline-light"}
                          className="genre-btn"
                          onClick={() => handleGenreSelect(genre)}
                        >
                          {genre}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {isLoading ? (
                    <div className="loading-container">
                      <div className="loader"></div>
                      <p>Loading movies...</p>
                    </div>
                  ) : filteredMovies.length > 0 ? (
                    <Row className="movie-grid">
                      {filteredMovies.map((movie) => (
                        <Col className="movie-column" key={movie.id} sm={6} md={4} lg={3}>
                          <Link to={`/movies/${movie.id}`} style={{ textDecoration: "none" }}>
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
                    <div className="no-results">
                      <i className="fas fa-film no-results-icon"></i>
                      <h3>No movies found</h3>
                      <p>Try adjusting your search or filters</p>
                    </div>
                  )}
                </Container>
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default MainView;