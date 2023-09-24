import React, {useState} from 'react';
import "../styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

const InputChatBox = ({name, id, onTextChange}) => {
    const [input, setInput] = useState('');


    const handleInput = (event) => {
        const text = event.target.value;
        setInput(text);
        onTextChange?.(text);
    }

    return (
            <div className={"mb-4 mt-0 mx-3"} style={{height: "60px"}}>
                <input className={"input-chat-box input-chat-text p-2" + (input ? " enabled" : "")}
                       style={{textIndent: "15px", fontSize: "20px", color: "white"}}
                       placeholder={name}
                       onChange={handleInput}
                       id={id}
                       value={input}
                />
            </div>
    );
};

export default InputChatBox;