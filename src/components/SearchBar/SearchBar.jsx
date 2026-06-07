import React from "react";
import Input from "../Input/Input";
import styled from "styled-components";

function SearchBar({ query, onQueryChange }) {
  return (
    <div>
      <StyledInput
        type="text"
        value={query}
        placeholder="Search lists..."
        onChange={(e) => onQueryChange(e.target.value)}
      />
    </div>
  );
}

const StyledInput = styled(Input)`
  width: 100%;
`;

export default SearchBar;
