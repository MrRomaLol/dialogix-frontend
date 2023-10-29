import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";
import {
    CardContainer,
    FriendCardBack,
    FriendCardBorder,
    FriendCardContainer, FriendCardIcon,
    FriendCardIconsContainer
} from "./FriendCardStyledParts";
import styled from "styled-components";
import {acceptFriendRequest, rejectFriendRequest, unSendFriendRequest} from "../../store/friendsSlice";
import {useDispatch} from "react-redux";


const CheckIcon = styled(FriendCardIcon)`
  color: #6F2DA8;

  &:hover {
    color: #5e2193;
  }
`

const XIcon = styled(FriendCardIcon)`
  color: #B13470;

  &:hover {
    color: #98255c;
  }
`

const FriendCardPending = ({nick, id}) => {
    const dispatch = useDispatch();

    const handleAccept = () => {
        dispatch(acceptFriendRequest({id}));
    }

    const handleReject = () => {
        dispatch(rejectFriendRequest({id}));
    }

    return (
        <CardContainer>
            <FriendCardBack>
                <FriendCardIconsContainer>
                    <CheckIcon icon={faCheck} onClick={handleAccept}/>
                    <XIcon icon={faXmark} onClick={handleReject}/>
                </FriendCardIconsContainer>
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

export default FriendCardPending;