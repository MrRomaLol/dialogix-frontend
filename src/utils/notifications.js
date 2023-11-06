import {playNotificationSound} from "../components/AudioPlayer";

import store from "../store";
import {setNotification} from "../store/friendsSlice";

export const notificationPM = (message) => {
    playNotificationSound();
    const state = store.getState();
    const currentChatId = state.chat.currentChatId;
    if (message.sender_id !== currentChatId) {
        store.dispatch(setNotification({id: message.sender_id, state: true}));
    }
    if (document.hasFocus()) return;
    const friends = state.friends.friends;
    const senderIndex = friends.findIndex(friend => friend.id === message.sender_id);
    const sender = friends[senderIndex];
    new Notification(sender.nickname, {
        body: message.content,
        silent: true,
        icon: "https://cdn.discordapp.com/avatars/481447602425036800/eed0ad6c8e29168190b2d036609cd625.webp"
    })
}
