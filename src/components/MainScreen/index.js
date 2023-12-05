import React from 'react';
import ContentContainer from "../ContentContainer";
import styled from "styled-components";
import {useTranslation} from "react-i18next";


const FullscreenContainer = styled(ContentContainer)`
  width: 100%;
  height: 100%;
`

const Message = styled.div`
  width: 100%;
  height: 100%;

  display: flex;

  align-items: center;
  justify-content: center;

  font-family: "JetBrains Mono", serif;
  
  color: white;
  font-size: 30px;
`

const MainScreen = () => {
    const [ t, i18n ] = useTranslation();
    return (
        <FullscreenContainer>
            <Message>{t("mainScreen.chooseChat")}</Message>
        </FullscreenContainer>
    );
};

export default MainScreen;