import styled from "styled-components";

import { GoHome } from "react-icons/go";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { BiSolidUserAccount } from "react-icons/bi";
import { FaHistory } from "react-icons/fa";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { BsPlayBtn } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";

const StyledSidebar = styled.aside`
  grid-row: 2 / -1;
  grid-column: 1 / 2;
  border-right: 1px solid var(--color-secondary);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.2rem;

  div,
  ul {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    border-bottom: 1px solid var(--color-secondary);

    header {
      padding: 0 1.2rem;
      font-size: 1.7rem;
      font-weight: 600;
    }

    li {
      padding: 0.8rem 1.2rem;
      border-radius: 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 2rem;

      .icon {
        font-size: 2.2rem;
      }
    }

    li:hover {
      background-color: var(--color-secondary);
    }
  }

  div:last-child {
    border-bottom: none;
  }
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <ul>
        <li>
          <GoHome className="icon" />
          Home
        </li>
        <li>
          <SiYoutubeshorts className="icon" />
          Shorts
        </li>
        <li>
          <MdOutlineSubscriptions className="icon" />
          Subscription
        </li>
      </ul>
      <div>
        <header>
          You <MdKeyboardArrowRight />
        </header>
        <ul>
          <li>
            <BiSolidUserAccount className="icon" />
            Your channel
          </li>
          <li>
            <FaHistory className="icon" />
            History
          </li>
          <li>
            <MdOutlinePlaylistAdd className="icon" />
            Playlists
          </li>
          <li>
            <BsPlayBtn className="icon" />
            Your videos
          </li>
          <li>
            <AiOutlineLike className="icon" />
            Liked videos
          </li>
        </ul>
      </div>
      <div>
        <header>Subscriptions</header>
      </div>
    </StyledSidebar>
  );
}

export default Sidebar;
