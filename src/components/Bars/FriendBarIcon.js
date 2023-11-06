import React, {useState} from 'react';
import styled, {css} from "styled-components";
import {useDispatch} from "react-redux";
import {DIRECT_MESSAGES_SCREEN, setScreen} from "../../store/screenStateSlice";
import {setChat} from "../../store/chatSlice";
import AlertIcon from "../AlertIcon";
import {setNotification} from "../../store/friendsSlice";

const Container = styled.div`
  display: flex;
  align-items: center;

  margin-top: 10px;
  margin-bottom: 10px;

  width: 100px;
  height: 70px;
`

const Icon = styled.div`
  position: relative;
  height: 70px;
  width: 70px;
  border-radius: 50%;
  transition-duration: 200ms;
  background-color: white;

  &:hover {
    border-radius: 30%;
  }

  ${({isSelected}) => isSelected && css`
    border-radius: 30%;
  `}
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

const FriendBarIcon = ({id, isSelected, hasNotification}) => {
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
            <Icon data-tooltip-id={`friend-tooltip-${id}`}
                  isSelected={isSelected}
                  onClick={handleClick}
                  onMouseEnter={() => handleHover(true)}
                  onMouseLeave={() => handleHover(false)}>
                {hasNotification && <NewMessages/>}
            </Icon>
        </Container>
    );
};

export default FriendBarIcon;