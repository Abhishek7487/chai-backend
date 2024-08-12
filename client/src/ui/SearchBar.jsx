import styled from "styled-components";
import { PiMagnifyingGlassBold } from "react-icons/pi";

const StyledSearchBar = styled.div`
  width: 45%;
  display: flex;
  align-items: center;

  input {
    width: 90%;
    padding: 0.8rem 2.4rem;
    font-size: 1.7rem;
    background-color: var(--color-primary);
    border: 1px solid var(--color-secondary);
    color: #fff;
    border-top-left-radius: 2rem;
    border-bottom-left-radius: 2rem;
  }

  input:focus {
    outline: none;
  }

  button {
    padding: 0.8rem 1.8rem;
    font-size: 1.62rem;
    background-color: var(--color-secondary);
    border: 1px solid var(--color-secondary);
    color: #fff;
    width: 10%;
    border-top-right-radius: 2rem;
    border-bottom-right-radius: 2rem;
  }
`;

function SearchBar() {
  return (
    <StyledSearchBar>
      <input type="text" placeholder="Search" />
      <button>
        <PiMagnifyingGlassBold />
      </button>
    </StyledSearchBar>
  );
}

export default SearchBar;
