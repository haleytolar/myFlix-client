import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, Link, useLocation } from "react-router-dom"; 
import { Col, Row } from "react-bootstrap";
import Navbar from "../navigation-bar/navigation-bar";
import { SignupView } from "../signup-view/signup-view";
import { LoginView } from "../login-view/login-view";
import ProfileView from "../profile-view/profile-view";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import SearchBar from "../search-bar/search-bar";

export const MainView = () => {
  const [movieBooks, setMovieBooks] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const navigate = useNavigate();
  const location = useLocation();

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
        setFilteredMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [token]);

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

  const handleLogin = (user, token) => {
    setUser(user);
    setToken(token);
    navigate('/');
  };

  return (
    <div>
      <Row className="align-items-center justify-content-center">
        <Col xs={12} md={6}>
          {location.pathname === "/" && ( 
            <div className="mb-3"> 
              <SearchBar
                searchTerm={searchTerm}
                onSearch={handleSearch}
                selectedGenre={selectedGenre}
                onGenreSelect={handleGenreSelect}
              />
            </div>
          )}
        </Col>
        <Col xs={12} md={6}>
          <Navbar
            user={user}
            onLogout={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
          />
        </Col>
      </Row>
      <Routes>
      <Route
  path="/login"
  element={
    <>
      {user ? (
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
      )}
    </>
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
        <Route path="/movies/:movieId" element={<MovieView movies={movieBooks} />} />
        <Route
          path="/"
          element={
            user ? (
              <>
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
                      movies={movieBooks}
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
    </div>
  );
};
