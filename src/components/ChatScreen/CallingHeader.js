import React, {useState} from 'react';
import styled, {css} from "styled-components";
import FriendAvatar from "../FriendAvatar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPhoneSlash} from "@fortawesome/free-solid-svg-icons";
import Lottie from "react-lottie-player";
import waitingCallAnswer from "../../animations/waitingCallAnswer.json";
import {useDispatch} from "react-redux";
import {endPrivateCall} from "../../store/diallerSlice";

const HeaderBack = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-gap: 10px;
  width: 100%;
  height: 100px;
  border-bottom: solid 2px #BC2CC9;
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 10px;

  ${({isAnswered}) => isAnswered && css`
    grid-template-columns: auto 1fr auto;
  `}
`

const CallingAvatars = styled(FriendAvatar)`
  width: 72px;
  height: 72px;
`

const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  align-items: center;
  height: 100%;
  color: white;
  font-family: "JetBrains Mono", serif;
  margin-left: 20px;
  margin-right: 20px;
`

const User = ({user, style}) => {
    return (
        <UserContainer style={style}>
            <CallingAvatars id={user.id} url={user.avatarUrl} nick={user.nickname}>

            </CallingAvatars>
            {user.nickname}
        </UserContainer>
    )
}

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`

const EndCallIcon = styled(FontAwesomeIcon)`
  color: #B13470;
  font-size: 30px;
  cursor: pointer;
  transition-duration: 200ms;
  margin-right: 15px;
  margin-left: 15px;

  &:hover {
    color: #d24c8c;
  }
`

const CallingHeader = ({me, friend, isAnswered}) => {
    const dispatch = useDispatch();

    const handleEndCall = () => {
        dispatch(endPrivateCall());
    }

    return (
        <HeaderBack isAnswered={isAnswered}>
            <User user={friend}/>
            <ButtonContainer style={{order: isAnswered ? "2" : "0"}}>
                <EndCallIcon icon={faPhoneSlash} onClick={handleEndCall}/>
            </ButtonContainer>

            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: isAnswered ? "flex-start" : "flex-end",
                gap: "20px"
            }}>
                {!isAnswered && <Lottie
                    loop
                    animationData={waitingCallAnswer}
                    play
                    style={{height: 20, transform: "scaleX(-1)"}}
                />}
                <User user={me}/>
            </div>
        </HeaderBack>
    );
};

export default CallingHeader;