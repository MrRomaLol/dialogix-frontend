import React from 'react';
import ModalComponent from "./ModalComponent";
import ContentContainer from "../ContentContainer";
import {ModalContent, ModalName, ModalSubName,} from "./ModalParts";
import CutButton from "../UIElements/CutButton";
import styled from "styled-components";

const ButtonsContainer = styled.div`
  display: flex;
  padding-top: 25px;
  flex-direction: row;
  gap: 50px;
`

const YesNoModal = ({isOpen, onRequestClose, onFirst, onSecond, modalName, modalSubName, firstName, secondName}) => {
    return (
        <ModalComponent isOpen={isOpen} onRequestClose={onRequestClose}>
            <ContentContainer>
                <ModalContent>
                    <ModalName>{modalName}</ModalName>
                    <ModalSubName style={{marginTop: "10px"}}>{modalSubName}</ModalSubName>
                    <ButtonsContainer>
                        <CutButton onClick={onFirst}>{firstName}</CutButton>
                        <CutButton onClick={onSecond}>{secondName}</CutButton>
                    </ButtonsContainer>
                </ModalContent>
            </ContentContainer>
        </ModalComponent>
    );
};

export default YesNoModal;