import React from 'react';
import TextWithLineBreaks from "./TextWithLineBreaks";
import {Avatar, MessageBack, MessageContainer, MessageDate, MessageNick, MessageStampContainer} from "./MessagesParts";
import styled from "styled-components";

const MemberMessageContainer = styled(MessageContainer)`
  padding-right: 200px;
`

const MemberMessageBack = styled(MessageBack)`
  padding-left: 30px;
  margin-left: 20px;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 20px 100%, 0 calc(100% - 20px));
`


const MemberMessage = ({content, nick, date}) => {
    return (
        <MemberMessageContainer>
            <Avatar/>
            <div style={{display: "flex", flexDirection: "column"}}>
                <MemberMessageBack>
                    <TextWithLineBreaks text={content}/>
                </MemberMessageBack>
                <MessageStampContainer>
                    <MessageNick>{nick}</MessageNick>
                    <MessageDate>{date}</MessageDate>
                </MessageStampContainer>
            </div>
        </MemberMessageContainer>
    );
};

export default MemberMessage;