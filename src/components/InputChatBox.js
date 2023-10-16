import React, {useLayoutEffect, useRef, useState} from 'react';
import IconButton from "./IconButton";
import {faCirclePlus, faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const InputBack = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(121, 65, 142, 0.62);
`

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
        // <div style={{
        //     paddingRight: "10px",
        //     paddingLeft: "10px",
        //     border: "2px #3f3636 solid",
        //     borderRadius: "15px",
        //     display: "flex",
        //     alignItems: "center",
        //     backgroundColor: "#452654", ...styles.box
        // }}>

        <InputBack>
            <IconButton icon={faCirclePlus}
                        style={{...styles.button, color: "#cecece", marginLeft: "2px", marginRight: "5px"}}
                        hoverStyle={{color: "#ffffff", cursor: "pointer"}}/>
            <textarea
                className={"scroll-bar"}
                style={{
                    fontSize: "20px", color: "white", resize: "none", verticalAlign: "middle", width: "100%",
                    border: "0",
                    backgroundColor: "transparent", padding: "4px",
                }}
                value={input}
                placeholder={name}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                id={id}
                ref={inputRef}
            />
            <IconButton icon={faPaperPlane}
                        style={{...styles.button, ...styles.sendButton}}
                        hoverStyle={(input.trim() ? {color: "#ffffff", cursor: "pointer"} : {})}/>
        </InputBack>
        // </div>
    );
};

export default InputChatBox;