import React, {useEffect} from "react";
import {ReactNotifications} from 'react-notifications-component'
import devTools from "devtools-detect";
import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.min.css';
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-contexify/ReactContexify.css';
import './styles/notification.scss'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {createGlobalStyle} from 'styled-components';
import {useDispatch, useSelector} from "react-redux";

import MainPage from "./pages/MainPage";

import {ThemeProvider, themes} from "./theme";
import AppPage from "./pages/AppPage";

import "./styles/styles.css"
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import {checkAuthentication} from "./store/authSlice";
import GuildInvitePage from "./pages/GuildInvitePage";
import {AppBackground} from "./components/styled-parts/AppBackground";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
`

function App() {
    const theme = useSelector(state => state.theme.theme);

    const {isAuthenticated, isCheckingAuth, isAuthChecked} = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isAuthChecked)
            dispatch(checkAuthentication());
    }, [isAuthChecked])

    useEffect(() => {
        window.addEventListener('devtoolschange', event => {
            if (event.detail.isOpen) {
                setTimeout(console.log.bind(console, "%cHold on, hold on. %cQuick question: Are you absolutely sure you need to dive into the dev tools right now? Double-checking to make sure you're in the right place, alright?", "color:red;font-size:50px;font-weight:bold; text-shadow:-3px 0 white, 0 3px white, 3px 0 white, 0 -3px white;", ""));
            }
        });
    }, []);

    if (isCheckingAuth) {
        return <AppBackground/>
    }

    return (
        <ThemeProvider theme={themes[theme]}>
            <GlobalStyle/>
            <ReactNotifications/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/app" element={isAuthenticated ? <AppPage/> : <Navigate to={'/login'}/>}/>
                    <Route path="/invite" element={isAuthenticated ? <GuildInvitePage/> : <Navigate to={'/login'}/>}/>
                    <Route path="/login" element={isAuthenticated ? <Navigate to={'/app'}/> : <LoginPage/>}/>
                    <Route path="/register" element={isAuthenticated ? <Navigate to={'/app'}/> : <RegisterPage/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>

    )
}

export default App;
