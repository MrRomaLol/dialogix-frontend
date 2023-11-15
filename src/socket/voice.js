import store from "../store";
import {socket} from "./index";
import {setCalling} from "../store/diallerSlice";

socket.on('private-calling', ({id, signal}) => {
    store.dispatch(setCalling({
        isCalling: true,
        callingId: id,
        callerSignal: signal,
    }))
})