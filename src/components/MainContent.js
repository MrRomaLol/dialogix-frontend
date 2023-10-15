import React from 'react';
import styled from "styled-components";
import Header from "./Header";

const Content = styled.div`
  flex: 1;
`

const MainContent = () => {
    return (
        <Content>

            <Header/>

        </Content>
    );
};

export default MainContent;