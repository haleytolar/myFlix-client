import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';

const MovieCard = ({ movie, user, addFavoriteMovie, removeFavoriteMovie }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user && user.favoriteMovies && user.favoriteMovies.includes(movie._id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [user, movie._id]);
  

  const handleAddFavoriteMovie = () => {
    fetch(
      `https://movieflix-87lf.onrender.com/users/${user.name}/movies/${movie._id}`,
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

  const handleRemoveFavoriteMovie = () => {
    fetch(
      `https://movieflix-87lf.onrender.com/users/${user.name}/movies/${movie._id}`,
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
    <Link to={`/movies/${movie.id}`}>
      <Card style={{ cursor: 'pointer', backgroundColor: 'white', border: '4px solid white' }}>
        <Card.Img variant="top" src={movie.imagePath} />
        <Card.Body>
          <Card.Title className="custom-card-title">{movie.title}</Card.Title>
          <Card.Text className="custom-card-text">{movie.director.directorName}</Card.Text>
        </Card.Body>
        <Row className="justify-content-md-center m-3">
          <Col>
            {user ? (
              isFavorite ? (
                <Button className="fav-btn" onClick={removeFavoriteMovie}>Remove Favorite</Button>
              ) : (
                <Button className="fav-btn" onClick={addFavoriteMovie}>Add Favorite</Button>
              )
            ) : null}
          </Col>
        </Row>
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
