import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import {
    CardContainer,
    FriendCardBack,
    FriendCardBorder,
    FriendCardContainer, FriendCardIcon,
    FriendCardIconsContainer
} from "./FriendCardStyledParts";
import {useDispatch} from "react-redux";
import {unSendFriendRequest} from "../../store/friendsSlice";
import {FriendCardAvatar} from "./FriendCard";

const FriendSentCardIconsContainer = styled(FriendCardIconsContainer)`
  justify-content: center;
`

const XIcon = styled(FriendCardIcon)`
  color: #B13470;

  &:hover {
    color: #98255c;
  }
`

const FriendCardSent = ({nick, id, avatarUrl}) => {
    const dispatch = useDispatch();

    const handleUnset = () => {
        dispatch(unSendFriendRequest({id}))
    }

    return (
        <CardContainer>
            <FriendCardBack>
                <FriendSentCardIconsContainer>
                    <XIcon icon={faXmark} onClick={handleUnset}/>
                </FriendSentCardIconsContainer>
                <FriendCardContainer>
                    <FriendCardAvatar id={id} nick={nick} url={avatarUrl}/>
                    {nick}
                </FriendCardContainer>
            </FriendCardBack>
            <FriendCardBorder/>
        </CardContainer>
    )
};

export default FriendCardSent;