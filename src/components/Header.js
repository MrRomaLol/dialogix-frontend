import React, {useMemo} from 'react';
import {HeaderBack, HeaderBorders, LeftRightBars} from "./styled-parts/HeaderBar";
import styled from "styled-components";
import Logotype from "./Logotype";
import {DIRECT_MESSAGES_SCREEN, MAIN_SCREEN, SERVER_SCREEN, setScreen} from "../store/screenStateSlice";
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear, faHeadphones, faMicrophone} from "@fortawesome/free-solid-svg-icons";
import {APP_SETTINGS_STATE, setAppState} from "../store/appStateSlice";
import {IconFriendGuild} from "./Bars/SideIconParts";
import StatusIndicator from "./StatusIndicator";
import {Tooltip} from "react-tooltip";
import StatusSelect from "./StatusSelect";
import {setUserStatus} from "../store/authSlice";
import {updateUserSetting} from "../store/fetchSlice";
import {setMuteState} from "../store/diallerSlice";

const EobaniyBlyr = styled.span`
  position: fixed;
  left: 0;
  right: 0;
  margin-left: 120px;
  margin-right: 120px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  filter: drop-shadow(rgba(255, 0, 245, 0.8) 0px 20px 40px);
`

const Container = styled.div`
  position: relative;
`

const ContainerLR = styled(Container)`
  width: 100%;
  max-width: 300px;
`

const LeftBorder = styled(HeaderBorders)`
  width: 100%;
  clip-path: polygon(2px 0, 2px calc(100% - 18px), 20px calc(100% - 2px), 100% calc(100% - 2px),
  100% 100%, 20px 100%, 0px calc(100% - 18px), 0 0);
`

const CenterBorder = styled(HeaderBorders)`
  width: 400px;
  height: 100px;

  clip-path: polygon(0 calc(50% - 2px), 0 calc(100% - 18px), 20px 100%, calc(100% - 20px) 100%, 100% calc(100% - 18px), 100% calc(50% - 2px),
  calc(100% - 2px) calc(50% - 2px), calc(100% - 2px) calc(100% - 18px), calc(100% - 20px) calc(100% - 2px), 20px calc(100% - 2px), 2px calc(100% - 18px), 2px calc(50% - 2px));
`

const RightBorder = styled(HeaderBorders)`
  width: 100%;
  clip-path: polygon(100% 0, 100% calc(100% - 18px), calc(100% - 20px) 100%, 0 100px,
  0 calc(100% - 2px), calc(100% - 20px) calc(100% - 2px), calc(100% - 2px) calc(100% - 18px), calc(100% - 2px) 0);
`

const Left = styled(LeftRightBars)`
  justify-content: flex-end;
  clip-path: polygon(0 0, 0 calc(100% - 18px), 20px 100%, 100% 100%, 100% 0);
`

const Center = styled(HeaderBack)`
  width: 400px;
  height: 100px;
  clip-path: polygon(0 0, 0 calc(100% - 18px), 20px 100%, calc(100% - 20px) 100%, 100% calc(100% - 18px), 100% 0);

  position: relative;

  box-sizing: border-box;

  padding-left: 16px;
  padding-right: 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Right = styled(LeftRightBars)`
  justify-content: space-between;
  clip-path: polygon(0 0, 0 100%, calc(100% - 20px) 100%, 100% calc(100% - 18px), 100% 0);
`

const LogoContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`

const IconsContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: 110px;
  height: 100px;

  box-sizing: border-box;

  padding: 14px 4px 14px 14px;
`

const SettingsContainer = styled(IconsContainer)`
  justify-content: flex-end;
  padding-right: 14px;
`

const SettingIcon = styled(FontAwesomeIcon)`
  height: 100%;
  aspect-ratio: 1;

  color: #9C63C8;

  transition-duration: 2s;

  &:hover {
    rotate: 330deg;
  }
`

const Nickname = styled.p`
  color: #A684DF;
  font-family: "JetBrains Mono", serif;
  font-size: 20px;
`

const MyAvatarIcon = styled(IconFriendGuild)`
  height: 100%;
  width: auto;
  aspect-ratio: 1;
`

const Avatar = ({id, url, nick}) => {
    return (
        url ?
            <MyAvatarIcon style={{backgroundImage: `url(api/v1/cdn/users/${id}/${url})`}}/> :
            <MyAvatarIcon>{nick.substring(0, 1)}</MyAvatarIcon>
    )
}

const HeaderStatusIndicator = styled(StatusIndicator)`
  width: 20px;
  height: 20px;
  transition-duration: 200ms;

  &:hover {
    filter: brightness(75%);
  }
`

const CurrentChat = () => {
    const {screen} = useSelector(state => state.screenState);
    const {currentChatId} = useSelector(state => state.chat);
    const {friends} = useSelector(state => state.friends);
    const {guilds, currentGuildId} = useSelector(state => state.guilds);

    const friend = useMemo(() => {
        const friendIndex = friends.findIndex(item => item.id === currentChatId);
        return friends[friendIndex];
    }, [friends, currentChatId])

    const guild = useMemo(() => {
        const guildIndex = guilds.findIndex(item => item.id === currentGuildId);
        return guilds[guildIndex];
    }, [guilds, currentGuildId])

    const name = useMemo(() => {
        switch (screen) {
            case DIRECT_MESSAGES_SCREEN:
                return friend.nickname;
            case SERVER_SCREEN:
                return guild.name;
            default:
                return 'DialogiX Inc.';
        }


    }, [screen, currentChatId, currentGuildId]);

    return (
        <Nickname>{name}</Nickname>
    )
}

const VoiceControlContainer = styled.div`
  margin-right: 15px;
`

const VoiceControlButtons = styled(FontAwesomeIcon)`
  margin-left: 10px;
  font-size: 22px;
  transition-duration: 200ms;
  cursor: pointer;

  color:${({$isMuted}) => $isMuted ? '#B13470' : 'white'};
  
  &:hover {
    color: ${({$isMuted}) => $isMuted ? '#d2478a' : 'lightgray'};
  }
`

const VoiceControl = () => {
    const dispatch = useDispatch();
    const {isMicrophoneMuted, isSoundMuted} = useSelector(state => state.dialler);

    const handleMuteMic = () => {
        dispatch(setMuteState({
            microphoneState: !isMicrophoneMuted,
            soundState: false,
        }))
    }

    const handleMuteSound = () => {
        dispatch(setMuteState({
            microphoneState: true,
            soundState: !isSoundMuted,
        }))
    }

    return (
        <VoiceControlContainer>
            <VoiceControlButtons icon={faMicrophone} onClick={handleMuteMic} $isMuted={isMicrophoneMuted}/>
            <VoiceControlButtons icon={faHeadphones} onClick={handleMuteSound} $isMuted={isSoundMuted}/>
        </VoiceControlContainer>
    )
}

const Header = () => {
    const {userInfo, loading} = useSelector((state) => state.auth);
    const userStatusSetting = useSelector((state) => state.fetchRoot.settings.user_status);
    const dispatch = useDispatch();

    const handleChangeStatus = (status) => {
        dispatch(setUserStatus({status}));
        dispatch(updateUserSetting({settingName: "user_status", id: userStatusSetting.id, settingValue: status}))
    }

    const goToMainScreen = () => {
        dispatch(setScreen({screenName: MAIN_SCREEN}))
    }

    const goToSettingsState = () => {
        dispatch(setAppState({stateName: APP_SETTINGS_STATE}))
    }

    return (
        <>
            <EobaniyBlyr>
                <ContainerLR>
                    <Left>
                        <CurrentChat/>
                    </Left>
                    <LeftBorder/>
                </ContainerLR>

                <Container>
                    <Center>
                        <SettingsContainer>
                            <SettingIcon icon={faGear} onClick={goToSettingsState}/>
                        </SettingsContainer>
                        <IconsContainer>
                            <Avatar id={userInfo.id} url={userInfo.avatar_url} nick={userInfo.nickname}/>
                            <HeaderStatusIndicator data-tooltip-id="change-status-menu" status={userInfo.status}/>
                        </IconsContainer>
                    </Center>
                    <CenterBorder/>
                </Container>

                <ContainerLR>
                    <Right>
                        <Nickname>{userInfo.nickname}</Nickname>
                        <VoiceControl/>
                    </Right>
                    <RightBorder/>
                </ContainerLR>
            </EobaniyBlyr>
            <LogoContainer>
                <Logotype onClick={goToMainScreen}/>
            </LogoContainer>
            <Tooltip id="change-status-menu" place={'bottom'} openOnClick clickable>
                <StatusSelect onChange={handleChangeStatus} currentStatus={userInfo.status} isStatusLoading={loading}/>
            </Tooltip>
        </>
    );
};

export default Header;