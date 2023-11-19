import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {revertAll} from "./index";
import Peer from "simple-peer";
import {socket} from "../socket";
import {addStreamToPlayer} from "../components/StreamPlayer";

const initialState = {
    isCurrentlyInCall: false,
    isMeTryingToCall: false,
    isCalling: false,
    isCallAccepted: false,
    callingId: null,
    callerSignal: null,
}

export const makePrivateCall = createAsyncThunk(
    'dialler/call',
    async ({userToCall}, {rejectWithValue, getState, dispatch}) => {
        const state = getState();
        const id = state.auth.userInfo.id;

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
                    dispatch(setCallingState({isMeTryingToCall: false, isCallAccepted: true}));
                    socket.off('private-call-accepted');
                })

                socket.on('private-call-ended', () => {
                    peer.removeAllListeners();
                    peer.destroy();
                    dispatch(setCallingState({
                        isMeTryingToCall: false,
                        isCallAccepted: false,
                        isCurrentlyInCall: false
                    }));
                    dispatch(setCalling({isCalling: false, callingId: null, callerSignal: null}));
                    socket.off('private-call-accepted');
                    socket.off('private-call-ended');
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

        return {calling: userToCall}
    }
)

export const acceptPrivateCall = createAsyncThunk(
    'dialler/acceptCall',
    async (_, {rejectWithValue, getState, dispatch}) => {
        const diallerState = getState().dialler;
        const caller = diallerState.callingId;
        const callerSignal = diallerState.callerSignal;
        const isCurrentlyInCall = diallerState.isCurrentlyInCall;

        if (isCurrentlyInCall) {
            dispatch(endPrivateCall());
        }

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
                    dispatch(setCallingState({isCallAccepted: true, isCurrentlyInCall: true}));
                });

                peer.on("stream", stream => {
                    addStreamToPlayer(stream);
                });

                peer.signal(callerSignal);

                socket.on('private-call-ended', () => {
                    peer.removeAllListeners();
                    peer.destroy();
                    dispatch(setCallingState({
                        isMeTryingToCall: false,
                        isCallAccepted: false,
                        isCurrentlyInCall: false
                    }));
                    dispatch(setCalling({isCalling: false, callingId: null, callerSignal: null}));
                    socket.off('private-call-ended');
                })
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

export const endPrivateCall = createAsyncThunk(
    'dialler/cancelCall',
    async (_, {rejectWithValue, getState}) => {
        const diallerState = getState().dialler;
        const caller = diallerState.callingId;

        socket.emit("end-private-call", caller);
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
        setCallingState(state, {payload}) {
            if (payload.isMeTryingToCall !== undefined)
                state.isMeTryingToCall = payload.isMeTryingToCall;
            if (payload.isCallAccepted !== undefined)
                state.isCallAccepted = payload.isCallAccepted;
            if (payload.isCurrentlyInCall !== undefined)
                state.isCurrentlyInCall = payload.isCurrentlyInCall;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(revertAll, () => initialState);
        builder.addCase(makePrivateCall.pending, (state) => {
            state.isCurrentlyInCall = true;
            state.isMeTryingToCall = true;
        })
        builder.addCase(makePrivateCall.fulfilled, (state, {payload}) => {
            state.callingId = payload.calling;
        })
        builder.addCase(makePrivateCall.rejected, (state, {payload}) => {
            state.isMeTryingToCall = false;
            state.isCurrentlyInCall = false;
        })
        builder.addCase(acceptPrivateCall.pending, (state) => {
            state.isCalling = false;
        })
        builder.addCase(acceptPrivateCall.fulfilled, (state, {payload}) => {
            state.isCallAccepted = true;
        })
        builder.addCase(acceptPrivateCall.rejected, (state, {payload}) => {

        })
        builder.addCase(endPrivateCall.fulfilled, (state, {payload}) => {
            state.isCurrentlyInCall = false;
            state.isMeTryingToCall = false;
            state.isCallAccepted = false;
            state.isCalling = false;
            state.callingId = null;
            state.callerSignal = null;
        })
    }
})

export const {setCalling, setCallingState} = diallerSlice.actions;

export default diallerSlice.reducer;