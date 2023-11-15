import React from 'react';
import styled from "styled-components";

const Video = styled.video`
  position: absolute;
  top: 0;
  left: 0;
`

const StreamPlayer = () => {
    return (
        <Video width="300" height="100" controls id={'dx-stream-player'} autoPlay playsInline/>
    );
};

export const addStreamToPlayer = (stream) => {
    const audioRef = document.getElementById('dx-stream-player');
    if (audioRef) {
        console.log(stream);
        audioRef.srcObject = stream;
    }
};

export default StreamPlayer;