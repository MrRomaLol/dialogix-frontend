import React from 'react';
import ContentContainer from "../ContentContainer";
import styled from "styled-components";

const FullscreenContainer = styled(ContentContainer)`
  width: 100%;
  height: 100%;
`

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
        <FullscreenContainer>
            <Message>Choose chat to make something wonderful!</Message>
        </FullscreenContainer>
    );
};

export default MainScreen;