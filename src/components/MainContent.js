import React from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";

import FriendsScreen from "./FriendsScreen";
import MainScreen from "./MainScreen";

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
        case 'mainScreen':
            screen = <MainScreen/>
            break;
        case 'friendsScreen':
            screen = <FriendsScreen/>
            break;
    }

    return (
        <Content>
            {screen}
        </Content>
    );
};

export default MainContent;