import React, {useEffect, useMemo, useState} from 'react';
import {AppBackground, AppContent} from "../components/styled-parts/AppBackground";
import SmallScreen from "../components/SmallScreen";
import useWindowSize from "../hooks/useWindowSize";
import {useSelector} from "react-redux";
import ElectronHeader from "../components/ElectronHeader";
import {
    APP_LOADING_STATE,
    APP_OPENED_STATE,
    APP_SETTINGS_STATE
} from "../store/appStateSlice";
import LoadingScreen from "../appScreens/LoadingScreen";
import AppScreen from "../appScreens/AppScreen";
import SettingsScreen from "../appScreens/SettingsScreen";
import {useTransition, animated} from 'react-spring';
import {easings} from '@react-spring/web'
import {DisconnectSocket} from "../socket";
import ConnectedFromAnotherPlaceModal from "../components/Modals/ConnectedFromAnotherPlaceModal";
import AudioPlayer from "../components/AudioPlayer";
import CallModal from "../components/Modals/CallModal";
import StreamPlayer from "../components/StreamPlayer";
import useSound from "use-sound";
import beeps from "../sounds/beeps.mp3"
import ConnectionLostModal from "../components/Modals/ConnectionLostModal";

const AppPage = () => {
    const size = useWindowSize();
    const {state, isConnectedFromAnotherPlace, isConnectionLost} = useSelector(state => state.appState);
    const {callers, isMeTryingToCall} = useSelector(state => state.dialler);
    const [play, {stop, duration}] = useSound(beeps, {loop: true})

    const stateComponent = useMemo(() => {
        switch (state) {
            case APP_LOADING_STATE:
                return <LoadingScreen/>;
            case APP_OPENED_STATE:
                return <AppScreen/>;
            case APP_SETTINGS_STATE:
                return <SettingsScreen/>;
            default:
                return null;
        }
    }, [state]);

    const transitions = useTransition(stateComponent, {
        from: {opacity: 0, transform: 'scale(1.3)'},
        enter: {opacity: 1, transform: 'scale(1)'},
        leave: {opacity: 0, transform: 'scale(0.7)'},
        config: {duration: 500, easing: easings.easeInOutBack}
    });

    useEffect(() => {
        if (duration && isMeTryingToCall) {
            play();
        }
        return () => {
            if (duration) {
                stop();
            }
        }
    }, [duration, isMeTryingToCall]);


    // useEffect(() => {
    //     return () => {
    //         DisconnectSocket();
    //     }
    // }, [])

    return (
        <>
            {size.width < 675 ?
                (<SmallScreen/>) :
                (<>
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
                </>)}
            <AudioPlayer/>
            <StreamPlayer/>
            <ConnectedFromAnotherPlaceModal isOpen={isConnectedFromAnotherPlace}/>
            <ConnectionLostModal isOpen={isConnectionLost}/>
            {callers.map((caller) => <CallModal key={caller.id} callerId={caller.id}/>)}
        </>
    );
};

export default AppPage;