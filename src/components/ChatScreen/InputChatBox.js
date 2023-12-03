import React, {forwardRef, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState} from 'react';
import IconButton from "../IconButton";
import {
    faFile,
    faFileExcel,
    faFileLines,
    faFilePdf,
    faFilePowerpoint,
    faFileWord,
    faFileZipper,
    faFilm,
    faImage,
    faMusic,
    faPaperclip,
    faPaperPlane, faPhone,
    faXmark
} from "@fortawesome/free-solid-svg-icons";
import styled, {css} from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {addMessage, sendMessage} from "../../store/chatSlice";
import {getRandomName} from "../../utils/random";
import {socket} from "../../socket";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import getFileTypeByExtension from "../../utils/fileTypes";
import {endPrivateCall, makePrivateCall} from "../../store/diallerSlice";

const Container = styled.div`
  margin: 0 15px;
  position: relative;
`

const InputBack = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 16px;
  padding-bottom: 16px;
  background-color: rgba(121, 65, 142, 0.62);
  clip-path: polygon(0% 0%, 100% 0%, 100% calc(100% - 43px), calc(100% - 43px) 100%, 0% 100%);
`

const InputContainer = styled.div`
  display: flex;
  align-items: center;
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
  width: 26px;
  margin-right: 10px;
  margin-left: 10px;
  transition-duration: 200ms;
`

const StyledAddButton = styled(StyledIconButton)`
  color: #cecece;
  cursor: pointer;

  &:hover {
    color: white;
  }
`

const StyledSendButton = styled(StyledIconButton)`
  margin-right: 15px;

  color: gray;

  ${({hasInput}) => hasInput && css`
    color: #949cf7;

    &:hover {
      color: white;
    }

    cursor: pointer;
  `}
`

const StyledCallButton = styled(StyledSendButton)`
  margin-right: 30px;
  color: #cecece;
  cursor: pointer;
  transform: scaleX(-1);

  ${({isActive}) => !isActive && css`
    cursor: default;
    color: gray;
  `}

  ${({isActive}) => isActive && css`
    &:hover {
      color: white;
    }
  `}
`

const FileContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  position: absolute;
  left: 0;
  right: 0;
  padding-right: 15px;
`

const XMark = styled(FontAwesomeIcon)`
  position: absolute;
  top: 0;
  right: 0;
  width: 26px;
  height: 26px;
  margin-top: 5px;
  margin-right: 5px;
  color: #B13470;
  opacity: 0;
  cursor: pointer;
  transition-duration: 200ms;

  &:hover {
    color: #e35b9c;
  }
`

const FilePreviewBack = styled.div`
  position: relative;
  width: 175px;
  min-width: 175px;
  height: 175px;
  background-color: rgba(0, 0, 0, 0.2);
  border: solid 2px #BC2CC9;
  margin-bottom: 15px;
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;

  &:hover ${XMark} {
    opacity: 1;
  }
`

const FileIcon = styled(FontAwesomeIcon)`
  height: 100%;
  width: 36px;
  color: #BC2CC9;
`

const FileName = styled.p`
  font-family: "JetBrains Mono", serif;
  color: #ff00ea;
  font-weight: bold;
  margin-bottom: 10px;
  width: 85%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const FilePreview = ({file, onXClick}) => {
    const fileTypeIcon = useMemo(() => {
        const type = getFileTypeByExtension(file.fileObject.name);
        return {
            "image": faImage,
            "pdf": faFilePdf,
            "word": faFileWord,
            "text": faFileLines,
            "audio": faMusic,
            "video": faFilm,
            "archive": faFileZipper,
            "excel": faFileExcel,
            "presentation": faFilePowerpoint,
            "unknown": faFile
        }[type];
    }, [file]);


    return (
        <FilePreviewBack>
            <XMark icon={faXmark} onClick={onXClick}/>
            <FileIcon icon={fileTypeIcon}/>
            <FileName>{file.fileObject.name}</FileName>
        </FilePreviewBack>
    )
}

const InputChatBox = forwardRef(({name, id, onTextChange}, ref) => {
    const dispatch = useDispatch();
    const {userInfo} = useSelector(state => state.auth);
    const {currentChatId} = useSelector(state => state.chat);
    const {isCurrentlyInCall, callingId} = useSelector(state => state.dialler);
    const [files, setFiles] = useState([]);
    const inputRef = useRef(null);
    const [input, setInput] = useState('');
    const lastTypingTime = useRef(0);

    const handleSendMessage = () => {
        if (!input && !files.length) return;
        const unboxedFiles = [];
        const messageFiles = [];

        files.forEach(obj => {
            unboxedFiles.push(obj.fileObject);
        });

        files.forEach(obj => {
            messageFiles.push({
                name: obj.fileObject.name,
                size: obj.fileObject.size,
            })
        })

        const tempId = getRandomName(6);
        const message = {
            id: tempId,
            sender_id: userInfo.id,
            receiver_id: currentChatId,
            content: input,
            status: 'sending',
            files: {files: messageFiles},
        }
        dispatch(addMessage({message, chatId: currentChatId}));
        dispatch(sendMessage({tempId, messageText: input, messageFiles: unboxedFiles}));
        setInput('');
        setFiles([]);
    }

    const handleMakePrivateCall = () => {
        if (isCurrentlyInCall && callingId === currentChatId) return;

        if (isCurrentlyInCall) {
            dispatch(endPrivateCall()).then(() => {
                setTimeout(() => {
                    dispatch(makePrivateCall({userToCall: currentChatId}));
                }, 500);
            });
        } else {
            dispatch(makePrivateCall({userToCall: currentChatId}));
        }
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

        const currentTime = Date.now();

        if (currentTime - lastTypingTime.current > 1000) {
            socket.emit('private-message-typing-ping', currentChatId);
            lastTypingTime.current = currentTime;
        }
    }

    const getInput = () => {
        return !!input.trim() || files.length;
    }

    const handleAddFiles = (selectedFiles) => {
        selectedFiles.forEach((file) => {
            const idx = files.findIndex(f => f.fileObject.path === file.path);
            if (idx === -1) {
                const fileObj = {
                    id: getRandomName(8),
                    fileObject: file,
                }
                setFiles(prevState => [...prevState, fileObj])
            }
        })
    }

    const handleAddSelectedFiles = (e) => {
        const selectedFiles = Array.from(e.target.files);
        handleAddFiles(selectedFiles);
    }

    const handleRemoveFile = (id) => {
        setFiles(prev => prev.filter(item => item.id !== id));
    }

    useImperativeHandle(ref, () => ({
        addFiles: handleAddFiles,
    }))

    useLayoutEffect(() => {
        inputRef.current.style.height = "10px";
        inputRef.current.style.height = `${(Math.min(inputRef.current.scrollHeight + 4, 270))}px`;
    }, [input])

    return (
        <Container>
            <InputBack>
                {!!files.length && <div style={{position: "relative", height: "222px"}}>
                    <FileContainer className={"scroll-bar"}>
                        {files.map((file) => (
                            <FilePreview key={file.id} id={file.id} file={file}
                                         onXClick={() => handleRemoveFile(file.id)}/>))}
                    </FileContainer>
                </div>}
                <InputContainer>
                    <label htmlFor={'message-file'}>
                        <StyledAddButton icon={faPaperclip}/>
                    </label>
                    <input type={'file'} id={'message-file'} style={{display: 'none'}} onChange={handleAddSelectedFiles}
                           multiple/>
                    <Separator/>
                    <MessageTextArea
                        autoFocus
                        className={"scroll-bar"}
                        value={input}
                        placeholder={name}
                        onChange={handleInput}
                        onKeyDown={handleKeyDown}
                        id={id}
                        ref={inputRef}
                    />
                    <StyledSendButton icon={faPaperPlane} hasInput={getInput()} onClick={handleSendMessage}/>
                    <Separator/>
                    <StyledCallButton icon={faPhone} onClick={handleMakePrivateCall} isActive={!(isCurrentlyInCall && callingId === currentChatId)}/>
                </InputContainer>
            </InputBack>
            <InputBorder/>
        </Container>
    );
});

export default InputChatBox;