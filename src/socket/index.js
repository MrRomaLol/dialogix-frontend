import {io} from 'socket.io-client';

import store from "../store";
import {getFriends, updateFriendProfile, updateFriendStatus} from "../store/friendsSlice";
import {setConnectionLost, setIsConnectedFromAnotherPlace} from "../store/appStateSlice";

export const socket = io('/', {
    autoConnect: false,
});

socket.on('connect-from-another-place', () => {
    store.dispatch(setIsConnectedFromAnotherPlace());
    DisconnectSocket();
})

socket.on('disconnect', (err) => {
    if (err === 'io client disconnect') return;
    store.dispatch(setConnectionLost({state: true}));
})

socket.on('connect', () => {
    store.dispatch(setConnectionLost({state: false}));
})

socket.on('update-friend-list-request', () => {
    store.dispatch(getFriends());
})

socket.on('profile-update', (data) => {
    store.dispatch(updateFriendProfile(data));
})

socket.on('user-status-update', (data) => {
    store.dispatch(updateFriendStatus(data));
})

require('./chat');
require('./voice');


export const DisconnectSocket = () => {
    socket.disconnect();
    socket.off('connect');
    socket.off('reconnect');
    socket.close();
}
