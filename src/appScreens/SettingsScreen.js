import React, {useEffect} from 'react';
import {ScreenContainer} from "./ScreenContainer";
import styled from "styled-components";
import ContentContainer from "../components/ContentContainer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/free-regular-svg-icons";
import {APP_OPENED_STATE, APP_SETTINGS_STATE, setAppState} from "../store/appStateSlice";
import {useDispatch} from "react-redux";

const Container = styled.div`
  height: 100%;
  width: 100%;

  box-sizing: border-box;

  padding: 20px 40px;
`

const CloseIcon = styled(FontAwesomeIcon)`
  width: 40px;
  height: 40px;

  margin-top: 16px;
  margin-right: 16px;

  position: absolute;
  top: 0;
  right: 0;

  cursor: pointer;

  transition-duration: 200ms;

  color: #9C63C8;

  &:hover {
    color: #754398;
  }

  &:active {
    color: #582c77;
  }
`

const Cont = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
`

const SettingsMenu = styled.div`
  height: 100%;
  width: 100%;
  max-width: 200px;
  padding-left: 50px;
`

const SettingTabsHeader = styled.div`
  color: white;
  font-weight: bold;
  font-family: Furore, serif;
  font-size: 18px;

  padding-top: 20px;
  padding-bottom: 10px;
  
  user-select: none;
`

const SettingTab = styled.div`
  color: white;
  font-family: JetBrains Mono, serif;

  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;

  user-select: none;

  transition-duration: 200ms;
  
  &:hover {
    background-color: rgba(188, 44, 201, 0.1);
  }
`

const SettingTabsSeparator = styled.div`
  background-color: white;
  height: 1px;
  margin: 10px 20px 0;
`

const Settings = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1100px;

  padding-right: 50px;

  background-color: rgba(255, 255, 255, 0.05);
`

const SettingsScreen = () => {
    const dispatch = useDispatch();

    const goToAppState = () => {
        dispatch(setAppState({stateName: APP_OPENED_STATE}))
    }

    const handler = (e) => {
        if (e.isComposing || e.key === 'Escape') {
            goToAppState();
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handler, false);
        return () => window.removeEventListener('keydown', handler, false);
    }, []);

    return (
        <ScreenContainer>
            <Container>
                <ContentContainer>
                        <CloseIcon icon={faCircleXmark} onClick={goToAppState}/>
                    <Cont>
                        <SettingsMenu>
                            <SettingTabsHeader>User Settings</SettingTabsHeader>
                            <SettingTab>Tab1</SettingTab>
                            <SettingTab>Tab2</SettingTab>
                            <SettingTab>Tab3</SettingTab>
                            <SettingTab>Tab4</SettingTab>
                            <SettingTabsSeparator/>

                            <SettingTabsHeader>App Settings</SettingTabsHeader>
                            <SettingTab>Tab1</SettingTab>
                            <SettingTab>Tab2</SettingTab>
                            <SettingTabsSeparator/>

                            <SettingTabsHeader>Another Settings</SettingTabsHeader>
                            <SettingTab>Tab1</SettingTab>
                            <SettingTab>Tab2</SettingTab>
                            <SettingTabsSeparator/>
                        </SettingsMenu>
                        <Settings/>
                    </Cont>
                </ContentContainer>
            </Container>
        </ScreenContainer>
    );
};

export default SettingsScreen;