import React from 'react';

const StreamPlayer = () => {
    return (
        <audio id={'dx-stream-player'} autoPlay playsInline/>
    );
};

export const addStreamToPlayer = (stream) => {
    const audioRef = document.getElementById('dx-stream-player');
    if (audioRef) {
        audioRef.srcObject = stream;
    }
};

export const updateStreamMute = (isMuted) => {
    const audioRef = document.getElementById('dx-stream-player');
    if (audioRef) {
        audioRef.volume = isMuted ? 0 : 1;
    }
};

export default StreamPlayer;