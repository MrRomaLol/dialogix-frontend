import React from 'react';
import {AppBackground, AppContent} from "./styled-parts/AppBackground";
import styled from "styled-components";
import {useTranslation} from "react-i18next";

const Content = styled(AppContent)`
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Back = styled.div`
  background-color: rgba(61, 38, 84, 0.2);

  padding: 40px;

  box-sizing: border-box;

  clip-path: polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px);
`

const Border = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  
  width: 100%;
  height: 100%;

  background-color: rgba(188, 44, 201, 0.62);

  clip-path: polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px, 30px 0,
  30px 2px, 30px 2px, 2px 30px, 2px calc(100% - 2px), calc(100% - 30px) calc(100% - 2px), calc(100% - 2px) calc(100% - 30px), calc(100% - 2px) 2px, 30px 2px);
`

const H1 = styled.h1`
  color: white;
  font-family: Furore, serif;
`

const P = styled.p`
  color: white;
  font-family: JetBrains Mono, serif;
`

const Container = styled.div`
  position: relative;
`

const SmallScreen = () => {
    const [ t, i18n ] = useTranslation();
    return (
        <React.Fragment>
            <AppBackground/>
            <Content>
                <Container>
                    <Back>
                        <H1>{t("smallScreen.screen2Small")}</H1>
                        <P>{t("smallScreen.screenWarn")}</P>
                    </Back>
                    <Border/>
                </Container>
            </Content>
        </React.Fragment>
    );
};

export default SmallScreen;