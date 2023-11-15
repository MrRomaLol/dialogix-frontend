import store from "../store";
import {addMessage, setChatTyping} from "../store/chatSlice";
import {socket} from "./index";
import {notificationPM} from "../utils/notifications";

let typingTimeouts = {};
socket.on('private-message-typing', (userId) => {
    store.dispatch(setChatTyping({userId, isUserTyping: true}));
    if (typingTimeouts[userId]) {
        clearTimeout(typingTimeouts[userId]);
    }

    typingTimeouts[userId] = setTimeout(() => {
        store.dispatch(setChatTyping({userId, isUserTyping: false}));
        delete typingTimeouts[userId];
    }, 1500);
})

socket.on('new-private-message', (message) => {
    store.dispatch(addMessage({message, chatId: message.sender_id}))
    notificationPM(message);
})