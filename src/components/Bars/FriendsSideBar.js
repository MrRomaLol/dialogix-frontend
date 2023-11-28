import React, {useEffect, useState} from 'react';
import styled, {css} from "styled-components";
import {BarsBorder, LRBars, ScrollerBar, ScrollerBarBox} from "./LRBars";
import BarButton from "./BarButton";
import {faPlus, faUser} from "@fortawesome/free-solid-svg-icons";
import {IconSeparator} from "./SideIconParts";
import {useDispatch, useSelector} from "react-redux";
import {
    FRIENDS_SCREEN, FRIENDS_SUBSCREEN_ADD_FRIENDS_TAB,
    FRIENDS_SUBSCREEN_FRIENDS_TAB,
    FRIENDS_SUBSCREEN_PENDING_TAB, SERVER_SCREEN,
    setScreen,
    setSubScreen
} from "../../store/screenStateSlice";
import AlertIcon from "../AlertIcon";
import FriendBarIcon from "./FriendBarIcon";
import {Tooltip} from "react-tooltip";

const EobaniyBlyr = styled.span`
  height: 100%;
  display: flex;
  flex-direction: row;
  filter: drop-shadow(rgba(255, 0, 245, 0.8) 20px 0px 40px);

  z-index: 200;

  transition-duration: 200ms;

  ${({isRolled}) => isRolled && css`
    height: 95px;
    transition-delay: 300ms;
  `}

  ${({screen}) => screen === SERVER_SCREEN && css`
    position: absolute;
    top: 0;
    left: 0;
  `}
}
`
const BarBorder = styled(BarsBorder)`
  clip-path: polygon(calc(100% - 20px) 0, 100% 30px, 100% calc(100% - 30px), calc(100% - 20px) 100%,
  calc(100% - 22px) 100%, calc(100% - 2px) calc(100% - 30px), calc(100% - 2px) 30px, calc(100% - 22px) 0);
  margin-left: -22px;

  ${({isRolled}) => isRolled && css`
    clip-path: polygon(100% 0, 100% 30px, 100% calc(100% - 30px), calc(100% - 20px) 100%,
    calc(100% - 22px) 100%, calc(100% - 2px) calc(100% - 30px), calc(100% - 2px) 30px, calc(100% - 2px) 0);
  `}
}
`

const Bar = styled(LRBars)`
  clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 30px, 100% calc(100% - 30px), calc(100% - 20px) 100%, 0 100%);

  ${({isRolled}) => isRolled && css`
    clip-path: polygon(0 0, 100% 0, 100% 30px, 100% calc(100% - 30px), calc(100% - 20px) 100%, 0 100%);
    border-bottom: 2px solid rgba(188, 44, 201, 1);;
  `}
}
`

const NewFriendsAlert = styled(AlertIcon)`
  position: absolute;
  bottom: 0;
  right: 0;
`

const FriendsSideBar = () => {
    const dispatch = useDispatch();
    const [isRolled, setIsRolled] = useState(false);
    const screenName = useSelector(state => state.screenState.screen);
    const {friends, pending} = useSelector(state => state.friends);
    const {isCurrentlyInCall, callingId} = useSelector(state => state.dialler);
    const {currentChatId} = useSelector(state => state.chat);

    const goToFriendsScreen = () => {
        dispatch(setScreen({screenName: FRIENDS_SCREEN}));
        dispatch(setSubScreen({subScreenName: FRIENDS_SUBSCREEN_FRIENDS_TAB}));
    }

    const goToPending = e => {
        dispatch(setScreen({screenName: FRIENDS_SCREEN}));
        dispatch(setSubScreen({subScreenName: FRIENDS_SUBSCREEN_PENDING_TAB}));
        e.stopPropagation();
    }

    const goToAdd = () => {
        dispatch(setScreen({screenName: FRIENDS_SCREEN}));
        dispatch(setSubScreen({subScreenName: FRIENDS_SUBSCREEN_ADD_FRIENDS_TAB}));
    }

    const handleMouseLeft = (state) => {
        if (screenName !== SERVER_SCREEN) return;
        setIsRolled(!state);
    }

    useEffect(() => {
        setIsRolled(screenName === SERVER_SCREEN)
    }, [screenName]);

    return (
        <>
            <EobaniyBlyr screen={screenName} isRolled={isRolled} onMouseEnter={() => handleMouseLeft(true)}
                         onMouseLeave={() => handleMouseLeft(false)}>
                <Bar isRolled={isRolled}>
                    <BarButton dataTooltipId={'friend-tooltip-friends'} icon={faUser} onClick={goToFriendsScreen}
                               isSelected={screenName === FRIENDS_SCREEN}>
                        {!!pending.length && <NewFriendsAlert onClick={goToPending} isAnimated/>}
                    </BarButton>
                    <BarButton dataTooltipId={'friend-tooltip-add'} icon={faPlus} onClick={goToAdd}/>
                    <IconSeparator/>
                    <ScrollerBarBox>
                        <ScrollerBar>
                            {friends.map((friend) => (<FriendBarIcon key={friend.id} id={friend.id}
                                                                     avatarUrl={friend.avatar_url}
                                                                     nickname={friend.nickname}
                                                                     status={friend.status}
                                                                     isSelected={currentChatId === friend.id}
                                                                     hasNotification={friend.hasNotification}
                                                                     isInVoice={isCurrentlyInCall && callingId === friend.id}/>))}
                        </ScrollerBar>
                    </ScrollerBarBox>
                </Bar>
                <BarBorder isRolled={isRolled}/>
            </EobaniyBlyr>
            <Tooltip id={'friend-tooltip-friends'}
                     place="right"
                     content={'Friends'}/>
            <Tooltip id={'friend-tooltip-add'}
                     place="right"
                     content={'Add friends'}/>
            {friends.map((friend) => (
                <Tooltip key={friend.id}
                         id={`friend-tooltip-${friend.id}`}
                         place="right"
                         content={friend.nickname}/>))}
        </>
    );
};

export default FriendsSideBar;