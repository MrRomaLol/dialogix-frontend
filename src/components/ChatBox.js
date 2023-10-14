import React from 'react';
import styled from "styled-components";
import Flex from "./StyledComponents/Flex";
import MessageBox from "./Chat/MessageBox";

const Chat = styled.div`
`

const ChatBox = () => {
    return <Flex>
        <Chat></Chat>
        <MessageBox/>
    </Flex>
};

export default ChatBox;