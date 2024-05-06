import React from "react";
import { FormControl, Dropdown, ButtonGroup } from "react-bootstrap";

const SearchBar = ({ searchTerm, onSearch, selectedGenre, onGenreSelect }) => {
  return (
    <div className="d-flex align-items-center"> 
      <FormControl
        type="text"
        placeholder="Search movies..."
        className="my-3 mr-sm-2"
        value={searchTerm}
        onChange={onSearch}
      />
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle variant="secondary">
          Filter by Genre: {selectedGenre}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => onGenreSelect("All")}>All</Dropdown.Item>
          <Dropdown.Item onClick={() => onGenreSelect("Action")}>
            Action
          </Dropdown.Item>
          <Dropdown.Item onClick={() => onGenreSelect("Comedy")}>
            Comedy
          </Dropdown.Item>
          <Dropdown.Item onClick={() => onGenreSelect("Drama")}>Drama</Dropdown.Item>
          {/* Add more genres as needed */}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default SearchBar;
