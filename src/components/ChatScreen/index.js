import React from 'react';
import InputChatBox from "./InputChatBox";
import ContentContainer from "../ContentContainer";
import MyMessage from "./MyMessage";
import MemberMessage from "./MemberMessage";
import styled from "styled-components";

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;

  flex: 1;
  overflow-y: scroll;
`

const ChatCapsule = () => {

    const arr = []

    for (let i = 0; i < 100; i++) {
        arr.push({
            content: "message " + i,
            date: "01.01.2000",
            nick: i % 2 === 0 ? "GetTheNya" : "Exodus",
            type: i % 2 === 0 ? "my" : "member"
        })
    }

    return (
        <ContentContainer>

            <MessageContainer className={"scroll-bar"}>
                <div>
                    {arr.map((obj, idx) => (obj.type === "my" ? <MyMessage key={idx} content={obj.content} nick={obj.nick} date={obj.date}/> :
                        <MemberMessage key={idx} content={obj.content} nick={obj.nick} date={obj.date}/>))}
                </div>
            </MessageContainer>

            <InputChatBox/>

        </ContentContainer>
    );
};

export default ChatCapsule;