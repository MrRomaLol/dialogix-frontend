import React, {useLayoutEffect, useRef, useState} from 'react';
import "../../styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import IconButton from "../LikeDS/Icon/IconButton";
import {faCirclePlus, faPaperPlane} from "@fortawesome/free-solid-svg-icons";

const InputChatBox = ({name, id, onTextChange}) => {
    const inputRef = useRef(null);
    const [input, setInput] = useState('');

    const styles = {
        box: {
            border: "none",
        },
        button: {
            height: "26px",
            transitionDuration: "100ms"
        },
        sendButton: {
            color: input.trim() ? "#949cf7" : "#5e5e5e"
        }
    }

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
        inputRef.current.style.height = "45px";
        inputRef.current.style.height = `${(Math.min(inputRef.current.scrollHeight + 4, 270))}px`;
    }, [input])

    return (
        <div className={"mb-4 mt-0 mx-3"}>
            <div style={{
                border: "2px #3f3636 solid",
                borderRadius: "15px",
                display: "flex",
                alignItems: "center",
                backgroundColor: "#452654", ...styles.box
            }}
                 className={"px-2"}>
                <IconButton icon={faCirclePlus} style={{...styles.button, color: "#cecece", marginLeft: "2px"}}
                            hoverStyle={{color: "#ffffff", cursor: "pointer"}} className={"mx-2"}/>
                <textarea
                    className={"input-chat-box input-chat-text px-2 py-2 scroll-bar"}
                    style={{fontSize: "20px", color: "white", resize: "none", verticalAlign: "middle"}}
                    value={input}
                    placeholder={name}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    id={id}
                    ref={inputRef}
                />
                <IconButton icon={faPaperPlane}
                            style={{...styles.button, ...styles.sendButton}}
                            hoverStyle={(input.trim() ? {color: "#ffffff", cursor: "pointer"} : {})} className={"mx-2"}/>
            </div>
        </div>
    );
};

export default InputChatBox;