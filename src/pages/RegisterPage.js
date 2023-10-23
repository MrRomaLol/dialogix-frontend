import React from 'react';
import {AppBackground, AppContent} from "../components/styled-parts/AppBackground";
import ElectronHeader from "../components/ElectronHeader";
import {ButtonEobaniyBlur, CutButton, LRInput, LRNameDX, LTGS, OrLine} from "./LoginPage";
import styled from "styled-components";
import ContentContainer from "../components/ContentContainer";

const StyledAppContent = styled(AppContent)`
  position: relative;
  justify-content: center;
  align-items: center;
`

const Container = styled(ContentContainer)`
  width: 525px;
  height: 675px;
`

const RegisterPage = () => {
    return (
        <React.Fragment>
            <AppBackground/>
            <AppContent>
                {window.IS_USING_DIALOGIX_APP && <ElectronHeader/>}
                <StyledAppContent>
                    <Container>
                        <div style={{padding: "30px 60px 30px 60px"}}>
                            <LRNameDX>DIALOGIX</LRNameDX>
                            <LTGS>Create new account!</LTGS>

                            <LRInput placeholder={"Username"}/>
                            <LRInput placeholder={"Email"}/>
                            <LRInput placeholder={"Password"}/>
                            <LRInput placeholder={"Repeat password"}/>

                            <ButtonEobaniyBlur>
                                <CutButton>Register</CutButton>
                            </ButtonEobaniyBlur>

                            <OrLine/>

                            <LTGS>Already have an account?</LTGS>

                            <ButtonEobaniyBlur>
                                <CutButton>Login</CutButton>
                            </ButtonEobaniyBlur>

                        </div>
                    </Container>
                </StyledAppContent>
            </AppContent>
        </React.Fragment>
    );
};

export default RegisterPage;