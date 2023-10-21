import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {createGlobalStyle} from 'styled-components';
import {useSelector} from "react-redux";

import MainPage from "./pages/MainPage";

import {ThemeProvider, themes} from "./theme";
import AppPage from "./pages/AppPage";

import "./styles/styles.css"
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
`

function App() {
    const theme = useSelector(state => state.theme.theme);

    return (
        <ThemeProvider theme={themes[theme]}>
            <GlobalStyle/>
            <BrowserRouter>
                <Routes>
                    <Route path="/"         element={<MainPage/>}/>
                    <Route path="/app"      element={<AppPage/>}/>
                    <Route path="/login"    element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App;
