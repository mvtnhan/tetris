import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import Cell from "./Cell";

const MainScreen = ({ screen }) => (
  <StyledMainScreen width={screen[0].length} height={screen.length}>
    {screen.map((row) => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
  </StyledMainScreen>
);
export default MainScreen;

MainScreen.propTypes = {
  screen: PropTypes.array.isRequired,
};

const StyledMainScreen = styled.div`
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
`;
