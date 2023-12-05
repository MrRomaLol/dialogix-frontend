import React from 'react';
import styled from "styled-components";
import FriendAvatar from "../FriendAvatar";
import StatusIndicator from "../StatusIndicator";

const GuildUserBack = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;

`

const GuildUserAvatar = styled(FriendAvatar)`
  height: 50px;
  width: 50px;
  margin-right: 10px;
`

const Status = styled(StatusIndicator)`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 14px;
  height: 14px;
`

const GuildUserName = styled.p`
  font-family: "JetBrains Mono", serif;
  color: ${({isOffline}) => isOffline ? 'gray' : 'white'};
`

const GuildUser = ({guildUserId, nickname, id, status, avatarUrl, onContextMenu}) => {
    const contextMenu = (e) => {
        onContextMenu?.({event: e, id, guildUserId, nickname});
    }

    return (
        <GuildUserBack onContextMenu={contextMenu}>
            <GuildUserAvatar id={id} url={avatarUrl} nick={nickname}>
                <Status status={status}/>
            </GuildUserAvatar>
            <GuildUserName isOffline={status === 'offline'}>{nickname}</GuildUserName>
        </GuildUserBack>
    );
};

export default GuildUser;