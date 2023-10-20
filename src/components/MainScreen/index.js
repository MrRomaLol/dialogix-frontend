import React from 'react';
import ContentContainer from "../ContentContainer";
import styled from "styled-components";

const Message = styled.div`
  width: 100%;
  height: 100%;
  
  display: flex;

  align-items: center;
  justify-content: center;
  
  color: white;
  font-size: 30px;
`

const MainScreen = () => {
    return (
        <ContentContainer>
            <Message>Choose chat to make something wonderful!</Message>
        </ContentContainer>
    );
};

export default MainScreen;