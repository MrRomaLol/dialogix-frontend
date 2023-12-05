import React, {useState} from 'react';
import {AppBackground, AppContent} from "../components/styled-parts/AppBackground";
import ElectronHeader from "../components/ElectronHeader";
import {LRInput, LRNameDX, LTGS, OrLine} from "./LoginPage";
import styled from "styled-components";
import ContentContainer from "../components/ContentContainer";
import {useNavigate} from "react-router-dom";
import {Store} from "react-notifications-component";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../store/authSlice";
import DXSpinner from "../components/DXSpinner";
import CutButton from "../components/UIElements/CutButton";
import ToS from "../components/Modals/ToS";
import {useTranslation} from "react-i18next";
import {cT} from "../localization/funcs";

const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
const validUsername = /^[A-Za-z0-9_]{4,20}$/;

const StyledAppContent = styled(AppContent)`
  position: relative;
  justify-content: center;
  align-items: center;
`

const Button = styled(CutButton)`
  justify-content: center;
`

const RegisterPage = () => {
    const [ t, i18n ] = useTranslation();
    const navigate = useNavigate();
    const {loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [isToSOpen, setIsToSOpen] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        rpassword: "",
        acceptToS: false,
    });

    const openTOS = () => {
        setIsToSOpen(true);
    }

    const closeToS = () => {
        setIsToSOpen(false);
    }

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

    const handleRegister = () => {
        if (loading) return;

        if (!formData.acceptToS) {
            return Store.addNotification({
                ...notification,
                message: t("logRegPage.termsErr")
            })
        }

        if (!formData.username.match(validUsername)) {
            return Store.addNotification({
                ...notification,
                message: t("logRegPage.usernameErr")
            })
        }

        if (!formData.email.match(validEmail)) {
            return Store.addNotification({
                ...notification,
                message: t("logRegPage.emailErr")
            })
        }

        if (formData.password.length < 6) {
            return Store.addNotification({
                ...notification,
                message: t("logRegPage.shortPswd")
            })
        }

        if (formData.password !== formData.rpassword) {
            return Store.addNotification({
                ...notification,
                message: t("logRegPage.pswdNotMatch")
            })
        }

        dispatch(registerUser(formData)).unwrap()
            .then(() => {
                navigate('/app');
            })
            .catch((error) => {
                Store.addNotification({
                    ...notification,
                    message: cT(t("misc.msgErr"), error)
                })
            })
    }

    const handleSubmit = e => {
        if(e.keyCode === 13) {
            handleRegister();
        }
    }

    const goToLogin = () => {
        navigate('/login');
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
                            <LTGS>{t("logRegPage.regGetStart")}</LTGS>

                            <LRInput placeholder={t("logRegPage.userInput")} name={'username'} onChange={handleChange} type={'text'}/>
                            <LRInput placeholder={t("logRegPage.emailInput")} name={'email'} onChange={handleChange} type={'email'}/>
                            <LRInput placeholder={t("logRegPage.pswdInput")} name={'password'} onChange={handleChange}
                                     type={'password'}/>
                            <LRInput placeholder={t("logRegPage.pswdRepInput")} name={'rpassword'} onChange={handleChange}
                                     type={'password'}/>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "20px",
                                fontSize: "16px",
                                fontFamily: "JetBrains Mono, serif"
                            }}>
                                <input id={'agree'} name={'acceptToS'} onChange={handleChange} type={'checkbox'}/>
                                <label htmlFor={'agree'} style={{marginLeft: "15px", color: "white"}}>
                                    {t("logRegPage.agreement")}
                                </label>
                                <strong style={{
                                    color: "#BC2CC9",
                                    textDecoration: "underline",
                                    marginLeft: "8px",
                                    cursor: "pointer"
                                }} onClick={openTOS}>ToS</strong>
                            </div>

                            <Button onClick={handleRegister}>{loading ? <DXSpinner/> : t("logRegPage.regBtn")}</Button>

                            <OrLine t={t}/>

                            <LTGS>{t("logRegPage.haveAcc")}</LTGS>

                            <Button onClick={goToLogin}>{t("logRegPage.loginBtn")}</Button>

                        </div>
                    </ContentContainer>
                </StyledAppContent>
            </AppContent>
            <ToS isOpen={isToSOpen} onRequestClose={closeToS}/>
        </React.Fragment>
    );
};

export default RegisterPage;