import React from 'react';
import styled from "styled-components";

const WindowFrame = styled.div`
  width: 100%;
  height: 30px;

  box-sizing: border-box;

  padding-left: 10px;
  padding-right: 10px;
  
  color: white;

  display: flex;
  flex-direction: row;

  align-items: center;

  justify-content: space-between;

  -webkit-user-select: none;
  -webkit-app-region: drag;
`

const Buttons = styled.div`
  display: flex;
  flex-direction: row;

  -webkit-app-region: no-drag;
`

const Button = styled.p`
  color: white;
  margin-left: 10px;

  cursor: pointer;
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
            <p>DialogiX</p>
            <Buttons>
                <Button onClick={handleMinimize}>minimize</Button>
                <Button onClick={handleWindowed}>windowed</Button>
                <Button onClick={handleClose}>close</Button>
            </Buttons>
        </WindowFrame>
    );
};

export default ElectronHeader;