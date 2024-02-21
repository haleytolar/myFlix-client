import React from "react";
import "./movie-view.scss";

// The MovieView function component
export const MovieView = ({ movie, onBackClick }) => {
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
          }}
        />
      </div>
      <div style={{ color: "white" }}>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div style={{ color: "white" }}>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div style={{ color: "white" }}>
        <span>Genre: </span>
        <span>{movie.genre.genreName}</span>
      </div>
      <div style={{ color: "white" }}>
        <span>Director: </span>
        <span>{movie.director.directorName}</span>
      </div>
      <button
        onClick={onBackClick}
        className="back-button"
        style={{ cursor: "pointer" }}
      >
        Back
      </button>
    </div>
  );
};
