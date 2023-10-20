import React from 'react';
import ContentContainer from "../ContentContainer";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faUserClock, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import useWindowSize from "../../hooks/useWindowSize";
import {useDispatch, useSelector} from "react-redux";
import {FRIENDS_SCREEN, MAIN_SCREEN, setSubScreen} from "../../store/screenStateSlice";
import MainScreen from "../MainScreen";
import FriendListTab from "./FriendListTab";
import FriendSentPendingTab from "./FriendSentPendingTab";
import FriendAddTab from "./FriendAddTab";

const Tabs = styled.div`
  height: 50px;
  display: flex;
  flex-direction: row;
`

const TabContainer = styled.div`
  position: relative;

  &:not(:first-child) {
    margin-left: -50px;
  }
`

const TabBack = styled.div`
  height: 50px;

  clip-path: polygon(50px 0, 100% 0, calc(100% - 50px) 100%, 0 100%);

  color: #9788B1;
  font-size: 24px;

  padding-left: 50px;
  padding-right: 50px;

  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
`

const TabBorder = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  background-color: rgba(188, 44, 201, 0.62);

  clip-path: polygon(100% 0, calc(100% - 50px) 100%, 0 100%,
  0 calc(100% - 2px), calc(100% - 52px) calc(100% - 2px), calc(100% - 2px) 0px);
`

const Tab = ({icon, name, onClick}) => {
    const size = useWindowSize();

    return (
        <TabContainer >
            <TabBack onClick={() => onClick?.()}>
                {icon && <FontAwesomeIcon style={{marginRight: "15px"}} icon={icon}/>}
                {size.width > 1200 && name}
            </TabBack>
            <TabBorder/>
        </TabContainer>
    )
}

const FRIENDS = "friendsList";
const PENDING = "friendsPending";
const ADD_FRIENDS = "friendsAdd";


const FriendsScreen = () => {

    const dispatch = useDispatch();
    const subScreenName = useSelector(state => state.screenState.subScreen);

    let subScreen;

    switch (subScreenName) {
        case FRIENDS:
            subScreen = <FriendListTab/>
            break;
        case PENDING:
            subScreen = <FriendSentPendingTab/>
            break;
        case ADD_FRIENDS:
            subScreen = <FriendAddTab/>
            break;
    }

    const setTab = (tabName) => {
        dispatch(setSubScreen({subScreenName: tabName}))
    }

    return (
        <ContentContainer>
            <Tabs>
                <Tab name={"Friends"} icon={faUser} onClick={() => setTab(FRIENDS)}/>
                <Tab name={"Pending"} icon={faUserClock} onClick={() => setTab(PENDING)}/>
                <Tab name={"Add friend"} icon={faUserPlus} onClick={() => setTab(ADD_FRIENDS)}/>
            </Tabs>
            {subScreen}
        </ContentContainer>
    );
};

export default FriendsScreen;