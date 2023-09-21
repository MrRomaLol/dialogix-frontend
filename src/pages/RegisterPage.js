import React, {useMemo, useRef} from 'react';
import '../styles/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import InputTextBox from "../components/InputTextBox";
import ButtonClass from "../components/ButtonClass";
import "bootstrap/dist/css/bootstrap.min.css";
import LineOr from "../components/LineOr";
import {useTranslation} from "react-i18next";
import {redirect, useNavigate} from "react-router-dom";
import {Fade} from "react-awesome-reveal";
import axios from "axios";
import {backend} from "../config/consts";
import {onLoggined} from "../usefull/loginStatus";

const RegisterPage = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const login = useRef('');
    const email = useRef('');
    const pswd = useRef('');
    const pswdRepeat = useRef('');

    const handleLogin = () => {
        navigate('/login');
    }

    const handleLoginInput = (text) => {
        login.current = text;
    }

    const handleEmailInput = (text) => {
        email.current = text;
    }

    const handlePswdInput = (text) => {
        pswd.current = text;
    }

    const handlePswdRepeatInput = (text) => {
        pswdRepeat.current = text;
    }

    const handleRegister = () => {
        if (login.current.includes(' ')) return;
        if (!email.current.includes('@') || !email.current.includes('.') || email.current.includes(' ')) return;
        if (pswd.current !== pswdRepeat.current) return; //TODO: Make notifications

        const newUser = {
            username: login.current, email: email.current, password: pswd.current,
        }
        axios.post(backend + 'api/v1/register', newUser, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
            .then(response => {
                console.log(response.data);
            }).catch((err) => {
            console.log(err.message);
        });
    }

    useMemo(() => {
       onLoggined(() => {
           redirect('/app');
       })
    }, []);

    return (
        <div className={"center-box"}>
            <div className={"login-box p-4 rounded-4"}>

                <h2 className={"login-page-text main-text m-3 mb-0"} style={{fontFamily: "Buroek"}}>DIALOGIX</h2>
                <p className={"login-page-text"} style={{fontSize: "20px"}}>{t("logRegPage.regGetStart")}</p>
                <Fade>
                    <InputTextBox name={t("logRegPage.userInput")}
                                  type={"text"}
                                  id={"userName"}
                                  onTextChange={handleLoginInput}
                    />

                    <InputTextBox name={t("logRegPage.emailInput")}
                                  type={"email"}
                                  id={"email"}
                                  onTextChange={handleEmailInput}
                    />

                    <InputTextBox name={t("logRegPage.pwdInput")}
                                  type={"password"}
                                  id={"pswd"}
                                  onTextChange={handlePswdInput}
                    />

                    <InputTextBox name={t("logRegPage.pwdRepInput")}
                                  type={"password"}
                                  id={"pwdRepeat"}
                                  onTextChange={handlePswdRepeatInput}
                    />

                    <div className={"m-4"} style={{textAlign: "center"}}>
                        <ButtonClass name={t("logRegPage.regBtn")}
                                     fontSize={"18px"}
                                     fontWeight={"bold"}
                                     textColor={"white"}
                                     hoverTextColor={"black"}
                                     hoverColor={"white"}
                                     borderRadius={"10px"}
                                     borderHoverStyle={"2px solid transparent"}
                                     width={"150px"}
                                     onClick={handleRegister}
                        />
                    </div>

                    <LineOr name={t("logRegPage.orLine")}/>

                    <p className={"login-page-text mt-3"} style={{fontSize: "20px"}}>Already have an account?</p>

                    <div className={"m-4 mt-3"} style={{textAlign: "center"}}>
                        <ButtonClass name={"LOGIN"}
                                     fontSize={"18px"}
                                     fontWeight={"bold"}
                                     textColor={"white"}
                                     hoverTextColor={"black"}
                                     hoverColor={"white"}
                                     borderRadius={"10px"}
                                     borderHoverStyle={"2px solid transparent"}
                                     onClick={handleLogin}
                                     width={"150px"}
                        />
                    </div>

                </Fade>
            </div>
        </div>

    );
};

export default RegisterPage;