import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';

const MovieCard = ({ movie, user, addFavoriteMovie, removeFavoriteMovie }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user && user.favoriteMovies && user.favoriteMovies.includes(movie._id)) {
      setIsFavorite(true);
    }
  }, [user, movie]);

  return (
    <Link to={`/movies/${movie.id}`}>
      <Card style={{ cursor: 'pointer', backgroundColor: 'white', border: '4px solid white' }}>
        <Card.Img variant="top" src={movie.imagePath} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.director.directorName}</Card.Text>
        </Card.Body>
        <Row className="justify-content-md-center m-3">
          <Col>
            {user ? (
              isFavorite ? (
                <Button className="fav-btn" onClick={removeFavoriteMovie}>
                  Remove from Favorites
                </Button>
              ) : (
                <Button className="fav-btn" onClick={addFavoriteMovie}>
                  Add to Favorites
                </Button>
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
  user: PropTypes.object, //update this based on your user object structure
  addFavoriteMovie: PropTypes.func.isRequired,
  removeFavoriteMovie: PropTypes.func.isRequired,
};

export default MovieCard;