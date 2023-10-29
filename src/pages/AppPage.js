import React, {useEffect, useMemo} from 'react';
import {AppBackground, AppContent} from "../components/styled-parts/AppBackground";
import SmallScreen from "../components/SmallScreen";
import useWindowSize from "../hooks/useWindowSize";
import {useDispatch, useSelector} from "react-redux";
import ElectronHeader from "../components/ElectronHeader";
import {APP_LOADING_STATE, APP_OPENED_STATE, APP_SETTINGS_STATE} from "../store/appStateSlice";
import LoadingScreen from "../appScreens/LoadingScreen";
import AppScreen from "../appScreens/AppScreen";
import SettingsScreen from "../appScreens/SettingsScreen";
import {useTransition, animated} from 'react-spring';
import {easings} from '@react-spring/web'
import {socket} from "../socket";
import {addPending} from "../store/friendsSlice";

const AppPage = () => {
    const size = useWindowSize();
    const dispatch = useDispatch();
    const {userInfo} = useSelector(state => state.auth);
    const appStateName = useSelector(state => state.appState.state);

    const stateComponent = useMemo(() => {
        switch (appStateName) {
            case APP_LOADING_STATE:
                return <LoadingScreen/>;
            case APP_OPENED_STATE:
                return <AppScreen/>;
            case APP_SETTINGS_STATE:
                return <SettingsScreen/>;
            default:
                return null;
        }
    }, [appStateName]);

    const transitions = useTransition(stateComponent, {
        from: {opacity: 0, transform: 'scale(1.3)'},
        enter: {opacity: 1, transform: 'scale(1)'},
        leave: {opacity: 0, transform: 'scale(0.7)'},
        config: {duration: 500, easing: easings.easeInOutBack}
    });

    useEffect(() => {
        if (userInfo) {
            socket.connect();

            socket.on('connect', () => {
                socket.emit('my-id', userInfo.id);
            })

            socket.on('reconnect', () => {
                socket.emit('my-id', userInfo.id);
            })

            socket.on('new-friend-request', (userData) => {
                dispatch(addPending(userData));
            })
        }

        return () => {
            socket.disconnect();
        }
    }, [userInfo])

    return (
        <React.Fragment>
            {size.width < 675 ?
                (<SmallScreen/>) :
                (<React.Fragment>
                    <AppBackground/>
                    <AppContent>
                        {window.IS_USING_DIALOGIX_APP && <ElectronHeader/>}
                        <div style={{width: "100%", height: "100%", position: "relative"}}>
                            {transitions((props, item) =>
                                item ? (
                                    <animated.div style={{
                                        ...props,
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        display: 'flex',
                                        width: "100%",
                                        height: "100%"
                                    }}>{item}</animated.div>
                                ) : null
                            )}
                        </div>
                    </AppContent>
                </React.Fragment>)}
        </React.Fragment>
    );
};

export default AppPage;