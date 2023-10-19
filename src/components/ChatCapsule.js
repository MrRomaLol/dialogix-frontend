import React from 'react';
import InputChatBox from "./InputChatBox";
import ContentContainer from "./ContentContainer";


const ChatCapsule = () => {
    return (
        <ContentContainer>

            <div style={{flex: "1"}}></div>

            <InputChatBox/>

        </ContentContainer>
    );
};

export default ChatCapsule;