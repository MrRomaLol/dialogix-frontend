import React from 'react';
import ThemeSelector from "./ThemeSelector";
import {useTheme} from "../../theme";

const ChatBox = () => {
    const theme = useTheme();

    const style = {
        back: {
            flex: 1,
            backgroundColor: theme.chatBoxBackground,
            margin: "20px 40px 20px 40px",
            borderRadius: "30px"
        }
    }



    return (
        <div style={style.back}>
            <ThemeSelector />
        </div>
    );
};

export default ChatBox;