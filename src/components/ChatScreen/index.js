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

const FullScreenContainer = styled(ContentContainer)`
  width: 100%;
  height: 100%;
`

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;

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
            <MyMessagePlaceholder width={300} height={20}/>
            <MemberMessagePlaceholder width={300} height={20}/>
        </SkeletonTheme>
    )
}

const ChatScreen = () => {
    const dispatch = useDispatch();
    const messagesContainerRef = useRef(null);
    const prevScrollHeight = useRef(0);
    const {chats, currentChatId, loading} = useSelector(state => state.chat);
    const {friends} = useSelector(state => state.friends);
    const {userInfo} = useSelector(state => state.auth);
    const currentChat = chats[currentChatId];

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
            dispatch(setChat({chatId: null}))
        }
    }, [])

    return (
        <FullScreenContainer>

            <MessageContainer className={"scroll-bar"} onScroll={handleScroll} ref={messagesContainerRef}>
                {currentChat ?
                    <div>
                        {!currentChat.isFetched && <ChatPlaceholder/>}
                        {currentChat.messages.map((message, idx) => (message.sender_id === userInfo.id ?
                                <MyMessage key={idx} status={message.status} content={message.content}
                                           timestamp={message.time_stamp}/> :
                                <MemberMessage key={idx} content={message.content} nick={friend.nickname}
                                               timestamp={message.time_stamp}/>
                        ))}
                        <MyMessage status={"sended"} content={"ulala"}
                                   timestamp={"sogodni"} type={"file"}/>
                    </div> : <ChatRandomPlaceholder/>
                }

            </MessageContainer>


            <InputChatBox/>

            <TypingContainer>
                {currentChat?.isUserTyping && <>
                    {friend.nickname} typing
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