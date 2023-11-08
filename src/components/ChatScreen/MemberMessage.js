import React from 'react';
import TextWithLineBreaks from "./TextWithLineBreaks";
import {Avatar, MessageBack, MessageContainer, MessageDate, MessageNick, MessageStampContainer} from "./MessagesParts";
import styled from "styled-components";
import FileMessage from "./FileMessage";

export const MemberMessageContainer = styled(MessageContainer)`
  padding-right: 200px;
`

export const MemberMessageBack = styled(MessageBack)`
  padding-left: 30px;
  margin-left: 20px;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 20px 100%, 0 calc(100% - 20px));
`


const MemberMessage = ({content, sender, timestamp, files}) => {
    return (
        <MemberMessageContainer>
            <Avatar/>
            <div style={{display: "flex", flexDirection: "column"}}>
                <MemberMessageBack>
                    <TextWithLineBreaks text={content}/>
                    {files && files.files.map((file, idx) => (
                        <FileMessage key={idx} sender={sender.id} folder={files.folder} file={file}/>))}
                </MemberMessageBack>
                <MessageStampContainer>
                    <MessageNick>{sender.nick}</MessageNick>
                    <MessageDate>{timestamp}</MessageDate>
                </MessageStampContainer>
            </div>
        </MemberMessageContainer>
    );
};

export default MemberMessage;