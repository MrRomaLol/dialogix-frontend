import React from 'react';
import FriendsSideBar from "../components/FriendsSideBar";
import Header from "../components/Header";
import MainContent from "../components/MainContent";
import ServersSideBar from "../components/ServersSideBar";
import styled from "styled-components";
import {ScreenContainer} from "./ScreenContainer";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`

const AppScreen = () => {
    return (
        <ScreenContainer>
            <Container>
                <FriendsSideBar/>
                <Header/>
                <MainContent/>
                <ServersSideBar/>
            </Container>
        </ScreenContainer>
    );
};

export default AppScreen;