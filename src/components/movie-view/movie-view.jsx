import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import MovieCard from "../movie-card/movie-card";
import { Col, Row, Container, Badge } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ movies, user, token, setUser }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [movieId]);

  if (!movie) return <div className="loading-screen">Movie not found</div>;
  if (isLoading) return <div className="loading-screen"><div className="loader"></div></div>;

  // Find similar movies based on genre
  const similarMovies = movies
    .filter((m) => m.genre.genreName === movie.genre.genreName && m.id !== movie.id)
    .slice(0, 4);

  return (
    <div className="movie-view-container">
      <Container>
        <Link to="/" className="back-button">
          <i className="fas fa-arrow-left"></i> Back to Movies
        </Link>
        
        {/* Simple table layout */}
        <div className="movie-box">
      
          <img 
            src={movie.imagePath} 
            alt={movie.title} 
            className="movie-image"
          />
          
          {/* Movie info below */}
          <h2 className="movie-title">{movie.title}</h2>
          
          <div className="movie-meta">
            <Badge bg="danger" className="genre-badge">{movie.genre.genreName}</Badge>
            <span className="director-info">Director: {movie.director.directorName}</span>
          </div>
          
          <div className="movie-description">
            <h3>Synopsis</h3>
            <p>{movie.description}</p>
          </div>
        </div>
        
        {/* Similar movies */}
        {similarMovies.length > 0 && (
          <div className="similar-movies">
            <h3 className="section-title">You Might Also Like</h3>
            <Row>
              {similarMovies.map((m) => (
                <Col key={m.id} sm={6} md={3} className="mb-4">
                  <MovieCard 
                    movie={m} 
                    user={user} 
                    token={token} 
                    setUser={setUser}
                  />
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Container>
    </div>
  );
};

export default MovieView;
