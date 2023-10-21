import React from 'react';
import {ScreenContainer} from "./ScreenContainer";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
`

const SettingsScreen = () => {
    return (
        <ScreenContainer>
            <Container>

            </Container>
        </ScreenContainer>
    );
};

export default SettingsScreen;