import React from 'react';
import {useNavigate} from "react-router-dom";
import {AppBackground, AppContent} from "../components/styled-parts/AppBackground";
import CutButton from "../components/UIElements/CutButton";
import styled from "styled-components";

const LogoBack = styled.div`
  width: 250px;
  height: 250px;

  position: relative;

  border-radius: 50%;

  border: solid #a263c2 3px;

  cursor: pointer;

  box-shadow: inset 0 0 10px rgba(255, 0, 245, 0.5);
  filter: drop-shadow(rgba(255, 0, 245, 0.8) 0 0 25px);

  background: radial-gradient(#8723D6, #000000);
`

const EyesContainer = styled.div`
  display: flex;
  flex-direction: row;

  margin-top: 118px;
  margin-left: 82px;
  margin-right: 82px;

  justify-content: space-between;

  filter: opacity(0%);

  transition-duration: 500ms;
`

const Eye = styled.div`
  width: 15px;
  height: 15px;

  background-color: red;

  filter: drop-shadow(rgba(255, 0, 0, 1) 0px 0px 3px);
`

const LogoImage = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  background: url(img/DialogiX_Logo_NOBG.png) no-repeat center center;

  background-size: 100% 100%;

  transition-duration: 400ms;

  transition-delay: 600ms;

  &:hover {
    rotate: 90deg;
    transition-delay: 0ms;
  }

  &:hover + ${EyesContainer} {
    filter: opacity(100%);
    transition-delay: 400ms;
  }
`

const Logotype = () => {
    return (
        <LogoBack>
            <LogoImage/>
            <EyesContainer>
                <Eye/>
                <Eye/>
            </EyesContainer>
        </LogoBack>
    );
};

const Text = styled.p`
  color: #F1B7FF;

  font-family: Furore, serif;
  font-size: 40px;

  margin-left: 30px;
`

const HeaderText = styled.p`
  color: white;

  font-family: Furore, serif;
  font-size: 30px;
  
  text-align: center;
`

const MainText = styled.p`
  color: white;

  font-family: Furore, serif;
  font-size: 30px;
  text-align: justify;
`

const MainPage = () => {
    const navigate = useNavigate()

    const goToLogin = () => {
        navigate('/login')
    }

    const goToRegister = () => {
        navigate('/register')
    }

    const goToApp = () => {
        navigate('/app')
    }

    return (
        <div>
            <AppBackground/>
            <AppContent>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    margin: "30px",
                    gap: "30px",
                    position: "absolute",
                    top: 0,
                    right: 0
                }}>
                    <CutButton onClick={goToLogin}>LOGIN</CutButton>
                    <CutButton onClick={goToRegister}>REGISTER</CutButton>
                </div>

                <div style={{width: "100%", height: "100%", display:"flex", flexDirection:"row"}}>
                    <div style={{display: "flex", flexDirection: "column", width: "30%", gap: "80px", padding: "50px 0 0 50px"}}>
                        <div style={{display: "flex", flexDirection: "column", gap:"20px"}}>
                            <Logotype/>
                            <Text>DIALOGIX</Text>
                        </div>

                        <div style={{gap: "40px", margin: "0 auto", display: "flex", flexDirection: "column"}}>
                            <CutButton>DOWNLOAD</CutButton>
                            <CutButton onClick={goToApp}>OPEN DIALOGIX</CutButton>
                        </div>

                    </div>

                    <div style={{display: "flex", flexDirection: "column", gap: "30px", margin:"250px 100px 100px 150px"}}>
                        <HeaderText>IMAGINE A PLACE...</HeaderText>
                        <MainText>...where you can do anything you want, also that type of things that u can't do in Discord. The place where everything allowed, but you need to pay money for this. The place where you can do nothing but it will crash your app. The place where you can buy subscriptions that gives you absolutely nothing just for fun. Like you always do...</MainText>
                    </div>

                </div>
            </AppContent>
        </div>
    );
};

export default MainPage;