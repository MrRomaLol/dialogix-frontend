import React from 'react';
import {HeaderBack, HeaderBorders, LeftRightBars} from "./styled-parts/HeaderBar";
import styled from "styled-components";

const EobaniyBlyr = styled.span`
  position: fixed;
  left: 0;
  right: 0;
  margin-left: 100px;
  margin-right: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  filter: drop-shadow(rgba(255, 0, 245, 0.8) 0px 20px 40px);
`

const Container = styled.div`
  position: relative;
`

const ContainerLR = styled(Container)`
  flex: 0 0 20%;
  max-width: 300px;
`

const LeftBorder = styled(HeaderBorders)`
  width: 100%;
  clip-path: polygon(2px 0, 2px calc(100% - 18px), 20px calc(100% - 2px), 100% calc(100% - 2px),
  100% 100%, 20px 100%, 0px calc(100% - 18px), 0 0);
`

const CenterBorder = styled(HeaderBorders)`
  width: 300px;
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
  width: 300px;
  height: 100px;
  clip-path: polygon(0 0, 0 calc(100% - 18px), 20px 100%, calc(100% - 20px) 100%, 100% calc(100% - 18px), 100% 0);
`

const Right = styled(LeftRightBars)`
  display: block;
  clip-path: polygon(0 0, 0 100%, calc(100% - 20px) 100%, 100% calc(100% - 18px), 100% 0);
`

const Header = () => {
    return (
        <EobaniyBlyr>
            <ContainerLR>
                <Left/>
                <LeftBorder/>
            </ContainerLR>

            <Container>
                <Center/>
                <CenterBorder/>
            </Container>

            <ContainerLR>
                <Right/>
                <RightBorder/>
            </ContainerLR>
        </EobaniyBlyr>
    );
};

export default Header;