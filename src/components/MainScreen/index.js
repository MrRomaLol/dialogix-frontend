import React, {useEffect, useState} from 'react';
import ContentContainer from "../ContentContainer";
import styled from "styled-components";
import Peer from "simple-peer";
import {useSelector} from "react-redux";
import {socket} from "../../socket";

const FullscreenContainer = styled(ContentContainer)`
  width: 100%;
  height: 100%;
`

const Message = styled.div`
  width: 100%;
  height: 100%;

  display: flex;

  align-items: center;
  justify-content: center;

  color: white;
  font-size: 30px;
`

const MainScreen = () => {
    // const {userInfo} = useSelector(state => state.auth);
    //
    // const [stream, setStream] = useState(null);
    // const [isCalling, setIsCalling] = useState(false);
    // const [callerSignal, setCallerSignal] = useState();
    // const [callAccepted, setCallAccepted] = useState(false);
    //
    // useEffect(() => {
    //     navigator.mediaDevices.getUserMedia({video: false, audio: true}).then(stream => {
    //         setStream(stream)
    //     });
    //
    //     socket.on('calling', data => {
    //         setIsCalling(true);
    //         setCallerSignal(data.signalData);
    //     })
    // }, [])
    //
    // const call = () => {
    //     const peer = new Peer({
    //         key: userInfo.id,
    //         initiator: true,
    //         trickle: false,
    //         stream
    //     })
    //
    //     peer.on('error', err => console.log('error', err))
    //
    //     peer.on("signal", (data) => {
    //         console.log("sending call request");
    //         socket.emit("call-user", {
    //             userToCall: 2,
    //             signalData: data,
    //             from: userInfo.id
    //         });
    //     });
    //
    //     peer.on('stream', stream => {
    //
    //     })
    //
    //     socket.on('callAccepted', signal => {
    //         setCallAccepted(true);
    //         peer.signal(signal);
    //     })
    // }
    //
    // const accept = () => {
    //     setCallAccepted(true);
    //     const peer = new Peer({
    //         initiator: false,
    //         trickle: false,
    //         stream: stream
    //     })
    //
    //     peer.on('signal', data => {
    //         socket.emit("acceptCall", {signalData: data, to: 1});
    //     })
    //
    //     peer.on('stream', stream => {
    //
    //     })
    //
    //     peer.signal(callerSignal);
    // }

    return (
        <FullscreenContainer>
            {/*<button onClick={call}>call</button>*/}
            {/*{isCalling && <div>*/}
            {/*    calling*/}
            {/*    <button onClick={accept}>Answer</button>*/}
            {/*</div>}*/}
            {/*{callAccepted && <div>*/}
            {/*    ACCEPTED*/}
            {/*    <button>gjmtjimrgjtmgnjtrhmnr</button>*/}
            {/*</div>}*/}
            <Message>Choose chat to make something wonderful!</Message>
        </FullscreenContainer>
    );
};

export default MainScreen;