import React from 'react';
import InputChatBox from "../Modules/InputChatBox";
import '../../../styles/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Chat from "./Chat";

const ChatBox = () => {
    return (
        <div className={"app-text-box"}>
            <Chat />
            <InputChatBox name={"Message"}/>
        </div>
    );
};

export default ChatBox;