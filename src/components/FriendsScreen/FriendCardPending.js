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

const FriendCard = ({nick}) => {
    return (
        <CardContainer>
            <FriendCardBack>
                <FriendCardIconsContainer>
                    <CheckIcon icon={faCheck}/>
                    <XIcon icon={faXmark}/>
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

export default FriendCard;