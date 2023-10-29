import React, {useEffect, useState} from 'react';
import {AppBackground, AppContent} from "../components/styled-parts/AppBackground";
import ElectronHeader from "../components/ElectronHeader";
import {ButtonEobaniyBlur, CutButton, LRInput, LRNameDX, LTGS, OrLine} from "./LoginPage";
import styled from "styled-components";
import ContentContainer from "../components/ContentContainer";
import {useNavigate} from "react-router-dom";
import {Store} from "react-notifications-component";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../store/authSlice";
import DXSpinner from "../components/DXSpinner";

const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
const validUsername = /^[A-Za-z0-9_]{4,20}$/;

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
    const navigate = useNavigate();
    const [tryingToRegister, setTryingToRegister] = useState(false);
    const {loading, error, success} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        rpassword: "",
    });

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

    const handleRegister = () => {
        if (loading) return;
        setTryingToRegister(false);

        if (!formData.username.match(validUsername)) {
            return Store.addNotification({
                ...notification,
                message: "Username is invalid"
            })
        }

        if (!formData.email.match(validEmail)) {
            return Store.addNotification({
                ...notification,
                message: "Email is invalid"
            })
        }

        if (formData.password.length < 6) {
            return Store.addNotification({
                ...notification,
                message: "Password is too short"
            })
        }

        if (formData.password !== formData.rpassword) {
            return Store.addNotification({
                ...notification,
                message: "Passwords doesn't match"
            })
        }

        dispatch(registerUser(formData));
        setTryingToRegister(true);
    }

    const goToLogin = () => {
        navigate('/login');
    }

    useEffect(() => {
        const showNotification = () => {
            if (!tryingToRegister) return;
            if (error) {
                Store.addNotification({
                    ...notification,
                    message: `Something went wrong: ${error}`
                })
            }

            if (success) {
                Store.addNotification({
                    ...notification,
                    title: "Success!",
                    type: "success",
                    message: "Registration completed"
                })
                navigate('/app');
            }
        }
        showNotification();
    }, [navigate, success, error, tryingToRegister])

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

                            <LRInput placeholder={"Username"} name={'username'} onChange={handleChange} type={'text'}/>
                            <LRInput placeholder={"Email"} name={'email'} onChange={handleChange} type={'email'}/>
                            <LRInput placeholder={"Password"} name={'password'} onChange={handleChange}
                                     type={'password'}/>
                            <LRInput placeholder={"Repeat password"} name={'rpassword'} onChange={handleChange}
                                     type={'password'}/>

                            <ButtonEobaniyBlur>
                                <CutButton onClick={handleRegister}>{loading ? <DXSpinner/> : 'Register'}</CutButton>
                            </ButtonEobaniyBlur>

                            <OrLine/>

                            <LTGS>Already have an account?</LTGS>

                            <ButtonEobaniyBlur>
                                <CutButton onClick={goToLogin}>Login</CutButton>
                            </ButtonEobaniyBlur>

                        </div>
                    </Container>
                </StyledAppContent>
            </AppContent>
        </React.Fragment>
    );
};

export default RegisterPage;