import styled from "styled-components";

const StyledSidebar = styled.aside`
  grid-row: 2 / -1;
  grid-column: 1 / 2;
`;

function Sidebar() {
  return <StyledSidebar>Sidebar</StyledSidebar>;
}

export default Sidebar;
