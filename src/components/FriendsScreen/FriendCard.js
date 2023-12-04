import React from 'react';
import {faSliders} from "@fortawesome/free-solid-svg-icons";
import {
    FriendCardBack,
    FriendCardBorder,
    CardContainer,
    FriendCardContainer,
    FriendCardIcon
} from "./FriendCardStyledParts";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {deleteFriend, setNotification} from "../../store/friendsSlice";
import StatusIndicator from "../StatusIndicator";
import Avatar from "../FriendAvatar";
import {setChat} from "../../store/chatSlice";
import {DIRECT_MESSAGES_SCREEN, setScreen} from "../../store/screenStateSlice";
import {Item, Menu, useContextMenu} from "react-contexify";
import {useTranslation} from "react-i18next";

const SettingsIcon = styled(FriendCardIcon)`
  color: #C087D4;
  margin-right: 10px;
  margin-top: 10px;

  &:hover {
    color: #905fa1;
  }
`

const Status = styled(StatusIndicator)`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 20px;
  height: 20px;
`

export const FriendCardAvatar = styled(Avatar)`
  height: 72px;
  width: 72px;
  margin-left: 10px;
  margin-right: 10px;
`

const FriendCard = ({nick, id, avatarUrl, status}) => {
    const dispatch = useDispatch();
    const [ t, i18n ] = useTranslation();

    const ID = "create";

    const {show} = useContextMenu({
        id: ID,
    });

    const showContextMenu = (event) => {
        event.stopPropagation();
        show({
            event,
            props: {
                key: 'value'
            }
        })
    }

    const handleDeleteFriend = () => {
        dispatch(deleteFriend({id}))
    }

    const handleOpenChat = () => {
        dispatch(setChat({chatId: id}));
        dispatch(setScreen({screenName: DIRECT_MESSAGES_SCREEN}));
        dispatch(setNotification({id, state: false}));
    }


    return (
        <>
            <CardContainer onClick={handleOpenChat}>
                <FriendCardBack>
                    <FriendCardContainer>
                        <FriendCardAvatar id={id} nick={nick} url={avatarUrl}>
                            <Status status={status}/>
                        </FriendCardAvatar>
                        {nick}
                    </FriendCardContainer>
                    <SettingsIcon icon={faSliders} onClick={showContextMenu}/>
                </FriendCardBack>
                <FriendCardBorder/>
            </CardContainer>
            <Menu id={ID} animation={'fade'}>
                <Item style={{color: 'red'}} id="removeFriend" onClick={handleDeleteFriend}><div style={{color: "#B13470"}}>{t("friendCard.remFriend")}</div></Item>
            </Menu>
        </>
    )
};

export default FriendCard;