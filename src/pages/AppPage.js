import React, {useMemo, useState} from 'react';
import '../styles/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
import {onUnLoggined} from "../usefull/loginStatus";
import {useTheme} from "../theme";
import Header from "../components/Header";
import FullWindow from "../components/StyledComponents/FullWindow";

const AppPage = () => {
    // const theme = useTheme();
    const navigate = useNavigate();

    useMemo(() => {
        const logout = () => {
            // navigate('/login');
        }
        onUnLoggined(logout, logout);
    }, []);
    
    return <FullWindow>
        <Header></Header>
    </FullWindow>
};


export default AppPage;

// New Design

// style={{backgroundColor: theme.background}}

// <FriendsSideBar/>
//
// <div style={{display: "flex", flexDirection: "column", flex: 1}}>
//
//     <Header/>
//
//     <Chat/>
//
// </div>
//
// <ServerSideBar/>


// {/*LikeDS*/}

// const [isMainPage, setIsMainPage] = useState(true);
//
// let content = isMainPage ? <MainScreen/> : <ServerScreen/>
//
// const handleChange = (idk) => {
//     if (idk.type === "main") {
//         setIsMainPage(true);
//     } else if (idk.type === "server") {
//         setIsMainPage(false);
//     }
// }


// (   <div className={"app-name"} style={{height: "100vh"}}>
//         <p className={"p-2 m-0"} style={{fontFamily: "Buroek"}}>DIALOGIX</p>
//
//         <div className={"app-main-page m-0 p-0"}>
//             <ServerList onClick={handleChange}/>
//
//             {content}
//
//         </div>
//     </div>
// );
