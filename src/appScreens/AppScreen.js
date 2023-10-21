import React from 'react';
import FriendsSideBar from "../components/FriendsSideBar";
import Header from "../components/Header";
import MainContent from "../components/MainContent";
import ServersSideBar from "../components/ServersSideBar";

const AppScreen = () => {
    return (
        <React.Fragment>
            <div style={{display: "flex", flexDirection: "row", flex: 1}}>
                <FriendsSideBar/>
                <Header/>
                <MainContent/>
                <ServersSideBar/>
            </div>
        </React.Fragment>
    );
};

export default AppScreen;