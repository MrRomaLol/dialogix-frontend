import React from 'react';
import notificationSound from '../sounds/notifications.mp3';

const AudioPlayer = () => {
    return (
        <audio id={'dx-audio-player'} autoPlay={false}/>
    );
};

export const playNotificationSound = () => {
    const audioRef = document.getElementById('dx-audio-player');
    if (audioRef) {
        audioRef.src = notificationSound;
        audioRef.play();
    }
};

export default AudioPlayer;