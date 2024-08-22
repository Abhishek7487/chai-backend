import styled from "styled-components";
import SearchBar from "./SearchBar";

import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { LuUserCircle2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const StyledHeader = styled.header`
  grid-column: 1/-1;
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

    .singIn {
      display: flex;
      align-items: center;
      gap: 1rem;
      box-shadow: 0 0 5px var(--color-brand);
      border-radius: 2rem;
      padding: 0.6rem 1.4rem;
      cursor: pointer;

      p {
        font-size: 1.6rem;
      }
    }

    .headerIcons {
      cursor: pointer;
    }
  }
`;

function Header() {
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log(user);

  return (
    <StyledHeader>
      <img
        src="https://www.gstatic.com/youtube/img/promos/growth/0664a8ede860616c4112109238e707047d1441e348b7828876a79198dd5071a8_244x112.webp"
        alt="logo"
      />
      <SearchBar />
      <div className="headerActions">
        <AiOutlineVideoCameraAdd className="headerIcons" />
        {user ? (
          <LuUserCircle2
            className="headerIcons"
            onClick={() => navigate("/user")}
          />
        ) : (
          <div className="singIn" onClick={() => navigate("/login")}>
            <LuUserCircle2 className="headerIcons" />
            <p>Login</p>
          </div>
        )}
      </div>
    </StyledHeader>
  );
}

export default Header;
