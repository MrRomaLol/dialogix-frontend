import React, {useMemo} from 'react';
import Draggable from "react-draggable";
import ContentContainer from "../ContentContainer";
import styled, {keyframes} from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPhoneSlash, faPhoneVolume} from "@fortawesome/free-solid-svg-icons";

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
  padding-top: 30px;
  padding-right: 40px;
  padding-left: 40px;
  padding-bottom: 30px;
`

const Ava = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: white;
  margin-bottom: 20px;
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

const CallModal = () => {
    const initialPosition = useMemo(() => {
        return {
            x: (window.innerWidth - 350) / 2,
            y: (window.innerHeight - 350) / 2,
        }
    }, [])

    return (
        <Draggable bounds={"parent"} defaultPosition={initialPosition}>
            <div style={{width: "320px", height: "350px"}}>
                <CallContainer backgroundColor={'rgba(32,6,57,0.8)'}>
                    <Inner>
                        <Info>
                            <Ava/>
                            <Calling style={{marginBottom: "15px", fontSize: "20px"}}>12345678901234567890</Calling>
                            <Calling>calling...</Calling>
                        </Info>
                        <CallButtons>
                            <AnswerBack>
                                <AnswerIcon icon={faPhoneVolume}/>
                            </AnswerBack>
                            <HangupBack>
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