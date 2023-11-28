import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {revertAll} from "./index";
import Peer from "simple-peer";
import {socket} from "../socket";
import {addStreamToPlayer, updateStreamMute} from "../components/StreamPlayer";

const initialState = {
    callers: [],
    isCurrentlyInCall: false,
    isMeTryingToCall: false,
    isCallAccepted: false,
    callingId: null,

    isMicrophoneMuted: false,
    isSoundMuted: false,
}

let peer;

export const makePrivateCall = createAsyncThunk(
    'dialler/call',
    async ({userToCall}, {rejectWithValue, getState, dispatch}) => {
        const state = getState();
        const id = state.auth.userInfo.id;

        const isMicMuted = state.dialler.isMicrophoneMuted;

        const isCurrentlyInCall = state.dialler.isCurrentlyInCall;

        if (isCurrentlyInCall) {
            dispatch(endPrivateCall());
            await new Promise(resolve => setTimeout(() => resolve(), 500));
        }

        navigator.mediaDevices
            .getUserMedia({video: false, audio: true})
            .then(stream => {

                dispatch(setCallingState({
                    isCurrentlyInCall: true,
                    isMeTryingToCall: true,
                }))

                stream.getAudioTracks()[0].enabled = !isMicMuted;

                peer = new Peer({
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

                const endConnection = () => {
                    peer.removeAllListeners();
                    peer.destroy();
                }

                socket.on('private-call-accepted', (signal) => {
                    peer.signal(signal);
                    dispatch(setCallingState({isMeTryingToCall: false, isCallAccepted: true}));
                    socket.off('private-call-accepted');
                    socket.off('private-call-canceled');
                })

                socket.on('private-call-canceled', () => {
                    endConnection();
                    dispatch(setCallingState({
                        isMeTryingToCall: false,
                        isCallAccepted: false,
                        isCurrentlyInCall: false,
                        callingId: null,
                    }));
                    socket.off('private-call-accepted');
                    socket.off('private-call-ended');
                    socket.off('private-call-canceled');
                })

                socket.on('private-call-ended', () => {
                    endConnection();
                    dispatch(setCallingState({
                        isMeTryingToCall: false,
                        isCallAccepted: false,
                        isCurrentlyInCall: false,
                        callingId: null,
                    }));
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
    async ({callerId}, {rejectWithValue, getState, dispatch}) => {
        const diallerState = getState().dialler;
        const caller = diallerState.callers.find(obj => obj.id === callerId);
        const callerSignal = caller.signal;

        const isMicMuted = diallerState.isMicrophoneMuted;

        const isCurrentlyInCall = diallerState.isCurrentlyInCall;

        if (isCurrentlyInCall) {
            dispatch(endPrivateCall());
            await new Promise(resolve => setTimeout(() => resolve(), 500));
        }

        navigator.mediaDevices
            .getUserMedia({video: false, audio: true})
            .then(stream => {
                stream.getAudioTracks()[0].enabled = !isMicMuted;

                peer = new Peer({
                    initiator: false,
                    trickle: false,
                    stream: stream
                });

                peer.on("signal", data => {
                    socket.emit("accept-private-call", {signal: data, to: caller.id});
                    dispatch(setCallingState({isCallAccepted: true, isCurrentlyInCall: true, callingId: callerId}));
                });

                peer.on("stream", stream => {
                    addStreamToPlayer(stream);
                });

                peer.signal(callerSignal);

                const endConnection = () => {
                    peer.removeAllListeners();
                    peer.destroy();
                }

                socket.on('private-call-ended', () => {
                    endConnection();
                    dispatch(setCallingState({
                        isMeTryingToCall: false,
                        isCallAccepted: false,
                        isCurrentlyInCall: false
                    }));
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

        return {callerId};
    }
)

export const cancelPrivateCall = createAsyncThunk(
    'dialler/cancelCall',
    async ({callerId}) => {
        socket.emit("cancel-private-call", callerId);
        return {callerId};
    }
)

export const endPrivateCall = createAsyncThunk(
    'dialler/endCall',
    async (_, {rejectWithValue, getState, dispatch}) => {
        const diallerState = getState().dialler;
        const caller = diallerState.callingId;

        peer.removeAllListeners();
        peer.destroy();

        dispatch(setCallingState({isCalling: false, callingId: null, callerSignal: null}));

        socket.emit('end-private-call', caller);

        socket.off('private-call-accepted');
        socket.off('private-call-ended');
        socket.off('private-call-canceled');
    }
)

const diallerSlice = createSlice({
    name: "dialler",
    initialState,
    reducers: {
        addCalling(state, {payload}) {
            state.callers.push(payload);
        },
        setCallingState(state, {payload}) {
            if (payload.isMeTryingToCall !== undefined)
                state.isMeTryingToCall = payload.isMeTryingToCall;
            if (payload.isCallAccepted !== undefined)
                state.isCallAccepted = payload.isCallAccepted;
            if (payload.isCurrentlyInCall !== undefined)
                state.isCurrentlyInCall = payload.isCurrentlyInCall;
            if (payload.callingId !== undefined)
                state.callingId = payload.callingId;
        },
        setMuteState(state, {payload}) {
            state.isMicrophoneMuted = payload.microphoneState;
            state.isSoundMuted = payload.soundState;
            if (peer) {
                peer.streams[0].getAudioTracks()[0].enabled = !payload.microphoneState;
            }
            updateStreamMute(payload.soundState);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(revertAll, () => initialState);
        builder.addCase(makePrivateCall.pending, (state) => {

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
            state.callers = state.callers.filter(obj => obj.id !== payload.callerId);
        })
        builder.addCase(acceptPrivateCall.rejected, (state, {payload}) => {

        })
        builder.addCase(cancelPrivateCall.fulfilled, (state, {payload}) => {
            state.callers = state.callers.filter(obj => obj.id !== payload.callerId);
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

export const {addCalling, setCallingState, setMuteState} = diallerSlice.actions;

export default diallerSlice.reducer;