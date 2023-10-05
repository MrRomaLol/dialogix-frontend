import React from 'react';
import PMessage from "./PMessage";

const Chat = () => {
    const text = "message?";

    const msgArr = [];

    for (let i = 0; i < 20; i++) {
        msgArr.push({
            message: text + i
        })
    }

    return (
        <div className={"scroll-bar chat p-2"} style={{height: "100%"}}>
            <div>
                {msgArr.map((obj, index) => (<PMessage key={index} content={obj.message}/>))}
            </div>
        </div>
    );
};

export default Chat;