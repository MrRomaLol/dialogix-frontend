import React, {useEffect} from "react";
import {ReactNotifications} from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.min.css';
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
import Modal from "react-modal";

Modal.setAppElement('#root')

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
`

function App() {
    const theme = useSelector(state => state.theme.theme);

    const {isAuthenticated} = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuthentication());
    }, [dispatch])

    return (
        <ThemeProvider theme={themes[theme]}>
            <GlobalStyle/>
            <ReactNotifications/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/app" element={isAuthenticated ? <AppPage/> : <Navigate to={'/login'}/>}/>
                    <Route path="/login" element={isAuthenticated ? <Navigate to={'/app'}/> : <LoginPage/>}/>
                    <Route path="/register" element={isAuthenticated ? <Navigate to={'/app'}/> : <RegisterPage/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>

    )
}

export default App;
