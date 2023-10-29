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

const FriendSentCardIconsContainer = styled(FriendCardIconsContainer)`
  justify-content: center;
`

const XIcon = styled(FriendCardIcon)`
  color: #B13470;

  &:hover {
    color: #98255c;
  }
`

const FriendCardSent = ({nick, id}) => {
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
                    <div style={{
                        width: "72px",
                        height: "72px",
                        borderRadius: "50%",
                        backgroundColor: "gray",
                        marginRight: "10px",
                        marginLeft: "10px"
                    }}>
                    </div>
                    {nick}
                </FriendCardContainer>
            </FriendCardBack>
            <FriendCardBorder/>
        </CardContainer>
    )
};

export default FriendCardSent;