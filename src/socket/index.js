import {io} from 'socket.io-client';

import store from "../store";
import {getFriends} from "../store/friendsSlice";
import {addMessage, setChatTyping} from "../store/chatSlice";
import {notificationPM} from "../utils/notifications";

export const socket = io('/', {
    autoConnect: false,
});

socket.on('update-friend-list-request', () => {
    store.dispatch(getFriends());
})

socket.on('new-private-message', (message) => {
    store.dispatch(addMessage({message}))
    notificationPM(message);
})

let typingTimeouts = {};
socket.on('private-message-typing', (userId) => {
    store.dispatch(setChatTyping({userId, isUserTyping: true}));
    if (typingTimeouts[userId]) {
        clearTimeout(typingTimeouts[userId]);
    }

    typingTimeouts[userId] = setTimeout(() => {
        store.dispatch(setChatTyping({ userId, isUserTyping: false }));
        delete typingTimeouts[userId];
    }, 1500);
})
