import React from 'react';
import styled from "styled-components";
import FriendsCapsule from "./FriendsCapsule";
import ChatCapsule from "./ChatCapsule";

const Content = styled.div`
  width: 100%;
  height: 100%;

  box-sizing: border-box;

  padding: 130px 70px 20px;
`

const MainContent = () => {
    return (
        <Content>

                <FriendsCapsule/>

        </Content>
    );
};

export default MainContent;