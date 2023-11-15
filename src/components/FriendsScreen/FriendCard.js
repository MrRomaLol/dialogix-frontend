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
import {deleteFriend} from "../../store/friendsSlice";
import {IconFriendGuild} from "../Bars/SideIconParts";
import StatusIndicator from "../StatusIndicator";

const SettingsIcon = styled(FriendCardIcon)`
  color: #C087D4;
  margin-right: 10px;
  margin-top: 10px;

  &:hover {
    color: #905fa1;
  }
`

const MyAvatarIcon = styled(IconFriendGuild)`
  position: relative;
  height: 72px;
  width: 72px;
  margin-right: 10px;
  margin-left: 10px;
`

export const FriendCardAvatar = ({id, url, nick, children}) => {
    return (
        url ?
            <MyAvatarIcon style={{backgroundImage: `url(api/v1/cdn/users/${id}/${url})`}}>{children}</MyAvatarIcon> :
            <MyAvatarIcon>{nick.substring(0, 1)}{children}</MyAvatarIcon>
    )
}

const Status = styled(StatusIndicator)`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 20px;
  height: 20px;
`

const FriendCard = ({nick, id, avatarUrl, status}) => {
    const dispatch = useDispatch();

    const handleDeleteFriend = () => {
        dispatch(deleteFriend({id}))
    }

    return (
        <CardContainer>
            <FriendCardBack>
                <FriendCardContainer>
                    <FriendCardAvatar id={id} nick={nick} url={avatarUrl}>
                        <Status status={status}/>
                    </FriendCardAvatar>
                    {nick}
                </FriendCardContainer>
                <SettingsIcon icon={faSliders} onClick={handleDeleteFriend}/>
            </FriendCardBack>
            <FriendCardBorder/>
        </CardContainer>
    )
};

export default FriendCard;