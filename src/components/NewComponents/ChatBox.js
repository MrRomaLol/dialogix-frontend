import React from 'react';
import {useTheme} from "../../theme";
import PMessage from "./PMessage"
import Chat from "./Chat";
import InputChatBox from "./InputChatBox";

const ChatBox = () => {
    const theme = useTheme();

    const style = {
        back: {
            display: "flex",
            flex: 1,
            flexDirection: "column",
            backgroundColor: theme.chatBoxBackground,
            margin: "20px 40px 20px 40px",
            borderRadius: "30px",
            padding: "5px 30px 10px 30px"
        }
    }

    return (
        <div style={style.back}>
            <Chat />
            <InputChatBox name={"Message"}/>
        </div>
    );
};

export default ChatBox;