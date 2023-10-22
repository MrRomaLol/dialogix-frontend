import React from 'react';
import styled from "styled-components";
import TextWithLineBreaks from "./TextWithLineBreaks";
import {Avatar, MessageBack, MessageContainer, MessageDate, MessageNick, MessageStampContainer} from "./MessagesParts";

const MyMessageContainer = styled(MessageContainer)`
  justify-content: flex-end;
  padding-left: 200px;
`

const MyMessageBack = styled(MessageBack)`
  padding-right: 30px;
  margin-right: 20px;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%);
`

const MyMessage = ({content, nick, date}) => {
    return (
        <MyMessageContainer>
            <div style={{display: "flex", flexDirection: "column"}}>
                <MyMessageBack>
                    <TextWithLineBreaks text={content}/>
                </MyMessageBack>
                <MessageStampContainer>
                    <MessageDate>{date}</MessageDate>
                    <MessageNick>{nick}</MessageNick>
                </MessageStampContainer>
            </div>
            <Avatar/>
        </MyMessageContainer>
    );
};

export default MyMessage;