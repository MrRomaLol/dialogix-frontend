import React, {useMemo, useRef} from 'react';
import '../styles/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import InputTextBox from "../components/InputTextBox";
import ButtonClass from "../components/ButtonClass";
import "bootstrap/dist/css/bootstrap.min.css";
import Checkbox from "../components/Checkbox";
import LineOr from "../components/LineOr";
import {redirect, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Fade} from "react-awesome-reveal";
import {backend} from "../config/consts";
import axios from "axios";
import {onLoggined} from "../usefull/loginStatus";

const LoginPage = () => {
    const {t} = useTranslation();

    const navigate = useNavigate();

    const login = useRef('');
    const pswd = useRef('');
    const rememberMe = useRef(false);

    const handleRegister = () => {
        navigate('/register');
    }

    const handleApp = () => {
        navigate('/app');
    }

    const handleLoginInput = (text) => {
        login.current = text;
    }

    const handlePasswordInput = (text) => {
        pswd.current = text;
    }

    const handleRememberMe = (status) => {
        rememberMe.current = status;
    }

    const handleLogin = () => {
        if (login.current.includes(' ')) return; //TODO: Make notifications

        const user = {
            username: login.current, password: pswd.current, remember: rememberMe.current
        }

        axios.post(backend + 'api/v1/login', user, {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            withCredentials: true
        })
            .then(response => {
                console.log(response.data);
                if (response.data.status === 'success') {
                    navigate('/app');
                }
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
                <p className={"login-page-text"} style={{fontSize: "20px"}}>{t("logRegPage.logGetStart")}</p>
                <Fade>
                    <InputTextBox name={t("logRegPage.loginInput")}
                                  type={"text"}
                                  id={"login"}
                                  onTextChange={handleLoginInput}
                    />
                    <InputTextBox name={t("logRegPage.pwdInput")}
                                  type={"password"}
                                  id={"pswd"}
                                  onTextChange={handlePasswordInput}
                    />

                    <div className={"checkbox-texts mt-3 ps-2 pe-2"} style={{alignItems: "center"}}>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <Checkbox onChange={handleRememberMe}/>
                            <p className={"login-page-text ps-1 m-0"}>{t("logRegPage.remMe")}</p>
                        </div>
                        <a href={"#!"} style={{color: "dodgerblue"}}>{t("logRegPage.forgotPwd")}</a>
                    </div>

                    <div className={"m-4 mt-5"} style={{textAlign: "center"}}>
                        <ButtonClass name={t("logRegPage.loginBtn")}
                                     fontSize={"18px"}
                                     fontWeight={"bold"}
                                     width={"150px"}
                                     textColor={"white"}
                                     hoverTextColor={"black"}
                                     hoverColor={"white"}
                                     borderRadius={"10px"}
                                     borderHoverStyle={"2px solid transparent"}
                                     onClick={handleLogin}
                        />
                        <ButtonClass onClick={handleApp}/>
                    </div>

                    <LineOr name={t("logRegPage.orLine")}/>

                    <p className={"login-page-text mt-3"} style={{fontSize: "20px"}}>{t("logRegPage.noAcc")}</p>

                    <div className={"m-4 mt-3"} style={{textAlign: "center"}}>
                        <ButtonClass name={t("logRegPage.regBtn")}
                                     fontSize={"18px"}
                                     fontWeight={"bold"}
                                     textColor={"white"}
                                     hoverTextColor={"black"}
                                     width={"150px"}
                                     hoverColor={"white"}
                                     borderRadius={"10px"}
                                     borderHoverStyle={"2px solid transparent"}
                                     onClick={handleRegister}
                        />
                    </div>

                </Fade>
            </div>
        </div>
    )
        ;
};

export default LoginPage;

// <div className={'login-box mx-auto my-auto p-0'}>
//
//     <h1 className={'pb-0 p-3 m-0 main-text'}>DIALOGIX</h1>
//
//     <div className={'login-password-button '}>
//
//         <p className={'login-box-p pb-0 m-0 p-3'}>Email</p>
//         <div className="input-group p-3 pb-0 pt-1">
//             <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder={"example@gmail.com"}/>
//         </div>
//
//         <p className={'login-box-p pb-0 m-0 p-3'}>Password</p>
//         <div className="input-group p-3 pt-1">
//             <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder={"Enter your password here"}/>
//         </div>
//
//         <div className={'checkbox-forgotPassword p-4 pt-0'}>
//             <div className={''}>
//                 <input type="checkbox"/> Remember me?
//             </div>
//
//             <button type="button" className="btn btn-link p-0">Forgot password?</button>
//         </div>
//
//     </div>
//
//     <div className={'text-center'}>
//         <button type="button" className="btn btn-success w-50">Login</button>
//     </div>
//
// </div>

// .login-box {*/
/*    border:         2px solid gray;*/
/*    height:         400px;*/
/*    width:          500px;*/
/*    position:       absolute;*/
/*    top:            0;*/
/*    bottom:         0;*/
/*    left:           0;*/
/*    right:          0;*/
/*    margin:         auto;*/
/*}*/

/*.main-text {*/
/*    font-family:    "Buroek";*/
/*    font-size:      30px;*/
/*    font-weight:    bold;*/
/*    text-align:     center;*/
/*    width:          100%;*/
/*}*/

/*.login-box-p {*/
/*    !*text-indent: 15px;*!*/
/*}*/

/*.login-password-button {*/

/*}*/

/*.checkbox-forgotPassword {*/
/*    display:         flex;*/
/*    justify-content: space-between;*/
// }


// bootstrap example

// <section className="vh-100 gradient-custom">
//     <div className="container py-5 h-100">
//         <div className="row d-flex justify-content-center align-items-center h-100">
//             <div className="col-12 col-md-8 col-lg-6 col-xl-5">
//                 <div className="card bg-dark text-white" style={{borderRadius:"1rem"}}>
//                     <div className="card-body p-5 text-center">
//
//                         <div className="mb-md-5 mt-md-4">
//
//                             <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
//                             <p className="text-white-50 mb-5">Please login to get started!</p>
//
//                             <div className="form-outline form-white mb-4">
//                                 <input type="email" id="typeEmailX" className="form-control form-control-lg" style={{backgroundColor:"transparent", color:"white"}} />
//                                 <label className="form-label" htmlFor="typeEmailX">Email</label>
//                             </div>
//
//                             <div className="form-outline form-white mb-2">
//                                 <input type="password" id="typePasswordX" className="form-control form-control-lg" style={{backgroundColor:"transparent", color:"white"}}/>
//                                 <label className="form-label" htmlFor="typePasswordX">Password</label>
//                             </div>
//
//                             <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>
//
//                             <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
//
//                         </div>
//
//                         <div>
//                             <p class="mb-0">Don't have an account? <a href="" class="text-white-50 fw-bold">Sign Up</a>
//                             </p>
//                         </div>
//
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// </section>