import React from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";

import FriendsScreen from "./FriendsScreen";
import MainScreen from "./MainScreen";
import {FRIENDS_SCREEN, MAIN_SCREEN} from "../store/screenStateSlice";
import ChatCapsule from "./ChatScreen";

const Content = styled.div`
  width: 100%;
  height: 100%;

  box-sizing: border-box;

  padding: 130px 70px 20px;
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
    }

    return (
        <Content>
            {/*{screen}*/}
            <ChatCapsule/>
        </Content>
    );
};

export default MainContent;