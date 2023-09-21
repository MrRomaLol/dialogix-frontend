import React from 'react';
import {useNavigate} from "react-router-dom";
import '../styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonClass from "../components/ButtonClass";
import {useTranslation} from "react-i18next";


const MainPage = () => {

    const {t} = useTranslation();

    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    }

    const handleRegister = () => {
        navigate('/register');
    }

    return (
        <div className={"main-page"}>
            <div className={"main-page-header"}>
                <div className={"nav-bar mx-auto my-0"}>
                    <h2 className={"main-page-logo mt-2"} style={{fontFamily: "Buroek"}}>DIALOGIX</h2>

                    <div>
                        <h1>gvdfgdfgdfg</h1>
                    </div>

                    <div className={"buttons-log-reg"}>
                        <ButtonClass name={t("logRegPage.loginBtn")}
                                     fontSize={"18px"}
                                     fontWeight={"bold"}
                                     textColor={"white"}
                                     hoverTextColor={"black"}
                                     hoverColor={"white"}
                                     borderRadius={"10px"}
                                     borderHoverStyle={"2px solid transparent"}
                                     onClick={handleLogin}
                                     height={"50px"}
                                     width={"120px"}
                        />
                        <ButtonClass name={t("logRegPage.regBtn")}
                                     fontSize={"18px"}
                                     fontWeight={"bold"}
                                     textColor={"white"}
                                     hoverTextColor={"black"}
                                     hoverColor={"white"}
                                     borderRadius={"10px"}
                                     borderHoverStyle={"2px solid transparent"}
                                     onClick={handleRegister}
                                     height={"50px"}
                                     width={"120px"}
                        />
                    </div>
                </div>
            </div>


        </div>
    );
};

export default MainPage;