import React from 'react';
import {useNavigate} from "react-router-dom";
import {AppBackground, AppContent} from "../components/styled-parts/AppBackground";
import CutButton from "../components/UIElements/CutButton";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../store/authSlice";
import {revertAll} from "../store";
import FriendAvatar from "../components/FriendAvatar";

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
  text-indent: 35px;
`

const HeaderText = styled.p`
  color: white;

  font-family: Furore, serif;
  font-size: 30px;
  
  text-align: center;
  margin: 250px 100px 0 70px;
  
  @media screen and (max-width: 1000px) {
    font-size: 25px;
    margin: 250px 50px 0 50px;
  }
`

const MainText = styled.p`
  color: white;

  font-family: Furore, serif;
  font-size: 30px;
  
  text-align: justify;
  margin: 0 100px 100px 100px;
  
  @media screen and (max-width: 1000px) {
    font-size: 25px;
    margin: 0 50px 100px 50px;
  }
`

const StyledFriendAvatar = styled(FriendAvatar)`
  height: 100px;
  width: 100px;
`

const NicknameText = styled.p`
  color: #F1B7FF;

  font-family: "JetBrains Mono", serif;
  font-size: 25px;
  
  display: flex;
  align-items: center;
`

const MainPage = () => {
    const navigate = useNavigate()

    const dispatch = useDispatch();
    const {isAuthenticated} = useSelector((state) => state.auth)

    const {userInfo} = useSelector(state => state.auth);

    const goToLogin = () => {
        navigate('/login')
    }

    const goToRegister = () => {
        navigate('/register')
    }

    const goToApp = () => {
        navigate('/app')
    }


    const handleLogout = () => {
        dispatch(logoutUser()).then(() => {
            dispatch(revertAll());
        })
    }

    return (
        <div>
            <AppBackground/>
            <AppContent>

                 {!isAuthenticated && <div style={{
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
                </div>}

                {isAuthenticated && <div style={{
                    display: "flex",
                    flexDirection: "row",
                    margin: "30px",
                    gap: "30px",
                    position: "absolute",
                    top: 0,
                    right: 0,
                    alignItems:"center"
                }}>

                    <>
                        <StyledFriendAvatar id={userInfo.id} nick={userInfo.nickname} url={userInfo.avatar_url} />
                        <NicknameText>{userInfo.nickname}</NicknameText>
                    </>
                    <CutButton onClick={handleLogout}>LOG OUT</CutButton>
                </div>}

                <div style={{width: "100%", height: "100%", display:"flex", flexDirection:"row"}}>
                    <div style={{display: "flex", flexDirection: "column",  gap: "70px", padding: "50px 0 0 50px",  width:"30%", }}>
                        <div style={{display: "flex", flexDirection: "column", gap:"20px"}}>
                            <Logotype/>
                            <Text>DIALOGIX</Text>
                        </div>

                        <div style={{display: "flex", flexDirection: "column", gap: "40px", margin: "0 auto"}}>
                            <CutButton>DOWNLOAD</CutButton>
                            {isAuthenticated && <CutButton onClick={goToApp}>OPEN DIALOGIX</CutButton>}
                        </div>

                    </div>

                    <div style={{display: "flex", flexDirection: "column", gap:"30px"}}>
                        <HeaderText>IMAGINE A PLACE...</HeaderText>
                        <MainText>...where you can do anything you want, also that type of things that u can't do in Discord. The place where everything allowed, but you need to pay money for this. The place where you can do nothing but it will crash your app. The place where you can buy subscriptions that gives you absolutely nothing just for fun. Like you always do...</MainText>
                    </div>

                </div>
            </AppContent>
        </div>
    );
};

export default MainPage;