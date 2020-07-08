import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import Cell from "./Cell";
import Display from "./Display";

const MainScreen = ({ screen, gameOver }) => (
  <StyledMainScreen
    width={screen[0].length}
    height={screen.length}
    gameOver={gameOver}
  >
    {screen.map((row) => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}

    {gameOver ? (
      <div className="GameOver">
        <Display gameOver={gameOver} text="Game Over" />
      </div>
    ) : null}
  </StyledMainScreen>
);
export default MainScreen;

MainScreen.propTypes = {
  screen: PropTypes.array.isRequired,
};

const StyledMainScreen = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: repeat(
    ${(props) => props.height},
    calc(25vw / ${(props) => props.width})
  );

  grid-template-columns: repeat(${(props) => props.width}, 1fr);
  grid-gap: 1px;
  border: 2px solid #333;
  max-width: 25vw;
  width: 100%;
  background: #111;
  opacity: ${(props) => (props.gameOver ? 0.6 : 1)};

  .GameOver {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
