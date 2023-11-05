import React from 'react';
import ModalComponent from "./ModalComponent";
import ContentContainer from "../ContentContainer";
import {ModalName} from "./ModalsElements";
import styled from "styled-components";

const ModalText = styled.p`
  width: 550px;
  color: white;
  font-family: "JetBrains Mono", serif;
  text-align: center;
`

const ConnectedFromAnotherPlaceModal = ({isOpen}) => {
    const bgStyle = {
        zIndex: 9999,
        backgroundColor: 'transparent',
        backdropFilter: 'blur(15px) grayscale(100%)'
    }

    return (
        <ModalComponent isOpen={isOpen} overlayStyle={bgStyle}>
            <ContentContainer>
                <div style={{padding: "30px 60px 30px 60px", display: "flex", flexDirection: "column"}}>
                    <ModalName style={{marginBottom: "20px"}}>Connected from another place</ModalName>
                    <ModalText>Hello. Someone seems to be accessing this account from a different location. If you want
                        to continue using this app here, please reload the page.</ModalText>
                </div>
            </ContentContainer>
        </ModalComponent>
    );
};

export default ConnectedFromAnotherPlaceModal;