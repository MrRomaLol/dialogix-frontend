import React from 'react';
import ModalComponent from "./ModalComponent";
import ContentContainer from "../ContentContainer";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera} from "@fortawesome/free-solid-svg-icons";

const Content = styled.div`
  padding: 30px 60px 30px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(61, 38, 84, 0.3);
`

const ModalName = styled.p`
  font-family: Furore, serif;
  font-size: 28px;
  color: white;
`

const ModalSubname = styled.p`
  font-size: 14px;
  color: white;
  margin-top: 10px;
  font-family: "JetBrains Mono", serif;
`

const SectionName = styled.div`
  font-size: 20px;
  color: white;
  margin-top: 10px;
  margin-bottom: 5px;
  font-family: "JetBrains Mono", serif;
  align-self: stretch;
`

const Input = styled.input`
  background-color: rgba(29, 5, 52, 0.3);
  border: solid rgba(188, 44, 201, 0.62) 2px;
  color: white;
  width: 100%;
  font-size: 20px;
  font-family: "JetBrains Mono", serif;

  &:focus, &:focus {
    outline: none;
  }
`

const Outline = styled.div`
  width: 100px;
  height: 100px;
  border: dashed white 3px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 40px;
  transition-duration: 200ms;

  &:hover {
    filter: brightness(60%);
  }
`

const CameraIcon = styled(FontAwesomeIcon)`
  font-size: 40px;
  color: white;
`

const ServerImage = () => {
    return (
        <Outline>
            <CameraIcon icon={faCamera}/>
        </Outline>
    )
}

const CutButton = styled.button`
  height: 50px;
  width: 190px;

  background-color: #5F3170;
  border: 0;

  color: white;
  font-family: Furore, serif;
  font-size: 24px;

  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%);

  transition-duration: 200ms;

  &:hover {
    background-color: #4d245d;
  }

  &:active {
    background-color: #3c194d;
  }
`

const ButtonEobaniyBlur = styled.div`
  display: flex;
  justify-content: center;
  filter: drop-shadow(#BC2CC9 0 0 16px);
`

const CreateServerModal = ({isOpen, onRequestClose}) => {
    return (
        <ModalComponent isOpen={isOpen} onRequestClose={onRequestClose} width={525} height={440}>
            <ContentContainer>
                <Content>
                    <ModalName>Create server</ModalName>
                    <ModalSubname>Create server</ModalSubname>
                    <SectionName>Server name</SectionName>
                    <Input style={{marginBottom: "10px"}}/>
                    <SectionName>Upload image</SectionName>
                    <ServerImage/>
                    <ButtonEobaniyBlur>
                        <CutButton>Create</CutButton>
                    </ButtonEobaniyBlur>
                </Content>
            </ContentContainer>
        </ModalComponent>
    );
};

export default CreateServerModal;