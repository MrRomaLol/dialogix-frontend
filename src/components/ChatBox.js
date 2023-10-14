import React from 'react';
import styled from "styled-components";
import Flex from "./Flex";

const Chat = styled.div`
`

const ChatBox = () => {
    return <Flex>
        <Chat></Chat>
        <MessageBox></MessageBox>
    </Flex>
};

export default ChatBox;