import React from 'react';
import {AppBackground, AppContent} from "../components/styled-parts/AppBackground";
import SmallScreen from "../components/SmallScreen";
import useWindowSize from "../hooks/useWindowSize";
import {useSelector} from "react-redux";
import ElectronHeader from "../components/ElectronHeader";
import {APP_LOADING_STATE, APP_OPENED_STATE, APP_SETTINGS_STATE} from "../store/appStateSlice";
import LoadingScreen from "../appScreens/LoadingScreen";
import AppScreen from "../appScreens/AppScreen";
import SettingsScreen from "../appScreens/SettingsScreen";

const AppPage = () => {
    const size = useWindowSize();
    const appStateName = useSelector(state => state.appState.state)

    let stateComponent;

    switch (appStateName) {
        case APP_LOADING_STATE:
            stateComponent = <LoadingScreen/>
            break;
        case APP_OPENED_STATE:
            stateComponent = <AppScreen/>
            break;
        case APP_SETTINGS_STATE:
            stateComponent = <SettingsScreen/>
            break;
    }

    return (
        <React.Fragment>
            {size.width < 675 ?
                (<SmallScreen/>) :
                (<React.Fragment>
                    <AppBackground/>
                    <AppContent>
                        {window.IS_USING_DIALOGIX_APP && <ElectronHeader/>}
                        {stateComponent}
                    </AppContent>
                </React.Fragment>)}
        </React.Fragment>
    );
};

export default AppPage;