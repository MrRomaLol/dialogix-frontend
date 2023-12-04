import React, {useEffect, useMemo, useRef, useState} from 'react';
import InputChatBox from "./InputChatBox";
import ContentContainer from "../ContentContainer";
import MyMessage from "./MyMessage";
import MemberMessage from "./MemberMessage";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {SkeletonTheme} from 'react-loading-skeleton'
import MyMessagePlaceholder from "./MyMessagePlaceholder";
import MemberMessagePlaceholder from "./MemberMessagePlaceholder";
import {getRandomInt} from "../../utils/random";
import {fetchMessages, setChat} from "../../store/chatSlice";
import typingAnimation from "../../animations/typing.json"
import Lottie from "react-lottie-player";
import {useDropzone} from "react-dropzone";
import DnDModal from "../Modals/DnDModal";
import CallingHeader from "./CallingHeader";

const FullScreenContainer = styled(ContentContainer)`
  width: 100%;
  height: 100%;
`

const MessageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column-reverse;

  flex: 1;
  overflow-y: auto;
`

const StyledLabel = styled.label`
  display: flex;
  flex: 1;
  overflow-y: auto;
`

const TypingContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 24px;
  padding-left: 20px;
  box-sizing: border-box;
  color: white;
  font-family: "JetBrains Mono", serif;
`

const ChatRandomPlaceholder = () => {
    const arr = [];
    const size = getRandomInt(3, 6);

    for (let i = 0; i <= size; i++) {
        arr.push(getRandomInt(0, 1));
    }

    return (
        <SkeletonTheme baseColor="#79418E" highlightColor="#9c61b2">
            {arr.map((obj, idx) => (obj === 0 ?
                <MyMessagePlaceholder key={idx} width={getRandomInt(100, 300)} height={getRandomInt(20, 50)}/> :
                <MemberMessagePlaceholder key={idx} width={getRandomInt(100, 300)} height={getRandomInt(20, 50)}/>))}
        </SkeletonTheme>
    )
}

const ChatPlaceholder = () => {
    return (
        <SkeletonTheme baseColor="#79418E" highlightColor="#9c61b2">
            <MyMessagePlaceholder width={100} height={20}/>
            <MemberMessagePlaceholder width={100} height={20}/>
        </SkeletonTheme>
    )
}

const ChatScreen = () => {
    const dispatch = useDispatch();
    const messagesContainerRef = useRef(null);
    const prevScrollHeight = useRef(0);
    const inputRef = useRef(null);
    const {chats, currentChatId, loading} = useSelector(state => state.chat);
    const {friends} = useSelector(state => state.friends);
    const {userInfo} = useSelector(state => state.auth);
    const currentChat = chats[currentChatId];
    const {isCurrentlyInCall, isCallAccepted, callingId} = useSelector(state => state.dialler);

    const friend = useMemo(() => {
        const friendIndex = friends.findIndex(item => item.id === currentChatId);
        return friends[friendIndex];
    }, [friends, currentChatId])


    const loadMoreMessages = () => {
        if (loading) return;
        if (currentChat.isFetched) return;
        dispatch(fetchMessages({chatId: currentChatId}));
    }

    const handleScroll = (e) => {
        const container = e.target;
        const atTop = container.clientHeight - container.scrollTop >= container.scrollHeight - 140;
        prevScrollHeight.current = container.scrollTop;
        if (atTop) loadMoreMessages();
    }

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles) {
            inputRef.current.addFiles(acceptedFiles);
        }
    }

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        multiple: true,
    });

    useEffect(() => {
        messagesContainerRef.current.scrollTop = prevScrollHeight.current;
    }, [currentChat]);

    useEffect(() => {
        if (!currentChat || !currentChat.onceFetched) {
            dispatch(fetchMessages({chatId: currentChatId}));
        }
    }, [dispatch, currentChat, currentChatId]);

    useEffect(() => {
        return () => {
            dispatch(setChat({chatId: null})) //TODO Fix when app state changes not null chatId
        }
    }, [])

    return (
        <FullScreenContainer>
            {(isCurrentlyInCall && callingId === currentChatId) && <CallingHeader
                isAnswered={isCallAccepted}
                me={{
                id: userInfo.id,
                nickname: userInfo.nickname,
                avatarUrl: userInfo.avatar_url
            }} friend={{
                id: friend.id,
                nickname: friend.nickname,
                avatarUrl: friend.avatar_url
            }}/>}
            <StyledLabel {...getRootProps()} onClick={e => e.preventDefault()}>
                <MessageContainer className={"scroll-bar"}
                                  onScroll={handleScroll}
                                  ref={messagesContainerRef}>
                    {currentChat ?
                        <div>
                            {!currentChat.isFetched && <ChatPlaceholder/>}
                            {currentChat.messages.map((message) => (message.sender_id === userInfo.id ?
                                    <MyMessage key={message.id} status={message.status} content={message.content}
                                               timestamp={message.time_stamp} files={message.files}/> :
                                    <MemberMessage key={message.id} content={message.content}
                                                   sender={{
                                                       id: friend.id,
                                                       nickname: friend.nickname,
                                                       avatarUrl: friend.avatar_url
                                                   }}
                                                   timestamp={message.time_stamp} files={message.files}/>
                            ))}
                        </div> : <ChatRandomPlaceholder/>
                    }

                    {isDragActive && <DnDModal/>}
                </MessageContainer>
            </StyledLabel>
            <input {...getInputProps()}/>

            <InputChatBox ref={inputRef}/>

            <TypingContainer>
                {currentChat?.isUserTyping && <>
                    {friend.nickname}
                    <Lottie
                        loop
                        animationData={typingAnimation}
                        play
                        style={{height: 20, marginLeft: 10}}
                    />
                </>}
            </TypingContainer>
        </FullScreenContainer>
    );
};

export default ChatScreen;