import React from 'react';

import styled from "styled-components";
import ContentContainer from "../components/ContentContainer";
import {AppBackground, AppContent} from "../components/styled-parts/AppBackground";
import ElectronHeader from "../components/ElectronHeader";

const StyledAppContent = styled(AppContent)`
  position: relative;
  justify-content: center;
  align-items: center;
`

const Container = styled.div`
  width: 525px;
  height: 635px;
`

export const LRNameDX = styled.p`
  font-family: Furore, serif;
  font-size: 38px;
  color: white;

  display: flex;
  justify-content: center;
`

const LTGS = styled.p`
  font-family: JetBrains Mono, serif;
  font-size: 26px;
  color: #BF94D4;

  padding-top: 10px;
  padding-bottom: 30px;

  display: flex;
  justify-content: center;
`

const LRInput = styled.input`
  width: 100%;
  margin-bottom: 25px;

  background: transparent;
  border: 0;
  border-bottom: 2px solid #C999CA;

  font-family: JetBrains Mono, serif;
  font-size: 20px;
  color: white;
`

const RMFPText = styled.p`
  font-family: "JetBrains Mono", serif;
  font-size: 18px;
  color: #F0CDFC;
`

const RemMeForgotPassword = () => {

    return (
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: "50px"}}>
            <div style={{display: "flex", flexDirection: "row",}}>
                <input type={"checkbox"} style={{marginRight: "10px"}}/>
                <RMFPText>Remember me?</RMFPText>
            </div>
            <RMFPText>Forgot password?</RMFPText>
        </div>
    );
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
`

const ButtonEobaniyBlur = styled.div`
  display: flex;
  justify-content: center;
  filter: drop-shadow(#BC2CC9 0 0 16px);
`

const OrText = styled.p`
  color: white;
  font-family: Furore, serif;
  font-size: 28px;

  margin: 20px;
`

const Line = styled.div`
  width: 100%;

  height: 3px;
  
  background-color: #8723D6;

  filter: drop-shadow(#BC2CC9 0 0 4px);
  
  display: flex;
  align-self: center;
`

const OrLine = () => (
    <div style={{display: "flex", flexDirection: "row", marginTop: "20px"}}>
        <Line/>
        <OrText>OR</OrText>
        <Line/>
    </div>
)

const LoginPage = () => {
    return (
        <React.Fragment>
            <AppBackground/>
            <AppContent>
                {window.IS_USING_DIALOGIX_APP && <ElectronHeader/>}
                <StyledAppContent>
                    <Container>
                        <ContentContainer>
                            <div style={{padding: "30px 60px 30px 60px"}}>
                                <LRNameDX>DIALOGIX</LRNameDX>
                                <LTGS>Login to get started!</LTGS>

                                <LRInput placeholder={"Email / Username"}/>
                                <LRInput placeholder={"Password"}/>

                                <RemMeForgotPassword/>

                                <ButtonEobaniyBlur>
                                    <CutButton>Login</CutButton>
                                </ButtonEobaniyBlur>

                                <OrLine/>

                                <LTGS>Login to get started!</LTGS>

                                <ButtonEobaniyBlur>
                                    <CutButton>Register</CutButton>
                                </ButtonEobaniyBlur>

                            </div>
                        </ContentContainer>
                    </Container>
                </StyledAppContent>
            </AppContent>
        </React.Fragment>
    );
};

export default LoginPage;