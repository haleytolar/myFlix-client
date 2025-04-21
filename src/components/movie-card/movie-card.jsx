import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./MovieCard.scss";

const MovieCard = ({ movie, user, token, setUser }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Check if movie is in user's favorites
  useEffect(() => {
    if (user && user.FavoriteMovies && movie.id) {
      setIsFavorite(user.FavoriteMovies.includes(movie.id));
    }
  }, [user, movie.id]);

  // Add to favorites
  const handleAddFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user || !token) return;
    
    fetch(`https://movieflix-87lf.onrender.com/users/${user.Username}/movies/${movie.id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      if (!response.ok) throw new Error("Failed to add");
      return response.json();
    })
    .then(data => {
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      setIsFavorite(true);
    })
    .catch(error => console.error(error));
  };

  // Remove from favorites
  const handleRemoveFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user || !token) return;
    
    fetch(`https://movieflix-87lf.onrender.com/users/${user.Username}/movies/${movie.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      if (!response.ok) throw new Error("Failed to remove");
      return response.json();
    })
    .then(data => {
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      setIsFavorite(false);
    })
    .catch(error => console.error(error));
  };

  return (
    <div className="movie-card-wrapper">
      {user && (
        <div className="heart-icon">
          {isFavorite ? (
            <button onClick={handleRemoveFavorite} className="heart-btn favorite">
              ♥
            </button>
          ) : (
            <button onClick={handleAddFavorite} className="heart-btn">
              ♡
            </button>
          )}
        </div>
      )}
      
      
      <Link to={`/movies/${movie.id}`} className="movie-link">
        <div 
          className="movie-card" 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="poster-wrap">
            <img 
              src={movie.imagePath} 
              alt={movie.title} 
              className="poster-img" 
            />
            
            {isHovered && (
              <div className="hover-overlay">
                <h3>{movie.title}</h3>
                <p className="director">Director: {movie.director.directorName}</p>
                {movie.description && (
                  <p className="description">{movie.description.substring(0, 100)}...</p>
                )}
              </div>
            )}
          </div>
          
          <div className="title-bar">
            <h4>{movie.title}</h4>
          </div>
        </div>
      </Link>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  user: PropTypes.object,
  token: PropTypes.string,
  setUser: PropTypes.func
};

export default MovieCard;
