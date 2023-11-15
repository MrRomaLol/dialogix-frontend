import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {revertAll} from "./index";
import Peer from "simple-peer";
import {socket} from "../socket";
import {addStreamToPlayer} from "../components/StreamPlayer";

const initialState = {
    isMeTryingToCall: false,
    isCalling: false,
    isCallAccepted: false,
    callingId: null,
    callerSignal: null,
    stream: null,
}

export const makePrivateCall = createAsyncThunk(
    'dialler/call',
    async ({userToCall}, {rejectWithValue, getState, dispatch}) => {
        const id = getState().auth.userInfo.id;

        navigator.mediaDevices
            .getUserMedia({video: false, audio: true})
            .then(stream => {
                const peer = new Peer({
                    key: id,
                    initiator: true,
                    trickle: false,
                    stream,
                })

                peer.on("signal", data => {
                    socket.emit("private-call-user", {
                        userToCall,
                        signalData: data,
                    });
                });

                socket.on('private-call-accepted', (signal) => {
                    peer.signal(signal);
                })

                peer.on("stream", stream => {
                    addStreamToPlayer(stream);
                });
            })
            .catch(err => {
                if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                    rejectWithValue({error: 'userDeny'});
                } else {
                    rejectWithValue({error: 'filed'});
                }
            })
    }
)

export const acceptPrivateCall = createAsyncThunk(
    'dialler/acceptCall',
    async (_, {rejectWithValue, getState, dispatch}) => {
        const diallerState = getState().dialler;
        const caller = diallerState.callingId;
        const callerSignal = diallerState.callerSignal;

        navigator.mediaDevices
            .getUserMedia({video: false, audio: true})
            .then(stream => {
                const peer = new Peer({
                    initiator: false,
                    trickle: false,
                    stream: stream
                });

                peer.on("signal", data => {
                    socket.emit("accept-private-call", {signal: data, to: caller});
                });

                peer.on("stream", stream => {
                    addStreamToPlayer(stream);
                });

                peer.signal(callerSignal);
            })
            .catch(err => {
                if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                    rejectWithValue({error: 'userDeny'});
                } else {
                    rejectWithValue({error: 'filed'});
                }
            })
    }
)

const diallerSlice = createSlice({
    name: "dialler",
    initialState,
    reducers: {
        setCalling(state, {payload}) {
            state.isCalling = payload.isCalling;
            state.callingId = payload.callingId;
            state.callerSignal = payload.callerSignal;
        },
        setStream(state, {payload}) {
            state.stream = payload.stream;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(revertAll, () => initialState);
        builder.addCase(makePrivateCall.pending, (state) => {
            state.isMeTryingToCall = true;
        })
        builder.addCase(makePrivateCall.fulfilled, (state, {payload}) => {

        })
        builder.addCase(makePrivateCall.rejected, (state, {payload}) => {
            state.isMeTryingToCall = false;
        })
        builder.addCase(acceptPrivateCall.pending, (state) => {
            state.isCalling = false;
        })
        builder.addCase(acceptPrivateCall.fulfilled, (state, {payload}) => {
            state.isCallAccepted = true;
        })
        builder.addCase(acceptPrivateCall.rejected, (state, {payload}) => {

        })
    }
})

export const {setCalling, setStream} = diallerSlice.actions;

export default diallerSlice.reducer;