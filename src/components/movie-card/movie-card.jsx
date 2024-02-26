import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const MovieCard = ({ movie, token, setUser, user }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user.favoriteMovies && user.favoriteMovies.includes(movie._id)) {
      setIsFavorite(true);
    }
  }, [user]);

  const addFavoriteMovie = () => {
    fetch(
      `https://movie-api-da5i.onrender.com/users/${user.name}/movies/${movie._id}`,
      { method: "POST", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("Failed to add fav movie");
        }
      })
      .then((user) => {
        if (user) {
          alert("successfully added to favorites");
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          setIsFavorite(true);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const removeFavoriteMovie = () => {
    fetch(
      `https://movie-api-da5i.onrender.com/users/${user.name}/movies/${movie._id}`,
      { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed");
        }
      })
      .then((user) => {
        if (user) {
          alert("successfully deleted from favorites");
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          setIsFavorite(false);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Link to={`/movies/${movie.id}`}>
      <Card className="h-100" style={{ cursor: 'pointer', backgroundColor: 'white', border: '4px solid white' }}>
        <Card.Img variant="top" src={movie.imagePath} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.director.directorName}</Card.Text>
          <Card className="favorite-btns">
            {!isFavorite ? (
              <Button className="fav-btn" onClick={addFavoriteMovie}>+</Button>
            ) : (
              <Button className="fav-btn" onClick={removeFavoriteMovie}>-</Button>
            )}
          </Card>
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
};
