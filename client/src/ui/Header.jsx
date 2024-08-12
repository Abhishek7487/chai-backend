import styled from "styled-components";

const StyledHeader = styled.header`
  grid-column: 1/-1;
`;

function Header() {
  return <StyledHeader>Header</StyledHeader>;
}

export default Header;
