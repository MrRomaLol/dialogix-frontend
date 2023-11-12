import {playNotificationSound} from "../components/AudioPlayer";

import store from "../store";
import {setNotification} from "../store/friendsSlice";
import {Store} from "react-notifications-component";

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

    const send = () => {
        new Notification(sender.nickname, {
            body: message.content,
            silent: true,
            icon: `api/v1/cdn/users/${sender.id}/${sender.avatar_url}` //TODO check api
        })
    }

    if (window.IS_USING_DIALOGIX_APP || Notification.permission === "granted") {
        send();
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                send();
            }
        })
    } else {
        Store.addNotification({
            title: sender.nickname,
            type: "info",
            insert: "top",
            container: "bottom-right",
            animationIn: ["animate__animated", "animate__fadeInDown"],
            dismiss: {
                duration: 5000,
                pauseOnHover: true,
            },
            message: message.content //TODO make custom notifications
        });
    }
}
