import React from 'react';
import styled from "styled-components";
import InputChatBox from "./InputChatBox";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

const ChatBack = styled.div`
  background-color: rgba(61, 38, 84, 0.2);
  
  width: 100%;
  height: 100%;

  display: flex; 
  flex-direction: column;
  
  clip-path: polygon(50px 0, 100% 0, 100% calc(100% - 50px), calc(100% - 50px) 100%, 0 100%, 0 50px);
`

const ChatBorder = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;
  
  background-color: rgba(188, 44, 201, 0.62);
  
  clip-path: polygon(50px 0, 100% 0, 100% calc(100% - 50px), calc(100% - 50px) 100%, 0 100%, 0 50px, 50px 0,
  50px 2px, 50px 2px, 2px 50px, 2px calc(100% - 2px), calc(100% - 50px) calc(100% - 2px), calc(100% - 2px) calc(100% - 50px), calc(100% - 2px) 2px, 50px 2px);
`

const Chat = () => {
    return (
        <Container>
            <ChatBack>

                <div style={{flex: "1"}}></div>

                <InputChatBox/>

            </ChatBack>
            <ChatBorder/>
        </Container>
    );
};

export default Chat;