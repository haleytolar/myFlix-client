import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import "./MovieCard.css";

const MovieCard = ({
  movie,
  user,
  token,
  setUser,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(user && user.FavoriteMovies && user.FavoriteMovies.includes(movie.id));
  }, [user, movie.id]);

  const handleAddFavoriteMovie = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://movieflix-87lf.onrender.com/users/${user.Username}/movies/${movie.id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) {
        throw new Error("Failed to add to favorites");
      }
      const updatedUser = await response.json();
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsFavorite(true);
      alert("Successfully added to favorites");
    } catch (error) {
      console.error("Error adding to favorites:", error);
      alert("Failed to add to favorites");
    }
  };

  const handleRemoveFavoriteMovie = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://movieflix-87lf.onrender.com/users/${user.Username}/movies/${movie.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) {
        throw new Error("Failed to remove from favorites");
      }
      const updatedUser = await response.json();
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsFavorite(false);
      alert("Successfully removed from favorites");
    } catch (error) {
      console.error("Error removing from favorites:", error);
      alert("Failed to remove from favorites");
    }
  };

  return (
    <Link to={`/movies/${movie.id}`} className="custom-card-title">
      <Card className="movie-card" style={{
          cursor: 'pointer',
          backgroundColor: 'white',
          border: '4px solid white',
        }}>
        <Card.Img variant="top" src={movie.imagePath} />
        <Card.Body>
          <Card.Title style={{ fontSize: '1rem' }}>{movie.title}</Card.Title>
          <Card.Text style={{ fontSize: '0.8rem' }}>{movie.director.directorName}</Card.Text>
        </Card.Body>
        {user && (
          <div className="mt-auto">
            <Button
              variant={isFavorite ? "danger" : "primary"}
              className="favorite-btn"
              onClick={isFavorite ? handleRemoveFavoriteMovie : handleAddFavoriteMovie}
              style={{ backgroundColor: isFavorite ? "red" : "", color: isFavorite ? "white" : "", marginBottom: "10px" }}
            >
              {isFavorite ? "Remove Favorite" : "Add Favorite"}
            </Button>
          </div>
        )}
      </Card>
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  user: PropTypes.object,
  token: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired
};

export default MovieCard;
