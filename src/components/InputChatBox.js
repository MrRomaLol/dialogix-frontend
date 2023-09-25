import React, {useMemo, useState} from 'react';
import "../styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

const InputChatBox = ({name, id, onTextChange}) => {
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
        console.log(text);
        setInput(text);
        onTextChange?.(text);
    }

    const rowsLength = useMemo(() => {
        const rows = input.split('\n').length;
        return(Math.min(rows, 8));
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
                    rows={rowsLength}
                    id={id}
                />
        </div>
    );
};

export default InputChatBox;