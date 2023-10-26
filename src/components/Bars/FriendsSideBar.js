import React from 'react';
import styled from "styled-components";
import {BarsBorder, LRBars, ScrollerBar, ScrollerBarBox} from "./LRBars";
import BarButton from "./BarButton";
import {faPlus, faUser} from "@fortawesome/free-solid-svg-icons";
import {IconSeparator} from "./SideIconParts";
import {useDispatch, useSelector} from "react-redux";
import {
    FRIENDS_SCREEN,
    FRIENDS_SCREEN_FRIENDS_TAB,
    FRIENDS_SCREEN_PENDING_TAB,
    setScreen,
    setSubScreen
} from "../../store/screenStateSlice";
import AlertIcon from "../AlertIcon";
import BarIcon from "./BarIcon";

const EobaniyBlyr = styled.span`
  height: 100%;
  display: flex;
  flex-direction: row;
  filter: drop-shadow(rgba(255, 0, 245, 0.8) 20px 0px 40px);
`
const BarBorder = styled(BarsBorder)`
  clip-path: polygon(calc(100% - 20px) 0, 100% 30px, 100% calc(100% - 30px), calc(100% - 20px) 100%,
  calc(100% - 22px) 100%, calc(100% - 2px) calc(100% - 30px), calc(100% - 2px) 30px, calc(100% - 22px) 0);
  margin-left: -22px;
`

const Bar = styled(LRBars)`
  clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 30px, 100% calc(100% - 30px), calc(100% - 20px) 100%, 0 100%);
`

const NewFriendsAlert = styled(AlertIcon)`
  position: absolute;
  bottom: 0;
  right: 0;
`

const FriendsSideBar = () => {
    const dispatch = useDispatch();
    const screenName = useSelector(state => state.screenState.screen);
    const {friends, pending} = useSelector(state => state.friends);

    const goToFriendsScreen = () => {
        dispatch(setScreen({screenName: FRIENDS_SCREEN}));
        dispatch(setSubScreen({subScreenName: FRIENDS_SCREEN_FRIENDS_TAB}));
    }

    const goToPending = e => {
        dispatch(setScreen({screenName: FRIENDS_SCREEN}));
        dispatch(setSubScreen({subScreenName: FRIENDS_SCREEN_PENDING_TAB}));
        e.stopPropagation();
    }

    return (
        <EobaniyBlyr>
            <Bar>
                <BarButton icon={faUser} isSelected={screenName === FRIENDS_SCREEN}/>
                <BarButton icon={faPlus} onClick={goToFriendsScreen}>
                    {pending.length && <NewFriendsAlert onClick={goToPending} isAnimated/>}
                </BarButton>
                <IconSeparator/>

                <ScrollerBarBox>
                    <ScrollerBar>
                        {friends.map((obj, idx) => (<BarIcon/>))}
                    </ScrollerBar>
                </ScrollerBarBox>

            </Bar>
            <BarBorder/>
        </EobaniyBlyr>
    );
};

export default FriendsSideBar;