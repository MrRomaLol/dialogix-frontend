import React from 'react';
import ModalComponent from "./ModalComponent";
import ContentContainer from "../ContentContainer";
import styled from "styled-components";
import {ModalContent, ModalName} from "./ModalParts";
import CutButton from "../UIElements/CutButton";
import {logoutUser} from "../../store/authSlice";
import {revertAll} from "../../store";
import {useDispatch} from "react-redux";
import DXSpinner from "../DXSpinner";

const ModalText = styled.p`
  width: 550px;
  color: white;
  font-family: "JetBrains Mono", serif;
  text-align: center;
`

const ConnectionLostModal = ({isOpen}) => {
    const bgStyle = {
        zIndex: 9999,
        backgroundColor: 'transparent',
        backdropFilter: 'blur(15px) grayscale(100%)'
    }

    return (
        <ModalComponent isOpen={isOpen} overlayStyle={bgStyle}>
            <ContentContainer>
                <ModalContent>
                    <ModalName style={{marginBottom: "20px"}}>Connection lost</ModalName>
                    <ModalText>Lost server connection; attempting to reconnect.</ModalText>
                    <div style={{width: "100px", height: "100px", marginTop: "20px"}}>
                        <DXSpinner/>
                    </div>
                </ModalContent>
            </ContentContainer>
        </ModalComponent>
    );
};

export default ConnectionLostModal;