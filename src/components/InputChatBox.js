import React, {useLayoutEffect, useMemo, useRef, useState} from 'react';
import "../styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

const InputChatBox = ({name, id, onTextChange}) => {
    const inputRef = useRef(null);
    const [input, setInput] = useState('');

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && event.shiftKey) {
            event.preventDefault();
            setInput(input + '\n');
        } else if (event.key === 'Enter') {
            event.preventDefault();
        }
    };

    const handleInput = (event) => {
        const text = event.target.value;
        setInput(text);
        onTextChange?.(text);
    }

    useLayoutEffect(() => {
        inputRef.current.style.height = "55px";
        inputRef.current.style.height = `${(Math.min(inputRef.current.scrollHeight + 4, 270))}px`;
    }, [input])


    return (
        <div className={"mb-4 mt-0 mx-3"} >
                <textarea
                    className={"input-chat-box input-chat-text px-3 py-2 scroll-bar"}
                    style={{fontSize: "20px", color: "white", resize: "none", verticalAlign: "middle"}}
                    value={input}
                    placeholder={name}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    id={id}
                    ref={inputRef}
                />
        </div>
    );
};

export default InputChatBox;