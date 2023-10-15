import React from 'react';
import FriendsSideBar from "../components/FriendsSideBar";
import styled from "styled-components";

const AppBackground = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  z-index: 1;
  display: block;
  width: 100%;
  height: 100%;

  background: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(img/AppBG.webp) no-repeat center center fixed;
  background-size: cover;
  filter: blur(5px);
  transform: scale(1.1);
`

const Content = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
`

const AppPage = () => {
    return (
        <React.Fragment>
            <AppBackground/>
            <Content>
                <FriendsSideBar/>
            </Content>
        </React.Fragment>
    );
};

export default AppPage;