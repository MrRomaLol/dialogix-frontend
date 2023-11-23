import React from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";

import FriendsScreen from "./FriendsScreen";
import MainScreen from "./MainScreen";
import {DIRECT_MESSAGES_SCREEN, FRIENDS_SCREEN, MAIN_SCREEN, SERVER_SCREEN} from "../store/screenStateSlice";
import ChatScreen from "./ChatScreen";
import GuildScreen from "./GuildScreen";

const Content = styled.div`
  width: 100%;
  height: 100%;

  box-sizing: border-box;

  padding: 130px ${({screen}) => screen === SERVER_SCREEN ? '20px' : '70px'} 20px;
`

const MainContent = () => {
    const screenName = useSelector(state => state.screenState.screen);

    let screen;

    switch (screenName) {
        case MAIN_SCREEN:
            screen = <MainScreen/>
            break;
        case FRIENDS_SCREEN:
            screen = <FriendsScreen/>
            break;
        case DIRECT_MESSAGES_SCREEN:
            screen = <ChatScreen/>
            break;
        case SERVER_SCREEN:
            screen = <GuildScreen/>
            break;
    }

    return (
        <Content screen={screenName}>
            {screen}
        </Content>
    );
};

export default MainContent;