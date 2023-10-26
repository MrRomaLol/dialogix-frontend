import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import {
    CardContainer,
    FriendCardBack,
    FriendCardBorder,
    FriendCardContainer,
    FriendCardIconsContainer
} from "./FriendCardStyledParts";

const FriendSentCardIconsContainer = styled(FriendCardIconsContainer)`
  justify-content: center;
`

const FriendCard = ({nick}) => {
    return (
        <CardContainer>
            <FriendCardBack>
                <FriendSentCardIconsContainer>
                    <FontAwesomeIcon icon={faXmark}
                                     style={{
                                         color: "#B13470",
                                         fontSize: "28px"
                                     }}/>
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

export default FriendCard;