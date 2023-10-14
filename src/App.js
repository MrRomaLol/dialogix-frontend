import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {createGlobalStyle} from 'styled-components';
import {useSelector} from "react-redux";

import MainPage from "./pages/MainPage";

import {ThemeProvider, themes} from "./theme";
import AppPage from "./pages/AppPage";

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
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/app" element={<AppPage/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App;
