import React, {useState} from 'react';
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {DIRECT_MESSAGES_SCREEN, setScreen} from "../../store/screenStateSlice";
import {setChat} from "../../store/chatSlice";
import AlertIcon from "../AlertIcon";
import {setNotification} from "../../store/friendsSlice";
import {BarsIconFriendGuild} from "./SideIconParts";
import StatusIndicator from "../StatusIndicator";
import VoiceIcon from "../VoiceIcon";

const Container = styled.div`
  display: flex;
  align-items: center;

  margin-top: 10px;
  margin-bottom: 10px;

  width: 100px;
  height: 70px;
`

const NotificationArea = styled.div`
  height: 100%;
  width: 15px;
  display: flex;
  align-items: center;
`

const Notification = styled.div`
  height: ${({height}) => height ? height : 0};
  width: ${({height}) => height ? '5px' : 0};
  transition-duration: 200ms;
  background-color: white;
  opacity: ${({height}) => height ? 1 : 0};
  border-radius: 0 5px 5px 0;
`

const NewMessages = styled(AlertIcon)`
  position: absolute;
  bottom: 0;
  right: 0;
`

const VoiceIconFriend = styled(VoiceIcon)`
  position: absolute;
  top: 0;
  right: 0;
`

const Status = styled(StatusIndicator)`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 20px;
  height: 20px;
`

const FriendIcon = (props) => {
    return (
        props.url ?
            <BarsIconFriendGuild {...props}
                                 style={{backgroundImage: `url(api/v1/cdn/users/${props.id}/${props.url})`}}>
                {props.hasNotification ? <NewMessages/> : <Status status={props.status}/>}
                {props.isInVoice && <VoiceIconFriend/>}
            </BarsIconFriendGuild> :
            <BarsIconFriendGuild {...props}>
                {props.nickname.substring(0, 1)}
                {props.hasNotification ? <NewMessages/> : <Status status={props.status}/>}
                {props.isInVoice && <VoiceIconFriend/>}
            </BarsIconFriendGuild>
    )
}

const FriendBarIcon = ({id, isSelected, hasNotification, status, avatarUrl, nickname, isInVoice}) => {
    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState(false);

    let notificationHeight;

    if (isHovered) {
        notificationHeight = '20px';
    }

    if (isSelected) {
        notificationHeight = '40px';
    }

    const handleHover = (isHovered) => {
        setIsHovered(isHovered);
    }

    const handleClick = () => {
        dispatch(setChat({chatId: id}));
        dispatch(setScreen({screenName: DIRECT_MESSAGES_SCREEN}));

        if (hasNotification) {
            dispatch(setNotification({id, state: false}));
        }
    }

    return (
        <Container>
            <NotificationArea>
                <Notification height={notificationHeight}/>
            </NotificationArea>
            <FriendIcon data-tooltip-id={`friend-tooltip-${id}`}
                        isSelected={isSelected}
                        onClick={handleClick}
                        onMouseEnter={() => handleHover(true)}
                        onMouseLeave={() => handleHover(false)}
                        id={id} url={avatarUrl} nickname={nickname}
                        hasNotification={hasNotification}
                        status={status} isInVoice={isInVoice}/>
        </Container>
    );
};

export default FriendBarIcon;