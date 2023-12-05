import React, {useEffect, useState} from 'react';
import {ScreenContainer} from "./ScreenContainer";
import styled, {css} from "styled-components";
import ContentContainer from "../components/ContentContainer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/free-regular-svg-icons";
import {APP_OPENED_STATE, setAppState} from "../store/appStateSlice";
import {useDispatch, useSelector} from "react-redux";
import SettingsMyAccount from "../components/SettingsTabs/SettingsMyAccount";
import YesNoModal from "../components/Modals/YesNoModal";
import {logoutUser} from "../store/authSlice";
import {revertAll} from "../store";
import {setCurrentGuild} from "../store/guildsSlice";
import {setChat} from "../store/chatSlice";
import SettingsAppearance from "../components/SettingsTabs/SettingsAppearance";
import {useTranslation} from "react-i18next";
import SettingsLanguage from "../components/SettingsTabs/SettingsLanguage";

const FullScreenContainer = styled(ContentContainer)`
  width: 100%;
  height: 100%;
`

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

const SettingsMenuStyle = styled.div`
  height: 100%;
  width: 100%;
  max-width: 250px;
  padding-left: 50px;
  overflow: auto;
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

const SettingTabStyle = styled.div`
  color: white;
  font-family: JetBrains Mono, serif;

  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;

  user-select: none;

  transition-duration: 200ms;

  ${({isActive}) => !isActive && css`
    cursor: pointer;

    &:hover {
      background-color: rgba(188, 44, 201, 0.1);
    }
  `}


  ${({isActive}) => isActive && css`
    font-weight: bold;
    background-color: rgba(255, 255, 255, 0.1);
  `}
`

const SettingTabsSeparator = styled.div`
  background-color: white;
  height: 1px;
  margin: 10px 20px 0;
`

const SettingsStyle = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1100px;

  padding-right: 50px;

  background-color: rgba(255, 255, 255, 0.1);

  overflow: auto;
`

const SettingTab = ({children, onClick, isActive, content}) => (
    <SettingTabStyle onClick={onClick} isActive={isActive}>
        {children}
    </SettingTabStyle>
);

const Settings = ({tabContent}) => {
    return (
        <SettingsStyle className={'scroll-bar'}>
            {tabContent !== null && (
                <div>
                    {tabContent}
                </div>
            )}
        </SettingsStyle>
    )
}

const SettingsMenu = ({children}) => {
    const [activeTab, setActiveTab] = useState(null);
    const [tabContent, setTabContent] = useState(null);

    const handleTabClick = (tabIndex, content) => {
        setActiveTab(tabIndex);
        setTabContent(content);
    };

    return (
        <>
            <SettingsMenuStyle className={'scroll-bar'}>
                {React.Children.map(children, (child, index) => {
                    if (child.type === SettingTab) {
                        if (child.props.onClick) {
                            return child;
                        }
                        const isActive = index === activeTab;
                        return React.cloneElement(child, {
                            onClick: () => handleTabClick(index, child.props.content),
                            isActive,
                        });
                    }
                    return child;
                })}
            </SettingsMenuStyle>
            <Settings tabContent={tabContent}/>
        </>
    );
};


const SettingsScreen = () => {
    const dispatch = useDispatch();
    const [ t, i18n ] = useTranslation();

    const {currentGuildId} = useSelector(state => state.guilds);
    const {currentChatId} = useSelector(state => state.chat);

    const [isLogoutModal, setIsLogoutModal] = useState(false);
    const [guildId] = useState(currentGuildId);
    const [chatId] = useState(currentChatId);

    const handleOpenLogoutModal = () => {
        setIsLogoutModal(true);
    }

    const handleCloseLogoutModal = () => {
        setIsLogoutModal(false);
    }

    const handleLogout = () => {
        handleCloseLogoutModal();
        dispatch(logoutUser()).then(() => {
            dispatch(revertAll());
        })
    }

    const goToAppState = () => {
        if (guildId) {
            dispatch(setCurrentGuild({currentGuildId: guildId}));
        }
        if (chatId) {
            dispatch(setChat({chatId}));
        }
        dispatch(setAppState({stateName: APP_OPENED_STATE}));
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
                <FullScreenContainer>
                    <CloseIcon icon={faCircleXmark} onClick={goToAppState}/>
                    <Cont>
                        <SettingsMenu>
                            <SettingTabsHeader>{t("settScreen.userSett")}</SettingTabsHeader>
                            <SettingTab content={<SettingsMyAccount/>}>{t("settScreen.myAcc")}</SettingTab>
                            <SettingTabsSeparator/>

                            <SettingTabsHeader>{t("settScreen.appSett")}</SettingTabsHeader>
                            <SettingTab content={<SettingsAppearance/>}>{t("settAppearance.appearance")}</SettingTab>
                            <SettingTab content={<SettingsLanguage/>}>Language</SettingTab>{/*TODO: localize*/}

                            <SettingTabsSeparator/>
                            <SettingTab onClick={handleOpenLogoutModal}>{t("settScreen.logout")}</SettingTab>
                        </SettingsMenu>
                    </Cont>
                </FullScreenContainer>
            </Container>
            <YesNoModal isOpen={isLogoutModal} modalName={t("settScreen.logout")} modalSubName={t("settScreen.logoutConf")}
                        firstName={t("misc.no")} secondName={t("misc.yes")} onRequestClose={handleCloseLogoutModal}
                        onFirst={handleCloseLogoutModal} onSecond={handleLogout}/>
        </ScreenContainer>
    );
};

export default SettingsScreen;