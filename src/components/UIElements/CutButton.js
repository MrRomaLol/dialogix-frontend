import React from "react";
import styled from "styled-components";

const CutButtonStyle = styled.button`
  height: 50px;
  width: ${({width}) => width || '200'}px;

  background-color: #5F3170;
  border: 0;

  color: white;
  font-family: Furore, serif;
  font-size: 24px;

  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%);

  transition-duration: 200ms;

  &:hover {
    background-color: #4d245d;
  }

  &:active {
    background-color: #3c194d;
  }
`

const ButtonEobaniyBlur = styled.div`
  display: flex;
  filter: drop-shadow(#BC2CC9 0 0 16px);
`

const CutButton = ({children, width, className, style, onClick}) => {
    return (
        <ButtonEobaniyBlur className={className} style={style}>
            <CutButtonStyle onClick={onClick} width={width}>{children}</CutButtonStyle>
        </ButtonEobaniyBlur>
    );
};

export default CutButton;