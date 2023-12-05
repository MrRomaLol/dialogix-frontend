import React, {useState} from 'react';

import styled from "styled-components";
import ContentContainer from "../components/ContentContainer";
import {AppBackground, AppContent} from "../components/styled-parts/AppBackground";
import ElectronHeader from "../components/ElectronHeader";
import {useNavigate} from "react-router-dom";
import {Store} from "react-notifications-component";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../store/authSlice";
import DXSpinner from "../components/DXSpinner";
import CutButton from "../components/UIElements/CutButton";
import {useTranslation} from "react-i18next";

const StyledAppContent = styled(AppContent)`
  position: relative;
  justify-content: center;
  align-items: center;
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

const ForgotPassword = ({t}) => {
    return (
        <div style={{display: "flex", marginBottom: "50px", justifyContent: "flex-end"}}>
            <RMFPText>{t("logRegPage.forgotPswd")}</RMFPText>
        </div>
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

  filter: drop-shadow(#BC2CC9 0 0 4px);

  display: flex;
  align-self: center;
`

export const OrLine = ({t}) => (
    <div style={{display: "flex", flexDirection: "row", marginTop: "20px"}}>
        <Line/>
        <OrText>{t("logRegPage.orLine")}</OrText>
        <Line/>
    </div>
)

const Button = styled(CutButton)`
  justify-content: center;
`

const LoginPage = () => {
    const navigate = useNavigate();
    const [ t, i18n ] = useTranslation();

    const {loading} = useSelector((state) => state.auth);
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
        title: t("misc.error"),
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
        if (loading) return;
        if (formData.username.length < 4 || formData.password.length < 6) {
            return Store.addNotification({
                ...notification,
                message: t("logRegPage.invalidLog")
            })
        }

        dispatch(loginUser(formData)).unwrap()
            .then(() => {
                navigate('/app');
            })
            .catch((error) => {
                if (error === 'notauser') {
                    Store.addNotification({
                        ...notification,
                        message: t("logRegPage.invalidLog")
                    })
                }
            });
    }

    const handleSubmit = e => {
        if(e.keyCode === 13) {
            handleLogin();
        }
    }

    const goToRegister = () => {
        navigate('/register');
    }

    return (
        <React.Fragment>
            <AppBackground/>
            <AppContent>
                {window.IS_USING_DIALOGIX_APP && <ElectronHeader/>}
                <StyledAppContent>
                    <ContentContainer>
                        <div style={{padding: "30px 60px 30px 60px", display: "flex", flexDirection: "column"}} onKeyDown={handleSubmit}>
                            <LRNameDX>DIALOGIX</LRNameDX>
                            <LTGS>{t("logRegPage.logGetStart")}</LTGS>

                            <LRInput placeholder={t("logRegPage.loginInput")} name={'username'} onChange={handleChange}/>
                            <LRInput placeholder={t("logRegPage.pswdInput")} name={'password'} onChange={handleChange} type={'password'}/>

                            <ForgotPassword t={t}/>

                            <Button onClick={handleLogin}>{loading ? <DXSpinner/> : t("logRegPage.loginBtn")}</Button>

                            <OrLine t={t}/>

                            <LTGS>{t("logRegPage.noAcc")}</LTGS>

                            <Button onClick={goToRegister}>{t("logRegPage.regBtn")}</Button>

                        </div>
                    </ContentContainer>
                </StyledAppContent>
            </AppContent>
        </React.Fragment>
    );
};

export default LoginPage;