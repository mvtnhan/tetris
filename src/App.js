import React from "react";
import Tetris from "./components/Tetris";
import styled from "styled-components";
import bgImage from "./image/bg.png";

const App = () => (
  <StyledApp className="App">
    <Tetris />
  </StyledApp>
);

export default App;

const StyledApp = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${bgImage}) #000;
  background-size: cover;
  overflow: hidden;
`;
