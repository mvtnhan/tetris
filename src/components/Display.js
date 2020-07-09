import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Display = ({ gameOver, text }) => (
  <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>
);
export default Display;

Display.propTypes = {
  gameOver: PropTypes.bool,
  text: PropTypes.string.isRequired,
};

const StyledDisplay = styled.div`
  text-align: center;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin: 0 0 20px 0;
  padding: 20px;
  border: 4px solid #333;
  min-height: 30px;
  width: 100%;
  border-radius: 20px;
  color: ${(props) => (props.gameOver ? "red" : "#999")};
  background: #000;
  font-size: 1.6rem;
`;
