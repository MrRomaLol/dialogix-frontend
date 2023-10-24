import React, {useEffect, useState} from 'react';

import styled from "styled-components";
import ContentContainer from "../components/ContentContainer";
import {AppBackground, AppContent} from "../components/styled-parts/AppBackground";
import ElectronHeader from "../components/ElectronHeader";
import {useNavigate} from "react-router-dom";
import {Store} from "react-notifications-component";
import {postData} from "../axios";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../store/authSlice";

const StyledAppContent = styled(AppContent)`
  position: relative;
  justify-content: center;
  align-items: center;
`

const Container = styled(ContentContainer)`
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

export const LTGS = styled.p`
  font-family: JetBrains Mono, serif;
  font-size: 26px;
  color: #BF94D4;

  padding-top: 10px;
  padding-bottom: 30px;

  display: flex;
  justify-content: center;
`

export const LRInput = styled.input`
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

export const CutButton = styled.button`
  height: 50px;
  width: 190px;

  background-color: #5F3170;
  border: 0;

  color: white;
  font-family: Furore, serif;
  font-size: 24px;

  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%);

  transition-duration: 200ms;

  &:hover {
    background-color: #4d245d;
  }

  &:active {
    background-color: #3c194d;
  }
`

export const ButtonEobaniyBlur = styled.div`
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

export const OrLine = () => (
    <div style={{display: "flex", flexDirection: "row", marginTop: "20px"}}>
        <Line/>
        <OrText>OR</OrText>
        <Line/>
    </div>
)

const LoginPage = () => {
    const navigate = useNavigate();

    const {loading, error, success} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })

    const handleChange = e => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const notification = {
        title: "Error!",
        type: "danger",
        insert: "top",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeInDown"],
        dismiss: {
            duration: 5000,
            pauseOnHover: true,
        }
    }

    const handleLogin = () => {
        if (formData.username.length < 4 || formData.password.length < 6) {
            return Store.addNotification({
                ...notification,
                message: "Invalid username or password"
            })
        }

        dispatch(loginUser(formData));

        // postData('/api/v1/login', user).then((res) => {
        //     if (res.status === 'notauser') {
        //         return Store.addNotification({
        //             ...notification,
        //             message: "Invalid username or password"
        //         })
        //     }
        //
        //     if (res.status === 'error') {
        //         return Store.addNotification({
        //             ...notification,
        //             message: `Something went wrong: ${res.message}`
        //         })
        //     }
        //
        //     if (res.ok) {
        //         Store.addNotification({
        //             ...notification,
        //             title: "Success!",
        //             type: "success",
        //             message: "Login completed"
        //         })
        //         return navigate('/app');
        //     }
        // })
    }

    const goToRegister = () => {
        navigate('/register');
    }

    useEffect(() => {
        console.log(success);
        console.log(error);

        if (error === 'notauser') {
            Store.addNotification({
                ...notification,
                message: `Invalid username or password`
            })
        }
        if (success) {
            Store.addNotification({
                ...notification,
                title: "Success!",
                type: "success",
                message: "Login completed"
            })
            navigate('/app');
        }
    }, [navigate, error, success])

    return (
        <React.Fragment>
            <AppBackground/>
            <AppContent>
                {window.IS_USING_DIALOGIX_APP && <ElectronHeader/>}
                <StyledAppContent>
                    <Container>
                        <div style={{padding: "30px 60px 30px 60px"}}>
                            <LRNameDX>DIALOGIX</LRNameDX>
                            <LTGS>Login to get started!</LTGS>

                            <LRInput placeholder={"Email / Username"} name={'username'} onChange={handleChange}/>
                            <LRInput placeholder={"Password"} name={'password'} onChange={handleChange}/>

                            <RemMeForgotPassword/>

                            <ButtonEobaniyBlur>
                                <CutButton onClick={handleLogin}>Login</CutButton>
                            </ButtonEobaniyBlur>

                            <OrLine/>

                            <LTGS>Don't have account yet?</LTGS>

                            <ButtonEobaniyBlur>
                                <CutButton onClick={goToRegister}>Register</CutButton>
                            </ButtonEobaniyBlur>

                        </div>
                    </Container>
                </StyledAppContent>
            </AppContent>
        </React.Fragment>
    );
};

export default LoginPage;