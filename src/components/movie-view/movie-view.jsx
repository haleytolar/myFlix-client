import React from "react";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movie }) => {
  return (
    <div style={{ backgroundColor: 'black', padding: "20px", textAlign: "center" }}>
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
      <div style={{ color: "white", marginTop: "20px", fontSize: "1.5em" }}>
        <span>{movie.title}</span>
      </div>
      <div style={{ color: "white" }}>
        <span>{movie.description}</span>
      </div>
      <div style={{ color: "white", marginTop: "10px" }}>
        <span>Genre: </span>
        <span>{movie.genre.genreName}</span>
      </div>
      <div style={{ color: "white" }}>
        <span>Director: </span>
        <span>{movie.director.directorName}</span>
      </div>
      <Link to="/" className="back-button" style={{ marginTop: "20px", padding: "10px 20px", fontSize: "1em" }}>
        Back
      </Link>
    </div>
  );
};
