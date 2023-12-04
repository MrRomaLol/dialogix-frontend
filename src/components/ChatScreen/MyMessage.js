import React from 'react';
import styled, {css} from "styled-components";
import TextWithLineBreaks from "./TextWithLineBreaks";
import {Avatar, MessageBack, MessageContainer, MessageDate, MessageNick, MessageStampContainer} from "./MessagesParts";
import {useSelector} from "react-redux";
import FileMessage from "./FileMessage";
import FileMessagePlaceholder from "./FileMessagePlaceholder";
import formatDate from "../../utils/dateFormat";
import {useTranslation} from "react-i18next";

export const MyMessageContainer = styled(MessageContainer)`
  justify-content: flex-end;
  padding-left: 200px;
`

export const MyMessageBack = styled(MessageBack)`
  padding-right: 30px;
  margin-right: 20px;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%);

  ${({status}) => {
    if (status === 'sending') {
      return css`
        color: #5e5e5e;
      `;
    } else if (status === 'error') {
      return css`
        color: #B13470;
      `;
    }
  }}
`

const MyMessage = ({content, timestamp, status, files}) => {
    const {userInfo} = useSelector(state => state.auth)
    const [ t, i18n ] = useTranslation();

    let statusOrTimestamp;

    if (status === "sending") {
        statusOrTimestamp = t("myMsg.send");
    } else if (status === "error") {
        statusOrTimestamp = t("misc.error");
    } else {
        statusOrTimestamp = formatDate(timestamp);
    }

    return (
        <MyMessageContainer>
            <div style={{display: "flex", flexDirection: "column"}}>
                <MyMessageBack status={status}>
                    {content && <TextWithLineBreaks text={content}/>}

                    {status === "sending" ? (
                        !!files.files.length && <FileMessagePlaceholder files={files.files} progress={files.progress}/>
                    ) : (
                        files && files.files.map((file, idx) => (
                            <FileMessage key={idx} sender={userInfo.id} folder={files.folder} file={file}/>))
                    )}

                </MyMessageBack>
                <MessageStampContainer style={{justifyContent: "end"}}>
                    <MessageDate>{statusOrTimestamp}</MessageDate>
                    <MessageNick>{userInfo.nickname}</MessageNick>
                </MessageStampContainer>
            </div>
            <Avatar id={userInfo.id} url={userInfo.avatar_url} nick={userInfo.nickname}/>
        </MyMessageContainer>
    );
};

export default MyMessage;