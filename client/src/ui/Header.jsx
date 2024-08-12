import styled from "styled-components";
import SearchBar from "./SearchBar";

import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { LuUserCircle2 } from "react-icons/lu";

const StyledHeader = styled.header`
  grid-column: 1/-1;
  border-bottom: 1px solid var(--color-secondary);
  padding: 0.6rem 2.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    height: 5.6rem;
  }

  .headerActions {
    display: flex;
    align-items: center;
    gap: 2.4rem;
    font-size: 2.4rem;
  }
`;

function Header() {
  return (
    <StyledHeader>
      <img
        src="https://www.gstatic.com/youtube/img/promos/growth/0664a8ede860616c4112109238e707047d1441e348b7828876a79198dd5071a8_244x112.webp"
        alt="logo"
      />
      <SearchBar />
      <div className="headerActions">
        <AiOutlineVideoCameraAdd />
        <LuUserCircle2 />
      </div>
    </StyledHeader>
  );
}

export default Header;
