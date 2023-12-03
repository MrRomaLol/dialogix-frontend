import React, {useEffect, useMemo, useState} from 'react';
import ModalComponent from "./ModalComponent";
import ContentContainer from "../ContentContainer";
import {ModalContent, ModalName, ModalSubName} from "./ModalParts";
import styled, {css} from "styled-components";
import {useSelector} from "react-redux";
import CutButton from "../UIElements/CutButton";
import FriendAvatar from "../FriendAvatar";

const FullScreenContainer = styled(ContentContainer)`
  width: 100%;
  height: 100%;
`

const UsersScrollBox = styled.div`
  width: 100%;
  max-height: 350px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`

const InviteButtonBack = styled.p`
  text-align: center;
  width: 76px;
  transition-duration: 200ms;
  color: white;
  font-family: "JetBrains Mono", serif;
  user-select: none;
  padding: 10px;
  border: 2px #6F2DA8 solid;

  ${({isInvited}) => isInvited && css`
    background-color: #6F2DA8;
  `}
`

const UserBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 75px;
  width: 100%;
  margin-bottom: 10px;
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 10px;
  transition-duration: 200ms;
  cursor: pointer;

  ${({isInvited}) => isInvited && css`
    background-color: rgba(188, 44, 201, 0.3);
    cursor: default;
  `}
  &:hover {
    ${({isInvited}) => !isInvited && css`
      background-color: rgba(188, 44, 201, 0.1);
    `}
  }

  &:hover ${InviteButtonBack} {
    background-color: #6F2DA8;
  }
`

const Avatar = styled(FriendAvatar)`
  height: 65px;
  width: 65px;
`

const Nickname = styled.p`
  margin-left: 10px;
  color: white;
  font-family: "JetBrains Mono", serif;
`

const InviteButton = ({isInvited}) => {
    return (
        <InviteButtonBack isInvited={isInvited}>{isInvited ? "Invited" : "Invite"}</InviteButtonBack>
    )
}

const User = ({id, url, nickname, isInvited, onClick}) => {
    return (
        <UserBox isInvited={isInvited} onClick={() => onClick?.(id)}>
            <div style={{display: "inherit", alignItems: "inherit"}}>
                <Avatar id={id} url={url} nick={nickname}/>
                <Nickname>{nickname}</Nickname>
            </div>
            <InviteButton isInvited={isInvited}/>
        </UserBox>
    )
}

const InviteToGuildModal = ({isOpen, onRequestClose}) => {
    const {guilds, currentGuildId} = useSelector(state => state.guilds);
    const {friends} = useSelector(state => state.friends);
    const [invited, setInvited] = useState([]);

    const currentGuild = useMemo(() => {
        const guildIndex = guilds.findIndex(item => item.id === currentGuildId);
        return guilds[guildIndex];
    }, [guilds, currentGuildId]);

    const handleInvite = (id) => {
        const index = invited.indexOf(id);

        if (index !== -1) {
            const newArr = [...invited.slice(0, index), ...invited.slice(index + 1)];
            setInvited(newArr);
        } else {
            const newArr = [...invited, id];
            setInvited(newArr);
        }
    }

    useEffect(() => {
        if (!isOpen) setInvited([]);
    }, [isOpen]);

    return (
        <ModalComponent contentStyle={{width: "600px"}} isOpen={isOpen} onRequestClose={onRequestClose}>
            <FullScreenContainer>
                <ModalContent>
                    <ModalName style={{marginBottom: "15px"}}>Invite users to {currentGuild.name}</ModalName>
                    <UsersScrollBox className={'scroll-bar'}>
                        {friends.length === 0 && <ModalSubName style={{width: "100%", textAlign: "center"}}>You have no friends(</ModalSubName>}
                        {friends.map(friend => (
                            <User key={friend.id} id={friend.id} url={friend.avatar_url} nickname={friend.nickname}
                                  onClick={handleInvite} isInvited={invited.includes(friend.id)}/>))}
                    </UsersScrollBox>
                    <CutButton style={{marginTop: "15px"}}>Send</CutButton>
                </ModalContent>
            </FullScreenContainer>
        </ModalComponent>
    );
};

export default InviteToGuildModal;