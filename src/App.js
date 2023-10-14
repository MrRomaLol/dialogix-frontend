import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {ThemeProvider, themes} from "./theme";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import AppPage from "./pages/AppPage";
import {useSelector} from "react-redux";

function App() {
    const theme = useSelector(state => state.theme.theme);

    console.log(theme);

    return (
        <ThemeProvider theme={themes[theme]}>
            <Router>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/app" element={<AppPage/>}/>
                </Routes>
            </Router>
        </ThemeProvider>
    )
}

export default App;
