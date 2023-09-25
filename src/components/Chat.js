import React from 'react';
import Message from "./Message";

const Chat = () => {
    const text = "Які команди можуть бути використані для адресування співпроцесорів в архітектурі ARM?\n";

    const msgArr = [];

    for (let i = 0; i < 10; i++) {
        msgArr.push({
            message: text + i
        })
    }

    return (
        <div className={"chat p-2"} style={{flex: 1}}>
            <div>
                {msgArr.map((obj, index) => (<Message key={index} content={obj.message}/>))}
            </div>
        </div>
    );
};

export default Chat;