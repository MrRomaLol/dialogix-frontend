import React, {useEffect, useState} from "react";
import {ReactNotifications} from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.min.css';
import './styles/notification.scss'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {createGlobalStyle} from 'styled-components';
import {useSelector} from "react-redux";

import MainPage from "./pages/MainPage";

import {ThemeProvider, themes} from "./theme";
import AppPage from "./pages/AppPage";

import "./styles/styles.css"
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import {getData} from "./axios";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
`

function App() {
    const theme = useSelector(state => state.theme.theme);

    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [isLoading, setIsLoading] = useState(true);
    //
    // useEffect(() => {
    //     const checkAuthStatus = async () => {
    //         getData('/api/v1/loginstatus').then((res) => {
    //             if (res.ok) {
    //                 setIsLoggedIn(true);
    //             }
    //             setIsLoading(false);
    //         })
    //     };
    //
    //     checkAuthStatus();
    // }, [])
    //
    // if (isLoading) return null;

    return (
        <ThemeProvider theme={themes[theme]}>
            <GlobalStyle/>
            <ReactNotifications/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    {/*<Route path="/app" element={isLoggedIn ? <AppPage/> : <Navigate to={'/login'}/>}/>*/}
                    {/*<Route path="/login" element={isLoggedIn ? <Navigate to={'/app'}/> : <LoginPage/>}/>*/}
                    {/*<Route path="/register" element={isLoggedIn ? <Navigate to={'/app'}/> : <RegisterPage/>}/>*/}
                    <Route path="/app" element={<AppPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App;
