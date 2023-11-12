import React, {useState} from 'react';
import styled from "styled-components";
import {Tooltip} from "react-tooltip";
import {useDispatch} from "react-redux";
import {DIRECT_MESSAGES_SCREEN, SERVER_SCREEN, setScreen} from "../../store/screenStateSlice";
import {BarsIconFriendGuild, IconFriendGuild} from "./SideIconParts";

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
  justify-content: end;
`

const Notification = styled.div`
  height: ${({height}) => height ? height : 0};
  width: ${({height}) => height ? '5px' : 0};
  transition-duration: 200ms;
  background-color: white;
  opacity: ${({height}) => height ? 1 : 0};
  border-radius: 5px 0 0 5px;
`

const Icon = styled(BarsIconFriendGuild)`
  margin-left: 15px;
`

const ServerIcon = (props) => {
    return (
        props.url ?
            <Icon {...props} style={{backgroundImage: `url(api/v1/cdn/guilds/${props.id}/${props.url})`}}/> :
            <Icon {...props}>{props.name.substring(0, 1)}</Icon>
    )
}

const ServerBarIcon = ({id, avatarUrl, name}) => {
    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState(false);

    let notificationHeight;

    if (isHovered) {
        notificationHeight = '20px';
    }

    const handleHover = (isHovered) => {
        setIsHovered(isHovered);
    }

    const handleClick = () => {
        dispatch(setScreen({screenName: SERVER_SCREEN}));
    }

    return (
        <Container>
            <ServerIcon data-tooltip-id={`server-tooltip-${id}`}
                        onClick={handleClick}
                        onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}
                        id={id} url={avatarUrl} name={name}/>
            <NotificationArea>
                <Notification height={notificationHeight}/>
            </NotificationArea>
        </Container>
    );
};

export default ServerBarIcon;