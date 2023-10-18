import React from 'react';
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCompress,
    faWindowMinimize,
    faXmark
} from "@fortawesome/free-solid-svg-icons";

const WindowFrame = styled.div`
  width: 100%;
  height: 30px;

  box-sizing: border-box;

  padding-left: 10px;
  padding-right: 10px;

  display: flex;
  flex-direction: row;

  align-items: center;

  justify-content: space-between;

  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);

  -webkit-user-select: none;
  -webkit-app-region: drag;
`

const StyledButtons = styled(FontAwesomeIcon)`
  color: white;

  padding: 4px;

  width: 16px;
  height: 16px;

  margin-left: 12px;

  cursor: pointer;

  border-radius: 50%;

  transition-duration: 100ms;

  &:hover {
    color: ${({color}) => color || "white"};
  }
`

const Buttons = styled.div`
  display: flex;
  flex-direction: row;

  -webkit-app-region: no-drag;
`

const DialogixName = styled.p`
  color: white;

  font-size: 20px;  
`

const ElectronHeader = () => {
    const handleMinimize = () => {
        window.electron.ipcRenderer.sendMessage('minimizeApp', ['minimizeApp']);
    }

    const handleWindowed = () => {
        window.electron.ipcRenderer.sendMessage('maximizeApp', ['maximizeApp']);
    }

    const handleClose = () => {
        window.electron.ipcRenderer.sendMessage('closeApp', ['closeApp']);
    }

    return (
        <WindowFrame>
            <DialogixName>DialogiX</DialogixName>
            <Buttons>

                <StyledButtons icon={faWindowMinimize} color={"grey"} onClick={handleMinimize}/>
                <StyledButtons icon={faCompress} color={"grey"} onClick={handleWindowed}/>
                <StyledButtons icon={faXmark} color={"red"} onClick={handleClose}/>

            </Buttons>
        </WindowFrame>
    );
};

export default ElectronHeader;