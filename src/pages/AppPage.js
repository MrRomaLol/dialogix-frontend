import React, {useEffect, useState} from 'react';
import FriendsSideBar from "../components/FriendsSideBar";
import MainContent from "../components/MainContent";
import ServersSideBar from "../components/ServersSideBar";
import Header from "../components/Header";
import {AppBackground, AppContent} from "../components/styled-parts/AppBackground";
import SmallScreen from "../components/SmallScreen";

const AppPage = () => {
    const [isScreenTooSmall, setIsScreenTooSmall] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsScreenTooSmall(window.innerWidth < 768);
        };

        checkScreenSize();

        window.addEventListener('resize', checkScreenSize);

        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    return (
        <React.Fragment>
            {isScreenTooSmall ?
                (<SmallScreen/>) :
                (<React.Fragment>
                    <AppBackground/>
                    <AppContent>
                        <FriendsSideBar/>
                        <Header/>
                        <MainContent/>
                        <ServersSideBar/>
                    </AppContent>
                </React.Fragment>)}
        </React.Fragment>
    );
};

export default AppPage;