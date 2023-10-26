import React from 'react';
import styled, {keyframes} from "styled-components";

const RotateLogo = keyframes`
  from {
    rotate: 0deg;
  }

  5% {
    rotate: 0deg;
  }

  45% {
    rotate: 180deg;
  }

  55% {
    rotate: 180deg;
  }

  95% {
    rotate: 360deg;
  }

  to {
    rotate: 360deg;
  }
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
`

const SpinningLogo = styled.div`
  max-width: 100%;
  max-height: 100%;
  aspect-ratio: 1 / 1;
  background: url(img/DialogiX_Logo_NOBG.png) no-repeat center center;
  background-size: 100% 100%;
  filter: invert(100%);
  
  animation: ${RotateLogo} 2s infinite ease-in-out;
`

const DxSpinner = () => {
    return (
        <Container>
          <SpinningLogo/>
        </Container>
    );
};

export default DxSpinner;