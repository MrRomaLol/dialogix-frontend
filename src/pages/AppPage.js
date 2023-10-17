import React, {useEffect, useState} from 'react';
import FriendsSideBar from "../components/FriendsSideBar";
import MainContent from "../components/MainContent";
import ServersSideBar from "../components/ServersSideBar";
import Header from "../components/Header";
import {AppBackground, AppContent} from "../components/styled-parts/AppBackground";
import SmallScreen from "../components/SmallScreen";
import ElectronHeader from "../components/ElectronHeader";

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
                        {window.IS_USING_DIALOGIX_APP && <ElectronHeader/>}
                        <div style={{display: "flex", flexDirection: "row", flex: 1}}>
                            <FriendsSideBar/>
                            <Header/>
                            <MainContent/>
                            <ServersSideBar/>
                        </div>
                    </AppContent>
                </React.Fragment>)}
        </React.Fragment>
    );
};

export default AppPage;