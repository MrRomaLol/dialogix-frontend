import React, {useEffect, useMemo} from 'react';
import Draggable from "react-draggable";
import ContentContainer from "../ContentContainer";
import styled, {keyframes} from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPhoneSlash, faPhoneVolume} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {
    acceptPrivateCall,
    cancelPrivateCall,
    setCallingState
} from "../../store/diallerSlice";
import useSound from "use-sound";
import FriendAvatar from "../FriendAvatar";
import call from "../../sounds/call.mp3"
import {socket} from "../../socket";
import {useTranslation} from "react-i18next";

const CallContainer = styled(ContentContainer)`
  width: 100%;
  height: 100%;
`

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 30px 40px;
`

const Calling = styled.p`
  font-family: "JetBrains Mono", serif;
  color: white;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`

const CallButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const ButtonBack = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  cursor: pointer;
  transition-duration: 200ms;
`

const ButtonsIcon = styled(FontAwesomeIcon)`
  width: 36px;
  height: 36px;
  color: white;
`

const RotateAnswer = keyframes`
  0% {
    transform: translate(0);
  }

  10% {
    transform: translate(-2px, -2px);
  }

  20% {
    transform: translate(2px, -2px);
  }

  30% {
    transform: translate(-2px, 2px);
  }

  40% {
    transform: translate(2px, 2px);
  }

  50% {
    transform: translate(-2px, -2px);
  }

  60% {
    transform: translate(2px, -2px);
  }

  70% {
    transform: translate(-2px, 2px);
  }

  80% {
    transform: translate(-2px, -2px);
  }

  90% {
    transform: translate(2px, -2px);
  }

  100% {
    transform: translate(0);
  }
`

const AnswerIcon = styled(ButtonsIcon)`
  animation: ${RotateAnswer} 1.5s ease 0s infinite normal forwards;
`

const AnswerBack = styled(ButtonBack)`
  background-color: #6F2DA8;

  &:hover {
    background-color: #561a85;
  }
`

const HangupBack = styled(ButtonBack)`
  background-color: #B13470;

  &:hover {
    background-color: #881b50;
  }
`

const CallingAvatar = styled(FriendAvatar)`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 20px;
`

const CallModal = ({callerId}) => {
    const dispatch = useDispatch();
    const [ t, i18n ] = useTranslation();
    const {callers} = useSelector(state => state.dialler);
    const {friends} = useSelector(state => state.friends);

    const [play, {stop, duration}] = useSound(call, {loop: true});

    const callingUser = useMemo(() => {
        return friends.find(friend => friend.id === callerId);
    }, [callerId]);

    const handleAcceptCall = () => {
        // if (isCurrentlyInCall) {
        //     dispatch(endPrivateCall()).then(() => {
        //         dispatch(acceptPrivateCall());
        //     });
        // } else {
            dispatch(acceptPrivateCall({callerId}));
        // }
    }

    const handleCancelCall = () => {
        dispatch(cancelPrivateCall({callerId}));
    }

    const initialPosition = useMemo(() => {
        return {
            x: (window.innerWidth - 350) / 2,
            y: (window.innerHeight - 350) / 2,
        }
    }, [])

    useEffect(() => {
        if (duration && callers.length === 1) {
            play();
        }
        return () => {
            if (duration) {
                stop();
            }
        }
    }, [duration]);

    useEffect(() => {
        socket.on('private-call-ended', () => {
            // dispatch(setCallingState({isMeTryingToCall: false, isCallAccepted: false, isCurrentlyInCall: false}));
            // dispatch(setCalling({isCalling: false, callingId: null, callerSignal: null}));
            // TODO close modal on call end
        })

        return () => {
            socket.off('private-call-ended')
        }
    }, []);

    return (
        <Draggable bounds={"parent"} defaultPosition={initialPosition}>
            <div style={{width: "320px", height: "350px"}}>
                <CallContainer backgroundColor={'rgba(32,6,57,0.8)'}>
                    <Inner>
                        <Info>
                            <CallingAvatar id={callingUser.id} nick={callingUser.nickname}
                                           url={callingUser.avatar_url}/>
                            <Calling style={{marginBottom: "15px", fontSize: "20px"}}>{callingUser.nickname}</Calling>
                            <Calling>{t("callModal.calling")}</Calling>
                        </Info>
                        <CallButtons>
                            <AnswerBack onClick={handleAcceptCall}>
                                <AnswerIcon icon={faPhoneVolume}/>
                            </AnswerBack>
                            <HangupBack onClick={handleCancelCall}>
                                <ButtonsIcon icon={faPhoneSlash}/>
                            </HangupBack>
                        </CallButtons>
                    </Inner>
                </CallContainer>
            </div>
        </Draggable>
    );
};

export default CallModal;