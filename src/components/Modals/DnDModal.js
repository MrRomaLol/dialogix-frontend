import React from 'react';
import {ModalName, ModalSubName} from "./ModalsElements";
import ContentContainer from "../ContentContainer";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFile} from "@fortawesome/free-solid-svg-icons";

const DnDModalBack = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
`

const Content = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 30px 60px 30px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(61, 38, 84, 0.3);
`

const DnDModal = () => {
    return (
        <DnDModalBack>
            <ContentContainer>
                <Content>
                    <ModalName>Drop files here</ModalName>
                    <ModalSubName style={{marginTop: "10px"}}>Drop the files here to upload.</ModalSubName>
                </Content>
            </ContentContainer>
        </DnDModalBack>
    );
};

export default DnDModal;