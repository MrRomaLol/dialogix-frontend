import {io} from 'socket.io-client';

import store from "../store";
import {getFriends} from "../store/friendsSlice";
import {addMessage} from "../store/chatSlice";
import {notificationPM} from "../utils/notifications";

const state = store.getState();

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
