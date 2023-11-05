import React, {useState} from 'react';
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {DIRECT_MESSAGES_SCREEN, setScreen} from "../../store/screenStateSlice";
import {setChat} from "../../store/chatSlice";

const Container = styled.div`
  display: flex;
  align-items: center;

  margin-top: 10px;
  margin-bottom: 10px;

  width: 100px;
  height: 70px;
`

const Icon = styled.div`
  height: 70px;
  width: 70px;
  border-radius: 50%;
  transition-duration: 200ms;
  background-color: white;

  &:hover {
    border-radius: 30%;
  }
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

const FriendBarIcon = ({id}) => {
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
        dispatch(setChat({chatId: id}));
        dispatch(setScreen({screenName: DIRECT_MESSAGES_SCREEN}));
    }

    return (
        <Container>
            <NotificationArea>
                <Notification height={notificationHeight}/>
            </NotificationArea>
            <Icon data-tooltip-id={`friend-tooltip-${id}`}
                  onClick={handleClick}
                  onMouseEnter={() => handleHover(true)}
                  onMouseLeave={() => handleHover(false)}/>
        </Container>
    );
};

export default FriendBarIcon;