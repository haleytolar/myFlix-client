import React from "react";
import { FormControl, Dropdown, ButtonGroup } from "react-bootstrap";

const SearchBar = ({ searchTerm, onSearch, selectedGenre, onGenreSelect }) => {
  return (
    <div className="d-flex">
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle variant="secondary">
          Filter by Genre: {selectedGenre}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => onGenreSelect("All")} style={{ color: "red" }}>All</Dropdown.Item>
          <Dropdown.Item onClick={() => onGenreSelect("Action")}>
            Action
          </Dropdown.Item>
          <Dropdown.Item onClick={() => onGenreSelect("Comedy")} style={{ color: "red" }}>
            Comedy
          </Dropdown.Item>
          <Dropdown.Item onClick={() => onGenreSelect("Drama")} style={{ color: "red" }}>Drama</Dropdown.Item>
          {/* Add more genres as needed */}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default SearchBar;
