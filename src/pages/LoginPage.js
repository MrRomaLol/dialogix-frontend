import React, {useState} from 'react';

import styled from "styled-components";
import ContentContainer from "../components/ContentContainer";
import {AppBackground, AppContent} from "../components/styled-parts/AppBackground";
import ElectronHeader from "../components/ElectronHeader";

const StyledAppContent = styled(AppContent)`
  justify-content: center;
  align-items: center;
`

const Container = styled.div`
  width: 525px;
  height: 698px;

`

export const LRNameDX = styled.p`
  font-family: Furore, serif;
  font-size: 45px;
  color: white;

  display: flex;
  justify-content: center;
`

const LTGS = styled.p`
  font-family: "JetBrains Mono", serif;
  font-size: 30px;
  color: #BF94D4;

  padding-top: 10px;
  padding-bottom: 30px;

  display: flex;
  justify-content: center;
`

// .input-label {
//     color: #fff;
//     position: relative;
//     pointer-events: none;
//     font-size: large;
//     left: 13px;
//     top: -30px;
//     transition: 0.2s;
// }
//
// .input-text:focus ~ .input-label, .enabled ~ .input-label {
//     top: -55px;
//     left: 10px;
//     font-size: small;
//     color: white;
//     padding: 0 5px 0 5px;
//     border-radius: 5px;
// }

const LRInput = styled.input`
  width: 100%;
  margin-bottom: 25px;

  background: transparent;
  border: 0;
  border-bottom: 2px solid #C999CA;

  font-family: "JetBrains Mono", serif;
  font-size: 25px;
  color: white;
`

export const LRInputBox = ({name}) => {

    return (
        <LRInput placeholder={name} />
    );
}

const RMFPText = styled.p`
  font-family: "JetBrains Mono", serif;
  font-size: 18px;
  color: #F0CDFC;
`

const RemMeForgotPassword = () => {

    return (
        <div style={{display: "flex", flexDirection:"row", justifyContent: "space-between"}}>
            <div style={{display: "flex", flexDirection:"row",}}>
                <input type={"checkbox"} style={{marginRight:"10px"}}/>
                <RMFPText>Remember me?</RMFPText>
            </div>
            <>
                <RMFPText>Forgot password?</RMFPText>
            </>
        </div>
    );
}

const CutButton = styled.button`
  height: 62px;
  width: 192px;
  
  margin: 50px 0 40px 0;
  
  background-color: #5F3170;
  border: 2px solid #BC2CC9;
  
  color: white;
  font-family: Furore, serif;
  font-size: 28px;
`

export const LRButton = ({name}) => {

    return (
        <CutButton>
            {name}
        </CutButton>
    );
}

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
  
  display: flex;
  align-self: center;
`

const OrLine = () => {

    return (
        <div style={{display:"flex", flexDirection:"row"}}>
            <Line />
            <OrText>OR</OrText>
            <Line />
        </div>
    );
}

const LoginPage = () => {
    return (
        <React.Fragment>
            <div style={{top: 0, position: "absolute", zIndex: 50, width: "100%"}}>
                {window.IS_USING_DIALOGIX_APP && <ElectronHeader/>}
            </div>
            <AppBackground/>
            <StyledAppContent>
                <Container>
                    <ContentContainer>
                        <div style={{padding: "30px 60px 30px 60px"}}>
                            <LRNameDX>DIALOGIX</LRNameDX>
                            <LTGS>Login to get started!</LTGS>

                            <LRInputBox name={"Email / Username"}/>
                            <LRInputBox name={"Password"}/>

                            <RemMeForgotPassword />

                            <div style={{display:"flex", justifyContent:"center"}}>
                                <LRButton name={"Login"} />
                            </div>

                            <OrLine />


                        </div>
                    </ContentContainer>
                </Container>
            </StyledAppContent>
        </React.Fragment>
    );
};

export default LoginPage;