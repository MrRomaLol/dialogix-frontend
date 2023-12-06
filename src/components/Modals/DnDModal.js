import React from 'react';
import ContentContainer from "../ContentContainer";
import styled from "styled-components";
import {ModalContent, ModalName, ModalSubName} from "./ModalParts";
import {useTranslation} from "react-i18next";

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
    const [ t, i18n ] = useTranslation();
    return (
        <DnDModalBack>
            <ContentContainer>
                <ModalContent>
                    <ModalName>{t("dnDModal.dropFiles")}</ModalName>
                    <ModalSubName style={{marginTop: "10px"}}>{t("dnDModal.dropFiles2Upload")}</ModalSubName>
                </ModalContent>
            </ContentContainer>
        </DnDModalBack>
    );
};

export default DnDModal;