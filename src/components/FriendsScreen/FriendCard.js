import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
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

const SettingsIcon = styled(FriendCardIcon)`
  color: #C087D4;
  margin-right: 10px;
  margin-top: 10px;

  &:hover {
    color: #905fa1;
  }
`

const FriendCard = ({nick, id}) => {
    const dispatch = useDispatch();

    const handleDeleteFriend = () => {
        dispatch(deleteFriend({id}))
    }

    return (
        <CardContainer>
            <FriendCardBack>
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
                <SettingsIcon icon={faSliders} onClick={handleDeleteFriend}/>
            </FriendCardBack>
            <FriendCardBorder/>
        </CardContainer>
    )
};

export default FriendCard;