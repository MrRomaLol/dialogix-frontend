import React, {useState} from 'react';
import styled from "styled-components";

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

  background-size: cover;
  background-position: center;

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

const ServerBarIcon = ({id, avatarUrl}) => {
    const [isHovered, setIsHovered] = useState(false);

    let notificationHeight;

    if (isHovered) {
        notificationHeight = '40px';
    }

    const handleHover = (isHovered) => {
        setIsHovered(isHovered);
    }

    return (
        <Container>
            <NotificationArea>
                <Notification height={notificationHeight}/>
            </NotificationArea>
            <Icon onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}
                  style={{backgroundImage: `url(api/v1/cdn/guilds/${id}/${avatarUrl})`}}
            />
        </Container>
    );
};

export default ServerBarIcon;