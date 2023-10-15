import React, {useEffect, useState} from 'react';
import FriendsSideBar from "../components/FriendsSideBar";
import styled from "styled-components";
import MainContent from "../components/MainContent";
import ServersSideBar from "../components/ServersSideBar";

const AppBackground = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  z-index: 1;
  display: block;
  width: 100%;
  height: 100%;

  background: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(img/AppBG.webp) no-repeat center center fixed;
  background-size: cover;
  filter: blur(5px);
  transform: scale(1.1);
`

const Content = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  
  display: flex;
  flex-direction: row;
`

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
                (<div>
                    <h1>Screen is too small!</h1>
                    <p>Please use a larger screen to view this content.</p>
                </div>) :
                (<React.Fragment>
                    <AppBackground/>
                    <Content>
                        <FriendsSideBar/>
                        <MainContent/>
                        <ServersSideBar/>
                    </Content>
                </React.Fragment>)}
        </React.Fragment>
    );
};

export default AppPage;