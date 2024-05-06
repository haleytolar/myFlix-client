import React from "react";
import { FormControl, Dropdown, ButtonGroup } from "react-bootstrap";

const SearchBar = ({ searchTerm, onSearch, selectedGenre, onGenreSelect }) => {
  return (
    <div className="d-flex">
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle variant="secondary" style={{ backgroundColor: "red", color: "white" }}>
          Filter by Genre: {selectedGenre}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => onGenreSelect("All")} style={{ color: "red" }}>All</Dropdown.Item>
          <Dropdown.Item onClick={() => onGenreSelect("Action")} style={{ color: "red" }}>
            Action
          </Dropdown.Item>
          <Dropdown.Item onClick={() => onGenreSelect("Comedy-drama")} style={{ color: "red" }}>
          Comedy-drama
          </Dropdown.Item>
          <Dropdown.Item onClick={() => onGenreSelect("Drama")} style={{ color: "red" }}>Drama</Dropdown.Item>
          <Dropdown.Item onClick={() => onGenreSelect("Gangster")} style={{ color: "red" }}>Gangster</Dropdown.Item>
          <Dropdown.Item onClick={() => onGenreSelect("Horror")} style={{ color: "red" }}>Horror</Dropdown.Item>
          <Dropdown.Item onClick={() => onGenreSelect("Romance")} style={{ color: "red" }}>Romance</Dropdown.Item>
          <Dropdown.Item onClick={() => onGenreSelect("Science fiction")} style={{ color: "red" }}>Science fiction</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default SearchBar;