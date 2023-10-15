import React from 'react';
import {useNavigate} from "react-router-dom";

const MainPage = () => {
    const navigate = useNavigate()

    const goToLogin = () => {
        navigate('/login')
    }

    const goToRegister = () => {
        navigate('/register')
    }

    const goToApp = () => {
        navigate('/app')
    }

    return (
        <div>
            Main Page! <br/>

            <button onClick={goToLogin}>Login</button>
            <br/>
            <button onClick={goToRegister}>Register</button>
            <br/>
            <button onClick={goToApp}>App</button>
            <br/>
        </div>
    );
};

export default MainPage;