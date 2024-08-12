import styled from "styled-components";

const StyledHome = styled.aside`
  grid-row: 2 / -1;
  grid-column: 2 / -1;
`;

function Home() {
  return <StyledHome>This is Homepage</StyledHome>;
}

export default Home;
