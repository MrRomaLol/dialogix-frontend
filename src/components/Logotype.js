import React from 'react';
import styled from "styled-components";

const LogoBack = styled.div`
  width: 110px;
  height: 110px;

  position: relative;

  border-radius: 50%;

  border: solid #a263c2 3px;

  cursor: pointer;
  
  box-shadow: inset 0 0 10px rgba(255, 0, 245, 0.5);
  filter: drop-shadow(rgba(255, 0, 245, 0.8) 0 0 25px);

  background: radial-gradient(#8723D6, #000000);
`

const EyesContainer = styled.div`
  display: flex;
  flex-direction: row;

  margin-top: 50px;
  margin-left: 35px;
  margin-right: 35px;

  justify-content: space-between;

  filter: opacity(0%);

  transition-duration: 500ms;
`

const Eye = styled.div`
  width: 6px;
  height: 6px;
  
  background-color: red;

  filter: drop-shadow(rgba(255, 0, 0, 1) 0px 0px 3px);
`

const LogoImage = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  background: url(img/DialogiX_Logo_NOBG.png) no-repeat center center;

  background-size: 100% 100%;

  transition-duration: 400ms;
  
  z-index: 100;

  transition-delay: 600ms;
  
  &:hover {
    rotate: 90deg;
    transition-delay: 0ms;
  }

  &:hover + ${EyesContainer} {
    filter: opacity(100%);
    transition-delay: 400ms;
  }
`

const Logotype = ({onClick}) => {
    return (
        <LogoBack>
            <LogoImage onClick={() => onClick?.()}/>
            <EyesContainer>
                <Eye/>
                <Eye/>
            </EyesContainer>
        </LogoBack>
    );
};

export default Logotype;