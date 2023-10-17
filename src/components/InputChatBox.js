import React, {useLayoutEffect, useRef, useState} from 'react';
import IconButton from "./IconButton";
import {faCirclePlus, faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Container = styled.div`
  margin: 15px;
  position: relative;
`
const InputBack = styled.div`
  display: flex;
  align-items: center;
  padding-top: 14px;
  padding-bottom: 14px;
  background-color: rgba(121, 65, 142, 0.62);
  clip-path: polygon(0% 0%, 100% 0%, 100% calc(100% - 43px), calc(100% - 43px) 100%, 0% 100%);
```

const InputBorder = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(188, 44, 201, 0.62);
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 43px), calc(100% - 43px) 100%, 0 100%, 0 0,
  2px 2px, 2px calc(100% - 2px), calc(100% - 43px) calc(100% - 2px), calc(100% - 2px) calc(100% - 43px), calc(100% - 2px) 2px, 2px 2px);
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
            color: input.trim() ? "#949cf7" : "#5e5e5e",
            marginRight: "45px"
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
        inputRef.current.style.height = "25px";
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


        <Container>
            <InputBack>
                <IconButton icon={faCirclePlus}
                            style={{...styles.button, color: "#cecece", marginLeft: "7px", marginRight: "5px"}}
                            hoverStyle={{color: "#ffffff", cursor: "pointer"}}/>
                <textarea
                    className={"scroll-bar"}
                    style={{
                        fontSize: "28px", color: "white", resize: "none", verticalAlign: "middle", width: "100%",
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
            <InputBorder/>
        </Container>
        // </div>
    );
};

export default InputChatBox;