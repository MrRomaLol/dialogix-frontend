import React, {useEffect} from 'react';
import styled, {keyframes} from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {APP_OPENED_STATE, setAppState} from "../store/appStateSlice";
import {ScreenContainer} from "./ScreenContainer";
import {getFriends} from "../store/friendsSlice";
import {fetchAllData} from "../store/fetchSlice";
import {setUserStatus} from "../store/authSlice";
import {socket} from "../socket";
import {subToGuilds} from "../socket/guilds";

const Container = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
`

const RotateLogo = keyframes`
  from {
    rotate: 0deg;
  }

  5% {
    rotate: 0deg;
  }

  45% {
    rotate: 180deg;
  }

  55% {
    rotate: 180deg;
  }

  95% {
    rotate: 360deg;
  }

  to {
    rotate: 360deg;
  }
`

const SpinningLogo = styled.div`
  width: 200px;
  height: 200px;
  background: url(img/DialogiX_Logo_NOBG.png) no-repeat center center;
  background-size: 100% 100%;
  filter: invert(100%);

  animation: ${RotateLogo} 2s infinite ease-in-out;
`

const P = styled.p`
  color: white;
  margin-top: 6px;
  margin-bottom: 6px;
`

const PMain = styled(P)`
  font-weight: bold;
  font-family: Furore, serif;
  font-size: 20px;
`

const PSecondary = styled(P)`
  font-family: JetBrains Mono, serif;
`

const LoadingScreen = () => {
    const dispatch = useDispatch();
    const {userInfo} = useSelector(state => state.auth);

    useEffect(() => {
        if (userInfo) {
            socket.connect();

            socket.on('connect', () => {
                socket.emit('my-id', userInfo.id, () => {
                    dispatch(fetchAllData()).unwrap()
                        .then((payload) => {
                            setTimeout(() => {
                                dispatch(setAppState({stateName: APP_OPENED_STATE}));
                            }, 100);
                            const status = payload.user_status.value;

                            dispatch(setUserStatus({status}))

                            subToGuilds();
                        });
                });
            })
        }
    }, [userInfo])


    return (
        <ScreenContainer>
            <Container>
                <SpinningLogo/>
                <PMain>Did you know?</PMain>
                <PSecondary>This project is still in development</PSecondary>
            </Container>
        </ScreenContainer>
    );
};

export default LoadingScreen;