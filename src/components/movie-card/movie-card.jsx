import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import "./MovieCard.css";
const MovieCard = ({
  movie,
  user,
  addFavoriteMovie,
  removeFavoriteMovie,
  // Receive token as a prop
  token,
  // Receive setUser as a prop
  setUser,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (
      //   user &&
      //   user.favoriteMovies &&
      //   user.favoriteMovies.includes(movie._id)

      // Update using .id and also FavoriteMovies
      user &&
      user.FavoriteMovies &&
      user.FavoriteMovies.includes(movie.id)
    ) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [user, movie._id]);

  const handleAddFavoriteMovie = (event) => {
    // Add prevent default to prevent movie-view from rendering
    event.preventDefault();
    fetch(
      // `https://movieflix-87lf.onrender.com/users/${user.name}/movies/${movie._id}`,
      // User appropriate properties from user and movie object
      `https://movieflix-87lf.onrender.com/users/${user.Username}/movies/${movie.id}`,
      { method: "POST", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("Failed to add fav movie");
          throw new Error("Failed to add fav movie");
        }
      })
      .then((updatedUser) => {
        alert("Successfully added to favorites");
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsFavorite(true);
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to add to favorites");
      });
  };

  const handleRemoveFavoriteMovie = (event) => {
    event.preventDefault(); // Add preventDefault to prevent the link from being followed
    fetch(
      `https://movieflix-87lf.onrender.com/users/${user.Username}/movies/${movie.id}`,
      { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed to remove from favorites");
          throw new Error("Failed to remove from favorites");
        }
      })
      .then((updatedUser) => {
        alert("Successfully removed from favorites");
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsFavorite(false);
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to remove from favorites");
      });
  };
  

  return (
    <Link to={`/movies/${movie.id}`} className="custom-card-title">
      <Card
        style={{
          cursor: 'pointer',
          backgroundColor: 'white',
          border: '4px solid white',
        }}
      >
        <Card.Img variant="top" src={movie.imagePath} />
        <Card.Body className="d-flex flex-column align-items-center">
          <Card.Title className="text-truncate">{movie.title}</Card.Title>
          <Card.Text className="custom-card-text text-truncate">
            {movie.director.directorName}
          </Card.Text>
          {user && (
            <div className="mt-auto">
              {isFavorite ? (
                <Button
                  className="fav-btn"
                  onClick={(event) => handleRemoveFavoriteMovie(event)}
                >
                  Remove Favorite
                </Button>
             ) : (
              <Button
                className="fav-btn"
                onClick={(event) => handleAddFavoriteMovie(event)}
              >
                Add Favorite
              </Button>
            )}
          </div>
        )}
      </Card.Body>
    </Card>
  </Link>
);
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    director: PropTypes.shape({
      directorName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  user: PropTypes.object, // Update this based on your user object structure
  addFavoriteMovie: PropTypes.func.isRequired,
  removeFavoriteMovie: PropTypes.func.isRequired,
};

export default MovieCard;