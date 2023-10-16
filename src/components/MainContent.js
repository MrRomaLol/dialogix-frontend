import React from 'react';
import styled from "styled-components";
import Chat from "./Chat";

const Content = styled.div`
  width: 100%;
  height: 100%;
  
  box-sizing: border-box;
  
  padding-top: 120px;
  padding-bottom: 20px;
  padding-left: 70px;
  padding-right: 70px;
`

const MainContent = () => {
    return (
        <Content>

            <Chat/>

        </Content>
    );
};

export default MainContent;