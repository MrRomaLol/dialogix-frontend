import React, {useLayoutEffect, useRef, useState} from 'react';
import IconButton from "../IconButton";
import {faPaperclip, faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import styled, {css} from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {addMessage, sendMessage} from "../../store/chatSlice";
import {getRandomName} from "../../utils/random";

const Container = styled.div`
  margin: 0 15px 15px;
  position: relative;
`
const InputBack = styled.div`
  display: flex;
  align-items: center;
  padding-top: 16px;
  padding-bottom: 16px;
  background-color: rgba(121, 65, 142, 0.62);
  clip-path: polygon(0% 0%, 100% 0%, 100% calc(100% - 43px), calc(100% - 43px) 100%, 0% 100%);
`

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

const MessageTextArea = styled.textarea`
  color: white;
  font-size: 20px;
  resize: none;
  width: 100%;
  border: 0;
  background-color: transparent;

  margin-left: 10px;
  margin-right: 10px;

  &:focus {
    outline: none;
  }
`

const Separator = styled.div`
  width: 2px;
  height: 25px;

  background-color: rgba(188, 44, 201, 0.62);
`

const StyledIconButton = styled(IconButton)`
  height: 26px;
  width: 50px;
  transition-duration: 100ms;
`

const StyledAddButton = styled(StyledIconButton)`
  color: #cecece;
  cursor: pointer;

  &:hover {
    color: white;
  }
`

const StyledSendButton = styled(StyledIconButton)`
  margin-right: 35px;

  color: gray;

  ${({hasInput}) => hasInput && css`
    color: #949cf7;

    &:hover {
      color: white;
    }

    cursor: pointer;
  `}
`

const InputChatBox = ({name, id, onTextChange}) => {
    const dispatch = useDispatch();
    const {userInfo} = useSelector(state => state.auth);
    const {currentChatId} = useSelector(state => state.chat);
    const inputRef = useRef(null);
    const [input, setInput] = useState('');

    const handleSendMessage = () => {
        const tempId = getRandomName(6);
        const message = {
            id: tempId,
            sender_id: userInfo.id,
            receiver_id: currentChatId,
            content: input,
            status: "sending",
        }
        dispatch(addMessage({message}));
        dispatch(sendMessage({tempId, messageText: input}));
        setInput('');
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && event.shiftKey) {
            event.preventDefault();
            setInput(input + '\n');
        } else if (event.key === 'Enter') {
            event.preventDefault();
            handleSendMessage();
        }
    };

    const handleInput = (event) => {
        const text = event.target.value;
        setInput(text);
        onTextChange?.(text);
    }

    const getInput = () => input.trim();

    useLayoutEffect(() => {
        inputRef.current.style.height = "10px";
        inputRef.current.style.height = `${(Math.min(inputRef.current.scrollHeight + 4, 270))}px`;
    }, [input])

    return (
        <Container>
            <InputBack>
                <StyledAddButton icon={faPaperclip} hoverStyle={{color: "#ffffff", cursor: "pointer"}}/>
                <Separator/>
                <MessageTextArea
                    className={"scroll-bar"}
                    value={input}
                    placeholder={name}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    id={id}
                    ref={inputRef}
                />
                <StyledSendButton icon={faPaperPlane} hasInput={getInput()} onClick={handleSendMessage}/>
            </InputBack>
            <InputBorder/>
        </Container>
        // </div>
    );
};

export default InputChatBox;