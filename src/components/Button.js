import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Button = ({ onclick, children }) => (
  <StyledStartButton onClick={onclick}>{children}</StyledStartButton>
);
export default Button;

Button.propTypes = {
  onclick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

const StyledStartButton = styled.button`
  box-sizing: border-box;
  margin: 0 0 20px 0;
  padding: 20px;
  min-height: 30px;
  width: 100%;
  border-radius: 20px;
  border: none;
  color: white;
  background: #333;
  font-size: 2rem;
  outline: none;
  cursor: pointer;
`;
