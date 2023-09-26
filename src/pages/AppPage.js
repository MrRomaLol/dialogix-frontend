import React, {useMemo, useState} from 'react';
import '../styles/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
import ServerList from "../components/ServerList";
import {onUnLoggined} from "../usefull/loginStatus";
import ServerScreen from "../components/ServerScreen";
import MainScreen from "../components/MainScreen";
import ServerButton from "../components/ServerButton";

const AppPage = () => {
    const navigate = useNavigate();

    const [isMainPage, setIsMainPage] = useState(true);

    let content = isMainPage ? <MainScreen/> : <ServerScreen/>

    const handleChange = (idk) => {
        if (idk.type === "main") {
            setIsMainPage(true);
        } else if (idk.type === "server") {
            setIsMainPage(false);
        }
    }

    useMemo(() => {
        const logout = () => {
            // navigate('/login');
        }
        onUnLoggined(logout, logout);
    }, []);


    return (

        <div className={"app-page"}>

            <div className={"app-name"}>
                <p className={"p-2 m-0"} style={{fontFamily: "Buroek"}}>DIALOGIX</p>
            </div>

            <div className={"app-main-page m-0 p-0"}>

                <ServerList onClick={handleChange}/>

                {content}

            </div>


        </div>
    );
};

export default AppPage;