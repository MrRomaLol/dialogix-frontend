import React from 'react';
import {HeaderBack, HeaderBorders, LeftRightBars} from "./styled-parts/HeaderBar";
import styled from "styled-components";
import Logotype from "./Logotype";
import {MAIN_SCREEN, setScreen} from "../store/screenStateSlice";
import {useDispatch} from "react-redux";

const EobaniyBlyr = styled.span`
  position: fixed;
  left: 0;
  right: 0;
  margin-left: 120px;
  margin-right: 120px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  filter: drop-shadow(rgba(255, 0, 245, 0.8) 0px 20px 40px);
`

const Container = styled.div`
  position: relative;
`

const ContainerLR = styled(Container)`
  width: 100%;  
  max-width: 300px;
`

const LeftBorder = styled(HeaderBorders)`
  width: 100%;
  clip-path: polygon(2px 0, 2px calc(100% - 18px), 20px calc(100% - 2px), 100% calc(100% - 2px),
  100% 100%, 20px 100%, 0px calc(100% - 18px), 0 0);
`

const CenterBorder = styled(HeaderBorders)`
  width: 400px;
  height: 100px;

  clip-path: polygon(0 calc(50% - 2px), 0 calc(100% - 18px), 20px 100%, calc(100% - 20px) 100%, 100% calc(100% - 18px), 100% calc(50% - 2px),
  calc(100% - 2px) calc(50% - 2px), calc(100% - 2px) calc(100% - 18px), calc(100% - 20px) calc(100% - 2px), 20px calc(100% - 2px), 2px calc(100% - 18px), 2px calc(50% - 2px));
`

const RightBorder = styled(HeaderBorders)`
  width: 100%;
  clip-path: polygon(100% 0, 100% calc(100% - 18px), calc(100% - 20px) 100%, 0 100px,
  0 calc(100% - 2px), calc(100% - 20px) calc(100% - 2px), calc(100% - 2px) calc(100% - 18px), calc(100% - 2px) 0);
`

const Left = styled(LeftRightBars)`
  display: block;
  clip-path: polygon(0 0, 0 calc(100% - 18px), 20px 100%, 100% 100%, 100% 0);
`

const Center = styled(HeaderBack)`
  width: 400px;
  height: 100px;
  clip-path: polygon(0 0, 0 calc(100% - 18px), 20px 100%, calc(100% - 20px) 100%, 100% calc(100% - 18px), 100% 0);

  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
`

const Right = styled(LeftRightBars)`
  display: block;
  clip-path: polygon(0 0, 0 100%, calc(100% - 20px) 100%, 100% calc(100% - 18px), 100% 0);
`

const LogoContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`

const Header = () => {

    const dispatch = useDispatch();

    const goToMainScreen = () => {
        dispatch(setScreen({screenName: MAIN_SCREEN}))
    }

    return (
        <React.Fragment>
            <EobaniyBlyr>
                <ContainerLR>
                    <Left/>
                    <LeftBorder/>
                </ContainerLR>

                <Container>
                    <Center>

                    </Center>
                    <CenterBorder/>
                </Container>

                <ContainerLR>
                    <Right/>
                    <RightBorder/>
                </ContainerLR>
            </EobaniyBlyr>
            <LogoContainer>
                <Logotype onClick={goToMainScreen}/>
            </LogoContainer>
        </React.Fragment>
    );
};

export default Header;