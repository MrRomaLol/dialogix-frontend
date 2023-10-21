import React, {useEffect} from 'react';
import styled, {keyframes} from "styled-components";
import {useDispatch} from "react-redux";
import {APP_OPENED_STATE, setAppState} from "../store/appStateSlice";
import {ScreenContainer} from "./ScreenContainer";

const Container = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
`

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

const SpinningLogo = styled.div`
  width: 200px;
  height: 200px;
  background: url(img/DialogiX_Logo_NOBG.png) no-repeat center center;
  background-size: 100% 100%;
  filter: invert(100%);

  animation: ${RotateLogo} 2s infinite ease-in-out;
`

const P = styled.p`
  color: white;
  margin-top: 6px;
  margin-bottom: 6px;
`

const PMain = styled(P)`
  font-weight: bold;
  font-family: Furore, serif;
  font-size: 20px;
`

const PSecondary = styled(P)`
  font-family: JetBrains Mono, serif;
`

const LoadingScreen = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            dispatch(setAppState({stateName: APP_OPENED_STATE}));
        }, 2000)
    }, []);

    return (
        <ScreenContainer>
            <Container>
                <SpinningLogo/>
                <PMain>Did you know?</PMain>
                <PSecondary>This project is still in development</PSecondary>
            </Container>
        </ScreenContainer>
    );
};

export default LoadingScreen;