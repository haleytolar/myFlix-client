import React from "react";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import { useParams } from "react-router";
import MovieCard from "../movie-card/movie-card";
import { Col, Row } from "react-bootstrap";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);

  return (
    <div style={{ backgroundColor: "black", padding: "20px", textAlign: "center" }}>
      <div>
        <img
          src={movie.imagePath}
          alt={movie.title}
          style={{
            maxWidth: "50%",
            maxHeight: "80vh",
            width: "100%",
            margin: "auto",
            border: "4px solid white",
          }}
        />
      </div>
      <div style={{ color: "white", marginTop: "30px", fontSize: "2em" }}>
        <span>{movie.title}</span>
      </div>
      <div style={{ color: "white", marginTop: "10px" }}>
        <span>{movie.description}</span>
      </div>
      <div style={{ color: "white", marginTop: "10px" }}>
        <span>Genre: </span>
        <span>{movie.genre.genreName}</span>
      </div>
      <div style={{ color: "white", marginBottom: "40px", marginTop: "10px"}}>
        <span>Director: </span>
        <span>{movie.director.directorName}</span>
      </div>
      <Link
        to="/"
        className="back-button"
        style={{  margin: "40px auto", padding: "10px 20px", fontSize: "1em" }}
      >
        Back
      </Link>
      <div>
        <h2 style={{ marginTop: "40px", marginBottom: "40px", color: "white" }}>Recommended Movies</h2>
        <Row>
          {movies
            .filter(
              (m) =>
                m.genre.genreName === movie.genre.genreName && m.id !== movie.id
            )
            .map((m) => (
              <Col key={m.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Link to={`/movies/${movie.id}`}>
                  <MovieCard movie={m} />
                </Link>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
};
