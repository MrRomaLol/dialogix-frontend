import React from 'react';
import ContentContainer from "../ContentContainer";
import styled from "styled-components";
import {ModalContent, ModalName, ModalSubName} from "./ModalParts";

const DnDModalBack = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
`

const DnDModal = () => {
    return (
        <DnDModalBack>
            <ContentContainer>
                <ModalContent>
                    <ModalName>Drop files here</ModalName>
                    <ModalSubName style={{marginTop: "10px"}}>Drop the files here to upload.</ModalSubName>
                </ModalContent>
            </ContentContainer>
        </DnDModalBack>
    );
};

export default DnDModal;