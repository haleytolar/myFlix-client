// Here you import the PropTypes library

import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

// The MovieCard function component
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div className="h-100" onClick={() => onMovieClick(movie)} style={{ cursor: 'pointer' }}>
      <Card style={{ backgroundColor: 'white', border: '4px solid white' }}>
        <Card.Img variant="top" src={movie.imagePath} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.director.directorName}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};






// Here is where we define all the props constraints for the BookCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    author: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

