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
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
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

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={() => { setUser(null); setToken(null); localStorage.clear(); }}  
>
        <FormControl
          type="text"
          placeholder="Search movies..."
          className="my-3 mr-sm-2"
          value={searchTerm}
          onChange={handleSearch} 
/>
<Dropdown as={ButtonGroup}>
          <Dropdown.Toggle variant="secondary">Filter by Genre: {selectedGenre}</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleGenreSelect("All")}>All</Dropdown.Item>
            <Dropdown.Item onClick={() => handleGenreSelect("Action")}>Action</Dropdown.Item>
            <Dropdown.Item onClick={() => handleGenreSelect("Comedy")}>Comedy</Dropdown.Item>
            <Dropdown.Item onClick={() => handleGenreSelect("Drama")}>Drama</Dropdown.Item>
            {/* Add more genres as needed */}
          </Dropdown.Menu>
        </Dropdown>
      </Navbar>
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
          <Route
          path="/movies/:movieId"
          element={<MovieView movies={movieBooks} />}
        />
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
              )
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

