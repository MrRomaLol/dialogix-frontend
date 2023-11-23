import store from "../store";
import {socket} from "./index";
import {addCalling} from "../store/diallerSlice";

socket.on('private-calling', ({id, signal}) => {
    store.dispatch(addCalling({
        id, signal,
    }))
})